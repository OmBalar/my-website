import React, { useEffect, useRef, useState } from "react";
import Grid from '@mui/material/Grid2';
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from '@mui/icons-material/Language';
import "./App.css";

const NAV_LINKS = {
  home: "Home",
  summary: "About Me",
  education: "Education",
  skills: "Skills",
  experience: "Experience",
  projects: "Projects",
  extracurricular: "Extra-Curricular", // Kept this from the old site
  connect: "Contact",
};

function App() {
  const sectionRefs = useRef({
    home: React.createRef(),
    summary: React.createRef(),
    education: React.createRef(),
    skills: React.createRef(),
    experience: React.createRef(),
    projects: React.createRef(),
    extracurricular: React.createRef(),
    connect: React.createRef(),
  });

  const [currentSection, setCurrentSection] = useState("home");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-100px",
      threshold: 0.25,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setCurrentSection(sectionId);
        }
      });
    }, observerOptions);

    Object.keys(NAV_LINKS).forEach((key) => {
      if (sectionRefs.current[key]?.current) {
        observer.observe(sectionRefs.current[key].current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (section) => {
    const target = sectionRefs.current[section]?.current;
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const navbarRef = useRef(null);

  function openSidebar() {
    const navbar = document.getElementById("navbar");
    const openButton = document.getElementById("open-sidebar-button");
    navbar.classList.add("show");
    openButton.setAttribute("aria-expanded", "true");
    openButton.style.display = "none";
  }
  
  function closeSidebar() {
    const navbar = document.getElementById("navbar");
    const openButton = document.getElementById("open-sidebar-button");
    navbar.classList.remove("show");
    openButton.setAttribute("aria-expanded", "false");
    openButton.style.display = "block";
  }

  const removeOutline = (event) => {
    event.target.blur();
  };

  const createNavItem = (key, label) => {
    const href = `#${key}`;
    const isActive = currentSection === key || (key === 'home' && currentSection === '');

    return (
      <li key={key}>
        <a
          href={href}
          className={isActive ? "active-link" : ""}
          onClick={(e) => {
            e.preventDefault();
            window.location.hash = (key === 'home' ? '' : href);
            scrollToSection(key);
            setCurrentSection(key);
            removeOutline(e);
            closeSidebar();
          }}
        >
          {label}
        </a>
      </li>
    );
  };

  return (
    <div className="App">
      <button
        id="open-sidebar-button"
        aria-label="open sidebar"
        aria-expanded="false"
        aria-controls="navbar"
        onClick={openSidebar}
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000">
          <path d="M165.13-254.62q-10.68 0-17.9-7.26-7.23-7.26-7.23-18t7.23-17.86q7.22-7.13 17.9-7.13h629.74q10.68 0 17.9 7.26 7.23 7.26 7.23 18t-7.23 17.87q-7.22 7.12-17.9 7.12H165.13Zm0-200.25q-10.68 0-17.9-7.27-7.23-7.26-7.23-17.99 0-10.74 7.23-17.87 7.22-7.13 17.9-7.13h629.74q10.68 0 17.9 7.27 7.23 7.26 7.23 17.99 0 10.74-7.23 17.87-7.22 7.13-17.9 7.13H165.13Zm0-200.26q-10.68 0-17.9-7.26-7.23-7.26-7.23-18t7.23-17.87q7.22-7.12 17.9-7.12h629.74q10.68 0 17.9 7.26 7.23 7.26 7.23 18t-7.23 17.86q-7.22 7.13-17.9 7.13H165.13Z" />
        </svg>
      </button>

      <nav id="navbar" ref={navbarRef} className="sidebar">
        <ul>
          <li>
            <button
              id="close-sidebar-button"
              aria-label="close sidebar"
              onClick={closeSidebar}
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000">
                <path d="m480-444.62-209.69 209.7q-7.23 7.23-17.5 7.42-10.27.19-17.89-7.42-7.61-7.62-7.61-17.7 0-10.07 7.61-17.69L444.62-480l-209.7-209.69q-7.23-7.23-7.42-17.5-.19-10.27 7.42-17.89 7.62-7.61 17.7-7.61 10.07 0 17.69 7.61L480-515.38l209.69-209.7q7.23-7.23 17.5-7.42 10.27-.19 17.89 7.42 7.61 7.62 7.61 17.7 0 10.07-7.61 17.69L515.38-480l209.7 209.69q7.23 7.23 7.42 17.5.19 10.27-7.42 17.89-7.62 7.61-17.7 7.61-10.07 0-17.69-7.61L480-444.62Z" />
              </svg>
            </button>
          </li>
          {Object.entries(NAV_LINKS).map(([key, label]) => createNavItem(key, label))}
        </ul>
      </nav>

      <div id="overlay" onClick={closeSidebar} aria-hidden="true"></div>

      <div className="left-icons">
        <a
          href="https://www.linkedin.com/in/om-balar-b06b7a250/"
          target="_blank"
          rel="noopener noreferrer"
          className="icon-link"
        >
          <LinkedInIcon fontSize="large" />
        </a>
        <a href="mailto:om.balar@torontomu.com" className="icon-link">
          <EmailIcon fontSize="large" />
        </a>
      </div>

      <div ref={sectionRefs.current.home} className="hero" id="home">
        <h1 className="intro">
          Hello,
          <br />
          my name is
        </h1>
        <h1 className="name">Om Balar</h1>
        <button
          className="scroll-button"
          onClick={() => scrollToSection("summary")}
        >
          ↓ Scroll Down to Learn More About Me
        </button>
      </div>

      <div style={{ height: "30vh" }}></div>

      <Grid container spacing={{xs:80, md:10}}>
      
      <div
        ref={sectionRefs.current.summary}
        className="resume-container"
        id="summary"
      >
        <div className="resume-section">
          <h2>About Me</h2>
          <p>
            As a motivated fourth-year Computer Engineering student, I specialize in <b>Distributed Systems</b>, <b>Cloud Computing</b>, and <b>AWS Architecture</b>. 
            I am passionate about building fault-tolerant systems and leveraging AI tools to deliver operational excellence.
            With a strong foundation in Python, Java, and scalable microservices, I aim to solve complex engineering challenges and contribute meaningful solutions to forward-thinking companies.
          </p>
        </div>
      </div>

      <div
        ref={sectionRefs.current.education}
        className="resume-container"
        id="education"
      >
        <div className="resume-section">
          <h2>Education</h2>
          <ul>
            <li>
              <b>Toronto Metropolitan University (Formerly Ryerson University)</b>
              <br/>Bachelor of Engineering - Computer Engineering (Co-op) [Sep. 2022 – Apr. 2027]
            </li>
            <li><b>Achievements:</b> Dean's List (CGPA: 4.29/4.33)</li>
            <li><b>Certifications:</b> JetBrains Academy & AWS: Full-Stack Cloud Developer (ECS, ECR, CodeDeploy).</li>
            <li><b>Relevant Coursework:</b> Advanced Algorithms, Database Systems, Software Design and Architecture, Machine Learning, Operating Systems, Probability and Stochastic Processes.</li>
          </ul>
        </div>
      </div>

      <div
        ref={sectionRefs.current.skills}
        className="resume-container"
        id="skills"
      >
        <div className="resume-section">
          <h2>Technical Skills</h2>
          <ul>
            <li><b>Languages:</b> Java, Python, C, C++, TypeScript, JavaScript, SQL, Bash, VHDL</li>
            <li><b>Cloud & DevOps:</b> AWS (ECS, ECR, CodeDeploy, S3, EC2), Docker, Kubernetes, Jenkins CI/CD</li>
            <li><b>Frameworks:</b> Spring Boot, React.js, AngularJS, Node.js, Next.js, JUnit, Mockito, JavaFX</li>
            <li><b>Databases & Systems:</b> PostgreSQL, MongoDB, Redis, Kafka, Microservices, Linux/Unix</li>
          </ul>
        </div>
      </div>

      <div
        ref={sectionRefs.current.experience}
        className="resume-container"
        id="experience"
      >
        <div className="resume-section">
          <h2>Work Experience I</h2>
          
          <div className="job-entry" style={{ marginBottom: '3rem' }}>
            <h3>Software Developer Intern | Environment and Climate Change Canada</h3>
            <p className="job-meta">Toronto, ON | May 2025 – Present</p>
            <br />
            <p className="job-description">
              I am currently building internal tools that support Canada’s weather services, contributing to both frontend (Angular) and backend (Java Spring Boot) development. My focus is on modernizing legacy systems into scalable microservices.
            </p>
            <ul>
              <li>Migrated legacy monolithic modules to <b>Java Spring Boot microservices</b>, achieving <b>99.9% uptime</b>.</li>
              <li>Architected a <b>Distributed Data Ingestion</b> pipeline processing <b>1.5 million+ XML files</b> daily, optimizing data availability by 60%.</li>
              <li>Integrated <b>Redis caching</b> to handle high-concurrency traffic, reducing API latency from 800ms to <b>150ms</b>.</li>
              <li>Integrated <b>Cypress</b> E2E testing into the CI/CD lifecycle, reducing regression bugs by 50%.</li>
            </ul>
          </div>
        </div>
        </div>
        <div
        className="resume-container"
        id="experience"
      >
        <div className="resume-section">
          <div className="job-entry">
            <h2>Work Experience II</h2>
            <h3>Software Engineer Intern | Reviewer.ly</h3>
            <p className="job-meta">Toronto, ON | May 2024 – Aug. 2024</p>
            <br />
            <p className="job-description">
              I worked on the core platform at TMU’s LS3 Lab, enhancing user profile management and error tracking. I tackled challenges in storage efficiency and backend performance for a growing user base.
            </p>
            <ul>
              <li>Integrated <b>AWS S3</b> for efficient media storage, reducing cloud infrastructure costs by <b>25%</b>.</li>
              <li>Migrated REST endpoints to <b>gRPC</b>, achieving a <b>30% reduction</b> in payload size.</li>
              <li>Built a fault-tolerant error tracking microservice using <b>Java</b> and <b>RabbitMQ</b>.</li>
              <li>Delivered a user analytics dashboard using <b>React.js</b> and <b>PostgreSQL</b> for 10,000+ active users.</li>
            </ul>
          </div>
        </div>
      </div>

      <div
        ref={sectionRefs.current.projects}
        className="resume-container"
        id="projects"
      >
        <div className="resume-section">
          <h2>Notable Projects I</h2>
          
          <div className="project-entry">
            <h3>Cloud-Native Chat Application | <i>AWS (ECS, CodeDeploy), Docker, React</i></h3>
            <ul>
              <li>Developed a real-time messaging platform, containerizing backend services with <b>Docker</b> and managing images via <b>Amazon ECR</b>.</li>
              <li>Orchestrated scalable production deployments using <b>Amazon ECS</b> and implemented automated scaling policies.</li>
              <li>Built a fully automated CI/CD pipeline using <b>AWS CodeDeploy</b> for zero-downtime updates.</li>
            </ul>
          </div>
            <br />

          <div className="project-entry">
            <h3>Portify (Open Source) | <i>React.js, Node.js, TypeScript, PostgreSQL</i></h3>
            <ul>
              <li>Developing an open-source portfolio generation platform leveraging AI-assisted coding tools.</li>
              <li>Engineered a normalized <b>PostgreSQL</b> schema to handle complex relationships and built a secure RESTful API with Node.js.</li>
            </ul>
            <p className="project-link">
              <a href="https://github.com/OmBalar/Portify" target="_blank" rel="noopener noreferrer">View on GitHub</a>
            </p>
          </div>
          </div>
          </div>
          <div
        className="resume-container"
        id="projects"
      >
        <div className="resume-section">
          <h2>Notable Projects II</h2>

          <div className="project-entry">
            <h3>Robot Guidance System | <i>Assembly, Embedded Systems</i></h3>
            <ul>
              <li>Programmed an autonomous robot in <b>Assembly</b> to navigate mazes, demonstrating adaptive learning by backtracking from dead ends.</li>
              <li>Designed motor control logic for precise turns and debugged timing states using LCD instrumentation.</li>
            </ul>
            <p className="project-link">
              <a href="https://github.com/OmBalar/Robot-Guidance" target="_blank" rel="noopener noreferrer">View on GitHub</a>
            </p>
          </div>
            <br />

          <div className="project-entry">
            <h3>ML Gradient Descent Implementation | <i>Python, NumPy, Matplotlib</i></h3>
            <ul>
              <li>Implemented Linear and Logistic Regression algorithms from scratch to predict student marks and classify heart disease risk.</li>
              <li>Visualized regression lines and error reduction across iterations to demonstrate the impact of feature standardization.</li>
            </ul>
          </div>
            <br />

          <div className="project-entry">
            <h3>Job Bank Application | <i>Java Servlets, MySQL, GCP</i></h3>
            <ul>
              <li>Developed a dynamic job bank using the microservices architecture, deployed on <b>Google Cloud Platform (GCP)</b>.</li>
              <li>Integrated MySQL for data persistence and Apache Tomcat for hosting.</li>
            </ul>
          </div>
        </div>
      </div>

      <div
        ref={sectionRefs.current.extracurricular}
        className="resume-container"
        id="extracurricular"
      >
        <div className="resume-section">
          <h2>Extra-Curricular</h2>
          <ul>
            <li>
                <b>Metropolitan Data Science Association - Member:</b> Enhanced data analysis skills in Python and R through weekly challenges and a final capstone project.
            </li>
            <li>
                <b>Programming Club - Executive Member:</b> Collaborated to manage the club and delivered presentations on algorithm design to prepare members for competitions.
            </li>
          </ul>
        </div>
      </div>

      <div
        ref={sectionRefs.current.connect}
        className="resume-container"
        id="connect"
      >
        <div className="resume-section">
          <h2>Looking To Hire?</h2>
          <ul>
            <li>Looking to hire a Software Engineer for a Summer 2026 co-op?</li>
            <li>Please reach out to me below!</li>
            <li className="contact-icons-row">
              <a
                href="https://www.linkedin.com/in/om-balar-b06b7a250/"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-link-bottom"
              >
                <LinkedInIcon fontSize="large" />
              </a>
              <a href="mailto:om.balar@torontomu.com" className="icon-link-bottom">
                <EmailIcon fontSize="large" />
              </a>
              <a
                href="https://github.com/OmBalar"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-link-bottom"
              >
                <GitHubIcon fontSize="large" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      </Grid>
    </div>
  );
}

export default App;