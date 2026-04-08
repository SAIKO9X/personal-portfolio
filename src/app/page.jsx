"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
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

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 769px)",
      isMobile: "(max-width: 768px)"
    }, (context) => {
      let { isMobile } = context.conditions;

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

      gsap.to(".gradient-canvas", {
        opacity: 0,
        scale: isMobile ? 1.05 : 1.1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".intro",
          start: isMobile ? "center center" : "center top",
          end: isMobile ? "bottom 70%" : "bottom 30%",
          scrub: isMobile ? 2 : 1.5,
          invalidateOnRefresh: true,
          onComplete: () => {
            gsap.set(".gradient-canvas", { opacity: 0, pointerEvents: "none" });
          },
        },
      });

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
    });

    const timer = setTimeout(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh(true);
    }, 300);

    return () => clearTimeout(timer);
  }, { scope: mainRef });

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
        {/* Hero Container */}
        <div className={styles.heroContainer}>
          <div className={`${styles.gradientCanvas} gradient-canvas`}>
            <InteractiveGradient />
          </div>
          <div className={`${styles.heroLogo} hero-logo`}>
            <Image 
              src="/logo.png" 
              alt="Carlos Eduardo Logo" 
              width={500} 
              height={500} 
              priority 
              style={{ objectFit: 'contain' }}
            />
          </div>
          <p className={`${styles.scrollIndicator} scroll-indicator`}>
            ROLE PARA BAIXO
          </p>
        </div>

        {/* Seções do conteúdo */}
        <div className="intro">
          <IntroSection />
        </div>

        <div className={`${styles.extra} extra`}></div>

        <div className="skills">
          <SkillsGrid skills={skillsData} />
        </div>

        <FeaturedWork />

        <div className={`${styles.extra} extra`}></div>

        <ServicesSection />

        <div className={styles.outroSpacing}></div>

        <OutroSection />

        <Footer />
      </div>
    </ReactLenis>
  );
}
