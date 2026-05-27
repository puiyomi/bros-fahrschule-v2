import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop – restores scroll position on every route change.
 * Uses instant scroll on touch devices to avoid janky long smooth-scrolls
 * after navigating from a long page on mobile.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const coarse =
      typeof window !== "undefined" &&
      window.matchMedia?.("(pointer: coarse)").matches;
    window.scrollTo({ top: 0, left: 0, behavior: coarse ? "auto" : "smooth" });
  }, [pathname]);

  return null;
}
