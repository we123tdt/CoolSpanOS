# CoolSpanOS

> 🌍 一个仿照 Windows 11 视觉风格的 Linux 定制发行版
> 
> **基于 [Alpine Linux](https://alpinelinux.org/) + [Wayland](https://wayland.freedesktop.org/) + [WebKit](https://webkit.org/) 构建**
> 
> [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
> [![Release](https://img.shields.io/github/v/release/we123tdt/CoolSpanOS)](https://github.com/we123tdt/CoolSpanOS/releases)
> [![GitHub stars](https://img.shields.io/github/stars/we123tdt/CoolSpanOS)](https://github.com/we123tdt/CoolSpanOS)

## 🌐 语言选择 · Language

- [🇨🇳 中文文档](#-特性)（当前文件）
- [🇺🇸 English Documentation](README.en.md)

## ✨ 特性

- 🎨 **[Windows 11 风格 UI](#-技术栈)** — 亚克力材质、居中任务栏、开始菜单、动态壁纸
- 📦 **[轻量高效](#-系统架构)** — 基于 [Alpine Linux](https://alpinelinux.org/)，ISO 仅 41MB
- 🌐 **[Web 技术栈](#-技术栈)** — [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Tailwind CSS](https://tailwindcss.com/)
- 🎯 **[开机直达桌面](#-快速开始)** — [Cage](https://github.com/cage-kage/cage) + [Cog](https://github.com/Igalia/cog) 全屏浏览器，无需登录
- 📝 **[字体平滑](#-技术栈)** — [Noto](https://fonts.google.com/noto) 字体 + 亚像素抗锯齿
- 🌍 **[中文支持](#-技术栈)** — Noto CJK 字体已预装

## 🚀 快速开始

### 从 ISO 启动

1. 从 [Releases](https://github.com/we123tdt/CoolSpanOS/releases) 下载最新版 ISO 镜像
2. 使用 [Rufus](https://rufus.ie/) / [Etcher](https://etcher.balena.io/) 等工具写入 U 盘
3. 从 USB 启动电脑，或在虚拟机（[VirtualBox](https://www.virtualbox.org/) / [VMware](https://www.vmware.com/)）中挂载 ISO

### 从源码构建

需要：[WSL](https://learn.microsoft.com/en-us/windows/wsl/) (Ubuntu)、[Node.js](https://nodejs.org/) 18+、root 权限

```bash
# 1. 进入 WSL
wsl -d Ubuntu

# 2. 安装依赖
sudo apt-get update
sudo apt-get install -y curl tar parted dosfstools e2fsprogs kpartx xorriso syslinux extlinux grub-common grub-pc-bin

# 3. 克隆并构建 React
git clone https://github.com/we123tdt/CoolSpanOS.git
cd CoolSpanOS
npm install
npm run build

# 4. 执行构建脚本
sudo bash os-build/build.sh

# 5. ISO 将生成在项目根目录
ls -la CoolSpanOS.iso
```

## 🏗️ 系统架构

```
CoolSpanOS
├── 内核：       [Linux 6.6 LTS](https://www.kernel.org/)
├── 发行版：     [Alpine Linux 3.20](https://alpinelinux.org/)
├── 显示：       [Wayland](https://wayland.freedesktop.org/) + [Cage](https://github.com/cage-kage/cage)（单窗口合成器）
├── 浏览器：     [WPE WebKit](https://wpewebkit.org/) + [Cog](https://github.com/Igalia/cog)
├── UI 框架：    [React 18](https://react.dev/) + [Tailwind CSS](https://tailwindcss.com/)
└── 字体：       [Noto Sans](https://fonts.google.com/noto) + [Noto CJK](https://github.com/notofonts/noto-cjk)
```

## 📁 项目结构

```
CoolSpanOS/
├── [src/](src/)                       # React 源代码
│   ├── [components/](src/components/) # UI 组件（桌面、任务栏、开始菜单等）
│   ├── [store/](src/store/)           # [Zustand](https://github.com/pmndrs/zustand) 状态管理
│   ├── [lib/](src/lib/)               # 工具函数
│   └── [utils/](src/utils/)           # 动画常量
├── [os-build/](os-build/)             # Linux 发行版构建脚本
│   └── [build.sh](os-build/build.sh)  # 主构建脚本
├── [dist/](dist/)                     # React 构建产物（git 忽略）
└── CoolSpanOS.iso                     # 生成的 ISO（git 忽略）
```

## 🛠️ 技术栈

- **前端**：[React 18](https://react.dev/) · [TypeScript](https://www.typescriptlang.org/) · [Tailwind CSS](https://tailwindcss.com/) · [Zustand](https://github.com/pmndrs/zustand)
- **系统**：[Alpine Linux 3.20](https://alpinelinux.org/) · [Linux Kernel 6.6 LTS](https://www.kernel.org/)
- **显示**：[Wayland](https://wayland.freedesktop.org/) · [Cage](https://github.com/cage-kage/cage)
- **浏览器**：[WPE WebKit](https://wpewebkit.org/) · [Cog](https://github.com/Igalia/cog)
- **构建**：[Vite](https://vitejs.dev/) · [grub-mkrescue](https://www.gnu.org/software/grub/)
- **初始化**：[OpenRC](https://github.com/OpenRC/openrc)

## 🎮 操作指南

| 操作 | 方式 |
|------|------|
| 打开开始菜单 | 点击任务栏向上箭头 / 按 `Win` 键 |
| 打开应用 | 双击桌面图标 / 点击任务栏图标 |
| 最小化窗口 | 点击应用的任务栏图标 |
| 关闭浮层 | 按 `Esc` 键 |
| 拖动窗口 | 按住标题栏拖动 |
| 最大化 / 还原 | 双击标题栏 |

## 🗺️ 路线图

- [ ] 国际化 UI（i18n）
- [ ] 文件管理器
- [ ] 终端应用
- [ ] 系统设置面板
- [ ] 网络管理 UI
- [ ] 软件包管理集成
- [ ] ARM64 (aarch64) 支持

## 🤝 贡献

欢迎贡献！请随时提交 Pull Request。

1. Fork 仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

基于 [MIT License](LICENSE) 发行。

## 🙏 致谢

- [Alpine Linux](https://alpinelinux.org/) — 基础系统
- [Cage](https://github.com/cage-kage/cage) — Wayland 合成器
- [Cog](https://github.com/Igalia/cog) — WPE WebKit 启动器
- [WPE WebKit](https://wpewebkit.org/) — Web 渲染引擎
- 灵感来自 Windows 11 设计语言

---

> 📝 **注意**：这是一个实验性项目。当前 ISO 是 live image 模式 — 它在内存中运行，不会修改你的磁盘。建议在虚拟机中测试。
