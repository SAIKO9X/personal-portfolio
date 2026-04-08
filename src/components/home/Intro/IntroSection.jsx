"use client";
import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./IntroSection.module.css";
import { FaDownload, FaLinkedin, FaGithub } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function IntroSection() {
  const introRef = useRef(null);

  useLayoutEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    let ctx = gsap.context(() => {
      if (!isMobile) {
        const introTl = gsap.timeline({
          scrollTrigger: {
            trigger: introRef.current,
            start: "top top",
            end: () =>
              "+=" + (introRef.current.scrollHeight - window.innerHeight),
            scrub: true,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            refreshPriority: 10,
          },
        });

        introTl.fromTo(
          `.${styles.intro_card}`,
          { autoAlpha: 0, y: 50 },
          { autoAlpha: 1, y: 0, ease: "power2.out", duration: 1 }
        );

        introTl.fromTo(
          `.${styles.intro_card}`,
          { scale: 0.8 },
          { scale: 1, ease: "power2.out", duration: 2 }
        );
      }
    }, introRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={`${styles.intro} intro`} ref={introRef}>
      {/* PRIMEIRO CARD - APRESENTAÇÃO */}
      <div className={styles.intro_one}>
        <div className={styles.intro_card}>
          <div className={styles.intro_card_inner}>
            <div className={styles.intro_card_caption}>
              <span>Desenvolvedor Backend</span>
            </div>

            <div className={styles.intro_card_title}>
              <h2>PORTFOLIO</h2>
              <h3>Carlos Eduardo</h3>
            </div>

            <div className={styles.intro_card_description}>
              <p>
                Desenvolvedor de Sistemas focado em Java e React, transformando
                ideias em soluções digitais robustas e escaláveis.
              </p>
            </div>

            <div className={styles.intro_card_info}>
              <span>Role para baixo</span>
            </div>
          </div>
        </div>
      </div>

      {/* SEGUNDO CARD - SOBRE MIM */}
      <div className={styles.intro_two}>
        <div className={styles.intro_card}>
          <div className={styles.intro_card_inner}>
            <div className={styles.about_section}>
              <div className={styles.about_text}>
                <div className={styles.intro_card_caption}>
                  <span>SOBRE MIM</span>
                </div>

                <div className={styles.intro_card_description}>
                  <p>
                    Tenho 20 anos e sou formado em Análise e Desenvolvimento de
                    Sistemas pela FIAP. Possuo sólidos conhecimentos em Java,
                    com foco no ecossistema Spring, e experiência no
                    desenvolvimento de APIs documentadas com Swagger.
                  </p>

                  <div className={styles.skills_highlight}>
                    <p>
                      No front-end, trabalho com React integrando interfaces
                      dinâmicas a sistemas robustos. Também tenho conhecimentos
                      em design usando Canva e Photoshop.
                    </p>
                  </div>

                  <p>
                    Estou familiarizado com metodologias ágeis, práticas de
                    CI/CD e processos de deploy. Meu objetivo é evoluir na
                    carreira de programação e viver da minha paixão por
                    tecnologia.
                  </p>
                </div>
              </div>

              <div className={styles.about_text}>
                <div className={styles.intro_card_caption}>
                  <span>Vamos nos Conectar</span>
                </div>

                <div className={styles.intro_card_description}>
                  <p>
                    Estou sempre aberto a novos desafios e colaborações. Explore
                    meus links profissionais ou baixe meu currículo para saber
                    mais sobre minha experiência e projetos.
                  </p>
                </div>

                {/* Container para os botões */}
                <div className={styles.button_container}>
                  {/* Botão Download CV */}
                  <a
                    href="\cv\cv-eduardo_aleixo.pdf"
                    download
                    className={styles.icon_button}
                    aria-label="Baixar Currículo"
                  >
                    <FaDownload className={styles.icon} />
                    <span className={styles.icon_label}>Download CV</span>
                  </a>

                  {/* Botão LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/carlosealeixo/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.icon_button}
                    aria-label="Ver perfil no LinkedIn"
                  >
                    <FaLinkedin className={styles.icon} />
                    <span className={styles.icon_label}>LinkedIn</span>
                  </a>

                  {/* Botão GitHub */}
                  <a
                    href="https://github.com/SAIKO9X"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.icon_button}
                    aria-label="Ver perfil no GitHub"
                  >
                    <FaGithub className={styles.icon} />
                    <span className={styles.icon_label}>GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
