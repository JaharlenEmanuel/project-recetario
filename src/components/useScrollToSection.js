// src/hooks/useScrollToSection.js
import { useRef } from "react";

export function useScrollToSection() {
  const sectionRef = useRef(null);

  const scrollToSection = () => {
    sectionRef.current?.scrollIntoView({
      behavior: "smooth", // desplazamiento suave
      block: "start",     // alinea arriba
    });
  };

  return { sectionRef, scrollToSection };
}
