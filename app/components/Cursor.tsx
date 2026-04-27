"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const blobRef = useRef<HTMLDivElement>(null);
  const dotRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = -200, my = -200, cx = -200, cy = -200;
    let raf: number;

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };

    const tick = () => {
      cx += (mx - cx) * 0.12;
      cy += (my - cy) * 0.12;
      if (blobRef.current) {
        blobRef.current.style.left = cx + "px";
        blobRef.current.style.top  = cy + "px";
      }
      if (dotRef.current) {
        dotRef.current.style.left = mx + "px";
        dotRef.current.style.top  = my + "px";
      }
      raf = requestAnimationFrame(tick);
    };

    const grow   = () => blobRef.current?.classList.add("big");
    const shrink = () => blobRef.current?.classList.remove("big");

    document.addEventListener("mousemove", onMove);
    document.querySelectorAll("a, button, .hoverable").forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    raf = requestAnimationFrame(tick);
    return () => { document.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      {/* Large soft trailing blob */}
      <div ref={blobRef} style={{
        width: 32,
        height: 32,
        background: "var(--accent)",
        opacity: 0.25,
        borderRadius: "50%",
        position: "fixed", top: 0, left: 0,
        pointerEvents: "none", zIndex: 9998,
        transform: "translate(-50%,-50%)",
        transition: "width 0.25s ease, height 0.25s ease, opacity 0.25s ease",
        mixBlendMode: "multiply",
      }} />
      {/* Small sharp dot */}
      <div ref={dotRef} style={{
        width: 5,
        height: 5,
        background: "var(--ink)",
        borderRadius: "50%",
        position: "fixed", top: 0, left: 0,
        pointerEvents: "none", zIndex: 10000,
        transform: "translate(-50%,-50%)",
      }} />
      <style>{`.big{width:56px!important;height:56px!important;opacity:.18!important}`}</style>
    </>
  );
}
