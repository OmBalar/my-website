import React, { useEffect, useRef, useState } from "react";
import Grid from '@mui/material/Grid2';
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import "./App.css";

const menuItems = {
  home: 0,
  objective: null,
  education: null,
  programmingskills: null,
}

function App() {
  const sectionRefs = useRef({
    home: React.createRef(),
    objective: React.createRef(),
    education: React.createRef(),
    programmingskills: React.createRef(),
    experience: React.createRef(),
    projects: React.createRef(),
    extracurricular: React.createRef(),
    relevantcourses: React.createRef(),
    connect: React.createRef(),
  });

  const [currentSection, setCurrentSection] = useState("home");

  useEffect(() => {
    const observerOptions = {
      root: null, // Use the viewport as the root
      rootMargin: "-100px", // Trigger when 100px before entering the viewport
      threshold: 0.25, // Trigger when 25% of the section is in view
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          //window.location.hash = `#${sectionId}`; // Update the URL hash when the section is in view
          setCurrentSection(sectionId);
        }
      });
    }, observerOptions);

    // Observe each section
    Object.values(sectionRefs.current).forEach((sectionRef) => {
      observer.observe(sectionRef.current);
    });

    return () => {
      observer.disconnect(); // Cleanup observer when component unmounts
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
  const overlayRef = useRef(null);

  function openSidebar() {
    const navbar = document.getElementById("navbar");
    const openButton = document.getElementById("open-sidebar-button");
  
    navbar.classList.add("show");
    openButton.setAttribute("aria-expanded", "true");
    openButton.style.display = "none"; // Hide the button
  }
  
  function closeSidebar() {
    const navbar = document.getElementById("navbar");
    const openButton = document.getElementById("open-sidebar-button");
  
    navbar.classList.remove("show");
    openButton.setAttribute("aria-expanded", "false");
    openButton.style.display = "block"; // Show the button again
  }

  const removeOutline = (event) => {
    event.target.blur();
  };

  const createNavItem = (scrollToSection, label, href, currentSection, setCurrentSection) => {
    return (
      <li>
        <a
          href={href}
          className={currentSection === (href == "#home" ? "" : href.replace("#", "")) ? "active-link" : ""}
          onClick={(e) => {
            e.preventDefault(); // Prevent default anchor behavior
            window.location.hash = `${href}`;
            scrollToSection(href.replace("#", "")); // Scroll to the section
            setCurrentSection(href.replace("#", "")); // Update the current section
            removeOutline(e); // Remove focus outline after clicking
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

      {/* Sidebar Navigation */}
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
          {createNavItem(scrollToSection, "Home", "#home", currentSection, setCurrentSection)}
          {createNavItem(scrollToSection, "Objective", "#objective", currentSection, setCurrentSection)}
          {createNavItem(scrollToSection, "Education", "#education", currentSection, setCurrentSection)}
          {createNavItem(scrollToSection, "Programming Skills", "#programmingskills", currentSection, setCurrentSection)}
          {createNavItem(scrollToSection, "Work Experience", "#experience", currentSection, setCurrentSection)}
          {createNavItem(scrollToSection, "Projects", "#projects", currentSection, setCurrentSection)}
          {createNavItem(scrollToSection, "Extra-Curricular", "#extracurricular", currentSection, setCurrentSection)}
          {createNavItem(scrollToSection, "Coursework", "#relevantcourses", currentSection, setCurrentSection)}
          {createNavItem(scrollToSection, "Contact Me", "#connect", currentSection, setCurrentSection)}
        </ul>
      </nav>

      {/* Overlay */}
      <div id="overlay" ref={overlayRef} onClick={closeSidebar} aria-hidden="true"></div>

      <div className="left-icons">
        <a
          href="https://www.linkedin.com/in/ombalar/"
          target="_blank"
          rel="noopener noreferrer"
          className="icon-link"
        >
          <LinkedInIcon fontSize="large" />
        </a>
        <a href="mailto:om.balar2@gmail.com" className="icon-link">
          <EmailIcon fontSize="large" />
        </a>
      </div>

      <div ref={sectionRefs.current.home} className="hero">
        <h1 className="intro">
          Hello,
          <br />
          my name is
        </h1>
        <h1 className="name">Om Balar</h1>
        <button
          className="scroll-button"
          onClick={() => scrollToSection("objective")}
        >
          ↓ Scroll Down to Learn More About Me
        </button>
      </div>

      <div style={{ height: "30vh" }}></div>

      <Grid container spacing={{xs:80, md:10}}>
      <div
        ref={sectionRefs.current.objective}
        className="resume-container"
        id="objective"
      >
        <div className="resume-section">
          <h2>Objective</h2>
          <p>As a motivated third-year Computer Engineering student, I am eager to apply my skills in software engineering, problem-solving, and optimization to tackle complex challenges. With experience in programming languages like Python and Java, and technologies such as React.js and Node.js, I am excited to contribute to innovative and efficient solutions. I aim to grow as an engineer and make meaningful contributions to a forward-thinking company.</p>
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
            <li>Bachelor of Engineering - Computer Engineering, Toronto Metropolitan University [2022-2027]</li>
            <li>Ontario Secondary School Diploma - Northview Heights Secondary School [2018-2022]</li>
          </ul>
        </div>
      </div>

      <div
        ref={sectionRefs.current.programmingskills}
        className="resume-container"
        id="programmingskills"
      >
        <div className="resume-section">
          <h2>Programming Skills</h2>
          <ul>
            <li><b>Programming Languages:</b> Python, Java, C, C++, SQL, JavaScript, TypeScript, HTML, CSS, VHDL</li>
            <li><b>Technologies:</b> Git, Docker, PostgreSQL, MongoDB, MySQL, OpenAPI</li>
            <li><b>Frameworks:</b> React.js, Node.js, Next.js, Spring, JUnit, Mockito, Jest, JavaFX</li>
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
          <ul>
            <li><b>Software Developer, Environment and Climate Change Canada [May 2025-Present]</b></li>
            <li>I'm currently a Software Developer Intern at Environment and Climate Change Canada, where I am focused on building internal tools that support Canada’s weather and climate services. In this role, I’ve contributed to both frontend and backend development using Angular, Java, Python, and SQL. In the 2 months that I've worked here, I developed a content editing feature that allows clients to manage their own web content and images, reducing their dependency on developers. I also created a data processing pipeline to efficiently analyze over 1.5 million XML forecast files and update key database records, improving data accuracy and automation. This experience has allowed me to work on real-world production systems, collaborate with cross-functional teams, and strengthen my full-stack development skills.</li>
          </ul>
        </div>
      </div>

      <div
        className="resume-container"
        id="experience"
      >
        <div className="resume-section">
          <h2>Work Experience II</h2>
          <ul>
            <li><b>Software Engineer, Reviewer.ly [May 2024-August 2024]</b></li>
            <li>I worked as a Software Engineer Intern to develop the website for the Reviewer.ly project at TMU’s LS3 Lab. I enhanced user profile management by implementing features to customize the profile using React.js, Next.js, and Spring Boot, leveraging react-query for efficient API interactions. I also developed a feature to view and resolve error reports, implementing an SMTP service for email notifications upon resolution, streamlining issue tracking and communication. I used OpenAPI and gRPC for efficient data retrieval from a MongoDB database, ensuring application performance and reliability while conducting thorough testing with Jest and Mockito to reduce potential bugs. During my work term, I had to address challenges in storing large profile pictures by compressing images on both the front-end and back-end, optimizing storage efficiency while maintaining image quality.</li>
          </ul>
        </div>
      </div>

      <div
        ref={sectionRefs.current.projects}
        className="resume-container"
        id="projects"
      >
        <div className="resume-section">
          <h2>Projects I</h2>
          <ul>
            <li><b>Portify - Full Stack Developer</b></li>
            <li>Independently developing an open-source web application that allows users to neatly store projects and create
visually appealing portfolios, enabling them to focus on what matters without worrying about front-end design. Front-end and back-end development use the React.js and Node.js frameworks, respectively. These services
were created using TypeScript to increase readability and allow for Object-Oriented Programming. Designed and implemented a PostgreSQL database for its reliability, connectivity, speed, and security. You can view the code on my <a href="https://github.com/OmBalar/Portify" target="_blank" rel="noopener noreferrer">GitHub</a>.</li>
          </ul>
          <ul>
          <li><b>Job Bank Application - Software Architect</b></li>
          <li>I developed a dynamic job bank application using HTML, CSS, JSP, Servlets, and MySQL, following the microservices architecture to ensure modularity and maintainability. The application allows users to 
            register, search for job listings, and securely manage their profiles. I deployed the application on Google Cloud Platform (GCP) using the Compute Engine and the Kubernetes Engine to provide scalable cloud hosting, ensuring high availability 
            and performance. The project is hosted on Apache Tomcat and integrated with a MySQL database to handle user authentication, job postings, and data persistence. This demonstrates my ability to build scalable, full-stack 
            web applications while leveraging industry-standard technologies and best practices. You can view the project at <a href="https://35.208.14.43/" target="_blank" rel="noopener noreferrer">jobbank</a>, although it is still under development so a proper domain isn't registered for it.</li>
          </ul>
        </div>
      </div>

      <div
        className="resume-container"
        id="projects"
      >
        <div className="resume-section">
          <h2>Projects II</h2>
          <ul>
            <li><b>Bank Account Application - Software Engineer</b></li>
            <li>I developed a bank account management system using Java and JavaFX for the graphical user interface. The application allows customers to log in, make deposits, withdraw funds, check balances, and make tiered online purchases based on account levels. I applied object-oriented design principles and used key concepts such as State Design Pattern, Singleton Pattern, and UML diagrams to model the system’s architecture. This project strengthened my skills in developing Java-based applications, working with GUI design, and applying design patterns to manage dynamic behavior. View the code for this project on my <a href="https://github.com/OmBalar/Bank-Application" target="_blank" rel="noopener noreferrer">GitHub</a>.</li>
          </ul>
          <ul>
            <li><b>Implementation of Gradient Descent for Regression Models - Machine Learning Engineer</b></li>
            <li>I implemented Linear and Logistic Regression algorithms from scratch using Python, focusing on Gradient Descent optimization. For Linear Regression, I predicted student final marks from midterm scores by standardizing data, calculating cost functions, and iteratively updating parameters (slope, intercept). I visualized regression lines and error reduction across iterations, comparing results with and without feature standardization to demonstrate its impact on model convergence. In Logistic Regression, I classified coronary heart disease risk through EDA, one-hot encoding categorical variables, and standardizing features. I defined a sigmoid hypothesis, implemented batch/mini-batch Gradient Descent, and analyzed learning curves to optimize binary cross-entropy loss. Results were validated against Python’s LogisticRegression library. Using NumPy, Pandas, and Matplotlib, I reinforced skills in data preprocessing, algorithm mechanics, hyperparameter tuning, and visualization, highlighting the critical role of standardization and iterative optimization in model performance.</li>
          </ul>
        </div>
      </div>

      <div
        className="resume-container"
        id="projects"
      >
        <div className="resume-section">
          <h2>Projects III</h2>
          <ul>
            <li><b>Payroll Management DBMS - Database Designer</b></li>
            <li>In this team project, I co-developed a Payroll Management DBMS using JavaFX for the frontend and Oracle SQL for the backend. I contributed to designing entities (employees, payroll, taxes) and relationships, normalized the schema to 3NF/BCNF, and built SQL queries for payroll processing and report generation. The JavaFX GUI streamlined tasks like salary calculations, deductions, and data visualization, while Unix shell scripts automated backend operations. Collaborating via Git, we delivered a user-friendly system that demonstrated proficiency in database design, full-stack integration, and team-based software development.</li>
          </ul>
          <ul>
            <li><b>Robot Guidance - Embedded Systems Engineer</b></li>
            <li>In this team project, we programmed an autonomous robot using assembly language to navigate and solve a maze, demonstrating adaptive learning by backtracking from dead ends and updating its path decisions. Collaboratively, we designed motor control logic for precise turns, and debugged timing/state issues using breakpoints and LCD instrumentation. The robot successfully learned optimal routes, highlighting teamwork in low-level programming and embedded systems problem-solving. The code for this project is available on my <a href="https://github.com/OmBalar/Robot-Guidance" target="_blank" rel="noopener noreferrer">GitHub</a>.</li>
          </ul>
          <ul>
            <li><b>Data Analysis in C - Data Analyst</b></li>
            <li>Worked with a team to analyze real data collected by Statistics Canada about the prevalence of diabetes in
Canada. Used C to perform all computations and used Gnuplot to plot the data to show a visual representation that can
help further analyze the data. The code for this project is on my <a href="https://github.com/OmBalar/Data-Analysis" target="_blank" rel="noopener noreferrer">GitHub</a>.</li>
          </ul>
        </div>
      </div>

      <div
        ref={sectionRefs.current.extracurricular}
        className="resume-container"
        id="extracurricular"
      >
        <div className="resume-section">
          <h2>Extra-curricular</h2>
          <ul>
            <li><b>Programming Club - Executive Member</b></li>
            <li>Collaborated with fellow executives to manage the programming club at Northview Heights S.S. Delivered engaging presentations on algorithm design and efficiency, equipping members with the knowledge
and skills needed for an upcoming programming competition.</li>
          </ul>
          <ul>
            <li><b>Metropolitan Data Science Association - Member</b></li>
            <li>Enhanced data analysis skills in Python, R, and SQL through a comprehensive data science program, which
            featured a series of weekly challenges and culminated in a final project completed in December 2023.</li>
          </ul>
        </div>
      </div>

      <div
        ref={sectionRefs.current.relevantcourses}
        className="resume-container"
        id="relevantcourses"
      >
        <div className="resume-section">
          <h2>Relevant Coursework</h2>
          <ul>
            <li><b>Algorithms and Data Structures:</b> Developed the ability to analyze the time and memory efficiency of algorithms and explored their implementation in C using various data structures.</li>
            <li><b>Software Systems:</b> Gained insights into the software development cycle, including requirements analysis, implementation, and testing, along with inspection and debugging techniques.</li>
            <li><b>Database Systems I:</b> Explored advanced file management techniques, focusing on database organization, design, and management. Emphasized Relational Database Management Systems (RDBMS), including relational algebra, normal forms, physical database structures, and relational database languages.</li>
            <li><b>Object-Oriented Engineering Analysis and Design:</b> Developed expertise in analyzing, designing, implementing, and testing industrial-quality, reusable software systems. Created a GUI for a bank using JavaFX.</li>
            <li><b>Software Design Architecture:</b> Covered techniques, strategies, and representations for implementing software systems, with a focus on system-level software design, large architectural models for System-On-Chip (SoC) systems, Electronic-Design-Automation (EDA) tool flows, and embedded systems development.</li>
            <li><b>Software Requirements Analysis and SPEC:</b> Learned about the requirement definition phase of the software development cycle and practiced creating appropriate descriptions of a desired system.</li>
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
            <li>Looking to hire a Software Engineer for a Summer 2025 co-op (up to 16 months)?</li>
            <li>Please reach out to me below!</li>
            <li>
              <a
                href="https://www.linkedin.com/in/ombalar/"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-link-bottom"
              >
                <LinkedInIcon fontSize="large" />
              </a>
              <a href="mailto:om.balar2@gmail.com" className="icon-link-bottom">
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

