"use client";

import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { WalletContext } from "../../context/walletContext";
import useMousePos from "../../hooks/useMousePos";
import styles from "./styles.module.css";

export default function Popup({
  children,
  className,
  title,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
}) {
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [prevTranslate, setPrevTranslate] = useState({ x: 0, y: 0 });
  const [pointerStart, setPointerStart] = useState({ x: 0, y: 0 });
  const [isGrabbed, setIsGrabbed] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const { mouseX, mouseY } = useMousePos();

  const { activeAsset, setActiveAsset } = useContext(WalletContext);

  useEffect(() => {
    if (isGrabbed) {
      const x = mouseX - pointerStart.x;
      const y = mouseY - pointerStart.y;
      setTranslate({ x: prevTranslate.x + x, y: prevTranslate.y + y });
    }
  }, [isGrabbed, mouseX, mouseY]);

  function handleGrab(grabbed: boolean) {
    setPointerStart({ x: mouseX, y: mouseY });
    setIsGrabbed(grabbed);
    if (!grabbed) setPrevTranslate(translate);
  }

  return (
    <div
      ref={popupRef}
      className={`window ${styles.container} ${className}`}
      style={{
        transform: `translate(${translate.x}px, ${translate.y}px)`,
        display: activeAsset ? "block" : "none",
      }}
    >
      <div
        className={`title-bar ${styles.titleBar}`}
        onMouseDown={() => handleGrab(true)}
        onMouseUp={() => handleGrab(false)}
      >
        <div className="title-bar-text">{title}</div>
        <div className={`title-bar-controls ${styles.titleBarControls}`}>
          <button
            aria-label="Close"
            onClick={() => setActiveAsset(null)}
          ></button>
        </div>
      </div>
      <div className="window-body">{children}</div>
    </div>
  );
}
