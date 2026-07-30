import React from "react";
// State
import { useSelector } from "react-redux";
import { selectProjects, selectMainProjects } from "../app/projectsSlice";
import { useGetProjectsQuery } from "../app/apiSlice";
// Icons
import { Icon } from "@iconify/react";
// Components
import { Element } from "react-scroll";
import { Container } from "react-bootstrap";
import Loading from "./Loading";
import ProjectCard from "./ProjectCard";
import styled from "styled-components";
import useReveal from "../hooks/useReveal";
import { githubUsername } from "../config";

const StyledProjects = styled.section`
  background: var(--paper);

  .projects-head {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3rem;
  }

  .projects-intro {
    color: var(--muted);
    line-height: 1.75;
    margin: 1.5rem 0 2rem;
    max-width: 620px;
  }

  .projects-title-row {
    align-items: center;
    display: flex;
    gap: clamp(2rem, 6vw, 5rem);
    justify-content: space-between;
  }

  .projects-title-row .section-heading {
    margin: 0;
    max-width: 760px;
  }

  .project-status {
    display: grid;
    flex: 0 0 auto;
    gap: 1px;
    grid-template-columns: repeat(2, minmax(8.5rem, 1fr));
  }

  .project-status-item {
    background: var(--surface);
    border: var(--border);
    color: var(--ink);
    min-height: 7rem;
    overflow: hidden;
    padding: 1rem;
    position: relative;
    transition: background var(--transition), transform var(--transition);
  }

  .project-status-item::after {
    background: var(--cyan);
    bottom: 0;
    content: "";
    height: 3px;
    left: 0;
    position: absolute;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 280ms cubic-bezier(0.2, 0.75, 0.2, 1);
    width: 100%;
  }

  .project-status-item:hover {
    background: color-mix(in srgb, var(--surface) 88%, var(--cyan));
    transform: translateY(-5px);
  }

  .project-status-item:hover::after {
    transform: scaleX(1);
  }

  .project-status-key {
    color: var(--muted);
    font-family: var(--mono-font);
    font-size: 0.6rem;
  }

  .project-status-value {
    color: var(--cyan);
    font-family: var(--display-font);
    font-size: 2rem;
    line-height: 1;
    margin-top: 1rem;
    transition: transform 240ms ease;
  }

  .project-status-item:hover .project-status-value {
    transform: translateX(5px);
  }

  .project-grid {
    display: grid;
    gap: 2px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .all-projects-link {
    border: 1px solid var(--ink);
    display: inline-block;
    font-family: var(--mono-font);
    font-size: 0.72rem;
    margin-top: 2rem;
    padding: 0.9rem 1.1rem;
    text-decoration: none;
    text-transform: uppercase;
  }

  .section-copy {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 500ms ease, transform 500ms ease;
  }

  .section-copy.visible {
    opacity: 1;
    transform: none;
  }

  @media (max-width: 991px) {
    .projects-title-row {
      align-items: flex-start;
      flex-direction: column;
    }

    .project-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }

  @media (max-width: 575px) {
    .project-status {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      width: 100%;
    }

    .project-grid { grid-template-columns: 1fr; }
  }
`;

// #region component
const Projects = () => {
  const projects = useSelector(selectProjects);
  const mainProjects = useSelector(selectMainProjects);
  const { isLoading, isSuccess, isError, error } = useGetProjectsQuery();
  const { ref, isVisible } = useReveal();
  let content;

  if (isLoading) {
    content = (
      <Container className="d-flex">
        <Loading />
      </Container>
    );
  } else if (isSuccess) {
    content = (
      <>
        {!error && projects.length === 0 && (
          <h2 className="text-center">
            Oops, you do not have any GitHub projects yet...
          </h2>
        )}
        {mainProjects.length !== 0 && (
          <>
            <div className="project-grid">
              {mainProjects.map((element, index) => {
                return (
                  <ProjectCard
                    key={element.id}
                    category={element.category}
                    stack={element.stack}
                    index={index}
                    name={element.name}
                    description={element.description}
                    url={element.html_url}
                    demo={element.homepage}
                  />
                );
              })}
            </div>
            {projects.length > 3 && (
              <a
                className="all-projects-link"
                href={`https://github.com/${githubUsername}?tab=repositories`}
                target="_blank"
                rel="noreferrer"
              >
                All projects <Icon icon="lucide:arrow-right" />
              </a>
            )}
          </>
        )}
      </>
    );
  } else if (isError) {
    content = (
      <Container className="d-flex align-items-center justify-content-center">
        <h2>{`${error.status} - check getProjects query in src/app/apiSlice.js`}</h2>
      </Container>
    );
  }

  return (
    <Element name={"Projects"} id="projects">
      <StyledProjects className="section" ref={ref}>
        <Container>
          <div className={`section-copy ${isVisible ? "visible" : ""}`}>
            <div className="projects-head">
              <span className="eyebrow">{"/* selected work */"}</span>
              <span className="eyebrow">02 / PROJECTS</span>
            </div>
            <div className="projects-title-row">
              <h2 className="section-heading">Built to solve real problems.</h2>
              <div className="project-status" aria-label="Portfolio statistics">
                <div className="project-status-item">
                  <div className="project-status-key">total_projects</div>
                  <div className="project-status-value">{projects.length}</div>
                </div>
                <div className="project-status-item">
                  <div className="project-status-key">focus</div>
                  <div className="project-status-value">WEB</div>
                </div>
              </div>
            </div>
            <p className="projects-intro">
              Selected applications spanning community tools, creative workflows, and commerce.
            </p>
          </div>
          {content}
        </Container>
      </StyledProjects>
    </Element>
  );
};
// #endregion

export default Projects;
