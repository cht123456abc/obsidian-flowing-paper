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

    new Setting(containerEl)
      .setName('Sinking paper mode settings')
      .setHeading();

    new Setting(containerEl)
      .setName('Highlight color')
      .setDesc('Hex color for current line highlight')
      .addText(text => text
        .setPlaceholder('#3b82f680')
        .setValue(this.plugin.settings.highlightColor)
        .onChange(async (value) => {
          this.plugin.settings.highlightColor = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('Highlight opacity')
      .setDesc('Opacity of the highlight bar (0-1)')
      .addSlider(slider => slider
        .setLimits(0, 1, 0.1)
        .setValue(this.plugin.settings.highlightOpacity)
        .setDynamicTooltip()
        .onChange(async (value) => {
          this.plugin.settings.highlightOpacity = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('Enable sound')
      .setDesc('Play typewriter sound on Enter')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.enableSound)
        .onChange(async (value) => {
          this.plugin.settings.enableSound = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('Hotkey settings')
      .setHeading();
    
    new Setting(containerEl)
      .setName('Customize hotkey')
      .setDesc('To customize the hotkey, go to: Settings → Hotkeys → Search "sinking paper"');

    new Setting(containerEl)
      .setName('Usage')
      .setHeading();
    
    new Setting(containerEl)
      .setName('How to use')
      .setDesc('Press your custom hotkey or click status bar to toggle. In sinking mode, cursor stays fixed and content sinks down. Blue highlight bar marks current editing position.');
  }
}
