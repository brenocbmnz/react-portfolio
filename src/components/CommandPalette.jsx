import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { keyframes } from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const blinkCursor = keyframes`
  0%, 45% { opacity: 1; }
  46%, 100% { opacity: 0; }
`;

const Terminal = styled.div`
  .terminal-trigger {
    align-items: center;
    background: var(--ink);
    border: 1px solid var(--cyan);
    bottom: 1.25rem;
    color: var(--cyan);
    display: flex;
    font-family: var(--mono-font);
    font-weight: 600;
    height: 3rem;
    justify-content: center;
    position: fixed;
    right: 1.25rem;
    text-shadow: 0 0 0 transparent;
    transition: background 220ms ease, box-shadow 220ms ease, color 220ms ease,
      transform 220ms ease, text-shadow 220ms ease;
    width: 3rem;
    z-index: 900;
  }

  .terminal-trigger:hover,
  .terminal-trigger:focus-visible {
    background: color-mix(in srgb, var(--ink) 88%, var(--cyan));
    box-shadow: 0 0 0 1px color-mix(in srgb, var(--cyan) 35%, transparent),
      0 0 20px color-mix(in srgb, var(--cyan) 32%, transparent);
    text-shadow: 0 0 8px currentColor;
    transform: translateY(-2px);
  }

  .terminal-cursor {
    display: inline-block;
  }

  .terminal-trigger:hover .terminal-cursor,
  .terminal-trigger:focus-visible .terminal-cursor {
    animation: ${blinkCursor} 720ms steps(1, end) infinite;
  }

  .terminal-overlay {
    align-items: flex-start;
    background: rgba(4, 8, 8, 0.72);
    display: flex;
    inset: 0;
    justify-content: center;
    padding: 12vh 1rem 1rem;
    position: fixed;
    z-index: 1200;
  }

  .terminal-dialog {
    background: #101616;
    border: 1px solid rgba(32, 199, 217, 0.5);
    box-shadow: 0 30px 90px rgba(0, 0, 0, 0.45);
    color: #f4f1e8;
    font-family: var(--mono-font);
    max-width: 36rem;
    padding: 1rem;
    width: 100%;
  }

  .terminal-bar {
    align-items: center;
    border-bottom: 1px solid rgba(244, 241, 232, 0.14);
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.8rem;
    padding-bottom: 0.75rem;
  }

  .terminal-label,
  .terminal-hint {
    color: #9ba8a8;
    font-size: 0.7rem;
  }

  .terminal-close {
    background: transparent;
    border: 0;
    color: #f4f1e8;
    font-size: 1.25rem;
    line-height: 1;
  }

  .terminal-output {
    font-size: 0.8rem;
    line-height: 1.7;
    max-height: 15rem;
    min-height: 4.5rem;
    overflow-y: auto;
  }

  .terminal-line {
    margin-bottom: 0.35rem;
    white-space: pre-wrap;
  }

  .terminal-command {
    color: var(--cyan);
  }

  .terminal-input-row {
    align-items: center;
    border-top: 1px solid rgba(244, 241, 232, 0.14);
    display: flex;
    gap: 0.6rem;
    margin-top: 0.75rem;
    padding-top: 0.75rem;
  }

  .terminal-prompt {
    color: var(--yellow);
  }

  input {
    background: transparent;
    border: 0;
    color: #f4f1e8;
    flex: 1;
    font-family: inherit;
    min-width: 0;
    outline: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    .terminal-trigger:hover .terminal-cursor,
    .terminal-trigger:focus-visible .terminal-cursor {
      animation: none;
    }
  }
`;

const sectionIds = {
  about: { id: "about", label: "nav.about" },
  projects: { id: "projects", label: "nav.projects" },
  skills: { id: "skills", label: "nav.skills" },
  contact: { id: "contact", label: "nav.contact" },
};

const propTypes = {
  githubUrl: PropTypes.string,
  linkedinUrl: PropTypes.string,
  onToggleTheme: PropTypes.func.isRequired,
};

const CommandPalette = ({ githubUrl, linkedinUrl, onToggleTheme }) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  const [entries, setEntries] = React.useState([
    { command: "", result: t("terminal.initial") },
  ]);
  const inputRef = React.useRef(null);
  const triggerRef = React.useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const close = React.useCallback(() => {
    setIsOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  const goToSection = React.useCallback(
    (section) => {
      const scroll = () =>
        document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
      if (location.pathname !== "/") {
        navigate("/");
        window.setTimeout(scroll, 100);
      } else {
        scroll();
      }
      close();
      return t("terminal.navigating", { section: t(section.label) });
    },
    [close, location.pathname, navigate, t]
  );

  React.useEffect(() => {
    setEntries([{ command: "", result: t("terminal.initial") }]);
  }, [i18n.resolvedLanguage, t]);

  React.useEffect(() => {
    const onKeyDown = (event) => {
      const isTyping = ["INPUT", "TEXTAREA", "SELECT"].includes(
        document.activeElement?.tagName
      );
      if (event.key === "/" && !isTyping) {
        event.preventDefault();
        setIsOpen(true);
      } else if (event.key === "Escape" && isOpen) {
        close();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [close, isOpen]);

  React.useEffect(() => {
    if (isOpen) window.requestAnimationFrame(() => inputRef.current?.focus());
  }, [isOpen]);

  const runCommand = (rawCommand) => {
    const command = rawCommand.trim().toLowerCase();
    if (!command) return;

    const help = () => t("terminal.help");
    const about = () => goToSection(sectionIds.about);
    const projects = () => goToSection(sectionIds.projects);
    const skills = () => goToSection(sectionIds.skills);
    const contact = () => goToSection(sectionIds.contact);
    const toggleTheme = () => {
      onToggleTheme();
      return t("terminal.themeToggled");
    };
    const clear = () => {
      setEntries([]);
      return null;
    };
    const commands = {
      help,
      ajuda: help,
      about,
      sobre: about,
      projects,
      projetos: projects,
      skills,
      competencias: skills,
      "competências": skills,
      habilidades: skills,
      contact,
      contato: contact,
      github: () => {
        if (githubUrl) window.open(githubUrl, "_blank", "noopener,noreferrer");
        return t("terminal.openingGithub");
      },
      linkedin: () => {
        if (linkedinUrl)
          window.open(linkedinUrl, "_blank", "noopener,noreferrer");
        return t("terminal.openingLinkedin");
      },
      theme: toggleTheme,
      tema: toggleTheme,
      clear,
      limpar: clear,
    };

    const result = commands[command]
      ? commands[command]()
      : t("terminal.notFound", { command });
    if (!(["clear", "limpar"].includes(command))) {
      setEntries((current) => [...current, { command, result }]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = event.currentTarget.elements.command.value;
    runCommand(value);
    event.currentTarget.reset();
  };

  return (
    <Terminal>
      <button
        ref={triggerRef}
        className="terminal-trigger"
        type="button"
        title={t("terminal.open")}
        aria-label={t("terminal.open")}
        onClick={() => setIsOpen(true)}
      >
        <span aria-hidden="true">&gt;</span>
        <span className="terminal-cursor" aria-hidden="true">_</span>
      </button>
      {isOpen && (
        <div
          className="terminal-overlay"
          onMouseDown={(event) => event.target === event.currentTarget && close()}
        >
          <div
            className="terminal-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="terminal-title"
          >
            <div className="terminal-bar">
              <span id="terminal-title" className="terminal-label">
                breno@portfolio:~
              </span>
              <button
                type="button"
                className="terminal-close"
                aria-label={t("terminal.close")}
                onClick={close}
              >
                ×
              </button>
            </div>
            <div className="terminal-output" aria-live="polite">
              {entries.map((entry, index) => (
                <div className="terminal-line" key={`${entry.command}-${index}`}>
                  {entry.command && (
                    <div className="terminal-command">$ {entry.command}</div>
                  )}
                  {entry.result && <div>{entry.result}</div>}
                </div>
              ))}
            </div>
            <form className="terminal-input-row" onSubmit={handleSubmit}>
              <span className="terminal-prompt">$</span>
              <input
                ref={inputRef}
                name="command"
                aria-label={t("terminal.command")}
                autoComplete="off"
                placeholder={t("terminal.placeholder")}
              />
              <span className="terminal-hint">ESC</span>
            </form>
          </div>
        </div>
      )}
    </Terminal>
  );
};

CommandPalette.propTypes = propTypes;

export default CommandPalette;