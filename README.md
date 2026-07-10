# CoolSpanOS

A Linux distribution with Windows 11-inspired UI, built on Alpine Linux + Wayland + WebKit.

## Features

- 🎨 **Windows 11 Style UI** — Acrylic effects, centered taskbar, Start menu, and dynamic wallpaper
- 📦 **Lightweight** — Based on Alpine Linux, ISO is only 41MB
- 🌐 **Modern Web Stack** — React 18 + TypeScript + Tailwind CSS
- 🎯 **Boot to Desktop** — Cage + Cog fullscreen browser, no login required
- 📝 **Font Smoothing** — Noto fonts with subpixel antialiasing
- 🌍 **Multi-language** — Noto CJK fonts pre-installed

## Quick Start

### Run from ISO

1. Download the latest ISO from [Releases](../../releases)
2. Write it to a USB drive using [Rufus](https://rufus.ie/), [Etcher](https://etcher.balena.io/), or similar tools
3. Boot from USB, or mount the ISO in a virtual machine

### Build ISO from Source

Requirements: WSL (Ubuntu), Node.js 18+, root privileges

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

## System Architecture

```
CoolSpanOS
├── Kernel:        Linux 6.6 LTS
├── Base:          Alpine Linux 3.20
├── Display:       Wayland + Cage (single-window compositor)
├── Browser:       WPE WebKit + Cog
├── UI Framework:  React 18 + Tailwind CSS
└── Fonts:         Noto Sans + Noto CJK
```

## Project Structure

```
CoolSpanOS/
├── src/                    # React source code
│   ├── components/         # UI components (Desktop, Taskbar, StartMenu, etc.)
│   ├── store/              # Zustand state management
│   ├── lib/                # Utility functions and icons
│   ├── hooks/              # React hooks
│   ├── pages/              # Page components
│   └── utils/              # Animation constants
├── os-build/               # Linux distribution build scripts
│   └── build.sh            # Main build script
├── dist/                   # React build output (gitignored)
├── .trae/documents/        # PRD and technical docs
└── CoolSpanOS.iso          # Generated ISO image (gitignored)
```

## Operation Guide

| Action | Method |
|--------|--------|
| Open Start menu | Click the up-arrow in taskbar / press `Win` |
| Open app | Double-click desktop icon / click taskbar icon |
| Minimize window | Click the taskbar icon of the app |
| Close overlay | Press `Esc` |
| Drag window | Click and drag the title bar |
| Maximize / Restore | Double-click the title bar |

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Zustand
- **System**: Alpine Linux 3.20, Linux Kernel 6.6 LTS
- **Display**: Wayland, Cage (compositor)
- **Browser**: WPE WebKit, Cog
- **Build**: Vite, grub-mkrescue
- **Init**: OpenRC

## Roadmap

- [ ] Multi-language UI (i18n)
- [ ] File manager application
- [ ] Terminal application
- [ ] Settings panel for system preferences
- [ ] Network manager UI
- [ ] Package manager integration
- [ ] ARM64 (aarch64) support

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

## Acknowledgments

- [Alpine Linux](https://alpinelinux.org/) — The base system
- [Cage](https://github.com/cage-kage/cage) — Wayland compositor
- [Cog](https://github.com/Igalia/cog) — WPE WebKit launcher
- [WPE WebKit](https://wpewebkit.org/) — Web rendering engine
- Inspired by Windows 11 design language

---

**Note**: This is an experimental project. The current ISO is a live image — it runs in memory and does not modify your disk. Use a virtual machine for testing.
