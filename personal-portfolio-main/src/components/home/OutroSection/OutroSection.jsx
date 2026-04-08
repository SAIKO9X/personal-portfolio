"use client";

import { useRef, useLayoutEffect, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import styles from "./OutroSection.module.css";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function OutroSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const stripsRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detecta se é mobile
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
    if (!sectionRef.current) return;

    let ctx = gsap.context(() => {
      // Configuração inicial do header
      const outroHeader = headerRef.current;
      let outroSplit = null;

      if (outroHeader) {
        outroSplit = new SplitText(outroHeader, {
          type: "words",
          wordsClass: styles.outroWord,
        });

        gsap.set(outroSplit.words, { opacity: 0 });
      }

      // Strips de skills
      const outroStrips = stripsRef.current?.querySelectorAll(
        `.${styles.outroStrip}`
      );
      const stripSpeeds = [0.3, 0.4, 0.25, 0.35, 0.2, 0.25];

      // Configuração diferente para mobile e desktop
      if (!isMobile) {
        // Animação principal com pin (apenas desktop)
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${window.innerHeight * 3}px`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          refreshPriority: -10,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;

            // Animação do texto do header
            if (outroSplit && outroSplit.words.length > 0) {
              if (progress >= 0.25 && progress <= 0.75) {
                const textProgress = (progress - 0.25) / 0.5;
                const totalWords = outroSplit.words.length;

                outroSplit.words.forEach((word, index) => {
                  const wordRevealProgress = index / totalWords;

                  if (textProgress >= wordRevealProgress) {
                    gsap.set(word, { opacity: 1 });
                  } else {
                    gsap.set(word, { opacity: 0 });
                  }
                });
              } else if (progress < 0.25) {
                gsap.set(outroSplit.words, { opacity: 0 });
              } else if (progress > 0.75) {
                gsap.set(outroSplit.words, { opacity: 1 });
              }
            }
          },
        });

        // Animação das strips (desktop)
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top bottom",
          end: `+=${window.innerHeight * 6}px`,
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;

            outroStrips?.forEach((strip, index) => {
              if (stripSpeeds[index] !== undefined) {
                const speed = stripSpeeds[index];
                const movement = progress * 100 * speed;
                const direction = index % 2 === 0 ? 1 : -1;

                gsap.set(strip, {
                  x: `${movement * direction}%`,
                });
              }
            });
          },
        });
      } else {
        // Animação do texto para mobile
        if (outroSplit && outroSplit.words.length > 0) {
          gsap.fromTo(
            outroSplit.words,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
        outroStrips?.forEach((strip, index) => {
          const movementDistance = 45;

          gsap.fromTo(
            strip,
            {
              x:
                index % 2 === 0
                  ? `-${movementDistance}%`
                  : `${movementDistance}%`,
              opacity: 0.8,
            },
            {
              x: "0%",
              opacity: 1,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
              },
            }
          );
        });
      }
      // Força atualização do ScrollTrigger
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  // Skills personalizadas para seu contexto
  const skillsData = [
    // Strip 1
    [
      { text: "Java", variant: 1 },
      { text: "React", variant: 2 },
      { text: "DevOps", variant: 3 },
      { text: "Clean Code", variant: 1 },
      { text: "API REST", variant: 3 },
      { text: "Docker", variant: 1 },
    ],
    // Strip 2
    [
      { text: "CI/CD", variant: 2 },
      { text: "AWS", variant: 3 },
      { text: "MongoDB", variant: 1 },
      { text: "PostgreSQL", variant: 2 },
      { text: "Microserviços", variant: 3 },
    ],
    // Strip 3
    [
      { text: "Full Stack", variant: 2 },
      { text: "Next.js", variant: 1 },
      { text: "TypeScript", variant: 2 },
      { text: "Git", variant: 3 },
      { text: "Figma", variant: 3 },
      { text: "Swagger", variant: 1 },
    ],
    // Strip 4
    [
      { text: "Spring Boot", variant: 1 },
      { text: "Grafana", variant: 2 },
      { text: "JUnit", variant: 3 },
      { text: "Tailwind", variant: 1 },
    ],
    // Strip 5
    [
      { text: "Framer Motion", variant: 1 },
      { text: "GSAP", variant: 3 },
      { text: "Performance", variant: 1 },
      { text: "Production Ready", variant: 1 },
      { text: "GitHub Actions", variant: 2 },
    ],
    // Strip 6
    [
      { text: "UX/UI", variant: 3 },
      { text: "Shadcn", variant: 1 },
      { text: "Deployed", variant: 2 },
      { text: "Responsividade", variant: 3 },
      { text: "Photoshop", variant: 1 },
    ],
  ];

  return (
    <section
      className={`${styles.outro} ${isMobile ? styles.outroMobile : ""}`}
      ref={sectionRef}
    >
      <div className={styles.container}>
        <h3 ref={headerRef}>
          O SCROLL TERMINA MAS AS IDEIAS CONTINUAM FLUINDO
        </h3>
      </div>
      <div className={styles.outroStrips} ref={stripsRef}>
        {skillsData.map((strip, stripIndex) => (
          <div
            key={stripIndex}
            className={`${styles.outroStrip} ${styles[`os${stripIndex + 1}`]}`}
          >
            {strip.map((skill, skillIndex) => (
              <div
                key={skillIndex}
                className={`${styles.skill} ${
                  styles[`skillVar${skill.variant}`]
                }`}
              >
                <p>{skill.text}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
