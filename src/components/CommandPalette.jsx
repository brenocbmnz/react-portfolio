import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

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
    width: 3rem;
    z-index: 900;
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
`;

const sectionIds = {
  about: "about",
  projects: "projects",
  skills: "skills",
  contact: "contact",
};

const propTypes = {
  githubUrl: PropTypes.string,
  linkedinUrl: PropTypes.string,
  onToggleTheme: PropTypes.func.isRequired,
};

const CommandPalette = ({ githubUrl, linkedinUrl, onToggleTheme }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [entries, setEntries] = React.useState([
    { command: "", result: 'Type "help" to see available commands.' },
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
        document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
      if (location.pathname !== "/") {
        navigate("/");
        window.setTimeout(scroll, 100);
      } else {
        scroll();
      }
      close();
      return `Navigating to ${section}...`;
    },
    [close, location.pathname, navigate]
  );

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

    const commands = {
      help: () =>
        "about · projects · skills · contact · github · linkedin · theme · clear",
      about: () => goToSection(sectionIds.about),
      projects: () => goToSection(sectionIds.projects),
      skills: () => goToSection(sectionIds.skills),
      contact: () => goToSection(sectionIds.contact),
      github: () => {
        if (githubUrl) window.open(githubUrl, "_blank", "noopener,noreferrer");
        return "Opening GitHub...";
      },
      linkedin: () => {
        if (linkedinUrl)
          window.open(linkedinUrl, "_blank", "noopener,noreferrer");
        return "Opening LinkedIn...";
      },
      theme: () => {
        onToggleTheme();
        return "Theme toggled.";
      },
      clear: () => {
        setEntries([]);
        return null;
      },
    };

    const result = commands[command]
      ? commands[command]()
      : `Command not found: ${command}. Type "help".`;
    if (command !== "clear") {
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
        title="Open command palette (press /)"
        aria-label="Open command palette"
        onClick={() => setIsOpen(true)}
      >
        &gt;_
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
                aria-label="Close command palette"
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
                aria-label="Terminal command"
                autoComplete="off"
                placeholder='type "help"...'
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