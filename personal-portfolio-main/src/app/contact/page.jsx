"use client";

import { useRef, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "lenis/react";
import styles from "./Contact.module.css";
import PhysicsSkills from "@/components/about/PhysicsSkills/PhysicsSkills";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const mainRef = useRef(null);
  const heroRef = useRef(null);
  const detailsRef = useRef(null);
  const rowsRef = useRef([]);
  const [currentTime, setCurrentTime] = useState("");

  const updateTime = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "America/Sao_Paulo",
    });
    setCurrentTime(`${timeString} BRT`);
  };

  // WhatsApp handler
  const handleWhatsAppClick = () => {
    const phoneNumber = "5562993674953";
    const message =
      "Olá! Vim através do seu portfólio e gostaria de conversar sobre um projeto.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  useLayoutEffect(() => {
    if (!mainRef.current) return;

    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Criar contexto GSAP isolado para a página Contact
    let ctx = gsap.context(() => {
      // Hero animation
      if (heroRef.current) {
        const heroElements = heroRef.current.querySelectorAll("h1, p");
        gsap.fromTo(
          heroElements,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out",
            delay: 0.3,
          }
        );
      }

      if (detailsRef.current) {
        // Garantir visibilidade inicial
        const allContactItems =
          detailsRef.current.querySelectorAll(".contact-item");
        gsap.set(allContactItems, { opacity: 1, visibility: "visible" });

        rowsRef.current.forEach((row, index) => {
          if (row) {
            const elements = row.querySelectorAll(".contact-item");

            gsap.fromTo(
              elements,
              {
                y: 30,
                autoAlpha: 0,
              },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: row,
                  start: "top 90%",
                  end: "bottom 60%",
                  toggleActions: "play none none reverse",
                  id: `contact-row-${index}`,
                },
                delay: index * 0.05,
              }
            );
          }
        });
      }

      // Parallax effect - apenas se o elemento existir
      if (heroRef.current) {
        gsap.to(heroRef.current, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
            id: "hero-parallax",
          },
        });
      }
    }, mainRef);

    return () => {
      clearInterval(interval);
      ctx.revert(); // Limpa todo o contexto GSAP
    };
  }, []);

  return (
    <ReactLenis root>
      <div ref={mainRef} className={styles.contactPage}>
        {/* Hero Section */}
        <section className={styles.contactHero} ref={heroRef}>
          <div className={styles.heroContainer}>
            <h1>
              Transformando ideias em soluções digitais robustas e escaláveis.
              Vamos construir algo extraordinário juntos.
            </h1>
          </div>
        </section>

        {/* Contact Details */}
        <section className={styles.contactDetails} ref={detailsRef}>
          <div className={styles.detailsContainer}>
            {/* Row 1: Let's Build */}
            <div className={styles.row} ref={(el) => (rowsRef.current[0] = el)}>
              <div className={styles.col}>
                <div className="contact-item">
                  <h2>Vamos Construir</h2>
                </div>
              </div>
              <div className={styles.col}>
                <div className={styles.subCol}>
                  <div className="contact-item">
                    <h3>Novos Projetos</h3>
                    <p>cardosed3@gmail.com</p>
                  </div>
                </div>
                <div className={styles.subCol}>
                  <div className="contact-item">
                    <h3>ofertas</h3>
                    <button
                      className={styles.whatsappBtn}
                      onClick={handleWhatsAppClick}
                    >
                      Fale Comigo
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: Location */}
            <div className={styles.row} ref={(el) => (rowsRef.current[1] = el)}>
              <div className={styles.col}>
                <div className="contact-item">
                  <h2>Localização</h2>
                </div>
              </div>
              <div className={styles.col}>
                <div className={styles.subCol}>
                  <div className="contact-item">
                    <h3>Goiânia, GO</h3>
                    <p>Centro-Oeste, Brasil</p>
                  </div>
                </div>
                <div className={styles.subCol}>
                  <div className="contact-item">
                    <h3>Horário Local</h3>
                    <p className={styles.currentTime}>{currentTime}</p>
                    <div className={styles.statusIndicator}>
                      <span className={styles.statusDot}></span>
                      <span>Disponível para serviços</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 3: Connect */}
            <div className={styles.row} ref={(el) => (rowsRef.current[2] = el)}>
              <div className={styles.col}>
                <div className="contact-item">
                  <h2>Conecte-se</h2>
                </div>
              </div>
              <div className={styles.col}>
                <div className={styles.subCol}>
                  <div className="contact-item">
                    <h3>Redes Sociais</h3>
                    <p>
                      <a
                        href="https://www.linkedin.com/in/carlosealeixo/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LinkedIn
                      </a>
                    </p>
                    <p>
                      <a
                        href="https://github.com/SAIKO9X"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub
                      </a>
                    </p>
                  </div>
                </div>
                <div className={styles.subCol}>
                  <div className="contact-item">
                    <h3>Tempo de Resposta</h3>
                    <p>Email: até 24h</p>
                    <p>WhatsApp: até 2h</p>
                    <p>LinkedIn: até 48h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <PhysicsSkills />
      </div>
    </ReactLenis>
  );
}
