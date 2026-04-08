"use client";

import { useRef, useLayoutEffect, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InteractiveGradient from "@/components/home/InteractiveGradient/InteractiveGradient";
import { ReactLenis } from "lenis/react";
import IntroSection from "@/components/home/Intro/IntroSection";
import SkillsGrid from "@/components/home/SkillsGrid/SkillsGrid";
import { skillsData } from "@/data/skills";
import FeaturedWork from "@/components/work/FeaturedWork/FeaturedWork";
import ServicesSection from "@/components/home/ServicesSection/ServicesSection";
import OutroSection from "@/components/home/OutroSection/OutroSection";
import Footer from "@/components/layout/Footer/Footer";
import styles from "./Home.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Hook para detectar se é mobile de forma mais robusta
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.matchMedia("(max-width: 768px)").matches;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useLayoutEffect(() => {
    if (!mainRef.current) return;

    let ctx = gsap.context(() => {
      // Animação da logo (funciona em desktop e mobile)
      gsap.to(".hero-logo", {
        autoAlpha: 0,
        y: isMobile ? -20 : -30,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".intro",
          start: "top 90%",
          end: "top 30%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Animação do gradiente (funciona em desktop e mobile)
      gsap.to(".gradient-canvas", {
        opacity: 0,
        scale: isMobile ? 1.05 : 1.1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".intro",
          start: isMobile ? "top 80%" : "bottom center",
          end: isMobile ? "bottom 60%" : "bottom 40%",
          scrub: isMobile ? 2 : 1.5,
          invalidateOnRefresh: true,
          onComplete: () => {
            // Força opacidade 0 quando a animação termina
            gsap.set(".gradient-canvas", { opacity: 0, pointerEvents: "none" });
          },
        },
      });

      // Animação do indicador de scroll
      gsap.to(".scroll-indicator", {
        autoAlpha: 0,
        y: isMobile ? -15 : -20,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".intro",
          start: "top 85%",
          end: "top 65%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Animação adicional para garantir que o gradient suma no mobile
      if (isMobile) {
        gsap.to(".gradient-canvas", {
          display: "none",
          scrollTrigger: {
            trigger: ".skills",
            start: "top bottom",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          },
        });
      }
    }, mainRef);

    // Delay para garantir que tudo carregou
    const timer = setTimeout(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh(true);
    }, 300);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [isMobile]);

  return (
    <ReactLenis
      root
      options={{
        duration: isMobile ? 1.0 : 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        smoothTouch: false,
      }}
    >
      <div ref={mainRef}>
        {/* Hero Container */}
        <div className={styles.heroContainer}>
          <div className={`${styles.gradientCanvas} gradient-canvas`}>
            <InteractiveGradient />
          </div>
          <div className={`${styles.heroLogo} hero-logo`}>
            <img src="/logo.png" alt="Carlos Eduardo Logo" />
          </div>
          <p className={`${styles.scrollIndicator} scroll-indicator`}>
            ROLE PARA BAIXO
          </p>
        </div>

        {/* Seções do conteúdo */}
        <div className="intro">
          <IntroSection />
        </div>

        {/* Espaçamento reduzido no mobile */}
        <div
          className={`${styles.extra} ${
            isMobile ? styles.extraMobile : ""
          } extra`}
        ></div>

        <div className="skills">
          <SkillsGrid skills={skillsData} />
        </div>

        <FeaturedWork />

        <div
          className={`${styles.extra} ${
            isMobile ? styles.extraMobile : ""
          } extra`}
        ></div>

        <ServicesSection />

        {/* Espaçamento adicional antes da OutroSection no mobile */}
        <div
          className={`${styles.outroSpacing} ${
            isMobile ? styles.outroSpacingMobile : ""
          }`}
        ></div>

        <OutroSection />

        <Footer />
      </div>
    </ReactLenis>
  );
}
