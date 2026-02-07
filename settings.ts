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

    containerEl.createEl('h2', { text: '沉思模式设置 - Flowing Paper Mode Settings' });

    new Setting(containerEl)
      .setName('高亮颜色 (Highlight Color)')
      .setDesc('当前行的高亮颜色（十六进制）')
      .addText(text => text
        .setPlaceholder('#3b82f680')
        .setValue(this.plugin.settings.highlightColor)
        .onChange(async (value) => {
          this.plugin.settings.highlightColor = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('高亮透明度 (Highlight Opacity)')
      .setDesc('高亮条的透明度 (0-1)')
      .addSlider(slider => slider
        .setLimits(0, 1, 0.1)
        .setValue(this.plugin.settings.highlightOpacity)
        .setDynamicTooltip()
        .onChange(async (value) => {
          this.plugin.settings.highlightOpacity = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('启用音效 (Enable Sound)')
      .setDesc('按回车时播放打字机音效')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.enableSound)
        .onChange(async (value) => {
          this.plugin.settings.enableSound = value;
          await this.plugin.saveSettings();
        }));

    containerEl.createEl('h3', { text: '使用说明' });
    containerEl.createEl('p', { text: '• 使用 Ctrl/Cmd + Shift + F 切换沉思模式' });
    containerEl.createEl('p', { text: '• 在沉思模式下，按回车键时光标保持在当前行，内容向下流动' });
    containerEl.createEl('p', { text: '• 淡蓝色高亮条标记当前编辑位置' });
  }
}
