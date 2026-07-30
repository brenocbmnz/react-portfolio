import React from "react";
// Styles
import styled from "styled-components";
// State
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
// Components
import SocialLinks from "./SocialLinks";

// #region styled-components
const StyledFooter = styled.footer`
  background: ${({ theme }) => theme.name === "light" ? "#f3af8d" : "#101414"};
  color: ${({ theme }) => theme.name === "light" ? "#101414" : "#f4f1e8"};
  min-height: 5rem;
  padding: 1rem clamp(1rem, 4vw, 3rem);

  .footer-inner {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    max-width: var(--page-width);
    width: 100%;
  }

  .footer-copy {
    font-family: var(--mono-font);
    font-size: 0.68rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  a {
    color: ${({ theme }) => theme.name === "light" ? "#101414" : "#f4f1e8"};

    &:hover {
      color: var(--cyan);
    }
  }

  @media (max-width: 575px) {
    .footer-inner { align-items: flex-start; flex-direction: column; gap: 1rem; }
  }
`;
// #endregion

// #region component
const propTypes = {
  mode: PropTypes.string.isRequired,
};

const Footer = ({ mode }) => {
  const { t } = useTranslation();
  return (
    <StyledFooter $mode={mode}>
      <div className="footer-inner">
        <span className="footer-copy">{t("footer")}</span>
        <SocialLinks />
      </div>
    </StyledFooter>
  );
};

Footer.propTypes = propTypes;
// #endregion

export default Footer;
