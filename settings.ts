import { App, PluginSettingTab, Setting } from 'obsidian';
import SinkingPaperPlugin from './main';

export class SinkingPaperSettingTab extends PluginSettingTab {
  plugin: SinkingPaperPlugin;

  constructor(app: App, plugin: SinkingPaperPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl('h2', { text: 'Sinking Paper Mode Settings 沉纸模式设置' });

    new Setting(containerEl)
      .setName('Highlight Color 高亮颜色')
      .setDesc('Hex color for current line highlight 当前行的高亮颜色（十六进制）')
      .addText(text => text
        .setPlaceholder('#3b82f680')
        .setValue(this.plugin.settings.highlightColor)
        .onChange(async (value) => {
          this.plugin.settings.highlightColor = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('Highlight Opacity 高亮透明度')
      .setDesc('Opacity of the highlight bar (0-1) 高亮条的透明度')
      .addSlider(slider => slider
        .setLimits(0, 1, 0.1)
        .setValue(this.plugin.settings.highlightOpacity)
        .setDynamicTooltip()
        .onChange(async (value) => {
          this.plugin.settings.highlightOpacity = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('Enable Sound 启用音效')
      .setDesc('Play typewriter sound on Enter 按回车时播放打字机音效')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.enableSound)
        .onChange(async (value) => {
          this.plugin.settings.enableSound = value;
          await this.plugin.saveSettings();
        }));

    containerEl.createEl('h3', { text: 'Hotkey Settings 快捷键设置' });
    containerEl.createEl('p', { 
      text: 'To customize the hotkey, go to: Settings → Hotkeys → Search "Sinking Paper Mode"',
      cls: 'setting-item-description'
    });
    containerEl.createEl('p', { 
      text: '自定义快捷键：设置 → 快捷键 → 搜索"Sinking Paper Mode"',
      cls: 'setting-item-description'
    });
    containerEl.createEl('p', { 
      text: '💡 Default: Cmd/Ctrl + Shift + S (You can change it in Hotkeys settings)',
      cls: 'setting-item-description'
    });
    containerEl.createEl('p', { 
      text: '💡 默认：Cmd/Ctrl + Shift + S（可在快捷键设置中修改）',
      cls: 'setting-item-description'
    });

    containerEl.createEl('h3', { text: 'Usage 使用说明' });
    containerEl.createEl('p', { text: '• Press your custom hotkey or click status bar to toggle 使用快捷键或点击状态栏切换' });
    containerEl.createEl('p', { text: '• In Sinking mode, cursor stays fixed and content sinks down 光标保持固定，内容向下沉' });
    containerEl.createEl('p', { text: '• Blue highlight bar marks current editing position 蓝色高亮条标记当前编辑位置' });
  }
}
