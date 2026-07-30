import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
// State
// Components
import { Element } from "react-scroll";
import { Container } from "react-bootstrap";
// Config
import { skillData, skillGroups, resume } from "../config";
import useReveal from "../hooks/useReveal";
import StableTranslation from "./StableTranslation";

const StyledSkills = styled.section`
  background: var(--yellow);
  color: #101414;

  .skills-head {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3rem;
  }

  .skills-intro {
    color: rgba(16, 20, 20, 0.68);
    line-height: 1.75;
    margin: 1.5rem 0 3rem;
    max-width: 620px;
  }

  .skills-layout {
    align-items: start;
    display: grid;
    gap: 3rem;
    grid-template-columns: 1.15fr 0.85fr;
  }

  .skill-groups {
    border-top: 1px solid rgba(16, 20, 20, 0.35);
  }

  .skill-group {
    border-bottom: 1px solid rgba(16, 20, 20, 0.35);
    display: grid;
    gap: 1.5rem;
    grid-template-columns: 0.7fr 1.3fr;
    padding: 1.4rem 0;
    transition: background 260ms ease, padding 260ms ease, transform 260ms ease;
  }

  .skill-group:hover {
    background: rgba(16, 20, 20, 0.07);
    padding-left: 0.8rem;
    transform: translateX(5px);
  }

  .skill-group h3 {
    font-family: var(--display-font);
    font-size: 1.15rem;
    margin: 0;
    text-transform: uppercase;
    transition: color 220ms ease, transform 220ms ease;
  }

  .skill-group:hover h3 {
    color: #087f8c;
    transform: translateX(3px);
  }

  .skill-group p {
    font-size: 0.85rem;
    line-height: 1.7;
    margin: 0 0 0.75rem;
    opacity: 0.7;
  }

  .skill-names {
    font-family: var(--mono-font);
    font-size: 0.72rem;
    line-height: 1.8;
    text-transform: uppercase;
  }

  .skill-icons {
    display: grid;
    gap: 1px;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, minmax(5.8rem, 1fr));
  }

  .skill-tile {
    align-items: center;
    background: #101414;
    color: #f4f1e8;
    display: flex;
    flex-direction: column;
    font-family: var(--mono-font);
    font-size: 0.65rem;
    gap: 0.65rem;
    justify-content: center;
    min-height: 5.8rem;
    min-width: 0;
    text-align: center;
    text-transform: uppercase;
    transition: background 240ms ease, color 240ms ease, transform 240ms ease;
  }

  .skill-tile svg {
    color: var(--cyan);
    font-size: 2rem;
    transition: color 240ms ease, transform 360ms cubic-bezier(0.2, 0.75, 0.2, 1);
  }

  .skill-tile:hover {
    background: #202929;
    color: var(--yellow);
    transform: translateY(-5px);
  }

  .skill-tile:hover svg {
    color: var(--yellow);
    transform: translateY(-4px) rotate(-6deg) scale(1.12);
  }

  .resume-link {
    border: 1px solid #101414;
    display: inline-block;
    font-family: var(--mono-font);
    font-size: 0.72rem;
    margin-top: 2rem;
    padding: 0.8rem 1rem;
    text-decoration: none;
  }

  .reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 600ms ease, transform 600ms ease;
  }

  .reveal.visible {
    opacity: 1;
    transform: none;
  }

  .reveal .skill-group,
  .reveal .skill-tile {
    opacity: 0;
    transform: translateY(16px);
  }

  .reveal.visible .skill-group,
  .reveal.visible .skill-tile {
    opacity: 1;
    transform: none;
    transition-property: opacity, transform, background, color, padding;
    transition-duration: 450ms, 450ms, 240ms, 240ms, 260ms;
    transition-timing-function: ease;
  }

  .reveal.visible .skill-group:nth-child(2),
  .reveal.visible .skill-tile:nth-child(2) { transition-delay: 65ms; }
  .reveal.visible .skill-group:nth-child(3),
  .reveal.visible .skill-tile:nth-child(3) { transition-delay: 130ms; }
  .reveal.visible .skill-tile:nth-child(4) { transition-delay: 195ms; }
  .reveal.visible .skill-tile:nth-child(5) { transition-delay: 260ms; }
  .reveal.visible .skill-tile:nth-child(6) { transition-delay: 325ms; }
  .reveal.visible .skill-tile:nth-child(7) { transition-delay: 390ms; }
  .reveal.visible .skill-tile:nth-child(8) { transition-delay: 455ms; }
  .reveal.visible .skill-tile:nth-child(9) { transition-delay: 520ms; }
  .reveal.visible .skill-tile:nth-child(10) { transition-delay: 585ms; }
  .reveal.visible .skill-tile:nth-child(11) { transition-delay: 650ms; }
  .reveal.visible .skill-tile:nth-child(12) { transition-delay: 715ms; }

  .reveal.visible .skill-group:hover {
    transform: translateX(5px);
  }

  .reveal.visible .skill-tile:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 767px) {
    .skills-layout {
      grid-template-columns: 1fr;
    }

    .skill-group {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }
  }
`;

// #region component
const Skills = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useReveal();

  return (
    <Element name={"Skills"} id="skills">
      <StyledSkills className="section" ref={ref}>
        <Container className={`reveal ${isVisible ? "visible" : ""}`}>
          <div className="skills-head">
            <span className="eyebrow">{t("skills.eyebrow")}</span>
            <span className="eyebrow">{t("skills.section")}</span>
          </div>
          <StableTranslation
            as="h2"
            className="section-heading"
            translationKey="skills.heading"
          />
          <StableTranslation
            as="p"
            className="skills-intro"
            translationKey="skills.introduction"
          />
          <div className="skills-layout">
            <div className="skill-groups">
              {skillGroups.map((group) => (
                <div className="skill-group" key={group.id}>
                  <StableTranslation
                    as="h3"
                    translationKey={`skills.groups.${group.id}.name`}
                    values={{ defaultValue: group.name }}
                  />
                  <div>
                    <StableTranslation
                      as="p"
                      translationKey={`skills.groups.${group.id}.description`}
                      values={{ defaultValue: group.description }}
                    />
                    <div className="skill-names">{group.skills.join(" · ")}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="skill-icons">
              {skillData.map((skill) => (
                <div className="skill-tile" key={skill.id}>
                  {skill.skill}
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
          {resume && (
            <a className="resume-link" href={resume}>
              {t("skills.resume")}
            </a>
          )}
        </Container>
      </StyledSkills>
    </Element>
  );
};
// #endregion

export default Skills;
