import Badge from "../Badge";
import styles from "./styles.module.css";
import React, { CSSProperties, MouseEvent, useState } from "react";
/**
 * Image container with optional effects
 * @param src - Image url
 * @param withBadge - Enable interactive verification badge
 * @param withTilt - Enables 3D tilt effect
 * @returns
 */
export default function ImageInteractive({
  src,
  withBadge = false,
  withTilt = false,
}: {
  src?: string;
  withBadge?: boolean;
  withTilt?: boolean;
}) {
  const [normMouseCoords, setNormMouseCoords] = useState({ x: 0, y: 0 });
  const [mousePercentage, setMousePercentage] = useState({ x: "0%", y: "0%" });
  const [bgPos, setBgPos] = useState({ x: "50%", y: "50%" });
  const [opacity, setOpacity] = useState(0.05);
  const [hyp, setHyper] = useState(0);

  function handleMouseMove(e: MouseMoveEventType) {
    const values = convertMousePosOverElement(e);
    setNormMouseCoords({ x: values.normalized.x, y: values.normalized.y });
    setMousePercentage({
      x: values.percentage.x + "%",
      y: values.percentage.y + "%",
    });
    setBgPos({ x: values.bgPos.x + "%", y: values.bgPos.y + "%" });
    setOpacity(1);
    setHyper(values.fromCenter);
  }

  function handleMouseLeave() {
    setNormMouseCoords({ x: 0, y: 0 });
    setOpacity(0.05);
  }

  return (
    <div
      style={
        {
          "--normMouseCoords-x": normMouseCoords.x,
          "--normMouseCoords-y": normMouseCoords.y,
          "--mousePercentage-x": mousePercentage.x,
          "--mousePercentage-y": mousePercentage.y,
          "--bgPos-x": bgPos.x,
          "--bgPos-y": bgPos.y,
          "--opacity": opacity,
          "--tiltAngle": `${hyp * 20}deg`,
          "--hyp": hyp,
          "--img": `url(${src})`,
        } as CSSProperties
      }
      className={styles.wrapper}
      onMouseMove={(e) => handleMouseMove(e)}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`${styles.inner} ${withTilt && styles.withTilt}`}>
        {withBadge && <Badge className={styles.badge} />}
        <img className={styles.image} src={src} />
        {withTilt && (
          <>
            <div className={`${styles.image_shine} ${styles.mask}`}></div>
            <div className={`${styles.image_glare} ${styles.mask}`}></div>
          </>
        )}
      </div>
    </div>
  );
}

// Get normalized values between -1 and 1 for mouse position over element
function convertMousePosOverElement(e: MouseMoveEventType) {
  // Get element properties
  const rect = e.currentTarget.getBoundingClientRect();

  // Get mouse position relative to rect in percent
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;

  // Normalize to -1 and 1
  const xNorm = (x - 50) / 50;
  const yNorm = ((y - 50) / 50) * -1;

  // Normalize percentage to 38 and 62
  const xNormPerc = ((x - 50) / 50) * 38 + 50;
  const yNormPerc = ((y - 50) / 50) * 38 + 50;

  // Normalize from center 0 to outside 1
  const centerX = Math.abs((x - 50) / 50);
  const centerY = Math.abs((y - 50) / 50);
  const fromCenter = Math.max(centerX, centerY);

  return {
    normalized: { x: xNorm, y: yNorm },
    percentage: { x, y },
    bgPos: { x: xNormPerc, y: yNormPerc },
    fromCenter: fromCenter,
  };
}

type MouseMoveEventType = MouseEvent<HTMLDivElement, globalThis.MouseEvent>;
