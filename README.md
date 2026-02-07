# Flowing Paper Mode (沉思模式) - Obsidian Plugin

> 让思绪沉淀，让当下永驻  
> Where thoughts sink and the present stays

## 功能介绍

这是一个创新的 Markdown 编辑模式插件，改变了传统的编辑体验：

- **光标固定**：按回车时，光标始终保持在当前行行首
- **内容流动**：当前行内容向下沉淀，就像打字机上的纸张向下滚动
- **视觉锚点**：淡蓝色高亮条标记当前编辑位置，动态跟随光标
- **快速切换**：随时在传统模式和沉思模式之间切换

## 适用场景

- 💭 **思维流捕捉**：快速记录连续的想法，注意力始终在"当下"
- ✍️ **意识流写作**：减少视线移动，保持心流状态
- 🧘 **冥想日记**：每次回车代表一个思考节点的完成
- 💬 **自我对话**：模拟对话式的思考过程

## 安装方法

### 方法一：手动安装（开发版）

1. 下载此仓库的所有文件
2. 将 `obsidian-flowing-paper` 文件夹复制到你的 Obsidian vault 的 `.obsidian/plugins/` 目录下
3. 在文件夹内运行：
   ```bash
   npm install
   npm run build
   ```
4. 在 Obsidian 设置中启用 "Flowing Paper Mode" 插件

### 方法二：从社区插件安装（待发布）

在 Obsidian 的社区插件市场搜索 "Flowing Paper Mode"

## 使用方法

1. **切换模式**：使用快捷键 `Ctrl/Cmd + Shift + F` 或命令面板搜索 "Toggle Flowing Paper Mode"
2. **开始写作**：在沉思模式下，按回车键时光标会保持在当前位置，内容向下流动
3. **自定义设置**：在插件设置中调整高亮颜色、透明度等

## 设置选项

- **高亮颜色**：自定义当前行的高亮颜色
- **高亮透明度**：调整高亮条的透明度（0-1）
- **启用音效**：按回车时播放打字机音效（开发中）

## 开发

```bash
# 安装依赖
npm install

# 开发模式（自动重新编译）
npm run dev

# 生产构建
npm run build
```

## 技术栈

- TypeScript
- Obsidian API
- CodeMirror 6

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License

## 致谢

灵感来源于打字机的固定光标体验和意识流写作的需求。
