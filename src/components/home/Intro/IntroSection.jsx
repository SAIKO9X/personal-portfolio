"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./IntroSection.module.css";
import { FaDownload, FaLinkedin, FaGithub } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function IntroSection() {
  const introRef = useRef(null);

  // calcula a idade dinamicamente com base em 06/07/2004
  const age = (() => {
    const birthDate = new Date("2004-07-06");
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    return calculatedAge;
  })();

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
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
    });
  }, { scope: introRef });

  return (
    <section className={`${styles.intro} intro`} ref={introRef}>
      {/* PRIMEIRO CARD - APRESENTAÇÃO */}
      <div className={styles.intro_one}>
        <div className={styles.intro_card}>
          <div className={styles.intro_card_inner}>
            <div className={styles.intro_card_caption}>
              <span>Desenvolvedor Fullstack</span>
            </div>

            <div className={styles.intro_card_title}>
              <h1 className={styles.mainTitle}>PORTFOLIO</h1>
              <p className={styles.subTitle}>Carlos Eduardo Aleixo - Desenvolvedor Web</p>
            </div>

            <div className={styles.intro_card_description}>
              <p>
                Desenvolvedor de Sistemas focado em Java e React, transformando
                ideias em soluções digitais robustas e escaláveis.
              </p>
            </div>

            <div className={styles.intro_card_info}>
              <span>continue para saber mais</span>
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
                  <h2>SOBRE MIM</h2>
                </div>

               <div className={styles.skills_grid}>
  <div className={styles.skills_highlight}>
    <div className={styles.skills_accent_bar} />
    <span className={styles.skills_num}>01 — Arquitetura & Cloud</span>
    <h3>Backend & Infraestrutura</h3>
    <p>
      Microsserviços, mensageria com <strong>RabbitMQ</strong> e <strong>Kafka</strong>,
      migrações via Flyway. Pipelines CI/CD e <strong>Clean Architecture</strong> como
      base de design.
    </p>
    <div className={styles.skills_tags}>
      <span>Docker</span><span>AWS</span><span>CI/CD</span><span>Spring Boot</span>
    </div>
  </div>

  <div className={styles.skills_highlight}>
    <div className={styles.skills_accent_bar} />
    <span className={styles.skills_num}>02 — Dados</span>
    <h3>Bancos & Persistência</h3>
    <p>
      Modelagem resiliente com <strong>PostgreSQL, MySQL, MongoDB</strong> e <strong>Redis</strong>.
      Melhores práticas e padrões para performance e alta escalabilidade.
    </p>
    <div className={styles.skills_tags}>
      <span>PostgreSQL</span><span>MongoDB</span><span>Redis</span><span>MySQL</span>
    </div>
  </div>

  <div className={styles.skills_highlight}>
    <div className={styles.skills_accent_bar} />
    <span className={styles.skills_num}>03 — Front-end</span>
    <h3>Interfaces & Animações</h3>
    <p>
      Interfaces modernas com <strong>React</strong> e <strong>Next.js</strong>. Apaixonado
      por animações fluidas sob medida com <strong>GSAP</strong> e integrações full-stack
      via <strong>WebSockets</strong>.
    </p>
    <div className={styles.skills_tags}>
      <span>React</span><span>Next.js</span><span>GSAP</span><span>Tailwind</span>
    </div>
  </div>

  <div className={styles.skills_highlight}>
    <div className={styles.skills_accent_bar} />
    <span className={styles.skills_num}>04 — Aprendizado Contínuo</span>
    <h3>Sempre em Evolução</h3>
    <p>
      Curioso e em constante desenvolvimento ({age} anos). Exploро metodologias ágeis,
      automações com <strong>N8N</strong> e tecnologias de alta performance como{" "}
      <strong>Quarkus</strong> — sempre pronto para o próximo desafio.
    </p>
    <div className={styles.skills_tags}>
      <span>N8N</span><span>Quarkus</span><span>Ágil</span>
    </div>
  </div>
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

                <div className={styles.availability}>
  <div className={styles.availability_dot} />
  <span>Disponível para oportunidades — Full-time ou Freelance</span>
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
