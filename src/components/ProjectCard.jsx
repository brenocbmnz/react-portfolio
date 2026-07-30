import React from "react";
// Styles
import styled from "styled-components";
// State
import PropTypes from "prop-types";
// Icons
import { Icon } from "@iconify/react";
// Images
import useReveal from "../hooks/useReveal";

// #region styled-components
const StyledCard = styled.div`
  height: 100%;
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 500ms ease ${({ $delay }) => $delay}ms,
    transform 500ms ease ${({ $delay }) => $delay}ms;

  &.visible {
    opacity: 1;
    transform: none;
  }

  .project-card {
    background: var(--cyan);
    border: 1px solid var(--ink);
    color: #101414;
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 19rem;
    overflow: hidden;
    padding: 1.6rem;
    position: relative;
    transform-style: preserve-3d;
    transition: background var(--transition), color var(--transition), transform 100ms ease;
  }

  .project-card::after {
    background: radial-gradient(
      260px circle at var(--pointer-x, 50%) var(--pointer-y, 50%),
      rgba(255, 255, 255, 0.46),
      transparent 64%
    );
    content: "";
    inset: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    transition: opacity 220ms ease;
    z-index: 0;
  }

  .project-card::before {
    background: linear-gradient(
      105deg,
      transparent 20%,
      rgba(255, 255, 255, 0.08) 38%,
      rgba(255, 255, 255, 0.52) 50%,
      rgba(255, 255, 255, 0.08) 62%,
      transparent 80%
    );
    content: "";
    inset: -30% auto -30% -70%;
    pointer-events: none;
    position: absolute;
    transform: skewX(-12deg);
    transition: transform 720ms cubic-bezier(0.2, 0.75, 0.2, 1);
    width: 55%;
    z-index: 0;
  }

  .project-card:hover {
    background: color-mix(in srgb, var(--cyan) 82%, white);
    color: #101414;
  }

  .project-top {
    align-items: start;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    position: relative;
    transform: translateZ(16px);
    z-index: 1;
  }

  h3 {
    font-family: var(--display-font);
    font-size: 1.35rem;
    margin: 0;
    overflow-wrap: anywhere;
    text-transform: uppercase;
  }

  .project-category {
    border: 1px solid currentColor;
    font-family: var(--mono-font);
    font-size: 0.58rem;
    padding: 0.3rem 0.45rem;
    text-transform: uppercase;
    white-space: nowrap;
    transition: background 220ms ease, color 220ms ease, transform 220ms ease;
  }

  .project-stack {
    font-family: var(--mono-font);
    font-size: 0.66rem;
    margin-top: 1.2rem;
    opacity: 0.68;
    text-transform: uppercase;
    position: relative;
    transform: translateZ(10px);
    transition: letter-spacing 260ms ease, opacity 260ms ease;
    z-index: 1;
  }

  p {
    font-size: 0.88rem;
    line-height: 1.75;
    margin: 1.2rem 0 2rem;
    position: relative;
    transform: translateZ(6px);
    z-index: 1;
  }

  .project-links {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: auto;
    position: relative;
    transform: translateZ(18px);
    z-index: 1;
  }

  .project-links a {
    color: inherit;
    font-family: var(--mono-font);
    font-size: 0.68rem;
    text-decoration: underline;
    text-transform: uppercase;
    transition: color 220ms ease, transform 220ms ease;
  }

  @media (hover: hover) and (pointer: fine) {
    .project-card:hover::before {
      transform: translateX(330%) skewX(-12deg);
    }

    .project-card:hover::after {
      opacity: 1;
    }

    .project-card:hover .project-category {
      background: var(--yellow);
      color: #101414;
      transform: translateZ(24px) rotate(1deg);
    }

    .project-card:hover .project-stack {
      letter-spacing: 0.04em;
      opacity: 0.95;
    }

    .project-card:hover .project-links a:hover {
      color: var(--yellow);
      transform: translateY(-2px);
    }
  }
`;
// #endregion

// #region component
const propTypes = {
  demo: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.node,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  category: PropTypes.string,
  stack: PropTypes.arrayOf(PropTypes.string),
  index: PropTypes.number,
};

const ProjectCard = ({ category, demo, description, index = 0, name, stack = [], url }) => {
  const { ref, isVisible } = useReveal({ threshold: 0.1 });

  const handlePointerMove = (event) => {
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    card.style.setProperty("--pointer-x", `${(x + 0.5) * 100}%`);
    card.style.setProperty("--pointer-y", `${(y + 0.5) * 100}%`);
    card.style.transform = `perspective(800px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
  };

  const resetPointerEffect = (event) => {
    event.currentTarget.style.transform = "";
    event.currentTarget.style.removeProperty("--pointer-x");
    event.currentTarget.style.removeProperty("--pointer-y");
  };

  return (
    <StyledCard ref={ref} className={isVisible ? "visible" : ""} $delay={(index % 6) * 60}>
      <article
        className="project-card"
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPointerEffect}
      >
        <div className="project-top">
          <h3>{name}</h3>
          <span className="project-category">{category || "Open Source"}</span>
        </div>
        {stack.length > 0 && <div className="project-stack">{stack.join(" · ")}</div>}
        <p>{description}</p>
        <div className="project-links">
          {demo && (
            <a href={demo} target="_blank" rel="noreferrer">
              Live demo <Icon icon="lucide:arrow-up-right" />
            </a>
          )}
          <a href={url} target="_blank" rel="noreferrer">
            GitHub <Icon icon="lucide:github" />
          </a>
        </div>
      </article>
    </StyledCard>
  );
};

ProjectCard.propTypes = propTypes;
// #endregion

export default ProjectCard;
