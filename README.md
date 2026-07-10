# CoolSpanOS

一个仿照 Windows 11 视觉风格的 Linux 定制发行版，基于 Alpine Linux + Wayland + WebKit。

## 特性

- 🎨 **Windows 11 风格 UI**：亚克力材质、居中任务栏、开始菜单、动态壁纸
- 📦 **轻量高效**：基于 Alpine Linux，ISO 仅 41MB
- 🌐 **Web 技术栈**：React 18 + TypeScript + Tailwind CSS
- 🎯 **开机直达桌面**：Cage + Cog 全屏浏览器，无需登录
- 📝 **字体平滑**：Noto 字体 + 亚像素抗锯齿
- 🌍 **中文支持**：Noto CJK 字体已预装

## 快速开始

### 从 ISO 启动

1. 下载最新版 ISO 镜像（见 Releases）
2. 使用 Rufus、Etcher 等工具写入 U 盘
3. 从 USB 启动电脑或在虚拟机中挂载 ISO

### 构建 ISO

```bash
# 1. 进入 WSL
wsl -d Ubuntu

# 2. 构建 React 产物
cd /mnt/e/CoolSpanOS
npm install
npm run build

# 3. 执行构建脚本（需要 root 权限）
sudo bash os-build/build.sh

# 4. ISO 将生成在项目根目录
ls -la CoolSpanOS.iso
```

## 系统架构

```
CoolSpanOS
├── 内核：Linux 6.6 LTS
├── 发行版：Alpine Linux 3.20
├── 显示：Wayland + Cage（单窗口合成器）
├── 浏览器：WPE WebKit + Cog
├── UI：React 18 + Tailwind CSS
└── 字体：Noto Sans + Noto CJK
```

## 项目结构

```
CoolSpanOS/
├── src/                    # React 源代码
│   ├── components/         # UI 组件（桌面、任务栏、开始菜单等）
│   ├── store/              # Zustand 状态管理
│   ├── lib/                # 工具函数
│   └── utils/              # 动画常量
├── os-build/               # Linux 发行版构建脚本
│   └── build.sh            # 主构建脚本
├── dist/                   # React 构建产物
└── CoolSpanOS.iso          # 生成的 ISO（不在 git 中）
```

## 操作指南

| 操作 | 方式 |
|------|------|
| 打开开始菜单 | 点击任务栏向上箭头 / Win 键 |
| 打开应用 | 双击桌面图标 / 点击任务栏图标 |
| 最小化窗口 | 点击任务栏图标 |
| 关闭浮层 | Esc 键 |

## 许可证

MIT License - 详见 [LICENSE](LICENSE)
