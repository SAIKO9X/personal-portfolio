"use client";

import { useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

export function usePageTransition() {
  const router = useRouter();
  const isTransitioningRef = useRef(false);

  const navigateWithTransition = useCallback(
    async (href) => {
      if (isTransitioningRef.current) return;

      // Previne navegação para a mesma página
      if (window.location.pathname === href) return;

      isTransitioningRef.current = true;

      try {
        // 1. Executa animação de saída se disponível
        if (window.pageTransition?.animateOut) {
          await window.pageTransition.animateOut();
        }

        // 2. Inicia a navegação
        router.push(href);

        // 3. Aguarda a página carregar completamente
        await waitForPageLoad(href);
      } catch (error) {
        console.error("Erro na transição:", error);
      } finally {
        // Reset após um pequeno delay para garantir que a animação de entrada complete
        setTimeout(() => {
          isTransitioningRef.current = false;
        }, 100);
      }
    },
    [router]
  );

  return {
    navigateWithTransition,
    isTransitioning: isTransitioningRef.current,
  };
}

// Função aprimorada para aguardar carregamento da página
function waitForPageLoad(targetHref) {
  return new Promise((resolve) => {
    const startUrl = window.location.pathname;
    let resolved = false;

    // Método 1: Observar mudanças na URL
    const checkUrlChange = () => {
      const currentPath = window.location.pathname;

      if (currentPath !== startUrl && currentPath === targetHref && !resolved) {
        resolved = true;

        // Aguarda renderização completa
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            resolve();
          });
        });
      }
    };

    // Verifica a cada 50ms
    const urlInterval = setInterval(() => {
      checkUrlChange();
      if (resolved) {
        clearInterval(urlInterval);
      }
    }, 50);

    // Método 2: Aguarda eventos de carregamento
    const handleLoad = () => {
      if (!resolved && window.location.pathname === targetHref) {
        resolved = true;
        clearInterval(urlInterval);
        document.removeEventListener("DOMContentLoaded", handleLoad);
        window.removeEventListener("load", handleLoad);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            resolve();
          });
        });
      }
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", handleLoad);
    }

    if (document.readyState !== "complete") {
      window.addEventListener("load", handleLoad);
    }

    // Timeout de segurança
    setTimeout(() => {
      if (!resolved) {
        resolved = true;
        clearInterval(urlInterval);
        document.removeEventListener("DOMContentLoaded", handleLoad);
        window.removeEventListener("load", handleLoad);
        resolve();
      }
    }, 3000);
  });
}
