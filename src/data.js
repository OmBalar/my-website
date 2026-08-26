import omelloHomepage from "./assets/omello/homepage.png";
import omelloTranscription from "./assets/omello/transcription.png";
import omelloQuizzing from "./assets/omello/quizzing.png";
import omelloNoteView from "./assets/omello/note-view.png";
import omelloExamMode from "./assets/omello/exam-mode.png";
import omelloCramSheet from "./assets/omello/cram-sheet.png";

export const heroRoles = [
  "Full-Stack Developer",
  "AI Engineer",
  "Systems Thinker",
  "Problem Solver",
];

export const about = {
  intro:
    "I'm a fifth-year Computer Engineering student at Toronto Metropolitan University (4.29/4.33 CGPA, Dean's List) with 20 months of professional experience shipping production software, from data pipelines processing 1.5 million weather forecast files at Environment and Climate Change Canada, to a native macOS app on the App Store running a language model entirely on-device.",
  focus:
    "I care about building things that are fast, reliable, and genuinely useful. Whether that means designing a caching layer that cuts processing time from 90 seconds to 10, squeezing an AI pipeline into a 500MB memory budget, or shrinking an app payload from 900MB to 250MB, I like solving the hard, unglamorous problems that make software great.",
  seeking:
    "Currently seeking New Grad Software Engineering roles starting Summer 2027.",
};

export const stats = [
  { value: 4.29, suffix: "", label: "CGPA out of 4.33 (Dean's List)", decimals: 2 },
  { value: 20, suffix: "", label: "Months of Internship & Co-op Experience" },
  { value: 1.5, suffix: "M+", label: "Forecast Files Processed by My Pipeline", decimals: 1 },
  { value: 9, suffix: "×", label: "Faster Data Processing (90s → 10s)" },
];

export const experience = [
  {
    slug: "exp-eccc",
    role: "Software Developer",
    company: "Environment and Climate Change Canada",
    period: "May 2025 – Aug 2026",
    tag: "16-month Co-op",
    points: [
      "Cut data processing time from 90 seconds to 10 seconds by architecting caching strategies that eliminated redundant SQL queries over massive datasets.",
      "Built a reliable Python and SQL data pipeline that processes roughly 1.5 million weather forecast files with high data integrity.",
      "Engineered automated CI/CD pipelines with Docker and Cypress, cutting automated testing time from 12 hours to 7 hours.",
      "Proactively resolved end-user friction by building a custom formatting toolbar into an internal Markdown editor, improving meteorologist workflows.",
      "Spearheaded a large-scale refactoring initiative, modernizing ESLint across a legacy TypeScript frontend to surface bugs at compile time.",
    ],
    tech: ["Python", "SQL", "TypeScript", "Java", "Docker", "Cypress", "CI/CD"],
  },
  {
    slug: "exp-dataannotation",
    role: "AI Software Engineering Trainer",
    company: "DataAnnotation",
    period: "Jun 2026",
    tag: "Contract",
    points: [
      "Evaluated AI coding assistants across 5 projects, engineering targeted adversarial prompts to expose model failure modes, break logic, and identify hallucinations.",
      "Built safe, isolated Docker testing environments to run and verify AI-generated code across system architectures.",
      "Improved AI training data by reviewing generated code and writing clear reports on system design mistakes.",
    ],
    tech: ["LLMs", "Docker", "Python", "Code Review"],
  },
  {
    slug: "exp-reviewerly",
    role: "Software Engineer",
    company: "Reviewer.ly",
    period: "May 2024 – Aug 2024",
    tag: "Internship",
    points: [
      "Eliminated the need for manual developer intervention by designing and shipping a complete self-service user profile system with React, Spring Boot, and MongoDB.",
      "Optimized full-stack performance by analyzing client-side TypeScript bottlenecks and offloading heavy image compression workloads to scalable concurrent backend servers.",
      "Independently built an automated SMTP email notification workflow alerting engineers to platform issues, accelerating cross-team issue resolution.",
      "Streamlined backend microservice communication using gRPC and OpenAPI, and hardened the codebase with Jest, React Testing Library, and Mockito test suites.",
    ],
    tech: ["React.js", "Spring Boot", "MongoDB", "TypeScript", "gRPC", "Jest"],
  },
];

export const flagshipProject = {
  slug: "proj-omello",
  title: "Omello",
  subtitle: "Creator & Software Engineer · Dec 2025 – Present",
  description:
    "A native macOS app, live on the App Store, that transforms passive audio lectures into real-time, active-learning quizzes. Built a context-aware RAG architecture that seamlessly routes workloads between local models and cloud APIs, and fine-tuned a custom PyTorch neural network to run securely on-device within a strict 500MB RAM budget. Aggressive codebase optimization shrank the app payload from 900MB down to 250MB.",
  highlights: [
    "Live on the Mac App Store",
    "On-device AI · <500MB RAM",
    "900MB → 250MB payload",
  ],
  tech: ["Swift", "Python", "PyTorch", "FastAPI", "RAG", "macOS"],
  link: "https://apps.apple.com/ca/app/omello/id6761731975?mt=12",
  linkLabel: "View on the App Store",
  screenshots: [
    { src: omelloHomepage, caption: "Stay focused in lectures: record and let Omello take notes" },
    { src: omelloTranscription, caption: "Live transcription autogenerates notes every minute" },
    { src: omelloQuizzing, caption: "Get quizzed in real-time as the lecture unfolds" },
    { src: omelloNoteView, caption: "Review notes, transcripts, and flashcards anytime" },
    { src: omelloExamMode, caption: "Exam Mode builds a master quiz across multiple notes" },
    { src: omelloCramSheet, caption: "Cram Sheets condense whole units into must-know lists" },
  ],
};

export const featuredProjects = [
  {
    slug: "proj-portify",
    title: "Portify",
    subtitle: "Full-Stack Developer",
    description:
      "An open-source web app that lets developers store projects and generate beautiful portfolios without touching front-end design. TypeScript across the stack, with a React.js frontend, a Node.js backend, and a PostgreSQL database designed for reliability and speed.",
    highlight: "Open source · Full TypeScript stack",
    tech: ["React.js", "Node.js", "TypeScript", "PostgreSQL"],
    link: "https://github.com/OmBalar/Portify",
    linkLabel: "View on GitHub",
  },
  {
    slug: "proj-jobsearch",
    title: "Distributed Job Search Platform",
    subtitle: "Software Architect · Jan 2025 – Apr 2025",
    description:
      "A job search platform built with React and Java that lets users query large datasets fast, kept online under heavy traffic by running 3 worker nodes with Docker and Kubernetes on Google Cloud Platform.",
    highlight: "3-node Kubernetes cluster · High availability under load",
    tech: ["React.js", "Java", "PostgreSQL", "Kubernetes", "Docker", "GCP"],
    link: "https://github.com/OmBalar/JobBank",
    linkLabel: "View on GitHub",
  },
];

export const projects = [
  {
    slug: "proj-gradient",
    title: "Gradient Descent from Scratch",
    description:
      "Linear and logistic regression implemented from first principles in Python: batch and mini-batch gradient descent, feature standardization analysis, and results validated against scikit-learn.",
    tech: ["Python", "NumPy", "Pandas", "Matplotlib"],
  },
  {
    slug: "proj-payroll",
    title: "Payroll Management DBMS",
    description:
      "A payroll system with a JavaFX frontend and Oracle SQL backend. Schema normalized to 3NF/BCNF, with Unix shell scripts automating backend operations.",
    tech: ["JavaFX", "Oracle SQL", "Shell"],
  },
  {
    slug: "proj-robot",
    title: "Maze-Solving Robot",
    description:
      "An autonomous robot programmed in assembly that learns optimal maze routes by backtracking from dead ends, with precise motor control logic debugged via breakpoints and LCD instrumentation.",
    tech: ["Assembly", "Embedded Systems"],
    link: "https://github.com/OmBalar/Robot-Guidance",
  },
  {
    slug: "proj-bank",
    title: "Bank Account System",
    description:
      "A Java/JavaFX banking GUI built on the State and Singleton design patterns, modeling tiered accounts with deposits, withdrawals, and purchase limits.",
    tech: ["Java", "JavaFX", "Design Patterns"],
    link: "https://github.com/OmBalar/Bank-Application",
  },
  {
    slug: "proj-diabetes",
    title: "Diabetes Data Analysis",
    description:
      "Statistical analysis of real Statistics Canada diabetes data, with all computation in C and visualizations rendered in Gnuplot.",
    tech: ["C", "Gnuplot", "Data Analysis"],
    link: "https://github.com/OmBalar/Data-Analysis",
  },
];

export const skills = [
  {
    category: "Languages",
    items: ["Java", "Python", "TypeScript", "JavaScript", "Swift", "C", "SQL", "HTML", "CSS"],
  },
  {
    category: "Frameworks & Databases",
    items: ["React.js", "Next.js", "Node.js", "AngularJS", "Spring", "PostgreSQL", "MongoDB"],
  },
  {
    category: "AI & Machine Learning",
    items: ["PyTorch", "LLMs", "RAG Architectures", "Vertex AI", "Google Cloud APIs", "Claude"],
  },
  {
    category: "Infrastructure & Cloud",
    items: ["GCP", "AWS", "Docker", "Kubernetes", "Linux", "CI/CD"],
  },
  {
    category: "Tools & Practices",
    items: ["Git", "AI-Assisted Coding (Cursor, Claude Code)", "Automated Testing", "System Design", "Agile"],
  },
];

export const education = {
  degree: "Bachelor of Engineering, Computer Engineering",
  specialization: "Software Engineering Specialization, With Co-op",
  school: "Toronto Metropolitan University",
  period: "2022 – 2027",
  gpa: "4.29 / 4.33 CGPA",
  honors: [
    "Dean's List",
    "Ontario Professional Engineers Foundation Scholarship (3 consecutive years)",
    "Aditya Jha Undergraduate Diversity Award (sole recipient)",
  ],
  coursework: [
    "Operating Systems",
    "Algorithms & Data Structures",
    "Database Systems",
    "Intelligent Systems (Machine Learning)",
    "Software Design Architecture",
    "Object-Oriented Analysis & Design",
  ],
  activities: [
    {
      title: "Metropolitan Data Science Association",
      detail: "Sharpened data analysis skills in Python, R, and SQL through weekly challenges and a capstone project.",
    },
    {
      title: "Programming Club Executive",
      detail: "Led presentations on algorithm design and efficiency, preparing members for programming competitions.",
    },
  ],
};

/*
 * Skill graph: ring 1 = core (closest to center), ring 2 = proficient, ring 3 = familiar.
 * Links define the constellation; usedIn targets are card ids on the page.
 */
export const skillGraph = {
  center: {
    id: "om",
    label: "Om",
    desc: "That's me: engineer, builder, lifelong learner. Every node in this graph is a tool I've shipped real software with. Hover one to see where.",
  },
  nodes: [
    // Ring 1: core
    {
      id: "java",
      label: "Java",
      ring: 1,
      desc: "Object-oriented workhorse for enterprise backends and desktop apps.",
      usedIn: [
        { label: "Environment & Climate Change Canada", target: "exp-eccc" },
        { label: "Reviewer.ly", target: "exp-reviewerly" },
        { label: "Job Search Platform", target: "proj-jobsearch" },
        { label: "Bank Account System", target: "proj-bank" },
      ],
    },
    {
      id: "python",
      label: "Python",
      ring: 1,
      desc: "My go-to for data pipelines, machine learning, and backend services.",
      usedIn: [
        { label: "Environment & Climate Change Canada", target: "exp-eccc" },
        { label: "Omello", target: "proj-omello" },
        { label: "DataAnnotation", target: "exp-dataannotation" },
        { label: "Gradient Descent from Scratch", target: "proj-gradient" },
      ],
    },
    {
      id: "typescript",
      label: "TypeScript",
      ring: 1,
      desc: "Typed JavaScript that catches whole classes of bugs at compile time.",
      usedIn: [
        { label: "Environment & Climate Change Canada", target: "exp-eccc" },
        { label: "Reviewer.ly", target: "exp-reviewerly" },
        { label: "Portify", target: "proj-portify" },
      ],
    },
    {
      id: "react",
      label: "React.js",
      ring: 1,
      desc: "Component-based library for fast, interactive user interfaces, including this site.",
      usedIn: [
        { label: "Reviewer.ly", target: "exp-reviewerly" },
        { label: "Portify", target: "proj-portify" },
        { label: "Job Search Platform", target: "proj-jobsearch" },
      ],
    },
    {
      id: "sql",
      label: "SQL",
      ring: 1,
      desc: "Declarative queries over relational data, and knowing when not to run them.",
      usedIn: [
        { label: "Environment & Climate Change Canada", target: "exp-eccc" },
        { label: "Payroll Management DBMS", target: "proj-payroll" },
        { label: "Job Search Platform", target: "proj-jobsearch" },
      ],
    },
    {
      id: "docker",
      label: "Docker",
      ring: 1,
      desc: "Containers for reproducible builds, isolated testing, and reliable deploys.",
      usedIn: [
        { label: "Environment & Climate Change Canada", target: "exp-eccc" },
        { label: "DataAnnotation", target: "exp-dataannotation" },
        { label: "Job Search Platform", target: "proj-jobsearch" },
      ],
    },
    {
      id: "ai",
      label: "AI & LLMs",
      ring: 1,
      desc: "Large language models, RAG architectures, and on-device inference.",
      usedIn: [
        { label: "Omello", target: "proj-omello" },
        { label: "DataAnnotation", target: "exp-dataannotation" },
      ],
    },
    {
      id: "dsa",
      label: "Algorithms & DS",
      ring: 1,
      desc: "The foundations of writing software that stays fast as data grows.",
      usedIn: [
        { label: "Gradient Descent from Scratch", target: "proj-gradient" },
        { label: "Maze-Solving Robot", target: "proj-robot" },
      ],
    },

    // Ring 2: proficient
    {
      id: "swift",
      label: "Swift",
      ring: 2,
      desc: "Apple's language for native macOS and iOS applications.",
      usedIn: [{ label: "Omello", target: "proj-omello" }],
    },
    {
      id: "spring",
      label: "Spring Boot",
      ring: 1,
      desc: "Java framework for production-grade REST backends.",
      usedIn: [{ label: "Reviewer.ly", target: "exp-reviewerly" }],
    },
    {
      id: "nodejs",
      label: "Node.js",
      ring: 2,
      desc: "JavaScript runtime for scalable backend services.",
      usedIn: [{ label: "Portify", target: "proj-portify" }],
    },
    {
      id: "postgresql",
      label: "PostgreSQL",
      ring: 1,
      desc: "Battle-tested relational database with a great feature set.",
      usedIn: [
        { label: "Portify", target: "proj-portify" },
        { label: "Job Search Platform", target: "proj-jobsearch" },
      ],
    },
    {
      id: "kubernetes",
      label: "Kubernetes",
      ring: 2,
      desc: "Container orchestration for high availability under load.",
      usedIn: [{ label: "Job Search Platform", target: "proj-jobsearch" }],
    },
    {
      id: "pytorch",
      label: "PyTorch",
      ring: 2,
      desc: "Deep learning framework for training and fine-tuning neural networks.",
      usedIn: [{ label: "Omello", target: "proj-omello" }],
    },
    {
      id: "cicd",
      label: "CI/CD",
      ring: 2,
      desc: "Automated pipelines that take code from commit to production safely.",
      usedIn: [{ label: "Environment & Climate Change Canada", target: "exp-eccc" }],
    },
    {
      id: "testing",
      label: "Automated Testing",
      ring: 2,
      desc: "Test suites that guard production against regressions.",
      usedIn: [
        { label: "Environment & Climate Change Canada", target: "exp-eccc" },
        { label: "Reviewer.ly", target: "exp-reviewerly" },
      ],
    },
    {
      id: "gcp",
      label: "GCP",
      ring: 2,
      desc: "Google Cloud: compute, managed Kubernetes, and AI APIs.",
      usedIn: [{ label: "Job Search Platform", target: "proj-jobsearch" }],
    },

    // Ring 3: familiar
    {
      id: "mongodb",
      label: "MongoDB",
      ring: 1,
      desc: "Flexible NoSQL document database.",
      usedIn: [{ label: "Reviewer.ly", target: "exp-reviewerly" }],
    },
    {
      id: "grpc",
      label: "gRPC",
      ring: 3,
      desc: "High-performance RPC for microservice communication.",
      usedIn: [{ label: "Reviewer.ly", target: "exp-reviewerly" }],
    },
    {
      id: "jest",
      label: "Jest",
      ring: 3,
      desc: "JavaScript testing framework for unit and component tests.",
      usedIn: [{ label: "Reviewer.ly", target: "exp-reviewerly" }],
    },
    {
      id: "cypress",
      label: "Cypress",
      ring: 3,
      desc: "End-to-end browser testing, wired into CI.",
      usedIn: [{ label: "Environment & Climate Change Canada", target: "exp-eccc" }],
    },
    {
      id: "mockito",
      label: "Mockito",
      ring: 3,
      desc: "Mocking framework for isolated Java unit tests.",
      usedIn: [{ label: "Reviewer.ly", target: "exp-reviewerly" }],
    },
    {
      id: "c",
      label: "C",
      ring: 3,
      desc: "Low-level systems language, manual memory and all.",
      usedIn: [{ label: "Diabetes Data Analysis", target: "proj-diabetes" }],
    },
    {
      id: "aws",
      label: "AWS",
      ring: 3,
      desc: "Amazon's cloud platform: compute, storage, and managed services.",
      usedIn: [{ label: "My Education", target: "education-card" }],
    },
  ],
  links: [
    // center → core
    ["om", "java"],
    ["om", "python"],
    ["om", "typescript"],
    ["om", "react"],
    ["om", "sql"],
    ["om", "docker"],
    ["om", "ai"],
    ["om", "dsa"],
    ["om", "spring"],
    ["om", "postgresql"],
    ["om", "mongodb"],
    // cross-links between core skills
    ["react", "typescript"],
    ["sql", "python"],
    ["ai", "python"],
    // proficient
    ["spring", "java"],
    ["nodejs", "typescript"],
    ["nodejs", "react"],
    ["postgresql", "sql"],
    ["kubernetes", "docker"],
    ["kubernetes", "gcp"],
    ["gcp", "docker"],
    ["pytorch", "python"],
    ["pytorch", "ai"],
    ["swift", "ai"],
    ["cicd", "docker"],
    ["testing", "cicd"],
    // familiar
    ["mongodb", "spring"],
    ["grpc", "spring"],
    ["jest", "react"],
    ["jest", "testing"],
    ["cypress", "testing"],
    ["cypress", "cicd"],
    ["mockito", "java"],
    ["mockito", "testing"],
    ["c", "dsa"],
    ["aws", "gcp"],
  ],
};

export const links = {
  linkedin: "https://www.linkedin.com/in/ombalar/",
  github: "https://github.com/OmBalar",
  email: "om.balar2@gmail.com",
  resume: `${process.env.PUBLIC_URL}/Om_Balar_Resume.pdf`,
};
