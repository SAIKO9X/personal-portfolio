"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "lenis/react";
import Footer from "@/components/layout/Footer/Footer";
import styles from "./About.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const mainRef = useRef(null);
  const portraitRef = useRef(null);
  const tagsRef = useRef([]);
  const copyContentRef = useRef(null);

  useLayoutEffect(() => {
    if (!mainRef.current) return;

    let ctx = gsap.context(() => {
      // Animação do retrato flutuando
      if (portraitRef.current) {
        gsap.to(portraitRef.current, {
          y: "20px",
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      }

      // Animação de entrada do hero
      const heroElements = mainRef.current.querySelectorAll(
        `.${styles.aboutHeroHeader} h1, .${styles.aboutHeroBio} p`
      );

      gsap.fromTo(
        heroElements,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        }
      );

      // Animação do retrato aparecendo (termina reto, sem inclinação)
      if (portraitRef.current) {
        gsap.fromTo(
          portraitRef.current,
          {
            scale: 0,
            rotation: -180,
          },
          {
            scale: 1,
            rotation: 0,
            duration: 1.2,
            delay: 0.8,
            ease: "back.out(1.7)",
          }
        );
      }

      // Animação do conteúdo de copy
      if (copyContentRef.current) {
        gsap.fromTo(
          copyContentRef.current,
          {
            y: 100,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: copyContentRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );

        // Animação dos spans destacados
        const highlightedSpans =
          copyContentRef.current.querySelectorAll("span");

        gsap.fromTo(
          highlightedSpans,
          {
            backgroundSize: "0% 100%",
          },
          {
            backgroundSize: "100% 100%",
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: copyContentRef.current,
              start: "top 60%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Animação das tags flutuantes
      tagsRef.current.forEach((tag, index) => {
        if (tag) {
          // Movimento flutuante individual
          gsap.to(tag, {
            y: `${gsap.utils.random(-30, 30)}px`,
            x: `${gsap.utils.random(-20, 20)}px`,
            rotation: `${gsap.utils.random(-15, 15)}deg`,
            duration: gsap.utils.random(3, 5),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.2,
          });

          // Aparecimento das tags com scroll
          gsap.fromTo(
            tag,
            {
              scale: 0,
              opacity: 0,
            },
            {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              delay: index * 0.1,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: `.${styles.aboutCopy}`,
                start: "top 70%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });

      // Parallax na seção do herói
      gsap.to(`.${styles.aboutHeroPortrait}`, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: `.${styles.aboutHero}`,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <ReactLenis root>
      <div ref={mainRef}>
        {/* Hero Section */}
        <section className={styles.aboutHero}>
          <div className={styles.aboutHeroHeader}>
            <h1>Um pouco sobre</h1>
            <h1>Carlos Eduardo</h1>
          </div>
          <div className={styles.aboutHeroBio}>
            <p className={styles.ss}>
              Para mim, a tecnologia vai além do código. É a paixão por montar e
              otimizar computadores, a criatividade que coloco em designs no
              Figma e Photoshop, e a curiosidade que me leva a editar vídeos.
              Fora da tela, você pode me encontrar imerso em animes e mangás ou
              vibrando com uma partida de futebol — seja assistindo ou jogando.
            </p>
            <p className={styles.mn}>
              Conectando paixões, construindo soluções
            </p>
          </div>
          <div className={styles.aboutHeroPortrait} ref={portraitRef}>
            <img src="/images/portrait.jpg" alt="Carlos Eduardo portrait" />
          </div>
        </section>

        {/* Copy Section */}
        <section className={styles.aboutCopy}>
          <div className={styles.aboutCopyContent} ref={copyContentRef}>
            <h3>
              Minha abordagem é uma mistura de lógica e criatividade. Sou o
              desenvolvedor que não apenas constrói um backend{" "}
              <span>robusto</span> com Java e Spring, mas que também se preocupa
              com a <span>estética</span> e a usabilidade da interface em React.
              Acredito que as melhores soluções nascem quando a{" "}
              <span>engenharia</span> encontra o <span>design</span>.
            </h3>
            <h3>
              Minhas paixões alimentam meu trabalho. A estratégia de uma partida
              de <span>futebol</span> me ensina sobre trabalho em equipe e
              tática em projetos. A arte dos <span>animes</span> e mangás
              inspira soluções visuais inesperadas. E a precisão de montar{" "}
              <span>hardware</span> se traduz em um código mais limpo e{" "}
              <span>eficiente</span>.
            </h3>
            <h3>
              No fim do dia, sou um criador. Seja configurando um deploy na{" "}
              <span>AWS</span>, desenhando uma interface no <span>Figma</span>{" "}
              ou simplesmente descobrindo uma nova história, estou sempre
              construindo algo. Se você busca um desenvolvedor que une
              performance técnica com uma <span>visão humana</span> e criativa,
              vamos criar algo <span>extraordinário</span> juntos.
            </h3>
          </div>
          <div
            className={styles.tag}
            id={styles.tag1}
            ref={(el) => (tagsRef.current[0] = el)}
          >
            <p>Web Design</p>
          </div>
          <div
            className={styles.tag}
            id={styles.tag2}
            ref={(el) => (tagsRef.current[1] = el)}
          >
            <p>Animes & Mangas</p>
          </div>
          <div
            className={styles.tag}
            id={styles.tag3}
            ref={(el) => (tagsRef.current[2] = el)}
          >
            <p>Futebol</p>
          </div>
          <div
            className={styles.tag}
            id={styles.tag4}
            ref={(el) => (tagsRef.current[3] = el)}
          >
            <p>Programador</p>
          </div>

          <div
            className={styles.tag}
            id={styles.tag5}
            ref={(el) => (tagsRef.current[4] = el)}
          >
            <p>Edição de Vídeo</p>
          </div>
        </section>

        <Footer />
      </div>
    </ReactLenis>
  );
}
