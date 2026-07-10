import { useOSStore, PINNED_APPS } from "@/store/useOSStore";
import { ICON_MAP } from "@/lib/icons";
import { Wallpaper } from "./Wallpaper";

export function Desktop() {
  const openApp = useOSStore((s) => s.openApp);
  const closeAllOverlays = useOSStore((s) => s.closeAllOverlays);
  const focusWindow = useOSStore((s) => s.focusWindow);
  const activeWindowId = useOSStore((s) => s.activeWindowId);
  const windows = useOSStore((s) => s.windows);

  return (
    <div
      className="absolute inset-0 select-none"
      onMouseDown={() => {
        // 点击空白桌面：取消激活窗口焦点
        if (activeWindowId) focusWindow(activeWindowId);
        closeAllOverlays();
      }}
    >
      <Wallpaper />
      {/* 桌面图标网格 */}
      <div className="relative z-10 grid h-full w-full grid-flow-col auto-cols-[96px] grid-rows-[96px] gap-1 p-3">
        {PINNED_APPS.slice(0, 8).map((app) => {
          const Icon = ICON_MAP[app.iconKey];
          return (
            <button
              key={app.id}
              onDoubleClick={(e) => {
                e.stopPropagation();
                openApp(app);
              }}
              onClick={(e) => e.stopPropagation()}
              className="csos-hover group flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-md text-white"
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-xl shadow-md ring-1 ring-white/10"
                style={{ background: app.color }}
              >
                {Icon && <Icon size={26} strokeWidth={1.6} className="text-white drop-shadow" />}
              </span>
              <span className="px-1 text-[11px] font-medium leading-none tracking-wide csos-text-primary group-hover:bg-white/10 rounded">
                {app.name}
              </span>
            </button>
          );
        })}
      </div>
      <div className="absolute bottom-24 right-6 z-10 text-right">
        <p className="csos-text-primary/90 text-3xl font-semibold tracking-tight">
          CoolSpanOS
        </p>
        <p className="csos-text-secondary text-sm">
          仿 Windows 11 视觉风格 · 双击图标打开应用
        </p>
      </div>
      {/* 当前打开的窗口数量提示 */}
      {windows.length > 0 && (
        <div className="absolute left-1/2 top-3 z-10 -translate-x-1/2 rounded-full bg-black/40 px-3 py-1 text-[11px] csos-text-secondary backdrop-blur-md">
          {windows.length} 个窗口运行中
        </div>
      )}
    </div>
  );
}
