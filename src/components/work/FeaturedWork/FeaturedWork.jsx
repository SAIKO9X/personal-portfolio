"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import styles from "./FeaturedWork.module.css";
import { featuredProjects } from "@/data/projectsData";

gsap.registerPlugin(ScrollTrigger);

const featuredWorksConfig = {
  scrollHeight: 5,
  breakpoint: 1000,
  indicatorSections: 3,
  indicatorsPerSection: 10,
};

export default function FeaturedWork() {
  const containerRef = useRef(null);
  const projectsRef = useRef(null);
  const indicatorContainerRef = useRef(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    if (window.innerWidth <= featuredWorksConfig.breakpoint) {
      return;
    }

    const indicatorContainer = indicatorContainerRef.current;
    if (indicatorContainer) {
      indicatorContainer.innerHTML = "";
      for (
        let section = 1;
        section <= featuredWorksConfig.indicatorSections;
        section++
      ) {
        const sectionNumber = document.createElement("p");
        sectionNumber.className = styles.mn;
        sectionNumber.textContent = `0${section}`;
        indicatorContainer.appendChild(sectionNumber);
        for (let i = 0; i < featuredWorksConfig.indicatorsPerSection; i++) {
          const indicator = document.createElement("div");
          indicator.className = styles.indicator;
          indicatorContainer.appendChild(indicator);
        }
      }
    }

    const projects = projectsRef.current;
    const moveDistance = window.innerWidth * featuredProjects.length;

    ScrollTrigger.create({
      trigger: container,
      start: "top top+=1",
      end: `+=${window.innerHeight * featuredWorksConfig.scrollHeight}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      refreshPriority: 0,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const xPosition = -moveDistance * self.progress;
        gsap.set(projects, { x: xPosition });

        const indicators = document.querySelectorAll(`.${styles.indicator}`);
        const totalIndicators = indicators.length;
        const progressPerIndicator = 1 / totalIndicators;
        indicators.forEach((indicator, index) => {
          const indicatorStart = index * progressPerIndicator;
          const indicatorOpacity = self.progress > indicatorStart ? 1 : 0.2;
          gsap.to(indicator, {
            opacity: indicatorOpacity,
            duration: 0.3,
          });
        });
      },
    });

  }, { scope: containerRef });

  return (
    <section className={styles.featuredWork} ref={containerRef}>
      <div className={styles.projectsContainer} ref={projectsRef}>
        <div className={styles.titleSlide}>
          <h2 className={styles.sectionTitle}>projetos em destaque</h2>
        </div>

        {featuredProjects.map((project, index) => (
          <div key={project.slug} className={styles.projectSlide}>
            <div className={styles.projectContent}>
              <div className={styles.projectImage}>
                <div className={styles.spotlight}></div>
                <Image 
                  src={project.bannerImage} 
                  alt={project.title} 
                  fill 
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                />
                <div className={styles.projectOverlay}>
                  <h3>{project.title}</h3>
                  <p>{project.shortDescription}</p>
                  <div className={styles.projectTags}>
                    {project.tags.map((tag, i) => (
                      <span key={i} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={`/project-details/${project.slug}`}
                    className={styles.projectLink}
                  >
                    Ver Projeto
                  </a>
                </div>
              </div>
              <div className={styles.projectInfo}>
                <span className={styles.projectNumber}>0{index + 1}</span>
                <h2 className={styles.projectTitle}>{project.title}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className={styles.featuredWorkIndicator}
        ref={indicatorContainerRef}
      ></div>

      <div className={styles.featuredWorkFooter}>
        <p className={styles.mn}>
          Projetos Selecionados [ {featuredProjects.length} ]
        </p>

        <a href="/work" className={styles.viewAllButton}>
          Veja Todos os Projetos
        </a>
      </div>
    </section>
  );
}
