"use client";

import { useRef, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ReactLenis } from "lenis/react";
import styles from "./Work.module.css";
import { projectsData } from "@/data/projectsData";
import ButtonLink from "@/components/common/ButtonLink/ButtonLink";

gsap.registerPlugin(SplitText);

export default function Work() {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scrollAllowed, setScrollAllowed] = useState(false);
  const lastScrollTimeRef = useRef(0);
  const totalSlides = projectsData.length;
  const slideRefs = useRef([]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    let ctx = gsap.context(() => {
      gsap.to(sliderRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
      initializeFirstSlide();
      setTimeout(() => {
        setScrollAllowed(true);
        lastScrollTimeRef.current = Date.now();
      }, 1500);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const splitText = (slideElement) => {
    const slideHeader = slideElement.querySelector(`.${styles.slideTitle} h2`);
    if (slideHeader) {
      new SplitText(slideHeader, {
        type: "words",
        wordsClass: "word",
        mask: "words",
      });
    }

    const slideContent = slideElement.querySelectorAll("p, a");
    slideContent.forEach((element) => {
      new SplitText(element, {
        type: "lines",
        linesClass: "line",
        mask: "lines",
        reduceWhiteSpace: false,
      });
    });
  };

  const initializeFirstSlide = () => {
    const firstSlideElement = slideRefs.current[0];
    if (!firstSlideElement) return;

    splitText(firstSlideElement);
    const words = firstSlideElement.querySelectorAll(".word");
    const lines = firstSlideElement.querySelectorAll(".line");
    gsap.set([...words, ...lines], { y: "100%", force3D: true });

    const tl = gsap.timeline();
    tl.to(
      firstSlideElement.querySelectorAll(`.${styles.slideTitle} .word`),
      { y: "0%", duration: 1, ease: "power4.out", stagger: 0.1, force3D: true },
      0.5
    );

    const elementsToAnimate = [
      ...firstSlideElement.querySelectorAll(`.${styles.slideTags} .line`),
      ...firstSlideElement.querySelectorAll(
        `.${styles.slideIndexWrapper} .line`
      ),
      ...firstSlideElement.querySelectorAll(
        `.${styles.slideDescription} .line`
      ),
    ];

    tl.to(
      elementsToAnimate,
      { y: "0%", duration: 1, ease: "power4.out", stagger: 0.1 },
      "-=0.75"
    );

    tl.to(
      firstSlideElement.querySelectorAll(`.${styles.slideLink} .line`),
      { y: "0%", duration: 1, ease: "power4.out" },
      "-=1"
    );
  };

  const animateSlide = (direction) => {
    if (isAnimating || !scrollAllowed) return;
    setIsAnimating(true);
    setScrollAllowed(false);

    const currentSlideElement = slideRefs.current[currentSlide];
    const newSlideIndex =
      direction === "down"
        ? (currentSlide + 1) % totalSlides
        : (currentSlide - 1 + totalSlides) % totalSlides;

    const exitY = direction === "down" ? "-100vh" : "100vh";
    const entryY = direction === "down" ? "100vh" : "-100vh";

    gsap.to(currentSlideElement, {
      scale: 0.5,
      opacity: 0,
      rotation: 15,
      y: exitY,
      duration: 1.5,
      ease: "power4.inOut",
      force3D: true,
    });

    setTimeout(() => {
      setCurrentSlide(newSlideIndex);
      const newSlideElement = slideRefs.current[newSlideIndex];
      const newSlideImg = newSlideElement.querySelector(
        `.${styles.slideImg} img`
      );

      gsap.set(newSlideElement, {
        y: entryY,
        force3D: true,
        opacity: 1,
        scale: 1,
        rotation: 0,
      });

      gsap.set(newSlideImg, { scale: 2, force3D: true });
      splitText(newSlideElement);

      const words = newSlideElement.querySelectorAll(".word");
      const lines = newSlideElement.querySelectorAll(".line");
      gsap.set([...words, ...lines], { y: "100%", force3D: true });

      const tl = gsap.timeline({
        onComplete: () => {
          setIsAnimating(false);
          setTimeout(() => {
            setScrollAllowed(true);
            lastScrollTimeRef.current = Date.now();
          }, 100);
        },
      });

      tl.to(newSlideElement, {
        y: 0,
        duration: 1.5,
        ease: "power4.out",
        force3D: true,
      });

      tl.to(
        newSlideImg,
        { scale: 1, duration: 1.5, ease: "power4.out", force3D: true },
        "<"
      );

      tl.to(
        newSlideElement.querySelectorAll(`.${styles.slideTitle} .word`),
        {
          y: "0%",
          duration: 1,
          ease: "power4.out",
          stagger: 0.1,
          force3D: true,
        },
        "<0.5"
      );

      const elementsToAnimate = [
        ...newSlideElement.querySelectorAll(`.${styles.slideTags} .line`),
        ...newSlideElement.querySelectorAll(
          `.${styles.slideIndexWrapper} .line`
        ),
        ...newSlideElement.querySelectorAll(
          `.${styles.slideDescription} .line`
        ),
      ];

      tl.to(
        elementsToAnimate,
        { y: "0%", duration: 1, ease: "power4.out", stagger: 0.1 },
        "-=0.75"
      );

      tl.to(
        newSlideElement.querySelectorAll(`.${styles.slideLink} .line`),
        { y: "0%", duration: 1, ease: "power4.out" },
        "-=1"
      );
    }, 500);
  };

  const handleScroll = (direction) => {
    const now = Date.now();
    if (isAnimating || !scrollAllowed || now - lastScrollTimeRef.current < 1000)
      return;

    lastScrollTimeRef.current = now;
    animateSlide(direction);
  };

  useLayoutEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      handleScroll(e.deltaY > 0 ? "down" : "up");
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isAnimating, scrollAllowed, currentSlide]);

  return (
    <ReactLenis root>
      <ButtonLink href="/">← Voltar</ButtonLink>
      <div ref={containerRef}>
        <main ref={sliderRef} className={styles.slider} style={{ opacity: 0 }}>
          {projectsData.map((project, index) => (
            <div
              key={project.slug}
              className={`${styles.slide} ${
                index === currentSlide ? styles.active : styles.inactive
              }`}
              ref={(el) => (slideRefs.current[index] = el)}
            >
              <div className={styles.slideImg}>
                <img src={project.bannerImage} alt={project.title} />
              </div>
              <div className={styles.slideHeader}>
                <div className={styles.slideTitle}>
                  <h2>{project.title}</h2>
                </div>
                <div className={styles.slideDescription}>
                  <p>{project.shortDescription}</p>
                </div>
                <div className={styles.slideLink}>
                  {/* O link aponta para a página de detalhes usando o slug */}
                  <a href={`/project-details/${project.slug}`}>
                    <span className="line">Ver Projeto</span>
                  </a>
                </div>
              </div>
              <div className={styles.slideInfo}>
                <div className={styles.slideTags}>
                  <p className="mono">Tags</p>
                  {project.tags.map((tag, i) => (
                    <p key={i} className="mono">
                      {tag}
                    </p>
                  ))}
                </div>
                <div className={styles.slideIndexWrapper}>
                  <p className="mono">
                    {(index + 1).toString().padStart(2, "0")}
                  </p>
                  <p className="mono">/</p>
                  <p className="mono">
                    {totalSlides.toString().padStart(2, "0")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </main>
      </div>
    </ReactLenis>
  );
}
