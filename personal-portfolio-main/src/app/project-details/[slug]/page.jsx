"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { useParams } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "lenis/react";
import { projectsData } from "@/data/projectsData";
import { usePageTransition } from "@/hooks/usePageTransition";
import styles from "../ProjectDetails.module.css";
import ButtonLink from "@/components/common/ButtonLink/ButtonLink";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectDetails() {
  const params = useParams();
  const { navigateWithTransition, isTransitioning } = usePageTransition();
  const mainRef = useRef(null);
  const footerRef = useRef(null);
  const exitButtonRef = useRef(null);
  const projectNavRef = useRef(null);
  const progressBarRef = useRef(null);
  const snapshotsSectionRef = useRef(null);
  const snapshotsWrapperRef = useRef(null);
  const videoSectionRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const nextProjectProgressBarRef = useRef(null);
  const [projectData, setProjectData] = useState(null);
  const [isAutoTransitioning, setIsAutoTransitioning] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showHoverMessage, setShowHoverMessage] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detecta se é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Lógica para desmutar o vídeo (só funciona no desktop)
  const handleVideoClick = (e) => {
    if (isMobile) return; // Desabilita no mobile

    const videoElement = e.currentTarget;
    setIsMuted(!isMuted);
    videoElement.muted = !isMuted;
  };

  const handleMouseEnter = () => {
    if (!isMobile) setShowHoverMessage(true);
  };

  const handleMouseLeave = () => {
    if (!isMobile) setShowHoverMessage(false);
  };

  useEffect(() => {
    document.body.style.overflow = "auto";
    window.scrollTo(0, 0);
    void document.body.offsetHeight;

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      setIsAutoTransitioning(false);
    };
  }, [params.slug]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const slug = params?.slug;
      if (!slug) {
        setLoading(false);
        return;
      }

      const project = projectsData.find((p) => p.slug === slug);
      if (!project) {
        setLoading(false);
        return;
      }

      const currentIndex = projectsData.findIndex((p) => p.slug === slug);
      const nextIndex = (currentIndex + 1) % projectsData.length;
      const prevIndex =
        (currentIndex - 1 + projectsData.length) % projectsData.length;

      setProjectData({
        project,
        nextProject: projectsData[nextIndex],
        prevProject: projectsData[prevIndex],
      });

      setLoading(false);
      setIsAutoTransitioning(false);
    }
  }, [params]);

  useLayoutEffect(() => {
    if (!projectData || loading) return;

    const ctx = gsap.context(() => {
      // Animação do botão de saída (só desktop)
      if (exitButtonRef.current && !isMobile) {
        gsap.fromTo(
          exitButtonRef.current,
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 1, delay: 0.5, ease: "power3.out" }
        );
      }

      // Animações de entrada
      gsap.fromTo(
        projectNavRef.current,
        { opacity: 0, y: -100 },
        { opacity: 1, y: 0, duration: 1, delay: 0.25, ease: "power3.out" }
      );

      gsap.fromTo(
        ".reveal-title",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.5 }
      );

      gsap.fromTo(
        ".reveal-meta",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.7,
          stagger: 0.1,
        }
      );

      const revealElements = gsap.utils.toArray(".reveal-on-scroll");
      revealElements.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Animação do vídeo
      if (videoSectionRef.current) {
        const videoElement = videoSectionRef.current.querySelector("video");
        if (videoElement) {
          gsap.fromTo(
            videoElement,
            { scale: 0.8, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: videoSectionRef.current,
                start: "top 70%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }

      // Galeria - diferentes comportamentos para desktop e mobile
      const snapshotsWrapper = snapshotsWrapperRef.current;
      const snapshotsSection = snapshotsSectionRef.current;

      if (snapshotsWrapper && snapshotsSection) {
        if (!isMobile) {
          // Desktop: scroll horizontal
          const getScrollAmount = () =>
            -(snapshotsWrapper.scrollWidth - window.innerWidth);

          gsap.to(snapshotsWrapper, {
            x: getScrollAmount,
            ease: "none",
            scrollTrigger: {
              trigger: snapshotsSection,
              start: "top top",
              end: () => `+=${getScrollAmount() * -1}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
        } else {
          // Mobile: animações simples de entrada
          const snapshots = gsap.utils.toArray(".snapshotItem");
          snapshots.forEach((snapshot, index) => {
            gsap.fromTo(
              snapshot,
              { opacity: 0, y: 100 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: snapshot,
                  start: "top 85%",
                  toggleActions: "play none none none",
                },
                delay: index * 0.1,
              }
            );
          });
        }
      }

      // Barra de progresso principal
      ScrollTrigger.create({
        trigger: mainRef.current,
        start: "top top",
        endTrigger: footerRef.current,
        end: "top top",
        onUpdate: (self) => {
          if (progressBarRef.current) {
            gsap.set(progressBarRef.current, { scaleX: self.progress });
          }
        },
      });

      // Footer - diferentes comportamentos para desktop e mobile
      if (!isMobile) {
        // Desktop: scroll automático para próximo projeto
        ScrollTrigger.create({
          trigger: footerRef.current,
          start: "top top",
          end: `+=${window.innerHeight * 2}`,
          pin: true,
          pinSpacing: true,
          onEnter: () => {
            if (projectNavRef.current && !isAutoTransitioning) {
              gsap.to(projectNavRef.current, { y: -100, duration: 0.5 });
            }
            if (exitButtonRef.current && !isAutoTransitioning) {
              gsap.to(exitButtonRef.current, {
                opacity: 0,
                x: -50,
                duration: 0.5,
              });
            }
          },
          onLeaveBack: () => {
            if (projectNavRef.current && !isAutoTransitioning) {
              gsap.to(projectNavRef.current, { y: 0, duration: 0.5 });
            }
            if (exitButtonRef.current && !isAutoTransitioning) {
              gsap.to(exitButtonRef.current, {
                opacity: 1,
                x: 0,
                duration: 0.5,
              });
            }
          },
          onUpdate: (self) => {
            if (nextProjectProgressBarRef.current) {
              gsap.set(nextProjectProgressBarRef.current, {
                scaleX: self.progress,
              });
            }

            // Transição automática só no desktop
            if (
              self.progress >= 1 &&
              !isAutoTransitioning &&
              !isTransitioning
            ) {
              setIsAutoTransitioning(true);
              handleAutoTransition();
            }
          },
        });
      } else {
        // Mobile: footer simples sem scroll automático
        gsap.fromTo(
          footerRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, mainRef);

    return () => ctx.revert();
  }, [projectData, loading, isAutoTransitioning, isTransitioning, isMobile]);

  // Transição automática (só desktop)
  const handleAutoTransition = async () => {
    if (isMobile) return;

    try {
      document.body.style.overflow = "hidden";
      ScrollTrigger.getAll().forEach((st) => st.kill());
      await navigateWithTransition(
        `/project-details/${projectData.nextProject.slug}`
      );
    } catch (error) {
      console.error("Erro na transição automática:", error);
      document.body.style.overflow = "auto";
      setIsAutoTransitioning(false);
    }
  };

  // Navegação manual
  const handleNavigation = async (slug) => {
    if (isAutoTransitioning || isTransitioning) return;

    setIsAutoTransitioning(true);

    try {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      await navigateWithTransition(`/project-details/${slug}`);
    } catch (error) {
      console.error("Erro na navegação:", error);
      setIsAutoTransitioning(false);
    }
  };

  // Função específica para o botão mobile
  const handleMobileNextProject = () => {
    if (!isMobile || isAutoTransitioning || isTransitioning) return;
    handleNavigation(projectData.nextProject.slug);
  };

  if (loading) {
    return <div className={styles.loading}>Carregando...</div>;
  }

  if (!projectData) {
    return (
      <div className={styles.notFound}>
        <h1>Projeto não encontrado</h1>
        <ButtonLink href="/work">← Voltar aos projetos</ButtonLink>
      </div>
    );
  }

  const { project, nextProject, prevProject } = projectData;

  return (
    <ReactLenis root>
      {/* Botão de Saída - só desktop */}
      {!isMobile && (
        <div ref={exitButtonRef} className={styles.exitButtonWrapper}>
          <ButtonLink href="/work">← Todos os Projetos</ButtonLink>
        </div>
      )}

      <div className={styles.projectPage} ref={mainRef}>
        {/* Navigation Bar */}
        <div className={styles.projectNav} ref={projectNavRef}>
          <div className={styles.link}>
            <span>&#8592;&nbsp;</span>
            <button
              onClick={() => handleNavigation(prevProject.slug)}
              className={styles.navButton}
              disabled={isAutoTransitioning || isTransitioning}
              style={{
                opacity: isAutoTransitioning || isTransitioning ? 0.5 : 1,
                cursor:
                  isAutoTransitioning || isTransitioning
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              Anterior
            </button>
          </div>

          <div className={styles.projectPageScrollProgress}>
            <p>{project.title}</p>
            <div
              className={styles.projectPageScrollProgressBar}
              ref={progressBarRef}
            />
          </div>

          <div className={styles.link}>
            <button
              onClick={() => handleNavigation(nextProject.slug)}
              className={styles.navButton}
              disabled={isAutoTransitioning || isTransitioning}
              style={{
                opacity: isAutoTransitioning || isTransitioning ? 0.5 : 1,
                cursor:
                  isAutoTransitioning || isTransitioning
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              Próximo
            </button>
            <span>&nbsp;&#8594;</span>
          </div>
        </div>

        {/* Hero Section */}
        <header className={styles.projectHeader}>
          <h1 className="reveal-title">{project.title}</h1>
          <div className={styles.headerDivider} />
          <div className={styles.projectMeta}>
            <div className={`${styles.metaColumn} reveal-meta`}>
              <p>{project.url}</p>
              <p>{project.type}</p>
            </div>
            <div className={`${styles.metaColumn} reveal-meta`}>
              <p>{project.date}</p>
              <p>{project.categories}</p>
            </div>
          </div>
        </header>

        {/* Banner Image */}
        <div className={`${styles.projectBanner} reveal-on-scroll`}>
          <img src={project.bannerImage} alt={`${project.title} banner`} />
        </div>

        {/* Seção de Vídeo */}
        {project.videoUrl && (
          <section
            className={`${styles.projectVideo} reveal-on-scroll`}
            ref={videoSectionRef}
          >
            <div className={styles.videoContainer}>
              <div
                className={styles.videoWrapper}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <video
                  autoPlay
                  loop
                  playsInline
                  className={styles.demoVideo}
                  muted={isMuted}
                  onClick={handleVideoClick}
                >
                  <source src={project.videoUrl} type="video/mp4" />
                  Seu navegador não suporta o elemento de vídeo.
                </video>

                {!isMobile && (
                  <div
                    className={styles.videoOverlay}
                    style={{
                      opacity: isMuted ? (showHoverMessage ? 1 : 0) : 0,
                      pointerEvents: "none",
                    }}
                  >
                    <div className={styles.playIndicator}>
                      <div className={styles.playIcon}>
                        {isMuted ? "▶" : "❚❚"}
                      </div>
                    </div>
                    <p className={styles.muteMessage}>
                      Clique para {isMuted ? "desmutar" : "mutar"}
                    </p>
                  </div>
                )}
              </div>

              <div className={styles.videoCaption}>
                <p>Demonstração interativa do projeto</p>
                <span>Vídeo mostrando as principais funcionalidades</span>
              </div>
            </div>
          </section>
        )}

        {/* Overview Section */}
        <section className={`${styles.projectOverview} reveal-on-scroll`}>
          <div className={styles.overviewColumn}></div>
          <div className={styles.overviewColumn}>
            <div className={styles.descriptionSection}>
              <h3>
                <span>&#9654;</span> Stack
              </h3>
              <div className={styles.stackItems}>
                {project.stack.map((tech, i) => (
                  <p key={i}>{tech}</p>
                ))}
              </div>
            </div>
            <div className={styles.descriptionSection}>
              <h3>
                <span>&#9654;</span> Background
              </h3>
              <p>{project.background}</p>
            </div>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.githubButton}
              >
                Ver no GitHub
              </a>
            )}
          </div>
        </section>

        {/* Galeria - Layout muda conforme o dispositivo */}
        <section className={styles.projectSnapshots} ref={snapshotsSectionRef}>
          <div className={styles.snapshotsWrapper} ref={snapshotsWrapperRef}>
            {project.snapshots.map((snapshot, index) => (
              <div
                className={`${styles.snapshotItem} snapshotItem`}
                key={index}
              >
                <div className={styles.imageContainer}>
                  <img
                    src={snapshot.url}
                    alt={`${project.title} screenshot ${index + 1}`}
                  />
                  <div className={styles.imageOverlay}>
                    <span className={styles.imageIndex}>
                      {String(index + 1).padStart(2, "0")} /{" "}
                      {String(project.snapshots.length).padStart(2, "0")}
                    </span>
                  </div>
                  <div className={styles.hoverIndicator}></div>
                </div>

                <div className={styles.imageDescription}>
                  <p>{snapshot.description}</p>
                  <span>Screenshot {index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Next Project Footer */}
        <footer className={styles.projectFooter} ref={footerRef}>
          <div>
            <h1>{nextProject.title}</h1>
            <p>Próximo Projeto</p>
            <div className={styles.nextProjectMeta}>
              <span>{nextProject.type}</span>
              <span>{nextProject.date}</span>
            </div>

            {/* Botão para mobile */}
            {isMobile && (
              <button
                className={styles.mobileNextButton}
                onClick={handleMobileNextProject}
                disabled={isAutoTransitioning || isTransitioning}
              >
                Ir para {nextProject.title}
              </button>
            )}
          </div>

          {/* Barra de progresso só no desktop */}
          {!isMobile && (
            <div className={styles.nextProjectProgress}>
              <div
                className={styles.nextProjectProgressBar}
                ref={nextProjectProgressBarRef}
              />
            </div>
          )}
        </footer>
      </div>
    </ReactLenis>
  );
}
