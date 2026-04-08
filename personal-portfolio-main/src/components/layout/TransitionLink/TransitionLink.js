"use client";

import { usePageTransition } from "@/hooks/usePageTransition";

export default function TransitionLink({
  children,
  href,
  className = "",
  onClick,
  disabled = false,
  ...props
}) {
  const { navigateWithTransition, isTransitioning } = usePageTransition();

  const handleClick = async (e) => {
    e.preventDefault();

    if (disabled || isTransitioning) return;

    if (onClick) {
      const result = onClick(e);
      if (result === false) return;
    }

    if (window.location.pathname === href) return;

    const startTime = Date.now();

    await navigateWithTransition(href);

    console.log("Transição completa em:", Date.now() - startTime, "ms");
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      style={{
        pointerEvents: disabled || isTransitioning ? "none" : "auto",
        opacity: disabled || isTransitioning ? 0.6 : 1,
        cursor: disabled || isTransitioning ? "not-allowed" : "pointer",
        transition: "opacity 0.2s ease",
      }}
      {...props}
    >
      {children}
    </a>
  );
}
