import { useCallback } from "react";

/**
 * Hook personalizado que devuelve una función para hacer scroll al inicio de la página.
 * Uso:
 * const scrollToTop = useScrollToTop();
 * scrollToTop(); // hace scroll suave hasta arriba
 */
export default function useScrollToTop() {
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 👈 movimiento suave
    });
  }, []);

  return scrollToTop;
}
