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

    // Só anima se realmente houve mudança de rota
    if (previousPathnameRef.current !== pathname && overlay && content) {
      setIsTransitioning(true);

      // Atualiza conteúdo imediatamente
      setDisplayChildren(children);

      // Timeline mais rápida
      const tl = gsap.timeline({
        onComplete: () => {
          setIsTransitioning(false);
          document.body?.classList.remove("page-transition");

          // Resolve a promise de transição se existir
          if (transitionPromiseRef.current) {
            transitionPromiseRef.current.resolve();
            transitionPromiseRef.current = null;
          }
        },
      });

      // Entrada mais rápida - overlay saindo
      tl.to(overlay, {
        y: "-100%",
        duration: 0.5, // Reduzido de 0.8s para 0.5s
        ease: "power3.out", // Ease mais rápido
      });

      // Fade in do conteúdo em paralelo
      tl.to(
        content,
        {
          opacity: 1,
          duration: 0.4, // Reduzido
          ease: "power2.out",
        },
        "-=0.3"
      ); // Mais overlap
    }

    previousPathnameRef.current = pathname;
  }, [pathname, children]);

  useEffect(() => {
    // Sistema de transição global otimizado
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

          // Timeline mais rápida para saída
          const tl = gsap.timeline();

          // 1. Fade out do conteúdo + overlay entrando simultaneamente
          tl.to(content, {
            opacity: 0,
            duration: 0.2, // Muito mais rápido
            ease: "power2.in",
          })
            .to(
              overlay,
              {
                y: 0,
                duration: 0.5, // Reduzido de 0.8s
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

          // Timeout de segurança menor
          setTimeout(() => {
            if (transitionPromiseRef.current) {
              transitionPromiseRef.current.resolve();
              transitionPromiseRef.current = null;
            }
          }, 1000); // Reduzido de 5000ms para 1000ms
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
