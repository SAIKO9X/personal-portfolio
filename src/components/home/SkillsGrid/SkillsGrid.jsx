"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./SkillsGrid.module.css";

// Registrar o plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function SkillsGrid({ skills }) {
  const containerRef = useRef(null);
  const highlightRef = useRef(null);
  const titleRef = useRef(null);
  const titleLinesRef = useRef([]);
  const subtitleRef = useRef(null);
  const gridRef = useRef(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Animações GSAP
    const ctx = gsap.context(() => {
      // Animação do título - linha por linha
      titleLinesRef.current.forEach((line, index) => {
        gsap.fromTo(
          line,
          {
            y: 100,
            opacity: 0,
            clipPath: "inset(0 0 100% 0)",
          },
          {
            y: 0,
            opacity: 1,
            clipPath: "inset(0 0 0% 0)",
            duration: 1.2,
            ease: "power4.out",
            delay: index * 0.2,
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Animação do subtítulo
      gsap.fromTo(
        subtitleRef.current,
        {
          y: 50,
          opacity: 0,
          filter: "blur(10px)",
        },
        {
          y: 0,
          opacity: 0.7,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          delay: 0.6,
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animação do grid - stagger nos items
      const gridItems = gridRef.current?.querySelectorAll(
        `.${styles.gridItem}`
      );

      gridRef.current?.classList.add(styles.interactionDisabled);

      if (gridItems) {
        gsap.fromTo(
          gridItems,
          {
            opacity: 0,
            scale: 0.8,
            y: 30,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: {
              amount: 0.6,
              from: "start",
            },
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
            onComplete: () => {
              gridRef.current?.classList.remove(styles.interactionDisabled);
            },
            onReverseComplete: () => {
              gridRef.current?.classList.add(styles.interactionDisabled);
            },
          }
        );

        // Animação adicional para as imagens dentro dos items
        gridItems.forEach((item, index) => {
          const img = item.querySelector("img");
          const skillName = item.querySelector(`.${styles.skillName}`);

          gsap.fromTo(
            img,
            {
              scale: 0,
              rotate: -180,
            },
            {
              scale: 1,
              rotate: 0,
              duration: 0.6,
              ease: "back.out(1.7)",
              delay: 0.8 + index * 0.1,
              scrollTrigger: {
                trigger: gridRef.current,
                start: "top 75%",
                toggleActions: "play none none reverse",
              },
            }
          );

          // Animação do nome da skill no mobile
          if (window.innerWidth <= 900) {
            gsap.fromTo(
              skillName,
              {
                x: -20,
                opacity: 0,
              },
              {
                x: 0,
                opacity: 0.6,
                duration: 0.5,
                ease: "power2.out",
                delay: 1 + index * 0.1,
                scrollTrigger: {
                  trigger: gridRef.current,
                  start: "top 75%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }
        });

        // Animação das bordas do grid
        gsap.fromTo(
          gridRef.current,
          {
            "--border-opacity": 0,
          },
          {
            "--border-opacity": 0.2,
            duration: 1.5,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, containerRef);

    // Cleanup
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const highlight = highlightRef.current;

    if (!container || !highlight) return;

    const moveToElement = (element) => {
      if (element) {
        const rect = element.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        highlight.style.transform = `translate(${
          rect.left - containerRect.left
        }px, ${rect.top - containerRect.top}px)`;
        highlight.style.width = `${rect.width}px`;
        highlight.style.height = `${rect.height}px`;
      }
    };

    const moveHighlight = (e) => {
      const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
      const targetItem = hoveredElement?.closest(`.${styles.gridItem}`);
      if (targetItem) {
        if (!hasInteracted) {
          setHasInteracted(true);
        }
        moveToElement(targetItem);
      }
    };

    container.addEventListener("mousemove", moveHighlight);

    return () => {
      container.removeEventListener("mousemove", moveHighlight);
    };
  }, [hasInteracted]);

  const firstRowSkills = skills.slice(0, 4);
  const secondRowSkills = skills.slice(4);

  return (
    <div className={styles.skillsSection}>
      <div className={styles.titleContainer} ref={titleRef}>
        <h1 className={styles.mainTitle}>
          <span
            className={styles.titleLine}
            ref={(el) => (titleLinesRef.current[0] = el)}
          >
            <span className={styles.titleInner}>MINHA</span>
          </span>
          <span
            className={styles.titleLine}
            ref={(el) => (titleLinesRef.current[1] = el)}
          >
            <span className={styles.titleInner}>TECH STACK</span>
          </span>
        </h1>
        <div className={styles.subtitle} ref={subtitleRef}>
          <p>
            Ferramentas e tecnologias que domino para criar diversas
            experiências digitais
          </p>
        </div>
      </div>

      <div className={styles.container} ref={containerRef}>
        <div className={styles.grid} ref={gridRef}>
          <div className={styles.gridRow}>
            {firstRowSkills.map((skill) => (
              <a
                key={skill.name}
                href={skill.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.gridItem}
              >
                <img src={skill.imgSrc} alt={`${skill.name} logo`} />
                <span className={styles.skillName}>{skill.name}</span>
              </a>
            ))}
          </div>
          <div className={styles.gridRow}>
            {secondRowSkills.map((skill) => (
              <a
                key={skill.name}
                href={skill.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.gridItem}
              >
                <img src={skill.imgSrc} alt={`${skill.name} logo`} />
                <span className={styles.skillName}>{skill.name}</span>
              </a>
            ))}
          </div>
        </div>
        <div
          className={`${styles.highlight} ${
            hasInteracted ? styles.visible : ""
          }`}
          ref={highlightRef}
        ></div>
      </div>
    </div>
  );
}
