/* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */
"use client";

import { useRef, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import styles from "./PageTransition.module.css";

export default function PageTransition({ children }) {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const pathname = usePathname();
  const transitionPromiseRef = useRef(null);
  const previousPathnameRef = useRef(pathname);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    if (!isTransitioning) {
      setDisplayChildren(children);
    }
  }, [children, isTransitioning]);

  useEffect(() => {
    const overlay = overlayRef.current;
    const content = contentRef.current;

    // só anima se realmente houve mudança de rota
    if (previousPathnameRef.current !== pathname && overlay && content) {
      setIsTransitioning(true);

      setDisplayChildren(children);

      const tl = gsap.timeline({
        onComplete: () => {
          setIsTransitioning(false);
          document.body?.classList.remove("page-transition");

          if (transitionPromiseRef.current) {
            transitionPromiseRef.current.resolve();
            transitionPromiseRef.current = null;
          }
        },
      });

      tl.to(overlay, {
        y: "-100%",
        duration: 0.5, 
        ease: "power3.out",
      });

      tl.to(
        content,
        {
          opacity: 1,
          duration: 0.4, 
          ease: "power2.out",
        },
        "-=0.3"
      ); 
    }

    previousPathnameRef.current = pathname;
  }, [pathname, children]);

  useEffect(() => {
    window.pageTransition = {
      animateOut: () => {
        return new Promise((resolve, reject) => {
          const overlay = overlayRef.current;
          const content = contentRef.current;

          if (!overlay || !content) {
            resolve();
            return;
          }

          transitionPromiseRef.current = { resolve, reject };

          const tl = gsap.timeline();
          tl.to(content, {
            opacity: 0,
            duration: 0.2, 
            ease: "power2.in",
          })
            .to(
              overlay,
              {
                y: 0,
                duration: 0.5,
                ease: "power3.inOut",
              },
              "-=0.1"
            )
            .call(
              () => {
                document.body?.classList.add("page-transition");
              },
              null,
              "-=0.3"
            );

          setTimeout(() => {
            if (transitionPromiseRef.current) {
              transitionPromiseRef.current.resolve();
              transitionPromiseRef.current = null;
            }
          }, 1000); 
        });
      },
    };

    return () => {
      if (window.pageTransition) {
        delete window.pageTransition;
      }
      if (transitionPromiseRef.current) {
        transitionPromiseRef.current.resolve();
        transitionPromiseRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <div
        ref={contentRef}
        className={styles.content}
        style={{
          opacity: isTransitioning ? 0 : 1,
          pointerEvents: isTransitioning ? "none" : "auto",
        }}
      >
        {displayChildren}
      </div>
      <div className={styles.overlay} ref={overlayRef} />
    </>
  );
}
