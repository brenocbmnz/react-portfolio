import React from "react";
// Styles
import styled from "styled-components";
// State
import { useSelector } from "react-redux";
import { selectMode } from "../app/appSlice";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
// Icons
import { Icon } from "@iconify/react";

// #region styled-components
const StyledSwitch = styled.button`
  align-items: center;
  background: transparent;
  border: 1px solid var(--line);
  color: var(--ink);
  display: inline-flex;
  font-size: 1.1rem;
  height: 2.4rem;
  justify-content: center;
  transition: background var(--transition), color var(--transition);
  width: 2.4rem;

  &:hover {
    background: var(--ink);
    color: var(--paper);
  }
`;
// #endregion

// #region functions
const setStoredTheme = (theme) => localStorage.setItem("theme", theme);
// #endregion

// #region component
const propTypes = {
  closeDelay: PropTypes.number,
  setExpanded: PropTypes.func.isRequired,
  setTheme: PropTypes.func.isRequired,
};

const ThemeToggle = ({ closeDelay = 250, setExpanded, setTheme }) => {
  const { t } = useTranslation();
  const theme = useSelector(selectMode);

  const toggleTheme = () => {
    const themType = theme === "light" ? "dark" : "light";
    setTheme(themType);
    setStoredTheme(themType);
  };

  return (
    <StyledSwitch
      type="button"
      aria-label={t("theme.toggle", { theme: t(`theme.${theme}`) })}
      onClick={() => {
        toggleTheme();
        setTimeout(() => {
          setExpanded(false);
        }, closeDelay);
      }}
    >
      {theme === "light" ? (
        <Icon icon="lucide:sun" />
      ) : (
        <Icon icon="lucide:moon" />
      )}
    </StyledSwitch>
  );
};

ThemeToggle.propTypes = propTypes;
// #endregion

export default ThemeToggle;
