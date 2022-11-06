import { useState, useEffect } from "react";

export default function useMousePos() {
  const [mousePos, setMousePos] = useState({ mouseX: 0, mouseY: 0 });
  const updateMousePos = (e: MouseEvent) => {
    setMousePos({ mouseX: e.clientX, mouseY: e.clientY });
  };
  useEffect(() => {
    window.addEventListener("mousemove", updateMousePos);
    return () => {
      window.removeEventListener("mousemove", updateMousePos);
    };
  }, []);
  return mousePos;
}
