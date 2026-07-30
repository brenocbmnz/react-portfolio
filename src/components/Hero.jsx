import React from "react";
// Styles
import styled, { keyframes } from "styled-components";
// State
import PropTypes from "prop-types";
// Icons
import { Icon } from "@iconify/react";
// Config
import { portfolioContent } from "../config";
// Images
import GlassesLogo from "../images/glasses-logo.svg";
// Components
import { Link } from "react-scroll";
import { Container } from "react-bootstrap";
import SocialLinks from "./SocialLinks";

// #region styled-components
const enter = keyframes`
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0) rotate(-2deg); }
  50% { transform: translate3d(0, -12px, 0) rotate(2deg); }
`;

const cuePulse = keyframes`
  0%, 100% { opacity: 0.55; transform: translate(-50%, 0); }
  50% { opacity: 1; transform: translate(-50%, 5px); }
`;

const StyledHero = styled.header`
  background:
    linear-gradient(var(--line) 1px, transparent 1px),
    linear-gradient(90deg, var(--line) 1px, transparent 1px),
    var(--paper);
  background-size: 42px 42px;
  border-bottom: var(--border);
  position: relative;
  min-height: calc(100svh - var(--nav-height) - 2.5rem);
  overflow: hidden;

  .hero-inner {
    align-items: center;
    display: grid;
    gap: clamp(2.5rem, 6vw, 5rem);
    grid-template-columns: minmax(0, 1.15fr) minmax(280px, 0.85fr);
    min-height: inherit;
    padding-bottom: 4rem;
    padding-top: 4rem;
  }

  .hero-copy {
    animation: ${enter} 650ms ease both;
  }

  .hero-eyebrow {
    color: var(--muted);
    font-family: var(--mono-font);
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    margin-bottom: 1.4rem;
  }

  h1 {
    font-family: var(--display-font);
    font-size: clamp(3.2rem, 7.7vw, 6.8rem);
    letter-spacing: 0;
    line-height: 0.88;
    margin: 0;
    max-width: 760px;
    text-transform: uppercase;
  }

  h1 span {
    color: var(--cyan);
    display: block;
  }

  .hero-lead {
    color: var(--muted);
    font-size: clamp(1rem, 1.8vw, 1.18rem);
    line-height: 1.75;
    margin: 1.8rem 0 0;
    max-width: 620px;
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin-top: 2rem;
  }

  .hero-button {
    border: 1px solid var(--ink);
    font-family: var(--mono-font);
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    padding: 0.9rem 1.2rem;
    text-decoration: none;
    text-transform: uppercase;
    transition: transform var(--transition), background var(--transition);
  }

  .hero-button.primary {
    background: var(--cyan);
    color: #101414;
  }

  .hero-button:hover {
    transform: translateY(-3px);
  }

  .hero-socials {
    display: flex;
    margin-top: 1.7rem;
  }

  .hero-visual {
    align-items: center;
    animation: ${enter} 650ms 120ms ease both;
    aspect-ratio: 4 / 5;
    display: flex;
    justify-content: center;
    max-height: 590px;
    min-height: 380px;
    position: relative;
    isolation: isolate;
  }

  .logo-button {
    align-items: center;
    appearance: none;
    background: transparent;
    border: 0;
    color: var(--cyan);
    cursor: pointer;
    display: flex;
    height: min(72%, 24rem);
    justify-content: center;
    padding: 0;
    position: relative;
    transition: color 320ms ease, transform 320ms cubic-bezier(0.2, 0.75, 0.2, 1);
    width: min(88%, 26rem);
    z-index: 1;
  }

  .logo-float {
    animation: ${float} 4.5s ease-in-out infinite;
    display: flex;
    height: min(72%, 24rem);
    width: min(88%, 26rem);
    will-change: transform;
  }

  .logo-float .logo-button {
    height: 100%;
    width: 100%;
  }

  .logo-button[data-color="yellow"] {
    color: var(--yellow);
  }

  .logo-button[data-color="coral"] {
    color: var(--coral);
  }

  .logo-button[data-color="ink"] {
    color: var(--ink);
  }

  .glasses-logo {
    background: currentColor;
    contain: paint;
    display: block;
    height: 100%;
    mask: url(${GlassesLogo}) center / contain no-repeat;
    transition: filter 320ms ease;
    width: 100%;
    -webkit-mask: url(${GlassesLogo}) center / contain no-repeat;
  }

  .logo-button:hover,
  .logo-button:focus-visible {
    transform: scale(1.06) rotate(-2deg);
  }

  .logo-button:hover .glasses-logo,
  .logo-button:focus-visible .glasses-logo {
    filter: drop-shadow(10px 12px 0 color-mix(in srgb, currentColor 28%, transparent));
  }

  .logo-button:active {
    transform: scale(0.97) rotate(2deg);
  }

  .scroll-cue {
    animation: ${cuePulse} 2.2s ease-in-out infinite;
    bottom: 1rem;
    color: var(--muted);
    font-family: var(--mono-font);
    font-size: 0.68rem;
    left: 50%;
    position: absolute;
    text-decoration: none;
    transform: translateX(-50%);
  }

  @media (max-width: 767px) {
    .hero-inner {
      grid-template-columns: 1fr;
      padding-bottom: 5rem;
      padding-top: 3.5rem;
    }

    .hero-visual {
      aspect-ratio: 16 / 10;
      min-height: 0;
    }

    h1 {
      font-size: clamp(3rem, 16vw, 5.2rem);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero-copy,
    .hero-visual,
    .logo-float,
    .scroll-cue {
      animation: none;
    }
  }
`;
// #endregion

// #region component
const propTypes = {
  name: PropTypes.string,
};

const logoColors = ["cyan", "yellow", "coral", "ink"];

const Hero = ({ name }) => {
  const [logoColorIndex, setLogoColorIndex] = React.useState(0);
  const logoColor = logoColors[logoColorIndex];

  const cycleLogoColor = () => {
    setLogoColorIndex((current) => (current + 1) % logoColors.length);
  };

  return (
    <StyledHero>
      <Container className="hero-inner">
        <div className="hero-copy">
          <div className="hero-eyebrow">{portfolioContent.eyebrow}</div>
          <h1>
            {name || "Breno Menezes"}
            <span>Full Stack</span>
          </h1>
          <p className="hero-lead">{portfolioContent.introduction}</p>
          <div className="hero-actions">
            <Link
              to="Projects"
              href="#projects"
              className="hero-button primary"
            >
              View projects <Icon icon="lucide:arrow-up-right" />
            </Link>
            <Link to="Contact" href="#contact" className="hero-button">
              Start a conversation
            </Link>
          </div>
          <div className="hero-socials">
            <SocialLinks />
          </div>
        </div>
        <div className="hero-visual">
          <div className="logo-float">
            <button
              className="logo-button"
              data-color={logoColor}
              type="button"
              aria-label={`Change glasses logo color. Current color: ${logoColor}.`}
              title="Click to change color"
              onClick={cycleLogoColor}
            >
              <span className="glasses-logo" aria-hidden="true" />
            </button>
          </div>
        </div>
      </Container>
      <Link to="About" href="#about" className="scroll-cue">
        SCROLL ↓
      </Link>
    </StyledHero>
  );
};

Hero.propTypes = propTypes;
// #endregion

export default Hero;
