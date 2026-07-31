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
  --on-accent: #101414;
  --contact-background: var(--cyan);
  --contact-text: #101414;
  --skills-background: var(--yellow);
  --skills-text: #101414;
  --skills-muted: rgba(16, 20, 20, 0.68);
  --skills-line: rgba(16, 20, 20, 0.35);
  --skills-hover: rgba(16, 20, 20, 0.07);
  --skill-tile-background: #101414;
  --skill-tile-text: #f4f1e8;
  --skill-tile-hover: #202929;
  --form-background: #eee3ce;
  --form-text: #101414;
  --form-line: rgba(16, 20, 20, 0.35);
  --form-placeholder: #667070;
  --card-background: var(--cyan);
  --card-text: #101414;
  --card-border: #101414;
  --footer-background: #ffbfa0;
  --footer-text: #101414;
  --palette-backdrop: rgba(4, 8, 8, 0.72);
  --palette-background: #101616;
  --palette-text: #f4f1e8;
  --palette-muted: #9ba8a8;
  --palette-line: rgba(244, 241, 232, 0.14);
  --effect-primary: var(--cyan);
  --effect-secondary: var(--coral);
  --border: 1px solid var(--line);
  --transition: 180ms ease;
  --theme-transition: 480ms cubic-bezier(0.2, 0.75, 0.2, 1);
  --nav-height: 60px;
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
  --form-background: #101414;
  --form-text: #f4f1e8;
  --form-line: rgba(244, 241, 232, 0.35);
  --form-placeholder: #788383;
  --footer-background: #101414;
  --footer-text: #f4f1e8;
}

[data-easter-theme="hacker"] {
  --ink: #baffce;
  --paper: #020805;
  --panel: #000e06;
  --cyan: #38ff88;
  --yellow: #c6ff3d;
  --coral: #00d96d;
  --muted: #6fbd86;
  --line: rgba(56, 255, 136, 0.3);
  --surface: #06140b;
  --on-accent: #001a09;
  --contact-background: #07351a;
  --contact-text: #d5ffe1;
  --skills-background: #0b2414;
  --skills-text: #caffd8;
  --skills-muted: rgba(202, 255, 216, 0.7);
  --skills-line: rgba(56, 255, 136, 0.38);
  --skills-hover: rgba(56, 255, 136, 0.1);
  --skill-tile-background: #010a04;
  --skill-tile-text: #baffce;
  --skill-tile-hover: #0a2d17;
  --form-background: #021008;
  --form-text: #caffd8;
  --form-line: rgba(56, 255, 136, 0.42);
  --form-placeholder: #5b9f70;
  --card-background: #0d5428;
  --card-text: #e2ffea;
  --card-border: #38ff88;
  --footer-background: #010a04;
  --footer-text: #baffce;
  --palette-backdrop: rgba(0, 8, 3, 0.86);
  --palette-background: #010c05;
  --palette-text: #baffce;
  --palette-muted: #70bd86;
  --palette-line: rgba(56, 255, 136, 0.3);
  --effect-primary: #38ff88;
  --effect-secondary: #c6ff3d;
}

[data-easter-theme="cute"] {
  --ink: #4d2039;
  --paper: #fff7fb;
  --panel: #6e2f50;
  --cyan: #ff66ad;
  --yellow: #ffd5e8;
  --coral: #ff3f91;
  --muted: #96647e;
  --line: rgba(111, 47, 80, 0.2);
  --surface: #ffffff;
  --on-accent: #4d2039;
  --contact-background: #ff9dcc;
  --contact-text: #491b34;
  --skills-background: #ffe3f0;
  --skills-text: #4d2039;
  --skills-muted: rgba(77, 32, 57, 0.68);
  --skills-line: rgba(111, 47, 80, 0.28);
  --skills-hover: rgba(255, 63, 145, 0.1);
  --skill-tile-background: #6e2f50;
  --skill-tile-text: #fff7fb;
  --skill-tile-hover: #933d69;
  --form-background: #fffafd;
  --form-text: #4d2039;
  --form-line: rgba(111, 47, 80, 0.3);
  --form-placeholder: #a16f88;
  --card-background: #ff8fc4;
  --card-text: #46172f;
  --card-border: #6e2f50;
  --footer-background: #ffd0e5;
  --footer-text: #4d2039;
  --palette-backdrop: rgba(72, 22, 49, 0.62);
  --palette-background: #fff6fb;
  --palette-text: #4d2039;
  --palette-muted: #96647e;
  --palette-line: rgba(111, 47, 80, 0.2);
  --effect-primary: #ff3f91;
  --effect-secondary: #ff99c8;
}

[data-easter-theme="space"] {
  --ink: #f1eaff;
  --paper: #0b0618;
  --panel: #07030f;
  --cyan: #ad8cff;
  --yellow: #f5c2ff;
  --coral: #ff61c7;
  --muted: #b5a5d6;
  --line: rgba(196, 169, 255, 0.26);
  --surface: #17102c;
  --on-accent: #16082d;
  --contact-background: #3b1b68;
  --contact-text: #f7efff;
  --skills-background: #241141;
  --skills-text: #f1eaff;
  --skills-muted: rgba(241, 234, 255, 0.7);
  --skills-line: rgba(196, 169, 255, 0.35);
  --skills-hover: rgba(173, 140, 255, 0.12);
  --skill-tile-background: #080313;
  --skill-tile-text: #f1eaff;
  --skill-tile-hover: #301b50;
  --form-background: #120924;
  --form-text: #f1eaff;
  --form-line: rgba(196, 169, 255, 0.38);
  --form-placeholder: #9584b9;
  --card-background: #5e3ca5;
  --card-text: #fffaff;
  --card-border: #c5adff;
  --footer-background: #07030f;
  --footer-text: #f1eaff;
  --palette-backdrop: rgba(5, 1, 15, 0.82);
  --palette-background: #100721;
  --palette-text: #f1eaff;
  --palette-muted: #ad9dcd;
  --palette-line: rgba(196, 169, 255, 0.28);
  --effect-primary: #efe8ff;
  --effect-secondary: #ad8cff;
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

body::before {
  content: "";
  inset: 0;
  opacity: 0;
  pointer-events: none;
  position: fixed;
  transition: opacity var(--theme-transition);
  z-index: 19;
}

[data-easter-theme="hacker"] body::before {
  background: repeating-linear-gradient(
    0deg,
    transparent 0 3px,
    rgba(56, 255, 136, 0.055) 3px 4px
  );
  opacity: 1;
}

[data-easter-theme="hacker"] .section-heading,
[data-easter-theme="hacker"] .navbar-brand {
  text-shadow: 0 0 12px color-mix(in srgb, var(--cyan) 55%, transparent);
}

[data-easter-theme="cute"] .section-heading {
  text-shadow: 3px 3px 0 color-mix(in srgb, var(--yellow) 78%, transparent);
}

[data-easter-theme="space"] .section-heading,
[data-easter-theme="space"] .navbar-brand {
  text-shadow: 0 0 18px color-mix(in srgb, var(--cyan) 52%, transparent);
}

body,
header,
section,
footer,
nav,
.navbar {
  transition: background-color var(--theme-transition),
    border-color var(--theme-transition), color var(--theme-transition);
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
