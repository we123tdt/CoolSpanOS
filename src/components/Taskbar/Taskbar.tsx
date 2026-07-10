import { useEffect, useState } from "react";
import {
  Search,
  LayoutGrid,
  ChevronUp,
  Wifi,
  WifiOff,
  Volume2,
  BatteryFull,
} from "lucide-react";
import { useOSStore, PINNED_APPS, APPS } from "@/store/useOSStore";
import { ICON_MAP } from "@/lib/icons";

function Clock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const hh = time.getHours().toString().padStart(2, "0");
  const mm = time.getMinutes().toString().padStart(2, "0");
  return (
    <div className="flex flex-col items-end leading-tight">
      <span className="csos-text-primary text-[12px] font-medium tracking-wide">
        {hh}:{mm}
      </span>
      <span className="csos-text-secondary text-[11px]">
        {`${time.getFullYear()}/${(time.getMonth() + 1)
          .toString()
          .padStart(2, "0")}/${time.getDate().toString().padStart(2, "0")}`}
      </span>
    </div>
  );
}

export function Taskbar() {
  const startOpen = useOSStore((s) => s.startOpen);
  const toggleStart = useOSStore((s) => s.toggleStart);
  const toggleActionCenter = useOSStore((s) => s.toggleActionCenter);
  const toggleQuickSettings = useOSStore((s) => s.toggleQuickSettings);
  const windows = useOSStore((s) => s.windows);
  const openApp = useOSStore((s) => s.openApp);
  const focusWindow = useOSStore((s) => s.focusWindow);
  const toggleMinimize = useOSStore((s) => s.toggleMinimize);
  const activeWindowId = useOSStore((s) => s.activeWindowId);
  const wifiOn = useOSStore((s) => s.wifiOn);

  // 任务栏左侧：搜索按钮
  // 任务栏中央：固定应用 + 已打开窗口
  // 任务栏右侧：系统托盘
  const runningAppIds = new Set(windows.map((w) => w.appId));
  const dockApps = PINNED_APPS.filter((a) => a.id !== "about").slice(0, 6);

  const handleDockClick = (appId: string) => {
    const app = APPS[appId as keyof typeof APPS];
    const existing = windows.find((w) => w.appId === appId);
    if (existing) {
      if (existing.minimized) {
        focusWindow(existing.id);
      } else if (activeWindowId === existing.id) {
        toggleMinimize(existing.id);
      } else {
        focusWindow(existing.id);
      }
    } else {
      openApp(app);
    }
  };

  return (
    <div
      className="pointer-events-auto fixed inset-x-0 bottom-0 z-40 flex justify-center pb-2"
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div className="csos-acrylic flex items-center gap-1 rounded-xl px-2 py-1 shadow-[0_8px_28px_rgba(0,0,0,0.35)] ring-1 ring-white/10">
        {/* 搜索 */}
        <button
          className="csos-dock-item"
          title="搜索"
          aria-label="搜索"
        >
          <Search size={20} strokeWidth={1.6} />
        </button>

        {/* 任务视图 */}
        <button className="csos-dock-item" title="任务视图" aria-label="任务视图">
          <LayoutGrid size={20} strokeWidth={1.6} />
        </button>

        <div className="mx-1 h-6 w-px bg-white/10" />

        {/* 中央应用区 */}
        {dockApps.map((app) => {
          const Icon = ICON_MAP[app.iconKey];
          const isRunning = runningAppIds.has(app.id);
          const isActive = windows.some(
            (w) => w.appId === app.id && w.id === activeWindowId && !w.minimized,
          );
          return (
            <button
              key={app.id}
              onClick={() => handleDockClick(app.id)}
              className="csos-dock-item"
              data-active={isRunning || isActive}
              title={app.name}
              aria-label={app.name}
            >
              {Icon && <Icon size={20} strokeWidth={1.6} />}
            </button>
          );
        })}

        <div className="mx-1 h-6 w-px bg-white/10" />

        {/* 开始按钮（实际在 dock 中右侧）*/}
        <button
          onClick={() => toggleStart()}
          data-active={startOpen}
          className="csos-dock-item"
          title="开始"
          aria-label="开始"
        >
          <ChevronUp size={20} strokeWidth={1.8} className="text-white" />
        </button>

        {/* 系统托盘 */}
        <button
          onClick={() => toggleQuickSettings()}
          className="ml-1 flex items-center gap-2 rounded-md px-2 py-1 csos-hover"
          title="快速设置"
        >
          {wifiOn ? (
            <Wifi size={16} strokeWidth={1.6} />
          ) : (
            <WifiOff size={16} strokeWidth={1.6} />
          )}
          <Volume2 size={16} strokeWidth={1.6} />
          <BatteryFull size={16} strokeWidth={1.6} />
        </button>
        <button
          onClick={() => toggleActionCenter()}
          className="rounded-md px-2 py-1 csos-hover"
          title="通知中心"
          aria-label="通知中心"
        >
          <Clock />
        </button>
      </div>
    </div>
  );
}
