export const projectsData = [
  {
    slug: "food-ordering-platform",
    title: "Plataforma de Pedidos de Comida",
    shortDescription:
      "Plataforma full-stack de pedidos de comida com Spring Boot, React e MySQL.",
    bannerImage: "/work-items/banner-1.png",
    videoUrl: "/videos/food.mp4",
    tags: ["Java Spring", "React", "MySQL", "Docker", "Stripe API"],
    subtitle: "Plataforma Completa para Restaurantes",
    type: "Website",
    date: "Fevereiro 2024",
    categories: "Full Stack, Food Tech",
    githubUrl: "https://github.com/saiko9x/restaurant-spring",
    stack: [
      "Java",
      "Spring",
      "React",
      "Redux",
      "MySQL",
      "Docker",
      "Stripe API",
      "Material-UI",
      "TailwindCSS",
      "GitHub Actions",
    ],
    background:
      "Uma plataforma full-stack completa para pedidos de comida, construída com Spring Boot no backend e React no frontend. O projeto simula um ecossistema com três tipos de utilizadores (Clientes, Donos de Restaurante e Administradores), cada um com seu próprio painel e funcionalidades, como gestão de menus, pedidos, avaliações e chat em tempo real. O ambiente é totalmente containerizado com Docker para facilitar o desenvolvimento e a implantação.",
    snapshots: [
      {
        url: "/work-items/food-ordering-1.png",
        description:
          "Painel de pedidos do proprietario do restaurante, para ele poder gerir em tempo real os pedidos e atualizar modificar o status deles.",
      },
      {
        url: "/work-items/food-ordering-2.png",
        description:
          "Seção de mensagens que permite a comunicação direta entre o restaurante e o cliente.",
      },
      {
        url: "/work-items/food-ordering-3.png",
        description:
          "Processo de checkout com integração Stripe para pagamento do pedido e gerenciamento do pedido do lado do cliente.",
      },
      {
        url: "/work-items/food-ordering-4.png",
        description:
          "Sistema de pesquisa inteligente permite encontrar tanto restaurantes como pratos especificos.",
      },
      {
        url: "/work-items/food-ordering-5.png",
        description:
          "Página de menu para editar os pratos que são oferecidos pelo restaurante além de gerir ingredientes e preços.",
      },
    ],
    nextProjectSlug: "ecommerce-platform",
  },
  {
    slug: "ecommerce-spring-react",
    title: "Plataforma de E-commerce",
    shortDescription:
      "Plataforma de e-commerce full-stack com Spring Boot, React e MySQL, focada em performance e escalabilidade.",
    bannerImage: "/work-items/banner-2.png",
    videoUrl: "/videos/eco.mp4",
    tags: ["Java Spring", "React", "MySQL", "Mercado Pago API", "Stripe API"],
    subtitle: "Solução completa para vendas online",
    type: "Website",
    date: "Julho 2024",
    categories: "Full Stack, E-commerce",
    githubUrl: "https://github.com/saiko9x/ecommerce-spring",
    stack: [
      "Java",
      "Spring",
      "React",
      "Redux",
      "MySQL",
      "Mercado Pago API",
      "Stripe API",
      "Spring Security",
      "axios",
      "date-fns",
      "Material-UI",
      "TailwindCSS",
    ],
    background:
      "Desenvolvimento de uma plataforma de e-commerce robusta e escalável, utilizando Spring Boot para o backend e React para o frontend. O projeto inclui um sistema completo de autenticação e autorização com JWT, gestão de produtos, categorias, carrinhos de compras e pedidos. A arquitetura foi projetada para ser modular e de fácil manutenção, com foco em boas práticas de desenvolvimento e uma experiência de usuário fluida e responsiva.",
    snapshots: [
      {
        url: "/work-items/ecommerce-1.png",
        description:
          "Página de registro de Vendedores dividida em 4 etapas (dados fiscais, dados bancários, endereços e detalhes da loja).",
      },
      {
        url: "/work-items/ecommerce-2.png",
        description:
          "Dashboard do Vendedor com dados de vendas e funções completas para gerenciar os produtos que oferece e os pedidos recebidos.",
      },
      {
        url: "/work-items/ecommerce-3.png",
        description:
          "Página de Checkout com duas opções de pagamentos (stripe e mercado pago) e gerenciamento de endereços.",
      },
      {
        url: "/work-items/ecommerce-4.png",
        description:
          "Dashboard do cliente com gestão de pedidos, página de favoritos e acesso as avaliações feitas dentro da plataforma.",
      },
      {
        url: "/work-items/ecommerce-5.png",
        description:
          "Carrinho de compras completo com opção de adicionar cupom e gerenciar quantidade de produtos e revisar preços.",
      },
      {
        url: "/work-items/ecommerce-6.png",
        description:
          "Página de produtos onde o cliente pode encontrar os produtos que procura atraves de uma pesquisa simples e com o auxilio dos filtros avançados de cor, preço, desconto ou marca do produto.",
      },
    ],
    nextProjectSlug: "food-ordering-platform",
  },
  {
    slug: "project-management-system",
    title: "Sistema de Gestão de Projetos",
    shortDescription:
      "Aplicação full-stack para gestão de projetos, tarefas e equipas com colaboração em tempo real.",
    bannerImage: "/work-items/banner-3.png",
    videoUrl: "/videos/management.mp4",
    tags: ["Java Spring", "React", "PostgreSQL", "WebSocket"],
    subtitle: "Gestão colaborativa de projetos e tarefas",
    type: "Web App",
    date: "Agosto 2024",
    categories: "SaaS, Produtividade, Full Stack",
    githubUrl: "https://github.com/saiko9x/management-project",
    stack: [
      "Java",
      "Spring Boot",
      "React",
      "Redux",
      "Mysql",
      "Spring Security (JWT)",
      "WebSocket (SockJS & Stomp)",
      "JPA (Hibernate)",
      "ShadCN",
    ],
    background:
      "Desenvolvimento de um sistema completo de gestão de projetos, desenhado para otimizar o fluxo de trabalho de equipas. A plataforma permite a criação e gestão de projetos, atribuição de tarefas, e acompanhamento de prazos. A funcionalidade de destaque é a colaboração em tempo real, implementada com WebSockets, que inclui um chat por projeto e notificações instantâneas sobre atualizações de tarefas, promovendo uma comunicação eficiente e centralizada.",
    snapshots: [
      {
        url: "/work-items/management-1.png",
        description:
          "Dashboard principal com visão geral do projeto acesso a milestones, progresso de tasks e uma interface Kanban para gestão visual de tarefas e workflow.",
      },
      {
        url: "/work-items/management-2.png",
        description:
          "Tela de criação de tasks com opção de associação de milestones.",
      },
      {
        url: "/work-items/management-3.png",
        description:
          "Página de detalhes das tasks com opção de deixar comentarios ou anexar arquivos relacionados a task e atribuir a responsabilidade dela a uma pessoa.",
      },
      {
        url: "/work-items/management-4.png",
        description: "Tela de Cadastro.",
      },
      {
        url: "/work-items/management-5.png",
        description:
          "Página do projeto com chat integrado para toda equipe se comunicar além da opção de editar e gerenciar o projeto.",
      },
      {
        url: "/work-items/management-6.png",
        description:
          "Página inicial com acesso a todos os projetos criados função de filtrar os projetos por tags ou categorias e uma pesquisa inteligente.",
      },
    ],
    nextProjectSlug: "photographer-portfolio",
  },
  {
    slug: "photographer-portfolio",
    title: "Estudo de Animações com GSAP & Framer Motion",
    shortDescription:
      "Estudo técnico de frontend focado na recriação de interações e animações avançadas com GSAP e Framer Motion se inspirando em sites do Awwwards.",
    bannerImage: "/work-items/banner-4.png",
    videoUrl: "/videos/photo.mp4",
    tags: ["React", "GSAP", "Framer Motion", "Portfolio", "Awwwards"],
    subtitle: "Portfólio Fictício para Demonstração Técnica",
    type: "Website",
    date: "Setembro 2024",
    categories: "Desenvolvimento Frontend, Animações Web",
    githubUrl: "https://github.com/saiko9x/portfolio-photographer",
    stack: [
      "React",
      "Vite",
      "GSAP",
      "Framer Motion",
      "Lenis",
      "Split Type",
      "Lucide Icons",
      "ScrollTrigger",
    ],
    background:
      "Este projeto documenta um estudo técnico de front-end, focado na recriação de interações e animações inspiradas em portfólios de referência, como os encontrados no Awwwards. O projeto, embora apresentado como o portfólio de um fotógrafo fictício, tem como objetivo principal servir como uma demonstração prática de habilidades com as bibliotecas GSAP (GreenSock) e Framer Motion em um ambiente React, exibindo a implementação de animações ricas para criar uma experiência de usuário fluida e impactante.",
    snapshots: [
      {
        url: "/work-items/photographer-1.png",
      },
      {
        url: "/work-items/photographer-2.png",
      },
      {
        url: "/work-items/photographer-3.png",
      },
      {
        url: "/work-items/photographer-4.png",
      },
    ],
    nextProjectSlug: "gsap-music-ai-website",
  },
  {
    slug: "gsap-music-ai-website",
    title: "Music Player",
    shortDescription:
      "Estudo de animações web com React, GSAP e Framer Motion, criando uma experiência de usuário rica e interativa.",
    bannerImage: "/work-items/banner-5.png",
    videoUrl: "/videos/music.mp4",
    tags: ["React", "GSAP", "Awwwards", "Lenis"],
    subtitle: "Experiência Web Imersiva com Animações",
    type: "Website",
    date: "Julho 2025",
    categories: "Desenvolvimento Frontend, Interatividade",
    githubUrl: "https://github.com/saiko9x/gsap-music-ai-website",
    stack: ["React", "Vite", "GSAP", "React Router", "Lenis", "ScrollTrigger"],
    background:
      "Criação de uma landing page visualmente cativante para uma aplicação de música baseada em IA. O projeto explora o poder da biblioteca GSAP para orquestrar animações complexas. Desenvolvido como um exercício prático para aprofundar e demonstrar habilidades em animações web. O objetivo foi criar uma experiência de utilizador memorável e imersiva, demonstrando como tecnologias de animação avançadas podem ser usadas para contar uma história e apresentar um produto de forma inovadora.",
    snapshots: [
      {
        url: "/work-items/music-1.png",
      },
      {
        url: "/work-items/music-2.png",
      },
      {
        url: "/work-items/music-3.png",
      },
      {
        url: "/work-items/music-4.png",
      },
      {
        url: "/work-items/music-5.png",
      },
    ],
  },
];

export const featuredProjects = [
  projectsData[0],
  projectsData[1],
  projectsData[2],
];
