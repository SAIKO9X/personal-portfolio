"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ProjectDetailsLayout({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    const resetAll = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      document.body.style.overflow = "auto";

      document.body.classList.remove("page-transitioning");
    };

    resetAll();

    const timer = setTimeout(resetAll, 0);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname]);

  return <div className="project-details-wrapper">{children}</div>;
}
