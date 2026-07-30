import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
/*
=============== 
Variables
===============
*/
:root {
  --ink: #101414;
  --paper: #f4f1e8;
  --panel: #171d1d;
  --cyan: #20c7d9;
  --yellow: #ffd34e;
  --coral: #ff6b57;
  --muted: #667070;
  --line: rgba(16, 20, 20, 0.18);
  --surface: #fffdf7;
  --border: 1px solid var(--line);
  --transition: 180ms ease;
  --nav-height: 68px;
  --min-footer-height: 11vh;
  --card-height: 29rem;
  --page-width: 1180px;
  --display-font: "Archivo Black", sans-serif;
  --body-font: "Manrope", sans-serif;
  --mono-font: "IBM Plex Mono", monospace;
}

[data-bs-theme="dark"] {
  --ink: #f4f1e8;
  --paper: #101414;
  --panel: #090c0c;
  --muted: #a5adad;
  --line: rgba(244, 241, 232, 0.18);
  --surface: #171d1d;
}

/*
=============== 
Global Styles
===============
*/
html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--paper);
  color: var(--ink);
  font-family: var(--body-font);
  letter-spacing: 0;
}

main {
  min-height: calc(100vh - 2 * var(--nav-height) - 2rem);
}

section {
  border-bottom: var(--border);
  margin: 0;
}

.section {
  min-height: min(780px, 100vh);
  padding: clamp(5rem, 9vw, 8rem) 0;
}

a {
  color: inherit;
}

.title {
  font-family: var(--display-font);
  letter-spacing: 0;
  text-transform: uppercase;
}

.eyebrow {
  color: var(--muted);
  font-family: var(--mono-font);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.section-heading {
  font-family: var(--display-font);
  font-size: clamp(2.1rem, 5vw, 4rem);
  letter-spacing: 0;
  line-height: 0.98;
  margin: 0;
  max-width: 780px;
  padding-bottom: 1rem;
  position: relative;
  text-transform: uppercase;
}

.section-heading::after {
  background: linear-gradient(90deg, var(--cyan) 0 72%, var(--coral) 72% 100%);
  bottom: 0;
  content: "";
  height: 4px;
  left: 0;
  position: absolute;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 700ms cubic-bezier(0.2, 0.75, 0.2, 1) 180ms;
  width: clamp(4rem, 12vw, 8rem);
}

.visible .section-heading::after,
.section-heading:hover::after,
.section-heading:focus-visible::after {
  transform: scaleX(1);
}

button,
a,
input,
textarea {
  &:focus-visible {
    outline: 3px solid var(--cyan);
    outline-offset: 3px;
  }
}

.link-icons {
  line-height: 0;
  font-size: 2.25rem;
  margin: 0 1rem;
  color: ${({ theme }) =>
    theme.name === "light" ? "var(--ink)" : "var(--ink)"};

  &:hover {
    color: ${({ theme }) =>
      theme.name === "light" ? "var(--cyan)" : "var(--cyan)"};
  }
}

.page-item.active .page-link {
  background-color: var(--bs-primary);
  border-color: var(--bs-primary);
}

@media screen and (min-width: 800px) {
  .link-icons {
    font-size: 2.5rem;
  }
  .form-group {
      max-width: 750px;
    }
}

@media screen and (min-width: 1367px) {
  .link-icons:hover {
    color: var(--cyan);
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
`;

export default GlobalStyles;
