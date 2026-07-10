import { useMemo } from "react";
import { Search, Power, User, ChevronRight } from "lucide-react";
import { useOSStore, PINNED_APPS, APPS, type AppId } from "@/store/useOSStore";
import { ICON_MAP } from "@/lib/icons";

const RECOMMENDED = [
  { name: "项目说明.md", desc: "CoolSpanOS · 核心特性概述", color: "#0078d4" },
  { name: "设计草图.fig", desc: "Fluent 2 设计语言", color: "#a259ff" },
  { name: "会议纪要.docx", desc: "今天 14:00 · Q3 路线图", color: "#43a047" },
  { name: "截图.png", desc: "刚才 · 桌面定制方案", color: "#f44336" },
  { name: "CoolSpan.exe", desc: "昨天 · 启动器 v1.0", color: "#ffb300" },
  { name: "日志.log", desc: "今天 09:21", color: "#607d8b" },
];

export function StartMenu() {
  const startOpen = useOSStore((s) => s.startOpen);
  const openApp = useOSStore((s) => s.openApp);
  const closeAllOverlays = useOSStore((s) => s.closeAllOverlays);

  const featured = useMemo(() => PINNED_APPS.slice(0, 12), []);

  if (!startOpen) return null;

  return (
    <div
      className="fixed inset-0 z-30"
      onMouseDown={closeAllOverlays}
      aria-hidden={!startOpen}
    >
      <div
        className="absolute bottom-14 left-1/2 w-[640px] -translate-x-1/2 rounded-xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.55)] csos-acrylic-strong"
        onMouseDown={(e) => e.stopPropagation()}
        style={{
          animation: "csos-fade-up 220ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* 搜索框 */}
        <div className="px-5 pt-5">
          <div className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 csos-hover">
            <Search size={16} className="csos-text-secondary" />
            <input
              autoFocus
              type="text"
              placeholder="键入以搜索应用、设置和文档"
              className="flex-1 bg-transparent text-[13px] csos-text-primary outline-none placeholder:text-white/45"
            />
          </div>
        </div>

        {/* 固定应用 */}
        <div className="px-5 pt-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="csos-text-primary text-[13px] font-semibold tracking-wide">
              固定
            </h3>
            <button className="csos-text-secondary text-[12px] csos-hover rounded px-2 py-0.5">
              全部应用 ›
            </button>
          </div>
          <div className="grid grid-cols-6 gap-1 pb-2">
            {featured.map((app) => {
              const Icon = ICON_MAP[app.iconKey];
              return (
                <button
                  key={app.id}
                  onClick={() => openApp(app)}
                  className="group flex flex-col items-center gap-1 rounded-md p-2 csos-hover"
                >
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-md shadow ring-1 ring-white/10"
                    style={{ background: app.color }}
                  >
                    {Icon && <Icon size={18} strokeWidth={1.6} className="text-white" />}
                  </span>
                  <span className="csos-text-primary text-[11px] leading-tight">
                    {app.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 推荐 */}
        <div className="px-5 pb-3 pt-2">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="csos-text-primary text-[13px] font-semibold tracking-wide">
              推荐
            </h3>
            <button className="csos-text-secondary text-[12px] csos-hover rounded px-2 py-0.5">
              更多 ›
            </button>
          </div>
          <div className="grid grid-cols-2 gap-1">
            {RECOMMENDED.map((r, idx) => (
              <button
                key={idx}
                onClick={() => openApp(APPS.notepad)}
                className="flex items-center gap-3 rounded-md p-2 csos-hover text-left"
              >
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-md ring-1 ring-white/10"
                  style={{ background: r.color }}
                >
                  <span className="text-[10px] font-bold text-white">C</span>
                </span>
                <div className="min-w-0 flex-1">
                  <div className="csos-text-primary truncate text-[12px] font-medium">
                    {r.name}
                  </div>
                  <div className="csos-text-secondary truncate text-[11px]">
                    {r.desc}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 底栏：用户 + 电源 */}
        <div className="flex items-center justify-between border-t border-white/10 px-3 py-2">
          <button className="flex items-center gap-2 rounded-md px-2 py-1 csos-hover">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <User size={14} />
            </span>
            <span className="csos-text-primary text-[12px] font-medium">访客</span>
          </button>
          <div className="flex items-center gap-1">
            <button
              className="csos-dock-item"
              title="文档"
            >
              <ChevronRight size={18} className="csos-text-secondary" />
            </button>
            <button
              className="csos-dock-item"
              title="电源"
            >
              <Power size={16} className="csos-text-secondary" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
