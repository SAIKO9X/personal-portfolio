"use client";

import React, { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import styles from "./Footer.module.css";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Footer = () => {
  const footerRef = useRef(null);
  const mainTitleRef = useRef(null);
  const leftContentRef = useRef(null);
  const navItemsRef = useRef([]);
  const bottomLineRef = useRef(null);

  useLayoutEffect(() => {
    if (!footerRef.current) return;

    let ctx = gsap.context(() => {
      // Animação do título principal
      if (mainTitleRef.current) {
        const titleLines = mainTitleRef.current.querySelectorAll("span");

        gsap.fromTo(
          titleLines,
          {
            scale: 0.7,
            opacity: 0,
            y: 100,
            rotationX: -90,
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1.5,
            ease: "power4.out",
            stagger: 0.2,
            transformPerspective: 1000,
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );

        // Efeito de hover no título
        titleLines.forEach((line) => {
          line.addEventListener("mouseenter", () => {
            gsap.to(line, {
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out",
            });
          });
          line.addEventListener("mouseleave", () => {
            gsap.to(line, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          });
        });
      }

      // Animação do conteúdo da esquerda
      if (leftContentRef.current) {
        const leftElements = leftContentRef.current.children;

        gsap.fromTo(
          leftElements,
          {
            x: -50,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            stagger: 0.15,
            delay: 0.3,
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Animação dos itens de navegação
      if (navItemsRef.current.length > 0) {
        // Animação das linhas pontilhadas
        gsap.fromTo(
          navItemsRef.current,
          {
            "--line-scale": 0,
          },
          {
            "--line-scale": 1,
            duration: 0.8,
            ease: "power2.inOut",
            stagger: 0.1,
            delay: 0.5,
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );

        // Animação do conteúdo dos links
        navItemsRef.current.forEach((item, index) => {
          const content = item.querySelectorAll("span");
          gsap.fromTo(
            content,
            {
              x: 30,
              opacity: 0,
            },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power3.out",
              delay: 0.6 + index * 0.1,
              scrollTrigger: {
                trigger: footerRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }

      // Animação da linha inferior
      if (bottomLineRef.current) {
        gsap.fromTo(
          bottomLineRef.current,
          {
            scaleX: 0,
            transformOrigin: "center",
          },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: bottomLineRef.current,
              start: "top 95%",
              toggleActions: "play none none none",
            },
          }
        );

        const bottomTexts = bottomLineRef.current.querySelectorAll("p");
        gsap.fromTo(
          bottomTexts,
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 0.6,
            duration: 0.8,
            delay: 1.2,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bottomLineRef.current,
              start: "top 95%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Parallax effect
      gsap.to(mainTitleRef.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/work", label: "PROJETOS" },
    { href: "/about", label: "SOBRE" },
    { href: "/contact", label: "CONTATO" },
  ];

  return (
    <footer className={styles.footer} ref={footerRef}>
      <div className={styles.footerContent}>
        <div className={styles.footerLeft} ref={leftContentRef}>
          <h3>
            Vamos Colaborar <br />
            <span className={styles.email}>dev@carloseduardo.com</span>
          </h3>
          <p className={styles.description}>
            De aplicações web a soluções completas — estou sempre <br />
            aberto para novos desafios e colaborações. Entre em <br />
            contato a qualquer momento.
          </p>
          <Link href="/contact" className={styles.btn}>
            <span>Entrar em Contato</span>
          </Link>
        </div>

        <div className={styles.footerCenter}>
          <h1 className={styles.mainTitle} ref={mainTitleRef}>
            <span>CARLOS</span>
            <span>EDUARDO</span>
          </h1>
        </div>

        <div className={styles.footerRight}>
          <nav className={styles.footerNav}>
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={styles.footerNavItem}
                ref={(el) => (navItemsRef.current[index] = el)}
              >
                <span>{link.label}</span>
                <span className={styles.arrow}>→</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className={styles.footerBottom} ref={bottomLineRef}>
        <p>© CARLOS EDUARDO 2025</p>
        <p>DESENVOLVIDO POR CARLOSEDUARDO.DEV</p>
      </div>

      {/* Elementos decorativos animados */}
      <div className={styles.backgroundElements}>
        <div className={styles.floatingDot}></div>
        <div className={styles.floatingDot}></div>
        <div className={styles.floatingDot}></div>
      </div>
    </footer>
  );
};

export default Footer;
