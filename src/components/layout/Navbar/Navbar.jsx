"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import styles from "./Navbar.module.css";

gsap.registerPlugin(SplitText);

const navbarConfig = {
  hiddenPages: ["/work", "/project-details"],
  alwaysVisiblePages: [],
  hideDelay: 100,
  showSensitivity: 5,
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const menuRef = useRef(null);
  const menuToggleRef = useRef(null);
  const menuHeaderRef = useRef(null);
  const menuOverlayRef = useRef(null);
  const menuItemsRef = useRef([]);
  const menuFooterRef = useRef(null);
  const menuLogoRef = useRef(null);
  const hamburgerMenuRef = useRef(null);
  const splitTextsRef = useRef([]);
  const footerSplitTextsRef = useRef([]);

  const hideTimeoutRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  const lastScrollY = useRef(0);

  const shouldHideCompletely = navbarConfig.hiddenPages.some((hiddenPath) =>
    pathname.startsWith(hiddenPath)
  );
  const isAlwaysVisible = navbarConfig.alwaysVisiblePages.includes(pathname);

  const scrambleText = (elements, duration = 0.4) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    elements.forEach((char) => {
      const originalText = char.textContent;
      let iterations = 0;
      const maxIterations = Math.floor(Math.random() * 6) + 3;
      gsap.set(char, { opacity: 1 });
      const scrambleInterval = setInterval(() => {
        char.textContent = chars[Math.floor(Math.random() * chars.length)];
        iterations++;
        if (iterations >= maxIterations) {
          clearInterval(scrambleInterval);
          char.textContent = originalText;
        }
      }, 25);
      setTimeout(() => {
        clearInterval(scrambleInterval);
        char.textContent = originalText;
      }, duration * 1000);
    });
  };

  const initMenu = () => {
    gsap.set(menuOverlayRef.current, {
      scaleY: 0,
      transformOrigin: "top center",
    });

    menuItemsRef.current.forEach((item) => {
      const link = item.querySelector("span, a");
      if (link) {
        const split = new SplitText(link, {
          type: "words",
          linesClass: "split-line",
        });
        splitTextsRef.current.push(split);
        gsap.set(split.words, {
          yPercent: 120,
        });
      }
    });

    const footerElements = menuFooterRef.current?.querySelectorAll(
      "a, span, .menu-time"
    );
    footerElements?.forEach((element) => {
      const split = new SplitText(element, {
        type: "chars",
      });
      footerSplitTextsRef.current.push(split);
      gsap.set(split.chars, {
        opacity: 0,
      });
    });

    gsap.set(menuItemsRef.current, {
      opacity: 1,
    });

    gsap.set(menuFooterRef.current, {
      opacity: 1,
      y: -20,
    });
  };

  const openMenu = () => {
    if (isAnimating) return;
    setIsOpen(true);
    setIsAnimating(true);

    hamburgerMenuRef.current?.classList.add(styles.open);
    menuLogoRef.current?.classList.add(styles.rotated);

    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
      },
    });

    tl.to(menuOverlayRef.current, {
      duration: 0.5,
      scaleY: 1,
      ease: "power3.out",
    });

    const allWords = splitTextsRef.current.reduce((acc, split) => {
      return acc.concat(split.words);
    }, []);

    tl.to(
      allWords,
      {
        duration: 0.75,
        yPercent: 0,
        stagger: 0.05,
        ease: "power4.out",
      },
      "-=0.3"
    );

    tl.to(
      menuFooterRef.current,
      {
        duration: 0.3,
        y: 0,
        ease: "power2.out",
        onComplete: () => {
          const allFooterChars = footerSplitTextsRef.current.reduce(
            (acc, split) => {
              return acc.concat(split.chars);
            },
            []
          );

          allFooterChars.forEach((char, index) => {
            setTimeout(() => {
              scrambleText([char], 0.4);
            }, index * 30);
          });
        },
      },
      "-=1"
    );
  };

  const closeMenu = () => {
    if (isAnimating) return;
    setIsOpen(false);
    setIsAnimating(true);

    hamburgerMenuRef.current?.classList.remove(styles.open);
    menuLogoRef.current?.classList.remove(styles.rotated);

    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
      },
    });

    const allWords = splitTextsRef.current.reduce((acc, split) => {
      return acc.concat(split.words);
    }, []);

    tl.to(menuFooterRef.current, {
      duration: 0.3,
      y: -20,
      ease: "power2.in",
      onStart: () => {
        const allFooterChars = footerSplitTextsRef.current.reduce(
          (acc, split) => {
            return acc.concat(split.chars);
          },
          []
        );
        gsap.set(allFooterChars, { opacity: 0 });
      },
    });

    tl.to(
      allWords,
      {
        duration: 0.25,
        yPercent: 120,
        stagger: -0.025,
        ease: "power2.in",
      },
      "-=0.25"
    );

    tl.to(
      menuOverlayRef.current,
      {
        duration: 0.5,
        scaleY: 0,
        ease: "power3.inOut",
      },
      "-=0.2"
    );
  };

  const toggleMenu = () => {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const waitForPageLoad = () => {
    return new Promise((resolve) => {
      const startUrl = window.location.href;
      const checkInterval = setInterval(() => {
        if (window.location.href !== startUrl) {
          clearInterval(checkInterval);
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              resolve();
            });
          });
        }
      }, 50);

      // Timeout de segurança
      setTimeout(() => {
        clearInterval(checkInterval);
        resolve();
      }, 3000);
    });
  };

  const handleNavigation = async (href) => {
    if (pathname === href) return;

    // Fecha o menu se estiver aberto
    if (isOpen) {
      closeMenu();
      await new Promise((resolve) => setTimeout(resolve, 600));
    }

    if (window.pageTransition?.animateOut) {
      try {
        await window.pageTransition.animateOut();
        router.push(href);
        await waitForPageLoad();
      } catch (error) {
        console.error("Erro na transição:", error);
        // Fallback
        router.push(href);
      }
    } else {
      // Fallback caso o PageTransition não esteja disponível
      router.push(href);
    }
  };

  const handleScroll = () => {
    if (isAlwaysVisible) return;

    const currentScrollY = window.scrollY;
    const scrollDifference = currentScrollY - lastScrollY.current;
    const menuElement = menuRef.current;

    if (!menuElement) return;

    if (currentScrollY < 50) {
      if (menuElement.classList.contains(styles.hidden)) {
        menuElement.classList.remove(styles.hidden);
      }
    } else if (
      scrollDifference > navbarConfig.showSensitivity &&
      currentScrollY > 100
    ) {
      if (isOpen) {
        closeMenu();
      }
      if (!menuElement.classList.contains(styles.hidden)) {
        menuElement.classList.add(styles.hidden);
      }
    } else if (scrollDifference < -navbarConfig.showSensitivity) {
      if (menuElement.classList.contains(styles.hidden)) {
        menuElement.classList.remove(styles.hidden);
      }
    }

    lastScrollY.current = currentScrollY;
  };

  const updateTime = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "America/Sao_Paulo",
    });
    setCurrentTime(`${timeString} BRT`);
  };

  useEffect(() => {
    if (shouldHideCompletely) {
      return;
    }

    lastScrollY.current = window.scrollY;
    initMenu();
    updateTime();

    const interval = setInterval(updateTime, 1000);

    const handleScrollCallback = () => handleScroll();
    window.addEventListener("scroll", handleScrollCallback);

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScrollCallback);

      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      splitTextsRef.current.forEach((split) => split && split.revert());
      footerSplitTextsRef.current.forEach((split) => split && split.revert());
    };
  }, [pathname, shouldHideCompletely]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "Sobre" },
    { href: "/work", label: "Projetos" },
    { href: "/contact", label: "Contato" },
  ];

  if (shouldHideCompletely) {
    return null;
  }

  return (
    <nav className={styles.menu} ref={menuRef}>
      <div
        className={styles.menuHeader}
        ref={menuHeaderRef}
        onClick={toggleMenu}
      >
        <div className={styles.menuLogo}>
          <img src="/logo.png" alt="Logo" ref={menuLogoRef} />
        </div>
        <button
          className={styles.menuToggle}
          ref={menuToggleRef}
          aria-label="Toggle menu"
        >
          <div className={`${styles.menuHamburgerIcon}`} ref={hamburgerMenuRef}>
            <span className={styles.menuItem}></span>
            <span className={styles.menuItem}></span>
          </div>
        </button>
      </div>
      <div className={styles.menuOverlay} ref={menuOverlayRef}>
        <nav className={styles.menuNav}>
          <ul>
            {navLinks.map((link, index) => (
              <li
                key={link.href}
                ref={(el) => (menuItemsRef.current[index] = el)}
                className={pathname === link.href ? styles.active : ""}
                onClick={() => handleNavigation(link.href)}
                style={{ cursor: "pointer" }}
              >
                <span style={{ cursor: "pointer", display: "block" }}>
                  {link.label}
                </span>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.menuFooter} ref={menuFooterRef}>
          <div className={styles.menuSocial}>
            <a
              href="https://github.com/SAIKO9X"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.text_link}
            >
              <span>▶</span> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/carlosealeixo/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>▶</span> LinkedIn
            </a>
          </div>
          <div className={`${styles.menuTime} menu-time`}>{currentTime}</div>
        </div>
      </div>
    </nav>
  );
}
