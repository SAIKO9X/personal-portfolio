"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import styles from "./ServicesSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const ServiceItem = ({ number, title, copy, tags, imgSrc, isLast }) => {
  return (
    <>
      <div className={styles.serviceItem}>
        <div className={styles.serviceContentWrapper}>
          <span className={styles.serviceNumber}>{number}</span>
          <div className={styles.serviceInfo}>
            <h2 className={styles.serviceTitle}>{title}</h2>
            <p className={styles.serviceDescription}>{copy}</p>
            {tags && tags.length > 0 && (
              <div className={styles.serviceTags}>
                {tags.map((tag, i) => (
                  <span key={i} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className={styles.serviceImage}>
          <img src={imgSrc} alt={title} />
        </div>
      </div>
      {!isLast && <div className={styles.serviceDivider}></div>}
    </>
  );
};

export default function ServicesSection() {
  const servicesData = [
    {
      number: "01",
      title: "Infraestrutura & DevOps",
      copy: "Planejando e implementando infraestruturas robustas na nuvem, automatizando processos de CI/CD para entregas ágeis e seguras, e garantindo a saúde das aplicações com monitoramento contínuo.",
      tags: [
        "AWS",
        "DOCKER",
        "CI/CD",
        "GITHUB ACTIONS",
        "GRAFANA & PROMETHEUS",
        "FLYWAY",
      ],
      imgSrc: "/services/card-1.jpg",
    },
    {
      number: "02",
      title: "Web Design & UX/UI",
      copy: "Desenhando experiências digitais que unem estratégia de produto e criatividade com insights de UX, focando em funcionalidade, performance e facilidade de uso.",
      tags: [
        "FIGMA",
        "CANVA",
        "REACT",
        "TAILWIND",
        "HTML5 & CSS3",
        "DESIGN RESPONSIVO",
      ],
      imgSrc: "/services/card-2.jpg",
    },
    {
      number: "03",
      title: "Desenvolvimento Full-Stack",
      copy: "Construindo o coração de produtos digitais, com APIs RESTful seguras e performáticas em Java e Spring, e integrando com bancos de dados relacionais e NoSQL.",
      tags: [
        "JAVA & SPRING",
        "API REST",
        "JUNIT & MOCKITO",
        "POSTGRESQL & MYSQL",
        "MONGODB",
        "SWAGGER",
      ],
      imgSrc: "/services/card-3.jpg",
    },
  ];

  const container = useRef(null);
  const headerRef = useRef(null);
  const wrapperRef = useRef(null);
  const itemsRef = useRef([]);

  useLayoutEffect(() => {
    // Aguarda um pequeno delay para garantir que os elementos estejam no DOM
    const timer = setTimeout(() => {
      if (!container.current) return;

      let ctx = gsap.context(() => {
        // Animação do cabeçalho da seção
        if (headerRef.current) {
          gsap.fromTo(
            headerRef.current,
            {
              opacity: 0,
              y: 30,
            },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: container.current,
                start: "top 80%",
                toggleActions: "play none none none",
                // Debug - remova após testar
                // markers: true,
              },
            }
          );
        }

        // Animação do wrapper dos serviços
        if (wrapperRef.current) {
          gsap.fromTo(
            wrapperRef.current,
            {
              opacity: 0,
              y: 40,
            },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              delay: 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: wrapperRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        // Animação dos itens individuais
        itemsRef.current.forEach((item, index) => {
          if (item) {
            gsap.fromTo(
              item,
              {
                opacity: 0,
                x: -30,
              },
              {
                opacity: 1,
                x: 0,
                duration: 0.8,
                delay: 0.3 + index * 0.15,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: wrapperRef.current,
                  start: "top 85%",
                  toggleActions: "play none none none",
                },
              }
            );
          }
        });

        // Força atualização do ScrollTrigger após configurar as animações
        ScrollTrigger.refresh();
      }, container);

      return () => {
        ctx.revert();
        clearTimeout(timer);
      };
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={styles.servicesSection} ref={container}>
      <div className={styles.servicesContainer}>
        <div className={styles.servicesHeader} ref={headerRef}>
          <span className={styles.servicesLabel}>SERVIÇOS</span>
          <h1 className={styles.servicesTitle}>
            Do conceito à nuvem, meu processo abrange todo o ciclo de vida do
            software. Combino design criativo com desenvolvimento robusto e
            práticas de DevOps eficientes para entregar soluções digitais
            performáticas, escaláveis e confiáveis.
          </h1>
        </div>

        <div className={styles.servicesWrapper} ref={wrapperRef}>
          {servicesData.map((service, index) => (
            <div key={index} ref={(el) => (itemsRef.current[index] = el)}>
              <ServiceItem
                {...service}
                isLast={index === servicesData.length - 1}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
