"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  const projectRefs = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollTriggerInstance = null;
    let currentHoveredProject = null;

    const initAnimations = () => {
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
        scrollTriggerInstance = null;
      }
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

      scrollTriggerInstance = ScrollTrigger.create({
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

          // Detectar qual projeto está sob o mouse
          checkProjectUnderMouse();

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
    };

    // Função para detectar qual projeto está sob o mouse
    const checkProjectUnderMouse = () => {
      if (!projectsRef.current) return;

      const mouseX = window.mouseX || 0;
      const mouseY = window.mouseY || 0;

      let newHoveredProject = null;

      projectRefs.current.forEach((projectElement, index) => {
        if (!projectElement) return;

        const rect = projectElement.getBoundingClientRect();
        const isUnderMouse =
          mouseX >= rect.left &&
          mouseX <= rect.right &&
          mouseY >= rect.top &&
          mouseY <= rect.bottom;

        if (isUnderMouse) {
          newHoveredProject = { element: projectElement, index };
        }
      });

      // Se mudou o projeto sob o mouse
      if (currentHoveredProject?.element !== newHoveredProject?.element) {
        // Remove hover do projeto anterior
        if (currentHoveredProject) {
          handleMouseLeave(currentHoveredProject.element);
        }

        // Adiciona hover ao novo projeto
        if (newHoveredProject) {
          handleMouseEnter(newHoveredProject.element, mouseX, mouseY);
        }

        currentHoveredProject = newHoveredProject;
      } else if (newHoveredProject) {
        // Atualiza posição do mouse se ainda estiver sobre o mesmo projeto
        handleMouseMove(
          { clientX: mouseX, clientY: mouseY },
          newHoveredProject.element
        );
      }
    };

    // Função para capturar posição global do mouse
    const trackMousePosition = (e) => {
      window.mouseX = e.clientX;
      window.mouseY = e.clientY;
    };

    const handleMouseEnter = (projectElement, mouseX, mouseY) => {
      projectElement.classList.add(styles.isHovered);

      // Simular evento de mouse move para inicializar posições
      const rect = projectElement.getBoundingClientRect();
      const simulatedEvent = {
        clientX: mouseX || rect.left + rect.width / 2,
        clientY: mouseY || rect.top + rect.height / 2,
      };
      handleMouseMove(simulatedEvent, projectElement);
    };

    const handleMouseMove = (e, projectElement) => {
      const rect = projectElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;
      const moveX = ((x - centerX) / centerX) * 20;
      const moveY = ((y - centerY) / centerY) * 20;

      gsap.to(projectElement, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.5,
        ease: "power2.out",
        transformPerspective: 1000,
      });

      const spotlight = projectElement.querySelector(`.${styles.spotlight}`);
      if (spotlight) {
        gsap.to(spotlight, {
          x: x - rect.width / 2,
          y: y - rect.height / 2,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      const overlayContent = projectElement.querySelectorAll(
        `.${styles.projectOverlay} > *`
      );
      overlayContent.forEach((element, index) => {
        const depth = (index + 1) * 0.5;
        gsap.to(element, {
          x: moveX * depth,
          y: moveY * depth,
          duration: 0.5,
          ease: "power2.out",
        });
      });
    };

    const handleMouseLeave = (projectElement) => {
      projectElement.classList.remove(styles.isHovered);

      gsap.to(projectElement, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: "power2.out",
      });

      const overlayContent = projectElement.querySelectorAll(
        `.${styles.projectOverlay} > *`
      );
      overlayContent.forEach((element) => {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      });
    };

    // Event listeners originais (mantidos para casos onde não há scroll)
    projectRefs.current.forEach((projectRef) => {
      if (projectRef) {
        const handleMove = (e) => {
          window.mouseX = e.clientX;
          window.mouseY = e.clientY;
          handleMouseMove(e, projectRef);
        };
        const handleEnter = (e) => {
          currentHoveredProject = {
            element: projectRef,
            index: projectRefs.current.indexOf(projectRef),
          };
          handleMouseEnter(projectRef, e.clientX, e.clientY);
        };
        const handleLeave = () => {
          if (currentHoveredProject?.element === projectRef) {
            currentHoveredProject = null;
          }
          handleMouseLeave(projectRef);
        };

        projectRef.addEventListener("mousemove", handleMove);
        projectRef.addEventListener("mouseenter", handleEnter);
        projectRef.addEventListener("mouseleave", handleLeave);

        projectRef._cleanupEvents = () => {
          projectRef.removeEventListener("mousemove", handleMove);
          projectRef.removeEventListener("mouseenter", handleEnter);
          projectRef.removeEventListener("mouseleave", handleLeave);
        };
      }
    });

    // Adicionar listener global para tracking do mouse
    document.addEventListener("mousemove", trackMousePosition);

    initAnimations();
    const handleResize = () => initAnimations();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousemove", trackMousePosition);
      if (scrollTriggerInstance) scrollTriggerInstance.kill();
      projectRefs.current.forEach((projectRef) => {
        if (projectRef && projectRef._cleanupEvents)
          projectRef._cleanupEvents();
      });
    };
  }, []);

  return (
    <section className={styles.featuredWork} ref={containerRef}>
      <div className={styles.projectsContainer} ref={projectsRef}>
        <div className={styles.titleSlide}>
          <h1 className={styles.sectionTitle}>projetos selecionados</h1>
        </div>

        {featuredProjects.map((project, index) => (
          <div key={project.slug} className={styles.projectSlide}>
            <div className={styles.projectContent}>
              <div
                className={styles.projectImage}
                ref={(el) => (projectRefs.current[index] = el)}
              >
                <div className={styles.spotlight}></div>
                <img src={project.bannerImage} alt={project.title} />
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
