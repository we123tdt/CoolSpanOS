# CoolSpanOS

> 🌍 A Linux distribution with Windows 11-inspired UI
> 
> **Built with [Alpine Linux](https://alpinelinux.org/) + [Wayland](https://wayland.freedesktop.org/) + [WebKit](https://webkit.org/)**
> 
> [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
> [![Release](https://img.shields.io/github/v/release/we123tdt/CoolSpanOS)](https://github.com/we123tdt/CoolSpanOS/releases)
> [![GitHub stars](https://img.shields.io/github/stars/we123tdt/CoolSpanOS)](https://github.com/we123tdt/CoolSpanOS)

## 🌐 Language

- [🇨🇳 中文文档](README.md)
- [🇺🇸 English Documentation](#-features) (current file)

## ✨ Features

- 🎨 **[Windows 11 Style UI](#-tech-stack)** — Acrylic effects, centered taskbar, Start menu, and dynamic wallpaper
- 📦 **[Lightweight](#-system-architecture)** — Based on [Alpine Linux](https://alpinelinux.org/), disk image is only ~750MB
- 🌐 **[Modern Web Stack](#-tech-stack)** — [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Tailwind CSS](https://tailwindcss.com/)
- 🎯 **[Boot to Desktop](#-quick-start)** — [Cage](https://github.com/cage-kage/cage) + [Cog](https://github.com/Igalia/cog) fullscreen browser, no login required
- 📝 **[Font Smoothing](#-tech-stack)** — [Noto](https://fonts.google.com/noto) fonts with subpixel antialiasing
- 🌍 **[Multi-language](#-tech-stack)** — Noto CJK fonts pre-installed

## 🚀 Quick Start

### Run in Virtual Machine (Recommended)

1. Download the disk image from [Releases](https://github.com/we123tdt/CoolSpanOS/releases)
   - **VirtualBox**: Download `.vdi` format
   - **VMware**: Download `.vmdk` format

2. **For VirtualBox**:
   - Open VirtualBox, click **"New"**
   - Name: CoolSpanOS, Type: Linux, Version: Other Linux (64-bit)
   - Memory size: **4096 MB** or more recommended
   - Select **"Use an existing virtual hard disk file"** and choose the `.vdi` file
   - Click **"Create"**, then start the VM

3. **For VMware**:
   - Create a new virtual machine, select **"I will install the operating system later"**
   - Type: Linux, Version: Other Linux 5.x kernel 64-bit
   - After wizard, remove the default hard disk
   - Add new hard disk → **"Use an existing disk"** → select the `.vmdk` file
   - Start the VM

4. Default credentials:
   - Username: `coolspan`
   - Password: `coolspan`

### Build from Source

Requirements: [WSL](https://learn.microsoft.com/en-us/windows/wsl/) (Ubuntu), [Node.js](https://nodejs.org/) 18+, root privileges

```bash
# 1. Enter WSL
wsl -d Ubuntu

# 2. Install dependencies
sudo apt-get update
sudo apt-get install -y curl tar parted dosfstools e2fsprogs kpartx xorriso syslinux extlinux grub-common grub-pc-bin

# 3. Clone and build React
git clone https://github.com/we123tdt/CoolSpanOS.git
cd CoolSpanOS
npm install
npm run build

# 4. Run the build script
sudo bash os-build/build.sh

# 5. The ISO will be generated at project root
ls -la CoolSpanOS.iso
```

## 🏗️ System Architecture

```
CoolSpanOS
├── Kernel:        [Linux 6.6 LTS](https://www.kernel.org/)
├── Base:          [Alpine Linux 3.20](https://alpinelinux.org/)
├── Display:       [Wayland](https://wayland.freedesktop.org/) + [Cage](https://github.com/cage-kage/cage) (single-window compositor)
├── Browser:       [WPE WebKit](https://wpewebkit.org/) + [Cog](https://github.com/Igalia/cog)
├── UI Framework:  [React 18](https://react.dev/) + [Tailwind CSS](https://tailwindcss.com/)
└── Fonts:         [Noto Sans](https://fonts.google.com/noto) + [Noto CJK](https://github.com/notofonts/noto-cjk)
```

## 📁 Project Structure

```
CoolSpanOS/
├── [src/](src/)                       # React source code
│   ├── [components/](src/components/) # UI components (Desktop, Taskbar, StartMenu, etc.)
│   ├── [store/](src/store/)           # [Zustand](https://github.com/pmndrs/zustand) state management
│   ├── [lib/](src/lib/)               # Utility functions
│   └── [utils/](src/utils/)           # Animation constants
├── [os-build/](os-build/)             # Linux distribution build scripts
│   └── [build.sh](os-build/build.sh)  # Main build script
├── [dist/](dist/)                     # React build output (gitignored)
└── CoolSpanOS.iso                     # Generated ISO (gitignored)
```

## 🛠️ Tech Stack

- **Frontend**: [React 18](https://react.dev/) · [TypeScript](https://www.typescriptlang.org/) · [Tailwind CSS](https://tailwindcss.com/) · [Zustand](https://github.com/pmndrs/zustand)
- **System**: [Alpine Linux 3.20](https://alpinelinux.org/) · [Linux Kernel 6.6 LTS](https://www.kernel.org/)
- **Display**: [Wayland](https://wayland.freedesktop.org/) · [Cage](https://github.com/cage-kage/cage)
- **Browser**: [WPE WebKit](https://wpewebkit.org/) · [Cog](https://github.com/Igalia/cog)
- **Build**: [Vite](https://vitejs.dev/) · [grub-mkrescue](https://www.gnu.org/software/grub/)
- **Init**: [OpenRC](https://github.com/OpenRC/openrc)

## 🎮 Operation Guide

| Action | Method |
|--------|--------|
| Open Start menu | Click the up-arrow in taskbar / press `Win` |
| Open app | Double-click desktop icon / click taskbar icon |
| Minimize window | Click the taskbar icon of the app |
| Close overlay | Press `Esc` |
| Drag window | Click and drag the title bar |
| Maximize / Restore | Double-click the title bar |

## 🗺️ Roadmap

- [ ] Multi-language UI (i18n)
- [ ] File manager application
- [ ] Terminal application
- [ ] Settings panel for system preferences
- [ ] Network manager UI
- [ ] Package manager integration
- [ ] ARM64 (aarch64) support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Alpine Linux](https://alpinelinux.org/) — The base system
- [Cage](https://github.com/cage-kage/cage) — Wayland compositor
- [Cog](https://github.com/Igalia/cog) — WPE WebKit launcher
- [WPE WebKit](https://wpewebkit.org/) — Web rendering engine
- Inspired by Windows 11 design language

---

> 📝 **Note**: This is an experimental project. The current ISO is a live image — it runs in memory and does not modify your disk. Use a virtual machine for testing.
