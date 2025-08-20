"use client";

import { useRef, useLayoutEffect } from "react";
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

  useLayoutEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    let ctx = gsap.context(() => {
      if (!isMobile) {
        // Animação da logo
        gsap.to(".hero-logo", {
          autoAlpha: 0,
          y: -30, // Adiciona movimento vertical
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".intro",
            start: "top 90%",
            end: "top 30%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // Animação do gradiente com transição mais suave
        gsap.to(".gradient-canvas", {
          opacity: 0,
          scale: 1.1, // Leve zoom out
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".extra",
            start: "top bottom",
            end: "top 60%",
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
        });
      }

      // Animação do indicador de scroll (funciona em mobile também)
      gsap.to(".scroll-indicator", {
        autoAlpha: 0,
        y: -20,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".intro",
          start: "top 85%",
          end: "top 65%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, mainRef);

    // Delay maior para garantir que tudo carregou
    const timer = setTimeout(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh(true);
    }, 300);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        smoothTouch: false,
      }}
    >
      <div ref={mainRef}>
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

        <IntroSection />

        <div className={`${styles.extra} extra`}></div>

        <SkillsGrid className="skills" skills={skillsData} />

        <FeaturedWork />

        <div className={`${styles.extra} extra`}></div>

        <ServicesSection />

        <OutroSection />

        <Footer />
      </div>
    </ReactLenis>
  );
}
