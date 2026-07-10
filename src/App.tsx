import { useEffect } from "react";
import { Desktop } from "@/components/Desktop/Desktop";
import { Taskbar } from "@/components/Taskbar/Taskbar";
import { StartMenu } from "@/components/StartMenu/StartMenu";
import { WindowView } from "@/components/Window/Window";
import { QuickSettings } from "@/components/QuickSettings/QuickSettings";
import { ActionCenter } from "@/components/ActionCenter/ActionCenter";
import { useOSStore } from "@/store/useOSStore";

export default function App() {
  const windows = useOSStore((s) => s.windows);
  const closeAllOverlays = useOSStore((s) => s.closeAllOverlays);
  const toggleStart = useOSStore((s) => s.toggleStart);
  const startOpen = useOSStore((s) => s.startOpen);

  // 全局快捷键：Win/Super 打开开始菜单，Esc 关闭浮层
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAllOverlays();
      if (e.key === "Meta" || e.key === "OS") {
        e.preventDefault();
        toggleStart();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeAllOverlays, toggleStart]);

  return (
    <div className="relative h-screen w-screen overflow-hidden text-white">
      <Desktop />

      {/* 窗口层 */}
      <div className="pointer-events-none absolute inset-0 z-20">
        <div className="pointer-events-auto absolute inset-0">
          {windows.map((w) => (
            <WindowView key={w.id} win={w} />
          ))}
        </div>
      </div>

      {/* 浮层（开始菜单 / 快速设置 / 通知中心） */}
      <StartMenu />
      <QuickSettings />
      <ActionCenter />

      {/* 任务栏：仅在开始菜单未打开时允许点击穿透桌面 */}
      <div
        className="z-40"
        style={{ pointerEvents: startOpen ? "none" : "auto" }}
      >
        <Taskbar />
      </div>
    </div>
  );
}
