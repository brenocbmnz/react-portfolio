import React from "react";
import styled from "styled-components";
// State
import { useSelector } from "react-redux";
import { selectMode } from "../app/appSlice";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
// Router
import { Link, useLocation } from "react-router-dom";
// Components
import { Link as ScrollLink } from "react-scroll";
import { Container, Nav, Navbar } from "react-bootstrap";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { githubUsername } from "../config";

// #region constants
const navLinks = {
  routes: [
    { id: "1R", nameKey: "nav.home", route: "/" },
    {
      id: "2R",
      nameKey: "nav.allProjects",
      href: `https://github.com/${githubUsername}?tab=repositories`,
    },
  ],
  to: [
    { id: "1T", nameKey: "nav.home", to: "Home" },
    { id: "2T", nameKey: "nav.about", to: "About" },
    { id: "3T", nameKey: "nav.skills", to: "Skills" },
    { id: "4T", nameKey: "nav.projects", to: "Projects" },
    { id: "5T", nameKey: "nav.contact", to: "Contact" },
  ],
};
// #endregion

// #region styled-components
const StyledDiv = styled.div`
  .navbar {
    backdrop-filter: blur(14px);
    background: color-mix(in srgb, var(--paper) 88%, transparent) !important;
    border-bottom: var(--border);
    min-height: var(--nav-height);
    padding: 0;
  }

  .spacer {
    height: var(--nav-height);
  }

  .navbar-brand {
    align-items: center;
    color: var(--ink);
    display: flex;
    font-family: var(--mono-font);
    font-size: 0.82rem;
    font-weight: 600;
    gap: 0.65rem;
    letter-spacing: 0.05em;
  }

  .brand-mark {
    align-items: center;
    background: var(--cyan);
    color: #101414;
    display: inline-flex;
    height: 2rem;
    justify-content: center;
    width: 2rem;
  }

  .nav-link {
    color: var(--muted) !important;
    display: block;
    font-family: var(--mono-font);
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    padding: 1.3rem 0.8rem !important;
    text-align: center;
    text-transform: uppercase;
  }

  @media (min-width: 1200px) {
    .home-nav {
      column-gap: 0.2rem;
      display: grid;
      grid-template-columns: repeat(5, 7rem);
    }

    .home-nav .nav-link {
      padding-left: 0.4rem !important;
      padding-right: 0.4rem !important;
      white-space: nowrap;
      width: 100%;
    }
  }

  .nav-link:hover,
  .nav-link.active {
    color: var(--ink) !important;
  }

  .nav-link.active {
    box-shadow: inset 0 -3px var(--cyan);
  }

  .navbar-toggler {
    border-color: var(--line);
    border-radius: 0.2rem;
  }

  .command-palette-hint {
    color: var(--muted);
    flex: 0 0 18rem;
    font-family: var(--mono-font);
    font-size: 0.56rem;
    margin-left: 1.25rem;
    padding: 0.5rem 0;
    opacity: 1;
    text-align: left;
    transition: opacity 220ms ease, visibility 0s linear 220ms;
    visibility: visible;
    white-space: nowrap;
    width: 18rem;
  }

  .command-palette-hint.hidden {
    opacity: 0;
    visibility: hidden;
  }

  @media (prefers-reduced-motion: reduce) {
    .command-palette-hint {
      transition: none;
    }
  }

  @media (max-width: 1199px) {
    .navbar-collapse {
      border-top: var(--border);
    }

    .nav-link {
      padding: 0.85rem 0 !important;
      text-align: left;
      width: auto;
    }

    .command-palette-hint {
      flex-basis: auto;
      margin-left: 0;
      width: auto;
    }

  }
`;
// #endregion

// #region component
const propTypes = {
  Logo: PropTypes.node,
  callBack: PropTypes.func,
  closeDelay: PropTypes.number,
};

const NavBar = ({ callBack, closeDelay = 125 }) => {
  const { t } = useTranslation();
  const theme = useSelector(selectMode);
  const [isExpanded, setisExpanded] = React.useState(false);
  const [isCommandPaletteDiscovered, setIsCommandPaletteDiscovered] = React.useState(false);
  const { pathname } = useLocation();

  React.useEffect(() => {
    const hideHint = () => setIsCommandPaletteDiscovered(true);
    window.addEventListener("command-palette-discovered", hideHint);
    return () => window.removeEventListener("command-palette-discovered", hideHint);
  }, []);

  return (
    <StyledDiv>
      <div className="spacer" />
      <Navbar
        id="nav"
        collapseOnSelect={true}
        expand="xl"
        expanded={isExpanded}
        bg={theme === "light" ? "light" : "dark"}
        variant={theme === "light" ? "light" : "dark"}
        fixed="top"
      >
        <Container>
          <Navbar.Brand as={ScrollLink} to="Home" href="#home">
            <span className="brand-mark">BM</span>
            BRENO.MENEZES
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            aria-label={t("nav.toggle")}
            onClick={() => setisExpanded(!isExpanded)}
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav
              navbarScroll
              className={`${pathname === "/" ? "home-nav" : "route-nav"} me-auto`}
            >
              {pathname === "/"
                ? navLinks.to.map((el) => {
                    return (
                      <Nav.Item key={el.id}>
                        <ScrollLink
                          to={el.to}
                          href={`#${el.to}`}
                          spy={true}
                          activeClass="active"
                          className="nav-link"
                          onClick={() => {
                            setTimeout(() => {
                              setisExpanded(false);
                            }, closeDelay);
                          }}
                        >
                          {t(el.nameKey)}
                        </ScrollLink>
                      </Nav.Item>
                    );
                  })
                : navLinks.routes.map((el) => {
                    return (
                      <Nav.Item key={el.id}>
                        {el.href ? (
                          <a
                            href={el.href}
                            className="nav-link"
                            target="_blank"
                            rel="noreferrer"
                            onClick={() => {
                              setTimeout(() => {
                                setisExpanded(false);
                              }, closeDelay);
                            }}
                          >
                            {t(el.nameKey)}
                          </a>
                        ) : (
                          <Link
                            to={el.route}
                            className={
                              pathname === el.route
                                ? "nav-link active"
                                : "nav-link"
                            }
                            onClick={() => {
                              setTimeout(() => {
                                setisExpanded(false);
                              }, closeDelay);
                            }}
                          >
                            {t(el.nameKey)}
                          </Link>
                        )}
                      </Nav.Item>
                    );
                  })}
            </Nav>
            <Nav className="align-items-xl-center gap-2 pb-3 pb-xl-0">
              <LanguageToggle closeDelay={closeDelay} setExpanded={setisExpanded} />
              <ThemeToggle
                closeDelay={closeDelay}
                setExpanded={setisExpanded}
                setTheme={callBack}
              />
              <span
                className={`command-palette-hint${isCommandPaletteDiscovered ? " hidden" : ""}`}
                aria-hidden={isCommandPaletteDiscovered}
              >
                {t("terminal.headerHint")}
              </span>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </StyledDiv>
  );
};

NavBar.propTypes = propTypes;
// #endregion

export default NavBar;
