import React from "react";
// Styles
import styled from "styled-components";
// State
import PropTypes from "prop-types";
// Components
import { Element } from "react-scroll";
import { Container } from "react-bootstrap";
import useReveal from "../hooks/useReveal";

// #region styled-components
const StyledAboutMe = styled.section`
  background: var(--surface);

  .about-head {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3rem;
  }

  .about-grid {
    align-items: start;
    display: grid;
    grid-template-columns: 1fr;
  }

  .about-copy p {
    color: var(--muted);
    font-size: clamp(1.05rem, 2vw, 1.3rem);
    line-height: 1.85;
    margin-bottom: 1.2rem;
  }

  .about-copy strong {
    color: var(--ink);
  }

  .about-profile {
    align-items: start;
    display: grid;
    gap: clamp(1.5rem, 4vw, 2.5rem);
    grid-template-columns: minmax(150px, 220px) minmax(0, 1fr);
  }

  .about-photo-wrap {
    aspect-ratio: 1;
    position: relative;
  }

  .about-photo-wrap::after {
    border: 2px solid var(--cyan);
    content: "";
    inset: 0;
    pointer-events: none;
    position: absolute;
    transform: translate(8px, 8px);
    transition: transform 320ms ease;
    z-index: 0;
  }

  .about-photo {
    filter: grayscale(0.8) contrast(1.05);
    height: 100%;
    object-fit: cover;
    position: relative;
    transition: filter 420ms ease, transform 420ms cubic-bezier(0.2, 0.75, 0.2, 1);
    width: 100%;
    z-index: 1;
  }

  .about-photo-wrap:hover::after {
    transform: translate(4px, 4px);
  }

  .about-photo-wrap:hover .about-photo {
    filter: grayscale(0) contrast(1);
    transform: translate(-3px, -3px);
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

  @media (max-width: 767px) {
    .about-profile {
      grid-template-columns: minmax(120px, 180px) minmax(0, 1fr);
    }
  }

  @media (max-width: 520px) {
    .about-profile {
      grid-template-columns: 1fr;
    }

    .about-photo-wrap {
      max-width: 11rem;
    }

  }
`;
// #endregion

// #region component
const propTypes = {
  avatarUrl: PropTypes.string,
  bio: PropTypes.string,
  moreInfo: PropTypes.string,
};

const AboutMe = ({ avatarUrl, bio, moreInfo }) => {
  const { ref, isVisible } = useReveal();
  const photoUrl = React.useMemo(() => {
    if (!avatarUrl) return null;

    try {
      const url = new URL(avatarUrl);
      url.searchParams.set("s", "480");
      return url.toString();
    } catch {
      return avatarUrl;
    }
  }, [avatarUrl]);

  return (
    <Element name={"About"} id="about">
      <StyledAboutMe className="section" ref={ref}>
        <Container className={`reveal ${isVisible ? "visible" : ""}`}>
          <div className="about-head">
            <span className="eyebrow">{"/* a bit about me */"}</span>
            <span className="eyebrow">01 / PROFILE</span>
          </div>
          <h2 className="section-heading">Behind the code.</h2>
          <div className="about-grid mt-5">
            <div className="about-copy">
              <div className="about-profile">
                {photoUrl && (
                  <div className="about-photo-wrap">
                    <img
                      className="about-photo"
                      src={photoUrl}
                      alt="Breno Menezes"
                      loading="lazy"
                      width="480"
                      height="480"
                    />
                  </div>
                )}
                <div>
                  {bio && <p><strong>{bio}</strong></p>}
                  {moreInfo && <p>{moreInfo}</p>}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </StyledAboutMe>
    </Element>
  );
};

AboutMe.propTypes = propTypes;
// #endregion

export default AboutMe;
