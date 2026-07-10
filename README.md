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
- 📦 **[轻量高效](#-系统架构)** — 基于 [Alpine Linux](https://alpinelinux.org/)，磁盘镜像仅 ~750MB
- 🌐 **[Web 技术栈](#-技术栈)** — [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Tailwind CSS](https://tailwindcss.com/)
- 🎯 **[开机直达桌面](#-快速开始)** — [Cage](https://github.com/cage-kage/cage) + [Cog](https://github.com/Igalia/cog) 全屏浏览器，无需登录
- 📝 **[字体平滑](#-技术栈)** — [Noto](https://fonts.google.com/noto) 字体 + 亚像素抗锯齿
- 🌍 **[中文支持](#-技术栈)** — Noto CJK 字体已预装

## 🚀 快速开始

### 在虚拟机中运行（推荐）

1. 从 [Releases](https://github.com/we123tdt/CoolSpanOS/releases) 下载镜像
   - **VirtualBox**：下载 `.vdi` 格式
   - **VMware**：下载 `.vmdk` 格式

2. **VirtualBox 使用方法**：
   - 打开 VirtualBox，点击 **"新建"**
   - 名称：CoolSpanOS，类型：Linux，版本：Other Linux (64-bit)
   - 内存：建议 **4096 MB** 以上
   - 选择 **"使用已有的虚拟硬盘文件"**，选择下载的 `.vdi`
   - 点击 **"创建"**，然后启动虚拟机

3. **VMware 使用方法**：
   - 创建新虚拟机，选择 **"稍后安装操作系统"**
   - 类型：Linux，版本：Other Linux 5.x kernel 64-bit
   - 完成向导后，删除默认硬盘
   - 添加新硬盘 → **"使用现有虚拟磁盘"** → 选择 `.vmdk`
   - 启动虚拟机

4. 默认账号：
   - 用户名：`coolspan`
   - 密码：`coolspan`

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
