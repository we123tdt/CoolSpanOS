import { useEffect, useRef } from "react";

/**
 * 动态壁纸：多层径向渐变 + 缓慢位移 + 噪点纹理
 * 模仿 Windows 11 的 Bloom 桌面背景
 */
export function Wallpaper() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const node = ref.current;
    if (!node) return;

    const layer1 = node.querySelector<HTMLDivElement>(".wp-layer-1");
    const layer2 = node.querySelector<HTMLDivElement>(".wp-layer-2");
    const layer3 = node.querySelector<HTMLDivElement>(".wp-layer-3");

    const tick = (now: number) => {
      const t = (now - start) / 1000;
      if (layer1) {
        layer1.style.transform = `translate3d(${Math.sin(t * 0.18) * 30}px, ${
          Math.cos(t * 0.12) * 22
        }px, 0) scale(1.08)`;
      }
      if (layer2) {
        layer2.style.transform = `translate3d(${Math.cos(t * 0.14) * -24}px, ${
          Math.sin(t * 0.1) * 18
        }px, 0) scale(1.1)`;
      }
      if (layer3) {
        layer3.style.opacity = (0.32 + Math.sin(t * 0.4) * 0.05).toFixed(3);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {/* 底层深色 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 20% 10%, #1b2440 0%, #0a0e1f 45%, #05060e 100%)",
        }}
      />
      {/* 蓝色光晕 1 */}
      <div
        className="wp-layer-1 absolute -left-32 -top-40 h-[60vh] w-[60vw] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(0, 120, 212, 0.55), rgba(0, 120, 212, 0))",
          filter: "blur(10px)",
          willChange: "transform",
        }}
      />
      {/* 紫色光晕 2 */}
      <div
        className="wp-layer-2 absolute -right-40 top-1/4 h-[55vh] w-[55vw] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(124, 77, 255, 0.45), rgba(124, 77, 255, 0))",
          filter: "blur(8px)",
          willChange: "transform",
        }}
      />
      {/* 青色光晕 3 */}
      <div
        className="wp-layer-3 absolute bottom-[-20vh] left-1/3 h-[55vh] w-[70vw] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(0, 188, 212, 0.4), rgba(0, 188, 212, 0))",
          filter: "blur(6px)",
          willChange: "opacity",
        }}
      />
      {/* 噪点纹理 */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.07] mix-blend-overlay">
        <filter id="csos-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#csos-noise)" />
      </svg>
    </div>
  );
}
