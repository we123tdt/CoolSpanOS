import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useOSStore } from "@/store/useOSStore";

export function ActionCenter() {
  const open = useOSStore((s) => s.actionCenterOpen);
  const closeAllOverlays = useOSStore((s) => s.closeAllOverlays);
  const notifications = useOSStore((s) => s.notifications);

  const [now, setNow] = useState(new Date());
  useEffect(() => {
    if (!open) return;
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, [open]);

  if (!open) return null;

  const calendar = [
    { day: "一", date: 6, current: false },
    { day: "二", date: 7, current: false },
    { day: "三", date: 8, current: false },
    { day: "四", date: 9, current: false },
    { day: "五", date: 10, current: true },
    { day: "六", date: 11, current: false },
    { day: "日", date: 12, current: false },
  ];

  return (
    <div
      className="fixed inset-0 z-30"
      onMouseDown={closeAllOverlays}
    >
      <div
        className="absolute bottom-14 right-3 w-[380px] rounded-xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.55)] csos-acrylic-strong"
        onMouseDown={(e) => e.stopPropagation()}
        style={{ animation: "csos-fade-up-r 220ms cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        {/* 日历 */}
        <div className="border-b border-white/10 p-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="csos-text-primary text-[13px] font-semibold">
              {now.toLocaleDateString("zh-CN", {
                year: "numeric",
                month: "long",
              })}
            </h3>
            <button className="csos-dock-item" title="收起">
              <ChevronDown size={16} className="csos-text-secondary" />
            </button>
          </div>
          <div className="text-center">
            <div
              className="text-5xl font-light tracking-tighter csos-text-primary"
              style={{ fontFeatureSettings: '"tnum"' }}
            >
              {now.getDate()}
            </div>
            <div className="csos-text-secondary text-[12px]">
              {now.toLocaleDateString("zh-CN", {
                month: "long",
                day: "numeric",
                weekday: "long",
              })}
            </div>
          </div>
          <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[10px]">
            {calendar.map((d) => (
              <div
                key={d.date}
                className={`rounded-md py-1.5 csos-hover ${
                  d.current
                    ? "bg-[var(--csos-accent)] text-white"
                    : "csos-text-secondary"
                }`}
                style={{ fontFeatureSettings: '"tnum"' }}
              >
                <div className="opacity-70">{d.day}</div>
                <div className="text-[12px] font-medium">{d.date}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 通知 */}
        <div className="max-h-72 overflow-y-auto p-3">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="csos-text-primary text-[13px] font-semibold">通知</h3>
            <button className="csos-text-secondary text-[11px] csos-hover rounded px-2 py-0.5">
              全部清除
            </button>
          </div>
          <ul className="space-y-2">
            {notifications.map((n) => (
              <li
                key={n.id}
                className="rounded-md bg-white/5 p-3 ring-1 ring-white/5"
              >
                <div className="flex items-center justify-between">
                  <span className="csos-text-primary text-[12.5px] font-semibold">
                    {n.title}
                  </span>
                  <span className="csos-text-tertiary text-[10px]">{n.time}</span>
                </div>
                <p className="csos-text-secondary mt-1 text-[12px] leading-relaxed">
                  {n.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
