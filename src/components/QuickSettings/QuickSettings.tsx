import {
  Wifi,
  WifiOff,
  Bluetooth,
  BluetoothOff,
  Plane,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  ChevronUp,
  Settings as SettingsIcon,
  Power,
  Accessibility,
} from "lucide-react";
import { useOSStore, APPS } from "@/store/useOSStore";

export function QuickSettings() {
  const open = useOSStore((s) => s.quickSettingsOpen);
  const closeAllOverlays = useOSStore((s) => s.closeAllOverlays);
  const volume = useOSStore((s) => s.volume);
  const brightness = useOSStore((s) => s.brightness);
  const wifiOn = useOSStore((s) => s.wifiOn);
  const bluetoothOn = useOSStore((s) => s.bluetoothOn);
  const airplaneOn = useOSStore((s) => s.airplaneOn);
  const nightLightOn = useOSStore((s) => s.nightLightOn);
  const setVolume = useOSStore((s) => s.setVolume);
  const setBrightness = useOSStore((s) => s.setBrightness);
  const setWifiOn = useOSStore((s) => s.setWifiOn);
  const setBluetoothOn = useOSStore((s) => s.setBluetoothOn);
  const setAirplaneOn = useOSStore((s) => s.setAirplaneOn);
  const setNightLightOn = useOSStore((s) => s.setNightLightOn);
  const openApp = useOSStore((s) => s.openApp);

  if (!open) return null;

  const Tile = ({
    active,
    onClick,
    icon,
    label,
  }: {
    active?: boolean;
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
  }) => (
    <button
      onClick={onClick}
      className={`flex h-14 w-14 flex-col items-center justify-center gap-1 rounded-md ring-1 transition-all duration-150 csos-hover ${
        active
          ? "bg-[var(--csos-accent)]/85 ring-[var(--csos-accent)]/40 text-white"
          : "bg-white/5 ring-white/10 csos-text-primary"
      }`}
    >
      {icon}
      <span className="text-[10px] font-medium leading-none">{label}</span>
    </button>
  );

  return (
    <div
      className="fixed inset-0 z-30"
      onMouseDown={closeAllOverlays}
    >
      <div
        className="absolute bottom-14 right-3 w-[360px] rounded-xl border border-white/10 p-3 shadow-[0_20px_60px_rgba(0,0,0,0.55)] csos-acrylic-strong"
        onMouseDown={(e) => e.stopPropagation()}
        style={{ animation: "csos-fade-up-r 200ms cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        {/* 滑块区 */}
        <div className="mb-3 space-y-2 rounded-md bg-white/5 p-3">
          <div className="flex items-center gap-3">
            {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(e) => setVolume(parseInt(e.target.value))}
              className="csos-slider flex-1"
              style={{ accentColor: "var(--csos-accent)" }}
            />
            <span
              className="w-9 text-right text-[11px] csos-text-secondary"
              style={{ fontFeatureSettings: '"tnum"' }}
            >
              {volume}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Sun size={16} />
            <input
              type="range"
              min={10}
              max={100}
              value={brightness}
              onChange={(e) => setBrightness(parseInt(e.target.value))}
              className="flex-1"
              style={{ accentColor: "var(--csos-accent)" }}
            />
            <span
              className="w-9 text-right text-[11px] csos-text-secondary"
              style={{ fontFeatureSettings: '"tnum"' }}
            >
              {brightness}
            </span>
          </div>
        </div>

        {/* 开关网格 */}
        <div className="grid grid-cols-3 gap-2">
          <Tile
            active={wifiOn}
            onClick={() => setWifiOn(!wifiOn)}
            icon={wifiOn ? <Wifi size={18} /> : <WifiOff size={18} />}
            label="Wi-Fi"
          />
          <Tile
            active={bluetoothOn}
            onClick={() => setBluetoothOn(!bluetoothOn)}
            icon={bluetoothOn ? <Bluetooth size={18} /> : <BluetoothOff size={18} />}
            label="蓝牙"
          />
          <Tile
            active={airplaneOn}
            onClick={() => setAirplaneOn(!airplaneOn)}
            icon={<Plane size={18} />}
            label="飞行模式"
          />
          <Tile
            active={nightLightOn}
            onClick={() => setNightLightOn(!nightLightOn)}
            icon={nightLightOn ? <Moon size={18} /> : <Sun size={18} />}
            label="夜间模式"
          />
          <Tile
            active={false}
            onClick={() => {}}
            icon={<Accessibility size={18} />}
            label="辅助"
          />
          <Tile
            active={false}
            onClick={() => openApp(APPS.settings)}
            icon={<SettingsIcon size={18} />}
            label="设置"
          />
        </div>

        {/* 底部电量 + 电源 */}
        <div className="mt-3 flex items-center justify-between rounded-md bg-white/5 px-3 py-2 ring-1 ring-white/5">
          <div className="flex items-center gap-2 text-[12px] csos-text-primary">
            <span className="csos-text-secondary">电池</span>
            <span
              style={{ fontFeatureSettings: '"tnum"' }}
              className="font-semibold tracking-wide"
            >
              92%
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button className="csos-dock-item" title="电源">
              <Power size={16} className="csos-text-secondary" />
            </button>
            <button className="csos-dock-item" title="收起">
              <ChevronUp size={18} className="csos-text-secondary" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
