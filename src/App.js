import React, { useEffect, useRef, useState } from "react";
import Grid from '@mui/material/Grid2';
import "./App.css";

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
  const [isScrolling, setIsScrolling] = useState(false); // Track if scroll is in progress

  // Scroll to the target section by ID
  const scrollToSection = (section) => {
    sectionRefs.current[section].current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });

    // Use setTimeout to update the URL hash after the scroll
    setTimeout(() => {
      window.location.hash = `#${section}`;
    }, 500); // After scroll animation duration
  };

  

  // Attach scroll event listener when the component is mounted
  useEffect(() => {
    const handleScroll = (e) => {
      if (isScrolling) return; // Ignore scroll if one is already in progress
  
      setIsScrolling(true); // Set flag to indicate scroll is in progress
  
      if (e.deltaY > 0) {
        // Scrolling down, go to the next section
        scrollToNextSection();
      } else if (e.deltaY < 0) {
        // Scrolling up, go to the previous section
        scrollToPreviousSection();
      }
  
      // Reset the scrolling flag after the scroll animation duration
      setTimeout(() => {
        setIsScrolling(false); // Re-enable scrolling after the delay
      }, 1500); // Adjust this duration to match your scroll animation duration
    };

    // Scroll to the next section
  const scrollToNextSection = () => {
    const sections = Object.keys(sectionRefs.current);
    const currentIndex = sections.indexOf(currentSection);

    if (currentIndex < sections.length - 1) {
      const nextSection = sections[currentIndex + 1];
      setCurrentSection(nextSection);
      scrollToSection(nextSection);
    }
  };

  // Scroll to the previous section
  const scrollToPreviousSection = () => {
    const sections = Object.keys(sectionRefs.current);
    const currentIndex = sections.indexOf(currentSection);

    if (currentIndex > 0) {
      const prevSection = sections[currentIndex - 1];
      setCurrentSection(prevSection);
      scrollToSection(prevSection);
    }
  };
  
    window.addEventListener("wheel", handleScroll, { passive: true });
  
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [isScrolling, currentSection]);  // No need to include handleScroll explicitly

  // Handle intersection observer to update URL when a section is in view
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
          window.location.hash = `#${sectionId}`; // Update the URL hash when the section is in view
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

  return (
    <div className="App">
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

      <Grid container spacing={{xs:80, md:80}}>
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
            <li>Bachelor of Engineering - Computer Engineering, Toronto Metropolitan University [2022-2026]</li>
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
            <li><b>Programming Languages:</b> Python, Java, C, C++, SQL, JavaScript, TypeScript, HTML, CSS</li>
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
          <h2>Work Experience</h2>
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
          <h2>Projects</h2>
          <ul>
            <li><b>Portify - Full Stack Developer</b></li>
            <li>Independently developing an open-source web application that allows users to neatly store projects and create
visually appealing portfolios, enabling them to focus on what matters without worrying about front-end design. Front-end and back-end development use the React.js and Node.js frameworks, respectively. These services
were created using TypeScript to increase readability and allow for Object-Oriented Programming. Designed and implemented a PostgreSQL database for its reliability, connectivity, speed, and security.</li>
          </ul>
          <ul>
            <li><b>Data Analysis in C - Data Analyst</b></li>
            <li>Worked with a team to analyze real data collected by Statistics Canada about the prevalence of diabetes in
Canada. Used C to perform all computations and used Gnuplot to plot the data to show a visual representation that can
help further analyze the data.</li>
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
          <h2>Connect With Me</h2>
          <p>Find me on LinkedIn at the following link: <a href="https://www.linkedin.com/in/ombalar/">linkedin.com/in/ombalar</a></p>
        </div>
      </div>
      </Grid>
    </div>
  );
}

export default App;

