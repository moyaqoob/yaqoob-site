import { useEffect, useRef, type FC } from 'react';

const PolyhedronCanvas: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W: number, H: number;
    let mouse = { x: 0, y: 0 };
    let dragging = false;
    let lastMouse = { x: 0, y: 0 };
    let rotX = 0.3;
    let rotY = 0.5;
    let velX = 0;
    let velY = 0.003;
    let animId = 0;

    const phi = (1 + Math.sqrt(5)) / 2;
    const verts = (
      [
        [0, 1, phi],
        [0, -1, phi],
        [0, 1, -phi],
        [0, -1, -phi],
        [1, phi, 0],
        [-1, phi, 0],
        [1, -phi, 0],
        [-1, -phi, 0],
        [phi, 0, 1],
        [phi, 0, -1],
        [-phi, 0, 1],
        [-phi, 0, -1],
      ] as const
    ).map((v) => {
      const l = Math.hypot(...v);
      return v.map((x) => (x / l) * 0.72);
    });

    const edges: [number, number][] = [
      [0, 1], [0, 4], [0, 5], [0, 8], [0, 10],
      [1, 6], [1, 7], [1, 8], [1, 10],
      [2, 3], [2, 4], [2, 5], [2, 9], [2, 11],
      [3, 6], [3, 7], [3, 9], [3, 11],
      [4, 5], [4, 8], [4, 9],
      [5, 10], [5, 11],
      [6, 7], [6, 8], [6, 9],
      [7, 10], [7, 11],
      [8, 9], [10, 11],
    ];

    function rotateVert(v: number[], rx: number, ry: number) {
      let [x, y, z] = v;
      let y2 = y * Math.cos(rx) - z * Math.sin(rx);
      let z2 = y * Math.sin(rx) + z * Math.cos(rx);
      let x3 = x * Math.cos(ry) + z2 * Math.sin(ry);
      let z3 = -x * Math.sin(ry) + z2 * Math.cos(ry);
      return [x3, y2, z3];
    }

    function project(v: number[]) {
      const [x, y, z] = v;
      const fov = 3.2;
      const scale = (W * fov) / (fov + z + 1.2);
      return [W / 2 + x * scale, H / 2 + y * scale, z] as const;
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);
      const projected = verts.map((v) => project(rotateVert(v, rotX, rotY)));

      for (const [a, b] of edges) {
        const [ax, ay, az] = projected[a];
        const [bx, by, bz] = projected[b];
        const avgZ = (az + bz) / 2;
        const depth = (avgZ + 1) / 2;
        const alpha = 0.08 + depth * 0.55;
        ctx!.beginPath();
        ctx!.moveTo(ax, ay);
        ctx!.lineTo(bx, by);
        ctx!.strokeStyle = `rgba(42,26,245,${alpha})`;
        ctx!.lineWidth = depth * 1.5;
        ctx!.stroke();
      }

      for (const [x, y, z] of projected) {
        const depth = (z + 1) / 2;
        const r = 2.5 + depth * 2;
        ctx!.beginPath();
        ctx!.arc(x, y, r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(42,26,245,${0.15 + depth * 0.5})`;
        ctx!.fill();
      }
    }

    function animate() {
      if (!dragging) {
        rotY += velY;
        rotX += velX;
        velX *= 0.97;
        velY = velY * 0.9995 + 0.003 * 0.0005;
      }
      draw();
      animId = requestAnimationFrame(animate);
    }

    function resize() {
      const parent = canvas!.parentElement!;
      const rect = parent.getBoundingClientRect();
      const size = Math.min(rect.width * 0.48, 420);
      canvas!.width = size;
      canvas!.height = size;
      W = canvas!.width;
      H = canvas!.height;
    }

    const onMouseDown = (e: MouseEvent) => {
      dragging = true;
      lastMouse = { x: e.clientX, y: e.clientY };
      canvas!.style.cursor = 'grabbing';
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastMouse.x;
      const dy = e.clientY - lastMouse.y;
      rotY += dx * 0.008;
      rotX += dy * 0.008;
      velY = dx * 0.008;
      velX = dy * 0.008;
      lastMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      dragging = false;
      canvas!.style.cursor = 'grab';
    };

    const onTouchStart = (e: TouchEvent) => {
      dragging = true;
      lastMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!dragging) return;
      const dx = e.touches[0].clientX - lastMouse.x;
      const dy = e.touches[0].clientY - lastMouse.y;
      rotY += dx * 0.008;
      rotX += dy * 0.008;
      lastMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      dragging = false;
    };

    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });
    canvas.addEventListener('touchend', onTouchEnd);
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return <canvas id="hero-canvas" ref={canvasRef} />;
};

export default PolyhedronCanvas;
