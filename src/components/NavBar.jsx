import React from "react";
import styled from "styled-components";
// State
import { useSelector } from "react-redux";
import { selectMode } from "../app/appSlice";
import PropTypes from "prop-types";
// Router
import { Link, useLocation } from "react-router-dom";
// Components
import { Link as ScrollLink } from "react-scroll";
import { Container, Nav, Navbar } from "react-bootstrap";
import ThemeToggle from "./ThemeToggle";
import { githubUsername } from "../config";

// #region constants
const navLinks = {
  routes: [
    { id: "1R", name: "Home", route: "/" },
    {
      id: "2R",
      name: "All Projects",
      href: `https://github.com/${githubUsername}?tab=repositories`,
    },
  ],
  to: [
    { id: "1T", name: "Home", to: "Home" },
    { id: "2T", name: "About Me", to: "About" },
    { id: "3T", name: "Skills", to: "Skills" },
    { id: "4T", name: "Projects", to: "Projects" },
    { id: "5T", name: "Contact", to: "Contact" },
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
    font-family: var(--mono-font);
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    padding: 1.55rem 0.8rem !important;
    text-transform: uppercase;
  }

  .nav-link:hover,
  .nav-link.active {
    color: var(--ink) !important;
  }

  .nav-link.active {
    box-shadow: inset 0 -3px var(--cyan);
  }

  .command-hint {
    color: var(--muted);
    font-family: var(--mono-font);
    font-size: 0.68rem;
    margin-right: 0.75rem;
  }

  .navbar-toggler {
    border-color: var(--line);
    border-radius: 0.2rem;
  }

  @media (max-width: 1199px) {
    .navbar-collapse {
      border-top: var(--border);
    }

    .nav-link {
      padding: 0.85rem 0 !important;
    }

    .command-hint {
      display: none;
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
  const theme = useSelector(selectMode);
  const [isExpanded, setisExpanded] = React.useState(false);
  const { pathname } = useLocation();

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
            onClick={() => setisExpanded(!isExpanded)}
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav navbarScroll className="me-auto">
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
                          {el.name}
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
                            {el.name}
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
                            {el.name}
                          </Link>
                        )}
                      </Nav.Item>
                    );
                  })}
            </Nav>
            <Nav className="align-items-xl-center pb-3 pb-xl-0">
              <span className="command-hint">PRESS / FOR COMMANDS</span>
              <ThemeToggle
                closeDelay={closeDelay}
                setExpanded={setisExpanded}
                setTheme={callBack}
              />
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
