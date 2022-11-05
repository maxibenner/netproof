"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

export default function Popup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const [pos, setPos] = useState([0, 0]);
  const [isGrabbed, setIsGrabbed] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", () => handleGrab(false));

    if (popupRef.current) {
      setPos([popupRef.current.offsetLeft, popupRef.current.offsetTop]);
    }
  }, []);

  function handleMouseMove(e: MouseEvent) {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    setPos((prev) => [e.clientX, e.clientY]);
  }

  function handleGrab(grabbed: boolean) {
    setIsGrabbed(grabbed);
  }

  return (
    <div
      ref={popupRef}
      className={`window ${className}`}
      style={{ transform: `translate(${pos[0]}px, ${pos[1]}px)` }}
    >
      <div className="title-bar" onMouseDown={() => handleGrab(true)}>
        <div className="title-bar-text">A Window With Stuff In It</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button aria-label="Close"></button>
        </div>
      </div>
      <div className="window-body">{children}</div>
    </div>
  );
}
