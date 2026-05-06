import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (hash) return;

    const scrollTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    scrollTop();

    requestAnimationFrame(() => {
      scrollTop();
    });

    setTimeout(() => {
      scrollTop();
    }, 50);
  }, [pathname, search, hash]);

  return null;
}