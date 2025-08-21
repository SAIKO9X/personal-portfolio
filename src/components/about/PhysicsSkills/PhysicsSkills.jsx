"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Matter from "matter-js";
import styles from "./PhysicsSkills.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function PhysicsSkills() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const engineRef = useRef(null);
  const runnerRef = useRef(null);
  const bodiesRef = useRef([]);
  const isAnimationStartedRef = useRef(false);

  // Lista de skills
  const skills = [
    { name: "React", colorClass: "os-1" },
    { name: "Design Pattern", colorClass: "os-2" },
    { name: "Figma", colorClass: "os-3" },
    { name: "Flyway", colorClass: "os-1" },
    { name: "Java", colorClass: "os-2" },
    { name: "Spring Boot", colorClass: "os-3" },
    { name: "Swagger", colorClass: "os-1" },
    { name: "Mysql", colorClass: "os-2" },
    { name: "MongoDB", colorClass: "os-3" },
    { name: "Docker", colorClass: "os-1" },
    { name: "AWS", colorClass: "os-2" },
    { name: "Git", colorClass: "os-3" },
    { name: "GSAP", colorClass: "os-1" },
    { name: "Tailwind", colorClass: "os-2" },
  ];

  const config = {
    gravity: { x: 0, y: 1 },
    restitution: 0.5,
    friction: 0.15,
    frictionAir: 0.02,
    density: 0.002,
    wallThickness: 200,
  };

  function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }

  function initPhysics(container) {
    const engine = Matter.Engine.create();
    engine.gravity = config.gravity;

    engine.constraintIterations = 15;
    engine.positionIterations = 25;
    engine.velocityIterations = 20;
    engine.enableSleeping = true;
    engine.timing.timeScale = 1;

    engineRef.current = engine;

    const containerRect = container.getBoundingClientRect();
    const wallThickness = config.wallThickness;
    const floorOffset = 8;

    const walls = [
      Matter.Bodies.rectangle(
        containerRect.width / 2,
        containerRect.height - floorOffset + wallThickness / 2,
        containerRect.width + wallThickness * 2,
        wallThickness,
        { isStatic: true }
      ),
      Matter.Bodies.rectangle(
        -wallThickness / 2,
        containerRect.height / 2,
        wallThickness,
        containerRect.height + wallThickness * 2,
        { isStatic: true }
      ),
      Matter.Bodies.rectangle(
        containerRect.width + wallThickness / 2,
        containerRect.height / 2,
        wallThickness,
        containerRect.height + wallThickness * 2,
        { isStatic: true }
      ),
    ];
    Matter.World.add(engine.world, walls);

    const objects = container.querySelectorAll(`.${styles.object}`);
    const bodies = [];

    objects.forEach((obj, index) => {
      const objRect = obj.getBoundingClientRect();

      obj.style.opacity = 1;
      obj.style.visibility = "visible";

      const startX =
        Math.random() * (containerRect.width - objRect.width) +
        objRect.width / 2;
      const startY = -500 - index * 150;
      const startRotation = (Math.random() - 0.5) * Math.PI;

      const body = Matter.Bodies.rectangle(
        startX,
        startY,
        objRect.width,
        objRect.height,
        {
          restitution: config.restitution,
          friction: config.friction,
          frictionAir: config.frictionAir,
          density: config.density,
          chamfer: { radius: 10 },
          slop: 0.02,
        }
      );

      Matter.Body.setAngle(body, startRotation);

      bodies.push({
        body: body,
        element: obj,
        width: objRect.width,
        height: objRect.height,
      });

      Matter.World.add(engine.world, body);
    });

    bodiesRef.current = bodies;

    Matter.Events.on(engine, "beforeUpdate", function () {
      bodies.forEach(({ body }) => {
        const maxVelocity = 250;

        if (Math.abs(body.velocity.x) > maxVelocity) {
          Matter.Body.setVelocity(body, {
            x: body.velocity.x > 0 ? maxVelocity : -maxVelocity,
            y: body.velocity.y,
          });
        }
        if (Math.abs(body.velocity.y) > maxVelocity) {
          Matter.Body.setVelocity(body, {
            x: body.velocity.x,
            y: body.velocity.y > 0 ? maxVelocity : -maxVelocity,
          });
        }
      });
    });

    setTimeout(() => {
      const topWall = Matter.Bodies.rectangle(
        containerRect.width / 2,
        -wallThickness / 2,
        containerRect.width + wallThickness * 2,
        wallThickness,
        { isStatic: true }
      );
      Matter.World.add(engine.world, topWall);
    }, 3000);

    const randomForceInterval = setInterval(() => {
      if (bodies.length > 0 && Math.random() < 0.3) {
        const randomBody = bodies[Math.floor(Math.random() * bodies.length)];
        const randomForce = {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.01,
        };
        Matter.Body.applyForce(
          randomBody.body,
          randomBody.body.position,
          randomForce
        );
      }
    }, 2000);

    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    Matter.Runner.run(runner, engine);

    function updatePositions() {
      if (!container) return;
      const currentContainerRect = container.getBoundingClientRect();

      bodies.forEach(({ body, element, width, height }) => {
        const x = clamp(
          body.position.x - width / 2,
          0,
          currentContainerRect.width - width
        );
        const y = clamp(
          body.position.y - height / 2,
          -height * 3,
          currentContainerRect.height - height - floorOffset
        );

        if (element) {
          element.style.left = x + "px";
          element.style.top = y + "px";
          element.style.transform = `rotate(${body.angle}rad)`;
        }
      });

      if (engineRef.current) {
        requestAnimationFrame(updatePositions);
      }
    }
    updatePositions();

    return () => {
      clearInterval(randomForceInterval);
    };
  }

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    let cleanup;

    // Usar um trigger mais restritivo para começar a animação apenas quando a seção está bem visível
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 50%", // Começa quando 50% da seção está visível
      end: "bottom top",
      onEnter: () => {
        // Só inicia se ainda não iniciou
        if (
          containerRef.current &&
          !engineRef.current &&
          !isAnimationStartedRef.current
        ) {
          isAnimationStartedRef.current = true;
          cleanup = initPhysics(containerRef.current);
        }
      },
      onLeave: () => {
        // Opcional: parar a física quando sair da seção para economizar recursos
        if (runnerRef.current) {
          Matter.Runner.stop(runnerRef.current);
        }
      },
      onEnterBack: () => {
        // Reiniciar a física se voltar para a seção
        if (engineRef.current && runnerRef.current) {
          Matter.Runner.run(runnerRef.current, engineRef.current);
        }
      },
    });

    // Trigger adicional para garantir que a animação só aconteça quando realmente necessário
    const visibilityTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      onEnter: () => {
        // Prepara a animação mas não inicia ainda
        console.log("Seção está se aproximando - preparando animação");
      },
    });

    return () => {
      trigger.kill();
      visibilityTrigger.kill();
      if (cleanup) cleanup();

      if (runnerRef.current) {
        Matter.Runner.stop(runnerRef.current);
      }
      if (engineRef.current) {
        Matter.World.clear(engineRef.current.world);
        Matter.Engine.clear(engineRef.current);
      }

      runnerRef.current = null;
      engineRef.current = null;
      bodiesRef.current = [];
      isAnimationStartedRef.current = false;
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.aboutSkills}>
      <div className={styles.container}>
        {/* Coluna da Esquerda (Texto) */}
        <div className={styles.col}>
          {/* Wrapper ajuda a alinhar o conteúdo no topo e no fundo */}
          <div className={styles.copyWrapper}>
            <div className={styles.callout}>
              <p className={styles.mono}>
                <span>&#9654;</span> Provando que a gravidade também se aplica a
                divs
              </p>
            </div>
            <div className={styles.header}>
              <h3>
                Coisas que sei <br /> e que tornam <br />
                sites mais legais
              </h3>
            </div>
          </div>
        </div>

        {/* Coluna da Direita (Animação) */}
        <div className={`${styles.col} ${styles.skillsPlayground}`}>
          <div ref={containerRef} className={styles.objectContainer}>
            {skills.map((skill, index) => (
              <div
                key={index}
                className={`${styles.object} ${styles[skill.colorClass]}`}
              >
                <p className={styles.mono}>{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
