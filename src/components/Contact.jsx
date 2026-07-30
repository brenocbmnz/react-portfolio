import React from "react";
import { useTranslation } from "react-i18next";
// Styles
import styled from "styled-components";
// Components
import { Element } from "react-scroll";
import { Container } from "react-bootstrap";
import ContactForm from "./ContactForm";
import useReveal from "../hooks/useReveal";
import StableTranslation from "./StableTranslation";

// #region styled-components
const StyledSection = styled.section`
  background: var(--cyan);
  color: #101414;
  min-height: calc(100vh - var(--nav-height));

  .contact-head {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3rem;
  }

  .contact-grid {
    display: grid;
    gap: clamp(3rem, 8vw, 7rem);
    grid-template-columns: minmax(0, 0.8fr) minmax(320px, 1.2fr);
  }

  .contact-copy p {
    font-size: 1.05rem;
    line-height: 1.8;
    margin: 1.5rem 0 2rem;
    max-width: 500px;
    opacity: 0.72;
  }

  .contact-copy .section-heading::after {
    background: linear-gradient(90deg, var(--yellow) 0 72%, #8b5cf6 72% 100%);
  }

  .reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 600ms ease, transform 600ms ease;
  }

  .reveal.visible { opacity: 1; transform: none; }

  @media (max-width: 767px) {
    .contact-grid { grid-template-columns: 1fr; }
  }
`;
// #endregion

// #region component
const Contact = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useReveal();

  return (
    <Element name={"Contact"} id="contact">
      <StyledSection className="section" ref={ref}>
        <Container className={`reveal ${isVisible ? "visible" : ""}`}>
          <div className="contact-head">
            <span className="eyebrow">{t("contact.eyebrow")}</span>
            <span className="eyebrow">{t("contact.section")}</span>
          </div>
          <div className="contact-grid">
            <div className="contact-copy">
              <StableTranslation
                as="h2"
                className="section-heading"
                translationKey="contact.heading"
              />
              <StableTranslation
                as="p"
                translationKey="contact.introduction"
              />
            </div>
            <ContactForm />
          </div>
        </Container>
      </StyledSection>
    </Element>
  );
};
// #endregion

export default Contact;
