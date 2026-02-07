import { Plugin, MarkdownView, Notice, editorViewField } from 'obsidian';
import { FlowingPaperSettingTab } from './settings';
import { FlowingPaperSettings, DEFAULT_SETTINGS } from './types';
import { EditorView, ViewPlugin, ViewUpdate, Decoration, DecorationSet, keymap } from '@codemirror/view';
import { StateField, StateEffect, Prec, Transaction } from '@codemirror/state';

// 定义状态效果
const toggleFlowingMode = StateEffect.define<boolean>();

// 定义状态字段来跟踪模式
const flowingModeState = StateField.define<boolean>({
  create() {
    return false;
  },
  update(value: boolean, tr: Transaction) {
    for (let effect of tr.effects) {
      if (effect.is(toggleFlowingMode)) {
        return effect.value;
      }
    }
    return value;
  }
});

// 高亮当前行的装饰器
const cursorLineHighlight = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet;

    constructor(view: EditorView) {
      this.decorations = this.buildDecorations(view);
    }

    update(update: ViewUpdate) {
      // 检测状态变化、文档变化、光标移动或视口变化
      const stateChanged = update.transactions.some(tr => 
        tr.effects.some(e => e.is(toggleFlowingMode))
      );
      
      // 只在必要时更新装饰器，避免不必要的重绘
      if (stateChanged || update.selectionSet || (update.docChanged && update.selectionSet)) {
        this.decorations = this.buildDecorations(update.view);
      }
    }

    buildDecorations(view: EditorView): DecorationSet {
      const isFlowing = view.state.field(flowingModeState, false);
      if (!isFlowing) return Decoration.none;

      const cursor = view.state.selection.main.head;
      const line = view.state.doc.lineAt(cursor);
      
      const decoration = Decoration.line({
        attributes: { class: 'flowing-paper-active-line' }
      });

      return Decoration.set([decoration.range(line.from)]);
    }
  },
  {
    decorations: (v: any) => v.decorations
  }
);

export default class FlowingPaperPlugin extends Plugin {
  settings: FlowingPaperSettings;
  private isFlowingMode = false;
  private statusBarItem: HTMLElement;

  async onload() {
    await this.loadSettings();

    // 添加状态栏项（支持点击切换）
    this.statusBarItem = this.addStatusBarItem();
    this.statusBarItem.addClass('mod-clickable');
    this.statusBarItem.addEventListener('click', () => {
      this.toggleFlowingMode();
    });
    this.updateStatusBar();

    // 注册编辑器扩展
    this.registerEditorExtension([
      flowingModeState,
      cursorLineHighlight,
      Prec.highest(keymap.of([
        {
          key: 'Enter',
          run: (view: EditorView) => {
            if (!this.isFlowingMode) return false;

            const cursor = view.state.selection.main.head;
            const line = view.state.doc.lineAt(cursor);
            
            // 在当前行开头插入换行符，这样当前行内容会下沉
            view.dispatch({
              changes: {
                from: line.from,
                insert: '\n'
              },
              // 光标保持在原来的行（现在是新的空行）的行首
              selection: { anchor: line.from }
            });

            return true;
          }
        },
        {
          key: 'Backspace',
          run: (view: EditorView) => {
            if (!this.isFlowingMode) return false;

            const cursor = view.state.selection.main.head;
            const line = view.state.doc.lineAt(cursor);
            const lineText = line.text;
            
            // 检查当前行是否为空行
            if (lineText.trim() === '' && cursor === line.from) {
              // 检查是否有下一行
              if (line.number < view.state.doc.lines) {
                const nextLine = view.state.doc.line(line.number + 1);
                
                // 删除当前空行（包括换行符）
                view.dispatch({
                  changes: {
                    from: line.from,
                    to: nextLine.from
                  },
                  // 光标移到当前行行尾（下一行内容上移后的行尾）
                  selection: { anchor: line.from + nextLine.text.length }
                });
                
                return true;
              }
            }
            
            // 如果不是空行或没有下一行，使用默认行为
            return false;
          }
        }
      ]))
    ]);

    // 添加切换命令（快捷键在 Obsidian 设置中配置）
    this.addCommand({
      id: 'toggle-flowing-paper-mode',
      name: 'Toggle Flowing Paper Mode 切换沉思模式',
      callback: () => this.toggleFlowingMode()
    });

    // 添加设置面板
    this.addSettingTab(new FlowingPaperSettingTab(this.app, this));
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  toggleFlowingMode() {
    this.isFlowingMode = !this.isFlowingMode;
    this.updateStatusBar();
    
    // 更新所有编辑器视图的状态
    const view = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (view) {
      const editorView = (view.editor as any).cm as EditorView;
      if (editorView) {
        editorView.dispatch({
          effects: toggleFlowingMode.of(this.isFlowingMode)
        });
      }
    }
    
    if (this.isFlowingMode) {
      new Notice('✨ Flowing Paper Mode ON 沉思模式已开启');
      document.body.addClass('flowing-paper-mode-active');
    } else {
      new Notice('📝 Normal Mode 传统编辑模式');
      document.body.removeClass('flowing-paper-mode-active');
    }
  }

  updateStatusBar() {
    if (this.isFlowingMode) {
      this.statusBarItem.setText('✨ Flowing 沉思');
      this.statusBarItem.addClass('flowing-mode-active');
    } else {
      this.statusBarItem.setText('📝 Normal 编辑');
      this.statusBarItem.removeClass('flowing-mode-active');
    }
  }
}
