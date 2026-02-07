# Sinking Paper Mode 沉纸模式 - Obsidian Plugin

> Write with a fixed cursor as content sinks down like paper in a typewriter  
> 光标固定，内容下沉，如打字机般的写作体验

## Features 功能介绍

An innovative Markdown editing mode that transforms the traditional writing experience:

- **Fixed Cursor 光标固定**：Cursor stays at the current line when pressing Enter
- **Sinking Content 内容下沉**：Current line content sinks down like paper scrolling in a typewriter
- **Visual Anchor 视觉锚点**：Blue highlight bar marks the current editing position
- **Quick Toggle 快速切换**：Switch between normal and sinking mode anytime

## Use Cases 适用场景

- 💭 **Thought Capture 思维流捕捉**：Quickly record continuous thoughts, focus on the present
- ✍️ **Stream Writing 意识流写作**：Reduce eye movement, maintain flow state
- 🧘 **Meditation Journal 冥想日记**：Each Enter represents completion of a thought node
- 💬 **Self Dialogue 自我对话**：Simulate conversational thinking process

## Installation 安装方法

### Method 1: Manual Installation (Development Version) 手动安装（开发版）

1. Download all files from this repository
2. Copy the folder to your Obsidian vault's `.obsidian/plugins/` directory
3. Run in the folder:
   ```bash
   npm install
   npm run build
   ```
4. Enable "Sinking Paper Mode" in Obsidian settings

### Method 2: Community Plugins (Coming Soon) 社区插件（即将发布）

Search for "Sinking Paper Mode" in Obsidian's community plugin marketplace

## Usage 使用方法

1. **Toggle Mode 切换模式**：
   - Use hotkey `Ctrl/Cmd + Shift + S` (customizable in Settings → Hotkeys)
   - Or click the status bar icon
   - Or use command palette: "Toggle Sinking Paper Mode"

2. **Start Writing 开始写作**：
   - In sinking mode, pressing Enter keeps cursor fixed while content sinks down
   - Press Backspace on empty line to pull content up

3. **Customize Settings 自定义设置**：
   - Adjust highlight color and opacity in plugin settings

## Settings 设置选项

- **Highlight Color 高亮颜色**：Customize current line highlight color
- **Highlight Opacity 高亮透明度**：Adjust highlight bar opacity (0-1)
- **Enable Sound 启用音效**：Play typewriter sound on Enter (coming soon)
- **Hotkey 快捷键**：Customize in Settings → Hotkeys

## Development 开发

```bash
# Install dependencies 安装依赖
npm install

# Development mode (auto-recompile) 开发模式
npm run dev

# Production build 生产构建
npm run build
```

## Release 发布

本项目使用 GitHub Actions 自动发布。详细步骤请查看 [RELEASE.md](RELEASE.md)。

快速发布：
```bash
npm version patch  # 更新版本号
git push && git push --tags  # 推送并触发自动发布
```

## Tech Stack 技术栈

- TypeScript
- Obsidian API
- CodeMirror 6

## Contributing 贡献

Issues and Pull Requests are welcome!

## License 许可证

MIT License

## Author 作者

**Hentiflo**

## Acknowledgments 致谢

Inspired by the typewriter's fixed cursor experience and the need for stream-of-consciousness writing.

灵感来源于打字机的固定光标体验和意识流写作的需求。
