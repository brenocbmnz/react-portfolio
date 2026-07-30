import PropTypes from "prop-types";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const StyledButton = styled.button`
  align-items: center;
  background: transparent;
  border: 1px solid var(--line);
  color: var(--ink);
  display: inline-flex;
  font-family: var(--mono-font);
  font-size: 0.56rem;
  height: 2.4rem;
  justify-content: center;
  padding: 0;
  transition: background var(--transition), color var(--transition);
  width: 2.4rem;

  &:hover {
    background: var(--ink);
    color: var(--paper);
  }
`;

const propTypes = {
  closeDelay: PropTypes.number,
  setExpanded: PropTypes.func.isRequired,
};

const LanguageToggle = ({ closeDelay = 125, setExpanded }) => {
  const { t, i18n } = useTranslation();
  const isPortuguese = i18n.resolvedLanguage === "pt-BR";

  const toggleLanguage = () => {
    i18n.changeLanguage(isPortuguese ? "en" : "pt-BR");
    window.setTimeout(() => setExpanded(false), closeDelay);
  };

  return (
    <StyledButton type="button" aria-label={t("language.toggle")} onClick={toggleLanguage}>
      <span>{t("language.short")}</span>
    </StyledButton>
  );
};

LanguageToggle.propTypes = propTypes;

export default LanguageToggle;