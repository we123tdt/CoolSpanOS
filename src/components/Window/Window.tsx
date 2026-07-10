import { useEffect, useRef, useState } from "react";
import { Minus, Square, X, Copy, Maximize2 } from "lucide-react";
import { useOSStore, type WindowState, APPS } from "@/store/useOSStore";
import { ICON_MAP } from "@/lib/icons";

const MIN_WIDTH = 480;
const MIN_HEIGHT = 320;

function WindowBody({ appId }: { appId: WindowState["appId"] }) {
  const app = APPS[appId];
  const Icon = ICON_MAP[app.iconKey];
  return (
    <div className="flex h-full flex-col">
      {/* 标题区 */}
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-md ring-1 ring-white/10"
          style={{ background: app.color }}
        >
          {Icon && <Icon size={22} strokeWidth={1.6} className="text-white" />}
        </span>
        <div>
          <h2 className="csos-text-primary text-base font-semibold">
            {app.name}
          </h2>
          <p className="csos-text-secondary text-[12px]">
            CoolSpanOS 演示应用 · {appId}
          </p>
        </div>
      </div>
      {/* 主体内容 - 因应用不同而异 */}
      <div className="flex-1 overflow-auto px-5 py-4 text-[13px] csos-text-primary">
        {appId === "explorer" && <ExplorerBody />}
        {appId === "browser" && <BrowserBody />}
        {appId === "settings" && <SettingsBody />}
        {appId === "terminal" && <TerminalBody />}
        {appId === "calculator" && <CalculatorBody />}
        {appId === "notepad" && <NotepadBody />}
        {appId === "about" && <AboutBody />}
        {(appId === "store" ||
          appId === "mail" ||
          appId === "music" ||
          appId === "photos" ||
          appId === "calendar") && <GenericBody name={app.name} />}
      </div>
    </div>
  );
}

function ExplorerBody() {
  const folders = [
    { name: "桌面", count: 12 },
    { name: "下载", count: 86 },
    { name: "文档", count: 24 },
    { name: "图片", count: 137 },
    { name: "音乐", count: 9 },
    { name: "视频", count: 4 },
  ];
  return (
    <div className="space-y-2">
      <p className="csos-text-secondary">常用位置</p>
      <ul className="grid grid-cols-3 gap-2">
        {folders.map((f) => (
          <li
            key={f.name}
            className="flex items-center justify-between rounded-md bg-white/5 px-3 py-2 ring-1 ring-white/5"
          >
            <span className="csos-text-primary text-[12px] font-medium">{f.name}</span>
            <span className="csos-text-tertiary text-[11px]">{f.count} 项</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BrowserBody() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 ring-1 ring-white/10">
        <span className="csos-text-tertiary text-[11px]">https://</span>
        <span className="csos-text-primary text-[12px]">coolspanos.local/welcome</span>
      </div>
      <h1 className="csos-text-primary text-2xl font-semibold tracking-tight">
        欢迎来到 CoolSpanOS
      </h1>
      <p className="csos-text-secondary leading-relaxed">
        基于 React 18 + Tailwind 构建的仿 Windows 11
        视觉风格前端原型。亚克力材质、动态壁纸、居中任务栏、可拖拽窗口，所有元素都启用了亚像素级字体平滑。
      </p>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {["性能", "设计语言", "快捷键"].map((t) => (
          <div
            key={t}
            className="rounded-md bg-white/5 p-3 ring-1 ring-white/5"
          >
            <p className="csos-text-primary text-[12px] font-medium">{t}</p>
            <p className="csos-text-secondary mt-1 text-[11px]">
              探索 CoolSpanOS 提供的现代桌面体验。
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsBody() {
  return (
    <div className="space-y-2">
      {[
        { k: "系统", v: "CoolSpanOS 1.0.0" },
        { k: "个性化", v: "深色 · Fluent 2" },
        { k: "显示", v: "亚克力 + Mica" },
        { k: "声音", v: "默认输出" },
        { k: "网络和 Internet", v: "已连接" },
        { k: "辅助功能", v: "已优化" },
      ].map((row) => (
        <div
          key={row.k}
          className="flex items-center justify-between rounded-md bg-white/5 px-3 py-2 ring-1 ring-white/5"
        >
          <span className="csos-text-primary text-[12px]">{row.k}</span>
          <span className="csos-text-secondary text-[12px]">{row.v}</span>
        </div>
      ))}
    </div>
  );
}

function TerminalBody() {
  const lines = [
    "CoolSpanOS Terminal [版本 1.0.0]",
    "(c) CoolSpanOS. 保留所有权利。",
    "",
    "C:\\Users\\Guest> ver",
    "",
    "CoolSpanOS [版本 10.0.22631.0]",
    "",
    "C:\\Users\\Guest> _",
  ];
  return (
    <pre
      className="rounded-md bg-black/60 p-4 text-[12.5px] leading-relaxed text-emerald-200 ring-1 ring-white/10"
      style={{ fontFamily: "var(--csos-font-mono)" }}
    >
      {lines.join("\n")}
    </pre>
  );
}

function CalculatorBody() {
  const [display, setDisplay] = useState("0");
  const keys = [
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"],
  ];
  return (
    <div className="space-y-2">
      <div
        className="rounded-md bg-black/40 px-3 py-4 text-right text-2xl font-light tracking-wider csos-text-primary ring-1 ring-white/10"
        style={{ fontFeatureSettings: '"tnum"' }}
      >
        {display}
      </div>
      <div className="grid grid-cols-4 gap-1">
        {keys.flat().map((k) => (
          <button
            key={k}
            onClick={() =>
              setDisplay((d) =>
                d === "0" && !"+-*/.".includes(k) ? k : d + k,
              )
            }
            className="rounded-md bg-white/5 py-3 text-[14px] csos-text-primary csos-hover"
          >
            {k}
          </button>
        ))}
      </div>
    </div>
  );
}

function NotepadBody() {
  return (
    <textarea
      defaultValue={`CoolSpanOS 记事本

这是一个仿 Windows 11 视觉风格的演示应用。
所有文本都启用了亚像素级字体平滑渲染。
`}
      className="h-full w-full resize-none rounded-md bg-white/5 p-3 text-[13px] csos-text-primary outline-none ring-1 ring-white/10"
    />
  );
}

function AboutBody() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-2xl font-bold text-white shadow-lg">
          C
        </div>
        <div>
          <h3 className="csos-text-primary text-lg font-semibold">CoolSpanOS</h3>
          <p className="csos-text-secondary text-[12px]">版本 1.0.0 · 内部版本 22631</p>
        </div>
      </div>
      <ul className="space-y-1.5 text-[12.5px]">
        <li className="flex justify-between"><span className="csos-text-secondary">设备名称</span><span>DESKTOP-COOLSPAN</span></li>
        <li className="flex justify-between"><span className="csos-text-secondary">处理器</span><span>CoolSpan M3 · 12 核</span></li>
        <li className="flex justify-between"><span className="csos-text-secondary">已安装内存</span><span>32.0 GB</span></li>
        <li className="flex justify-between"><span className="csos-text-secondary">系统类型</span><span>64 位 · 基于 React 的 OS</span></li>
        <li className="flex justify-between"><span className="csos-text-secondary">笔和触摸</span><span>支持 10 点触控</span></li>
      </ul>
    </div>
  );
}

function GenericBody({ name }: { name: string }) {
  return (
    <div className="space-y-2">
      <h3 className="csos-text-primary text-base font-semibold">{name}</h3>
      <p className="csos-text-secondary text-[13px]">
        这是 CoolSpanOS 中的「{name}」演示界面。可以基于实际需求在此处扩展为完整的应用体验。
      </p>
      <div className="grid grid-cols-2 gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-20 rounded-md bg-gradient-to-br from-white/10 to-white/0 ring-1 ring-white/10"
          />
        ))}
      </div>
    </div>
  );
}

export function WindowView({ win }: { win: WindowState }) {
  const focusWindow = useOSStore((s) => s.focusWindow);
  const closeWindow = useOSStore((s) => s.closeWindow);
  const toggleMinimize = useOSStore((s) => s.toggleMinimize);
  const toggleMaximize = useOSStore((s) => s.toggleMaximize);
  const moveWindow = useOSStore((s) => s.moveWindow);
  const activeWindowId = useOSStore((s) => s.activeWindowId);
  const isActive = activeWindowId === win.id;

  const dragState = useRef<{
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  } | null>(null);

  const onTitleDown = (e: React.PointerEvent) => {
    if (win.maximized) return;
    focusWindow(win.id);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragState.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: win.x,
      origY: win.y,
    };
  };
  const onTitleMove = (e: React.PointerEvent) => {
    if (!dragState.current) return;
    const { startX, startY, origX, origY } = dragState.current;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    const x = Math.max(-win.width + 80, origX + dx);
    const y = Math.max(0, origY + dy);
    moveWindow(win.id, x, y);
  };
  const onTitleUp = (e: React.PointerEvent) => {
    dragState.current = null;
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
  };

  // 启动入场动画
  const [appeared, setAppeared] = useState(false);
  useEffect(() => {
    const r = requestAnimationFrame(() => setAppeared(true));
    return () => cancelAnimationFrame(r);
  }, []);

  if (win.minimized) return null;

  const style: React.CSSProperties = win.maximized
    ? {
        left: 0,
        top: 0,
        width: "100vw",
        height: "calc(100vh - 64px)",
        zIndex: win.zIndex,
        borderRadius: 0,
      }
    : {
        left: win.x,
        top: win.y,
        width: win.width,
        height: win.height,
        zIndex: win.zIndex,
      };

  return (
    <div
      style={{
        ...style,
        opacity: appeared ? 1 : 0,
        transform: appeared
          ? "scale(1)"
          : win.maximized
          ? "scale(1.005)"
          : "scale(0.97)",
        transition:
          "opacity 180ms cubic-bezier(0.16, 1, 0.3, 1), transform 180ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className="absolute csos-acrylic-strong shadow-[0_20px_60px_rgba(0,0,0,0.55)] ring-1 ring-white/10"
      onMouseDown={() => focusWindow(win.id)}
    >
      <div
        onPointerDown={onTitleDown}
        onPointerMove={onTitleMove}
        onPointerUp={onTitleUp}
        onPointerCancel={onTitleUp}
        onDoubleClick={() => toggleMaximize(win.id)}
        className={`flex h-9 cursor-grab items-center justify-between px-3 ${
          isActive ? "" : "opacity-90"
        } select-none`}
        style={{
          background: isActive
            ? "rgba(40, 40, 45, 0.6)"
            : "rgba(20, 20, 22, 0.4)",
        }}
      >
        <span className="csos-text-primary text-[12px] font-medium tracking-wide">
          {win.title}
        </span>
        <div className="flex items-center" onPointerDown={(e) => e.stopPropagation()}>
          <button
            onClick={() => toggleMinimize(win.id)}
            className="flex h-9 w-10 items-center justify-center csos-hover"
            aria-label="最小化"
            title="最小化"
          >
            <Minus size={14} className="csos-text-primary" />
          </button>
          <button
            onClick={() => toggleMaximize(win.id)}
            className="flex h-9 w-10 items-center justify-center csos-hover"
            aria-label="最大化"
            title="最大化"
          >
            {win.maximized ? (
              <Copy size={12} className="csos-text-primary" />
            ) : (
              <Square size={12} className="csos-text-primary" />
            )}
          </button>
          <button
            onClick={() => closeWindow(win.id)}
            className="flex h-9 w-10 items-center justify-center csos-hover hover:bg-red-500/80"
            aria-label="关闭"
            title="关闭"
          >
            <X size={14} className="csos-text-primary" />
          </button>
        </div>
      </div>
      <div
        className="h-[calc(100%-2.25rem)]"
        style={{ minHeight: MIN_HEIGHT - 36 }}
      >
        <WindowBody appId={win.appId} />
      </div>
    </div>
  );
}
