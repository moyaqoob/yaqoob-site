const SIZE = 64;
const FPS = 12;

// Browsers don't animate PNG/SVG tab icons, so redraw the portrait on a
// canvas each frame and swap the <link rel="icon"> href.
export function startAnimatedFavicon(src = '/favicon.png'): () => void {
  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.type = 'image/png';

  const img = new Image();
  let timer: number | undefined;
  let t0 = 0;

  const draw = (now: number) => {
    const t = (now - t0) / 1000;
    const c = SIZE / 2;
    const breathe = 1 + Math.sin(t * 2.2) * 0.025;
    const ring = 3;
    const r = c - ring - 1;

    ctx.clearRect(0, 0, SIZE, SIZE);

    // portrait, clipped to a circle, gently breathing
    ctx.save();
    ctx.beginPath();
    ctx.arc(c, c, r, 0, Math.PI * 2);
    ctx.clip();
    const d = r * 2 * breathe;
    ctx.drawImage(img, c - d / 2, c - d / 2, d, d);
    ctx.restore();

    // rotating glow ring
    const g = ctx.createConicGradient(t * 2.4, c, c);
    g.addColorStop(0, 'rgba(96,165,250,1)');
    g.addColorStop(0.35, 'rgba(96,165,250,0.08)');
    g.addColorStop(0.7, 'rgba(34,211,238,0.5)');
    g.addColorStop(1, 'rgba(96,165,250,1)');
    ctx.lineWidth = ring;
    ctx.strokeStyle = g;
    ctx.shadowColor = 'rgba(96,165,250,0.8)';
    ctx.shadowBlur = 3;
    ctx.beginPath();
    ctx.arc(c, c, r + ring / 2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0;

    link!.href = canvas.toDataURL('image/png');
  };

  const start = () => {
    if (timer !== undefined || document.hidden) return;
    t0 = performance.now();
    timer = window.setInterval(() => draw(performance.now()), 1000 / FPS);
  };
  const stop = () => {
    if (timer !== undefined) window.clearInterval(timer);
    timer = undefined;
  };
  const onVisibility = () => (document.hidden ? stop() : start());

  img.onload = () => {
    document.addEventListener('visibilitychange', onVisibility);
    start();
  };
  img.src = src;

  return () => {
    stop();
    document.removeEventListener('visibilitychange', onVisibility);
  };
}
