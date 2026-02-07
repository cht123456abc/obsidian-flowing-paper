# 发布指南 Release Guide

## 自动发布流程 Automated Release Process

本项目已配置 GitHub Actions 自动发布工作流。当你推送新的版本标签时，会自动构建并发布到 GitHub Releases。

### 发布步骤 Release Steps

1. **更新版本号 Update Version**
   ```bash
   npm version patch  # 小版本更新 1.0.0 -> 1.0.1
   # 或
   npm version minor  # 中版本更新 1.0.0 -> 1.1.0
   # 或
   npm version major  # 大版本更新 1.0.0 -> 2.0.0
   ```
   
   这会自动更新 `package.json`、`manifest.json` 和 `versions.json` 文件。

2. **推送标签 Push Tag**
   ```bash
   git push
   git push --tags
   ```

3. **等待自动构建 Wait for Build**
   - GitHub Actions 会自动触发构建
   - 访问你的仓库的 Actions 标签页查看构建进度
   - 构建完成后会自动创建 GitHub Release

4. **提交到 Obsidian 插件市场 Submit to Obsidian Plugin Market**
   
   首次发布需要手动提交：
   
   a. Fork [obsidian-releases](https://github.com/obsidianmd/obsidian-releases) 仓库
   
   b. 在 `community-plugins.json` 中添加你的插件信息：
   ```json
   {
     "id": "sinking-paper-mode",
     "name": "Sinking Paper Mode 沉纸模式",
     "author": "Hentiflo",
     "description": "Write with a fixed cursor as content sinks down like paper in a typewriter 光标固定，内容下沉，如打字机般的写作体验",
     "repo": "cht123456abc/obsidian-flowing-paper"
   }
   ```
   
   c. 创建 Pull Request 到 obsidian-releases 仓库
   
   d. 等待 Obsidian 团队审核通过

5. **后续更新 Future Updates**
   
   首次提交通过后，后续版本更新会自动同步到插件市场（通过 GitHub Releases）。

## 发布检查清单 Release Checklist

发布前请确认：

- [ ] 代码已充分测试
- [ ] README.md 已更新
- [ ] manifest.json 中的版本号正确
- [ ] 所有更改已提交到 git
- [ ] 构建成功 (`npm run build`)

## 版本号规范 Version Numbering

遵循语义化版本 (Semantic Versioning)：

- **MAJOR 主版本**：不兼容的 API 修改
- **MINOR 次版本**：向下兼容的功能性新增
- **PATCH 修订号**：向下兼容的问题修正

## 故障排除 Troubleshooting

### GitHub Actions 构建失败

1. 检查 Actions 标签页的错误日志
2. 确保所有依赖都在 `package.json` 中
3. 本地运行 `npm run build` 确认构建成功

### Release 没有自动创建

1. 确认标签已推送到 GitHub
2. 检查 GitHub Actions 是否有权限创建 Release
3. 查看 Actions 日志了解详细错误

### 插件市场不显示更新

1. 确认 GitHub Release 已成功创建
2. 确认 `manifest.json` 和 `versions.json` 已正确更新
3. Obsidian 插件市场可能需要几小时同步

## 相关链接 Related Links

- [Obsidian 插件开发文档](https://docs.obsidian.md/Plugins/Getting+started/Build+a+plugin)
- [Obsidian Releases 仓库](https://github.com/obsidianmd/obsidian-releases)
- [语义化版本规范](https://semver.org/lang/zh-CN/)
