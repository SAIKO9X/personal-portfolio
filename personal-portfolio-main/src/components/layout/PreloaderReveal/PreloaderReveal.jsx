import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import styles from "./PreloaderReveal.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
}

const PreloaderReveal = ({ onComplete }) => {
  const mainRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const ctx = gsap.context(() => {
      const splitTextElements = (
        selector,
        type = "words,chars",
        addFirstChar = false
      ) => {
        const elements = gsap.utils.toArray(selector);
        elements.forEach((element) => {
          const splitText = new SplitText(element, {
            type,
            wordsClass: "word",
            charsClass: "char",
          });
          if (type.includes("chars")) {
            splitText.chars.forEach((char, index) => {
              const originalText = char.textContent;
              char.innerHTML = `<span>${originalText}</span>`;
              if (addFirstChar && index === 0) char.classList.add("first-char");
            });
          }
        });
      };

      const isMobile = window.innerWidth <= 1000;

      splitTextElements(
        `.${styles.preloaderIntroTitle} h1`,
        "words, chars",
        true
      );
      splitTextElements(`.${styles.preloaderOutroTitle} h1`, "words, chars");
      splitTextElements(`.${styles.preloaderTag} p`, "words");

      // --- ESTADO INICIAL ---
      gsap.set(`.${styles.preloader} .${styles.preloaderIntroTitle} .char`, {
        y: 30,
        opacity: 0,
      });
      gsap.set(`.${styles.preloader} .${styles.preloaderOutroTitle} .char`, {
        y: 30,
        opacity: 0,
      });
      gsap.set(`.${styles.preloaderTag} .word`, { y: 30, opacity: 0 });

      // --- CONFIGURAÇÃO DO OVERLAY INFERIOR ---
      gsap.set(`.${styles.splitOverlay} .${styles.preloaderIntroTitle} h1`, {
        autoAlpha: 0,
      });
      gsap.set(
        `.${styles.splitOverlay} .${styles.preloaderIntroTitle} .first-char`,
        { autoAlpha: 1 }
      );
      gsap.set(`.${styles.splitOverlay} .${styles.preloaderOutroTitle} h1`, {
        autoAlpha: 1,
      });

      gsap.set(
        `.${styles.splitOverlay} .${styles.preloaderIntroTitle} .first-char`,
        {
          x: isMobile ? "7.5rem" : "18rem",
          y: isMobile ? "-1rem" : "-2.75rem",
          fontWeight: "900",
          scale: 0.75,
        }
      );
      gsap.set(`.${styles.splitOverlay} .${styles.preloaderOutroTitle} .char`, {
        x: isMobile ? "-3rem" : "-8rem",
        fontSize: isMobile ? "6rem" : "14rem",
        fontWeight: "500",
      });

      // --- TIMELINE DA ANIMAÇÃO ---
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

      tl.to(
        `.${styles.preloaderTag} .word`,
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.05 },
        0.3
      );
      tl.to(
        `.${styles.preloader} .${styles.preloaderIntroTitle} .char`,
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.03 },
        1.2
      );
      tl.to(
        `.${styles.preloader} .${styles.preloaderIntroTitle} .char:not(.first-char)`,
        { y: -30, opacity: 0, duration: 0.6, stagger: 0.02 },
        2.5
      );
      tl.to(
        `.${styles.preloader} .${styles.preloaderOutroTitle} .char`,
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.04 },
        3.0
      );
      tl.to(
        `.${styles.preloader} .${styles.preloaderIntroTitle} .first-char`,
        {
          x: isMobile ? "7.5rem" : "7.5rem",
          y: isMobile ? "-1rem" : "-2.75rem",
          fontWeight: "900",
          scale: 0.75,
          duration: 1.2,
        },
        4.0
      );
      tl.to(
        `.${styles.preloader} .${styles.preloaderOutroTitle} .char`,
        {
          x: isMobile ? "-3rem" : "-8rem",
          fontSize: isMobile ? "6rem" : "14rem",
          fontWeight: "500",
          duration: 1.2,
          onComplete: () => {
            gsap.set(`.${styles.preloader}`, {
              clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
            });
            gsap.set(`.${styles.splitOverlay}`, {
              clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
            });
          },
        },
        4.0
      );
      tl.to(
        `.${styles.preloaderTag} .word`,
        { y: -30, opacity: 0, duration: 0.6, stagger: 0.05 },
        5.8
      );
      tl.to(
        [`.${styles.preloader}`, `.${styles.splitOverlay}`],
        {
          y: (i) => (i === 0 ? "-50%" : "50%"),
          duration: 1.5,
          ease: "power3.inOut",
        },
        6.5
      );
    }, mainRef);

    return () => ctx.revert();
  }, [isClient, onComplete]);

  if (!isClient) return null;

  return (
    <div ref={mainRef}>
      <div className={styles.preloader}>
        <div className={styles.preloaderIntroTitle}>
          <h1>Carlos Eduardo</h1>
        </div>
        <div className={styles.preloaderOutroTitle}>
          <h1>port</h1>
        </div>
      </div>
      <div className={styles.splitOverlay}>
        <div className={styles.preloaderIntroTitle}>
          <h1>Carlos Eduardo</h1>
        </div>
        <div className={styles.preloaderOutroTitle}>
          <h1>port</h1>
        </div>
      </div>
      <div className={styles.tagsOverlay}>
        <div className={`${styles.preloaderTag} ${styles.tag1}`}>
          <p>Web Design</p>
        </div>
        <div className={`${styles.preloaderTag} ${styles.tag2}`}>
          <p>Java Spring</p>
        </div>
        <div className={`${styles.preloaderTag} ${styles.tag3}`}>
          <p>React</p>
        </div>
      </div>
    </div>
  );
};

export default PreloaderReveal;
