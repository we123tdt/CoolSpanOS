import { create } from "zustand";

export type AppId =
  | "explorer"
  | "browser"
  | "settings"
  | "store"
  | "terminal"
  | "about"
  | "mail"
  | "music"
  | "photos"
  | "calculator"
  | "calendar"
  | "notepad";

export interface AppDescriptor {
  id: AppId;
  name: string;
  iconKey: string; // lucide-react 图标名
  color: string; // 桌面 / 任务栏磁贴背景色
}

export interface WindowState {
  id: string;
  appId: AppId;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  minimized: boolean;
  maximized: boolean;
}

interface OSState {
  // 浮层
  startOpen: boolean;
  quickSettingsOpen: boolean;
  actionCenterOpen: boolean;
  contextMenuId: string | null;

  // 窗口
  windows: WindowState[];
  activeWindowId: string | null;
  topZ: number;

  // 系统
  volume: number;
  brightness: number;
  wifiOn: boolean;
  bluetoothOn: boolean;
  airplaneOn: boolean;
  nightLightOn: boolean;

  // 通知
  notifications: { id: string; title: string; body: string; time: string }[];

  // actions
  toggleStart: (force?: boolean) => void;
  toggleQuickSettings: (force?: boolean) => void;
  toggleActionCenter: (force?: boolean) => void;
  closeAllOverlays: () => void;

  openApp: (app: AppDescriptor) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  toggleMinimize: (id: string) => void;
  toggleMaximize: (id: string) => void;
  moveWindow: (id: string, x: number, y: number) => void;
  resizeWindow: (id: string, w: number, h: number) => void;

  setVolume: (v: number) => void;
  setBrightness: (v: number) => void;
  setWifiOn: (v: boolean) => void;
  setBluetoothOn: (v: boolean) => void;
  setAirplaneOn: (v: boolean) => void;
  setNightLightOn: (v: boolean) => void;
}

const APPS: Record<AppId, AppDescriptor> = {
  explorer: { id: "explorer", name: "文件资源管理器", iconKey: "Folder", color: "#f0c33c" },
  browser: { id: "browser", name: "Edge 浏览器", iconKey: "Globe", color: "#0078d4" },
  settings: { id: "settings", name: "设置", iconKey: "Settings", color: "#cccccc" },
  store: { id: "store", name: "应用商店", iconKey: "ShoppingBag", color: "#0078d4" },
  terminal: { id: "terminal", name: "终端", iconKey: "SquareTerminal", color: "#1f1f1f" },
  about: { id: "about", name: "关于 CoolSpanOS", iconKey: "Sparkles", color: "#7c4dff" },
  mail: { id: "mail", name: "邮件", iconKey: "Mail", color: "#0078d4" },
  music: { id: "music", name: "媒体播放器", iconKey: "Music2", color: "#e91e63" },
  photos: { id: "photos", name: "照片", iconKey: "Image", color: "#43a047" },
  calculator: { id: "calculator", name: "计算器", iconKey: "Calculator", color: "#607d8b" },
  calendar: { id: "calendar", name: "日历", iconKey: "Calendar", color: "#f44336" },
  notepad: { id: "notepad", name: "记事本", iconKey: "NotebookPen", color: "#ffb300" },
};

export const useOSStore = create<OSState>((set, get) => ({
  startOpen: false,
  quickSettingsOpen: false,
  actionCenterOpen: false,
  contextMenuId: null,

  windows: [],
  activeWindowId: null,
  topZ: 10,

  volume: 60,
  brightness: 80,
  wifiOn: true,
  bluetoothOn: true,
  airplaneOn: false,
  nightLightOn: false,

  notifications: [
    {
      id: "n1",
      title: "欢迎使用 CoolSpanOS",
      body: "这是一个仿 Windows 11 视觉风格的演示前端。",
      time: "刚刚",
    },
    {
      id: "n2",
      title: "系统更新",
      body: "CoolSpanOS 1.0.0 已就绪，正在准备新体验。",
      time: "5 分钟前",
    },
  ],

  toggleStart: (force) =>
    set((s) => ({
      startOpen: typeof force === "boolean" ? force : !s.startOpen,
      quickSettingsOpen: false,
      actionCenterOpen: false,
    })),
  toggleQuickSettings: (force) =>
    set((s) => ({
      quickSettingsOpen: typeof force === "boolean" ? force : !s.quickSettingsOpen,
      actionCenterOpen: false,
      startOpen: false,
    })),
  toggleActionCenter: (force) =>
    set((s) => ({
      actionCenterOpen: typeof force === "boolean" ? force : !s.actionCenterOpen,
      quickSettingsOpen: false,
      startOpen: false,
    })),
  closeAllOverlays: () =>
    set({ startOpen: false, quickSettingsOpen: false, actionCenterOpen: false }),

  openApp: (app) => {
    const { windows } = get();
    const existing = windows.find((w) => w.appId === app.id);
    if (existing) {
      set((s) => ({
        windows: s.windows.map((w) =>
          w.id === existing.id
            ? { ...w, minimized: false, zIndex: s.topZ + 1 }
            : w,
        ),
        activeWindowId: existing.id,
        topZ: s.topZ + 1,
        startOpen: false,
      }));
      return;
    }
    const id = `${app.id}-${Date.now()}`;
    const offset = windows.length * 28;
    const newW: WindowState = {
      id,
      appId: app.id,
      title: app.name,
      x: 160 + offset,
      y: 100 + offset,
      width: 880,
      height: 560,
      zIndex: get().topZ + 1,
      minimized: false,
      maximized: false,
    };
    set((s) => ({
      windows: [...s.windows, newW],
      activeWindowId: id,
      topZ: s.topZ + 1,
      startOpen: false,
    }));
  },

  closeWindow: (id) =>
    set((s) => ({
      windows: s.windows.filter((w) => w.id !== id),
      activeWindowId: s.activeWindowId === id ? null : s.activeWindowId,
    })),

  focusWindow: (id) =>
    set((s) => ({
      windows: s.windows.map((w) =>
        w.id === id ? { ...w, minimized: false, zIndex: s.topZ + 1 } : w,
      ),
      activeWindowId: id,
      topZ: s.topZ + 1,
    })),

  toggleMinimize: (id) =>
    set((s) => ({
      windows: s.windows.map((w) =>
        w.id === id
          ? { ...w, minimized: !w.minimized }
          : w,
      ),
      activeWindowId: s.activeWindowId === id && s.windows.find(w => w.id === id)?.minimized ? null : s.activeWindowId,
    })),

  toggleMaximize: (id) =>
    set((s) => ({
      windows: s.windows.map((w) =>
        w.id === id ? { ...w, maximized: !w.maximized } : w,
      ),
    })),

  moveWindow: (id, x, y) =>
    set((s) => ({
      windows: s.windows.map((w) => (w.id === id ? { ...w, x, y } : w)),
    })),

  resizeWindow: (id, width, height) =>
    set((s) => ({
      windows: s.windows.map((w) =>
        w.id === id ? { ...w, width, height } : w,
      ),
    })),

  setVolume: (v) => set({ volume: v }),
  setBrightness: (v) => set({ brightness: v }),
  setWifiOn: (v) => set({ wifiOn: v }),
  setBluetoothOn: (v) => set({ bluetoothOn: v }),
  setAirplaneOn: (v) => set({ airplaneOn: v }),
  setNightLightOn: (v) => set({ nightLightOn: v }),
}));

export { APPS };
export const PINNED_APPS: AppDescriptor[] = [
  APPS.explorer,
  APPS.browser,
  APPS.store,
  APPS.mail,
  APPS.calendar,
  APPS.notepad,
  APPS.photos,
  APPS.settings,
  APPS.terminal,
  APPS.calculator,
  APPS.music,
  APPS.about,
];
