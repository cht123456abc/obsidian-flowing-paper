import { App, PluginSettingTab, Setting } from 'obsidian';
import FlowingPaperPlugin from './main';

export class FlowingPaperSettingTab extends PluginSettingTab {
  plugin: FlowingPaperPlugin;

  constructor(app: App, plugin: FlowingPaperPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl('h2', { text: 'Flowing Paper Mode Settings 沉思模式设置' });

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

    containerEl.createEl('h3', { text: 'Usage 使用说明' });
    containerEl.createEl('p', { text: '• Press Cmd/Ctrl + Shift + Z to toggle mode 切换沉思模式' });
    containerEl.createEl('p', { text: '• In Flowing mode, cursor stays fixed and content flows down 光标保持固定，内容向下流动' });
    containerEl.createEl('p', { text: '• Blue highlight bar marks current editing position 蓝色高亮条标记当前编辑位置' });
  }
}
