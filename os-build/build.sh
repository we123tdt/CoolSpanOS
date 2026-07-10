#!/bin/bash
set -e

# CoolSpanOS Linux 定制发行版构建脚本 v2
# 在 WSL 内部构建，避免 NTFS 性能问题

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BUILD_DIR="/tmp/coolspanos-build"
ROOTFS="${BUILD_DIR}/rootfs"
ISO_DIR="${BUILD_DIR}/iso"
ALPINE_VERSION="3.20"
ALPINE_ARCH="x86_64"
TARGET_DIR="/mnt/e/CoolSpanOS"

echo "=== CoolSpanOS Build v2 Started ==="
echo "Build dir: ${BUILD_DIR}"

rm -rf "${BUILD_DIR}"
mkdir -p "${ROOTFS}" "${ISO_DIR}"

echo "[1/8] Downloading Alpine minirootfs..."
ALPINE_URL="https://dl-cdn.alpinelinux.org/alpine/v${ALPINE_VERSION}/releases/${ALPINE_ARCH}/alpine-minirootfs-${ALPINE_VERSION}.0-${ALPINE_ARCH}.tar.gz"
curl -fsSL "${ALPINE_URL}" -o "${BUILD_DIR}/rootfs.tar.gz"

echo "[2/8] Extracting rootfs..."
tar xzf "${BUILD_DIR}/rootfs.tar.gz" -C "${ROOTFS}"

echo "[3/8] Configuring APK (using TUNA mirror, HTTP)..."
cat > "${ROOTFS}/etc/apk/repositories" << 'EOF'
http://mirrors.tuna.tsinghua.edu.cn/alpine/v3.20/main
http://mirrors.tuna.tsinghua.edu.cn/alpine/v3.20/community
EOF

# 配置 DNS 解析（chroot 环境需要）
echo "[3.1] Configuring DNS..."
cat /etc/resolv.conf > "${ROOTFS}/etc/resolv.conf" || {
    echo "nameserver 8.8.8.8" > "${ROOTFS}/etc/resolv.conf"
    echo "nameserver 114.114.114.114" >> "${ROOTFS}/etc/resolv.conf"
}

# 初始化 apk 数据库并更新
echo "[3.2] Initializing APK DB..."
chroot "${ROOTFS}" /sbin/apk add --initdb

echo "[3.2] Updating APK repositories..."
chroot "${ROOTFS}" /sbin/apk update || {
    echo "WARNING: apk update failed, retrying..."
    sleep 3
    chroot "${ROOTFS}" /sbin/apk update || {
        echo "WARNING: apk update still failed, trying once more..."
        sleep 5
        chroot "${ROOTFS}" /sbin/apk update || {
            echo "ERROR: Cannot update APK repositories"
            exit 1
        }
    }
}

echo "[4/8] Installing packages..."
mount --bind /dev "${ROOTFS}/dev"
mount --bind /proc "${ROOTFS}/proc"
mount --bind /sys "${ROOTFS}/sys"
mount --bind /dev/pts "${ROOTFS}/dev/pts"

cleanup() {
    echo "Cleaning up mounts..."
    umount -lf "${ROOTFS}/dev/pts" 2>/dev/null || true
    umount -lf "${ROOTFS}/dev" 2>/dev/null || true
    umount -lf "${ROOTFS}/proc" 2>/dev/null || true
    umount -lf "${ROOTFS}/sys" 2>/dev/null || true
}
trap cleanup EXIT

echo "  Installing linux-lts..."
chroot "${ROOTFS}" apk add --no-cache linux-lts linux-firmware-none || {
    echo "ERROR: Failed to install linux-lts"
    exit 1
}

echo "  Installing base utils..."
chroot "${ROOTFS}" apk add --no-cache e2fsprogs dosfstools openrc || {
    echo "ERROR: Failed to install base utils"
    exit 1
}

echo "  Installing graphics..."
chroot "${ROOTFS}" apk add --no-cache mesa-dri-gallium mesa-egl libdrm libinput-libs eudev seatd polkit || {
    echo "ERROR: Failed to install graphics"
    exit 1
}

echo "  Installing fonts..."
chroot "${ROOTFS}" apk add --no-cache font-noto font-noto-cjk || {
    echo "ERROR: Failed to install fonts"
    exit 1
}

echo "  Installing display stack..."
chroot "${ROOTFS}" apk add --no-cache cage cog wpewebkit libseat dbus || {
    echo "ERROR: Failed to install display stack"
    echo "Trying without cage/cog..."
    chroot "${ROOTFS}" apk add --no-cache wpewebkit libseat dbus
}

echo "[5/8] Configuring system..."
echo "coolspanos" > "${ROOTFS}/etc/hostname"

cat > "${ROOTFS}/etc/hosts" << 'EOF'
127.0.0.1   localhost
127.0.1.1   coolspanos
EOF

chroot "${ROOTFS}" rc-update add networking default 2>/dev/null || true
chroot "${ROOTFS}" rc-update add urandom default 2>/dev/null || true

echo "[6/8] Creating CoolSpanOS launch scripts..."
mkdir -p "${ROOTFS}/etc/init.d" "${ROOTFS}/usr/local/bin" "${ROOTFS}/usr/share/coolspanos" "${ROOTFS}/home/coolspan"

chroot "${ROOTFS}" adduser -D -s /bin/sh coolspan 2>/dev/null || true

echo "coolspan:coolspan" | chroot "${ROOTFS}" chpasswd 2>/dev/null || true

cp -r "${SCRIPT_DIR}/../dist/"* "${ROOTFS}/usr/share/coolspanos/"

cat > "${ROOTFS}/usr/local/bin/start-coolspanos" << 'EOF'
#!/bin/sh
export XDG_RUNTIME_DIR=/tmp/runtime-coolspan
export XDG_SESSION_TYPE=wayland
export WPE_BACKEND=wayland-egl
export GALLIUM_DRIVER=llvmpipe
export LIBGL_ALWAYS_SOFTWARE=1
export COG_PLATFORM_WL_VIEW_FULLSCREEN=1
export COG_PLATFORM_WL_VIEW_WIDTH=1920
export COG_PLATFORM_WL_VIEW_HEIGHT=1080

mkdir -p "$XDG_RUNTIME_DIR"
chmod 700 "$XDG_RUNTIME_DIR"

eval $(dbus-launch --sh-syntax) 2>/dev/null || true
seatd -g video &
export LIBSEAT_BACKEND=seatd

sleep 0.5

exec cage -- \
    cog --platform=wl \
    --enable-webgl \
    file:///usr/share/coolspanos/index.html
EOF
chmod +x "${ROOTFS}/usr/local/bin/start-coolspanos"

cat > "${ROOTFS}/etc/init.d/coolspanos" << 'EOF'
#!/sbin/openrc-run

depend() {
    need localmount
    after bootmisc
}

start() {
    ebegin "Starting CoolSpanOS Desktop"
    start-stop-daemon --background --start \
        --exec /usr/local/bin/start-coolspanos \
        --user coolspan
    eend $?
}

stop() {
    ebegin "Stopping CoolSpanOS Desktop"
    start-stop-daemon --stop --exec /usr/local/bin/start-coolspanos
    eend $?
}
EOF
chmod +x "${ROOTFS}/etc/init.d/coolspanos"
chroot "${ROOTFS}" rc-update add coolspanos default 2>/dev/null || true

echo "[7/8] Configuring bootloader..."
mkdir -p "${ROOTFS}/etc/mkinitfs/features.d"

cat > "${ROOTFS}/etc/mkinitfs/features.d/coolspanos.modules" << 'EOF'
kernel/drivers/gpu
kernel/drivers/video
kernel/drivers/hid
kernel/drivers/input
kernel/drivers/usb
kernel/drivers/ata
kernel/drivers/block
kernel/fs/ext4
kernel/fs/fat
kernel/fs/vfat
EOF

mkdir -p "${ROOTFS}/boot/grub"

# 生成 initramfs
echo "  Generating initramfs..."
chroot "${ROOTFS}" mkinitfs -o /boot/initramfs-lts $(ls "${ROOTFS}/lib/modules/" | head -1) || {
    echo "WARNING: Failed to generate initramfs"
}

cat > "${ROOTFS}/boot/grub/grub.cfg" << 'EOF'
set timeout=2
set default=0

menuentry "CoolSpanOS" {
    linux /boot/vmlinuz-lts root=/dev/sda2 rw quiet
    initrd /boot/initramfs-lts
}

menuentry "CoolSpanOS (Recovery)" {
    linux /boot/vmlinuz-lts root=/dev/sda2 rw single
    initrd /boot/initramfs-lts
}
EOF

echo "[8/8] Building ISO image..."
mkdir -p "${ISO_DIR}/boot/grub"

cp "${ROOTFS}/boot/vmlinuz-lts" "${ISO_DIR}/boot/vmlinuz" || {
    echo "ERROR: Missing vmlinuz"
    exit 1
}
cp "${ROOTFS}/boot/initramfs-lts" "${ISO_DIR}/boot/initramfs" 2>/dev/null || {
    echo "WARNING: Using fallback initramfs"
}

cp "${ROOTFS}/boot/grub/grub.cfg" "${ISO_DIR}/boot/grub/"

echo "  Creating ISO with grub-mkrescue..."
if command -v grub-mkrescue &> /dev/null; then
    grub-mkrescue -o "${BUILD_DIR}/CoolSpanOS.iso" \
        "${ISO_DIR}" \
        --modules="part_gpt part_msdos fat iso9660 zstd" \
        || {
        echo "ERROR: grub-mkrescue failed"
        exit 1
    }
else
    echo "ERROR: grub-mkrescue not available"
    exit 1
fi

# 复制到目标位置
echo "Copying to ${TARGET_DIR}..."
cp "${BUILD_DIR}/CoolSpanOS.iso" "${TARGET_DIR}/CoolSpanOS.iso"

echo ""
echo "=== CoolSpanOS Build Complete ==="
echo "ISO: ${TARGET_DIR}/CoolSpanOS.iso"
echo "Size: $(du -h "${TARGET_DIR}/CoolSpanOS.iso")"
echo ""
echo "To run:"
echo "  1. Write ISO to USB with Rufus/etcher"
echo "  2. Boot from USB in real machine or VM"
