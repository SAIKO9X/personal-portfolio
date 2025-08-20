"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import styles from "./OutroSection.module.css";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function OutroSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const stripsRef = useRef(null);

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

      // Animação principal com pin
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

      // Animação das strips
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

              // Alterna direção baseado no índice (par/ímpar)
              const direction = index % 2 === 0 ? 1 : -1;

              gsap.set(strip, {
                x: `${movement * direction}%`,
              });
            }
          });
        },
      });

      // Força atualização do ScrollTrigger
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Skills personalizadas para seu contexto
  const skillsData = [
    // Strip 1
    [
      { text: "Java Spring", variant: 1 },
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
      { text: "Microservices", variant: 3 },
    ],
    // Strip 3
    [
      { text: "Full Stack", variant: 2 },
      { text: "Goiânia", variant: 3 },
      { text: "Next.js", variant: 1 },
      { text: "TypeScript", variant: 2 },
      { text: "Git Flow", variant: 3 },
      { text: "TDD", variant: 3 },
      { text: "Swagger", variant: 1 },
    ],
    // Strip 4
    [
      { text: "Kubernetes", variant: 1 },
      { text: "Grafana", variant: 2 },
      { text: "JUnit", variant: 3 },
      { text: "Tailwind", variant: 1 },
    ],
    // Strip 5
    [
      { text: "Side Projects", variant: 1 },
      { text: "Open Source", variant: 2 },
      { text: "GSAP", variant: 3 },
      { text: "Performance", variant: 1 },
      { text: "Cloud Native", variant: 2 },
      { text: "Brazil", variant: 3 },
      { text: "Production Ready", variant: 1 },
      { text: "GitHub Actions", variant: 2 },
    ],
    // Strip 6
    [
      { text: "UX/UI", variant: 3 },
      { text: "Problem Solver", variant: 1 },
      { text: "Deployed", variant: 2 },
      { text: "Responsive", variant: 3 },
      { text: "Scalable", variant: 1 },
    ],
  ];

  return (
    <section className={styles.outro} ref={sectionRef}>
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
