import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";

const matrixFall = keyframes`
  from { transform: translateY(-120%); }
  to { transform: translateY(120vh); }
`;

const heartFloat = keyframes`
  0% { opacity: 0; transform: translateY(12vh) rotate(-8deg) scale(0.8); }
  15% { opacity: 0.72; }
  85% { opacity: 0.5; }
  100% { opacity: 0; transform: translateY(-112vh) rotate(18deg) scale(1.2); }
`;

const starTwinkle = keyframes`
  0%, 100% { opacity: 0.22; transform: scale(0.75); }
  50% { opacity: 0.95; transform: scale(1.35); }
`;

const EffectLayer = styled.div`
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  position: fixed;
  z-index: 20;

  .matrix-column {
    animation: ${matrixFall} var(--duration) linear var(--delay) infinite;
    color: var(--effect-primary);
    font-family: var(--mono-font);
    font-size: clamp(0.58rem, 0.8vw, 0.8rem);
    left: var(--left);
    line-height: 1.15;
    opacity: 0.36;
    position: absolute;
    text-shadow: 0 0 7px currentColor;
    top: 0;
    white-space: pre-line;
  }

  .floating-heart {
    animation: ${heartFloat} var(--duration) ease-in var(--delay) infinite;
    bottom: -12vh;
    color: var(--effect-primary);
    font-size: var(--size);
    left: var(--left);
    opacity: 0;
    position: absolute;
    text-shadow: 0 2px 8px color-mix(in srgb, var(--effect-secondary) 55%, transparent);
  }

  .space-star {
    animation: ${starTwinkle} var(--duration) ease-in-out var(--delay) infinite;
    background: var(--effect-primary);
    border-radius: 50%;
    box-shadow: 0 0 8px var(--effect-secondary);
    height: var(--size);
    left: var(--left);
    position: absolute;
    top: var(--top);
    width: var(--size);
  }

  @media (prefers-reduced-motion: reduce) {
    .matrix-column,
    .floating-heart,
    .space-star {
      animation: none;
    }

    .matrix-column { transform: translateY(8vh); }
    .floating-heart { opacity: 0.34; transform: translateY(-45vh); }
    .space-star { opacity: 0.55; }
  }
`;

const matrixColumns = [
  "01\n10\n11\n00\n01\n10\n01\n11",
  "BM\n01\n10\nDEV\n11\n00\n10",
  "101\n011\n001\n110\n010\n111",
  "CODE\n01\nBUILD\n10\nSHIP\n11",
  "00\n11\n01\n10\n00\n01\n11\n10",
  "WEB\n10\nFULL\n01\nSTACK\n11",
  "011\n100\n110\n001\n101\n010",
  "ROOT\n01\nUSER\n10\nHOME\n11",
  "10\n01\n00\n11\n10\n01\n11\n00",
  "010\n111\n101\n000\n110\n001",
  "DATA\n11\nFLOW\n00\nSYNC\n01",
  "11\n10\n01\n00\n11\n01\n10\n00",
];

const particles = Array.from({ length: 18 }, (_, index) => ({
  delay: `${-(index % 7) * 1.15}s`,
  duration: `${7 + (index % 5) * 1.35}s`,
  left: `${3 + ((index * 37) % 94)}%`,
  size: `${0.75 + (index % 4) * 0.3}rem`,
  top: `${4 + ((index * 53) % 90)}%`,
}));

const propTypes = {
  theme: PropTypes.oneOf(["hacker", "cute", "space"]),
};

const EasterThemeEffects = ({ theme }) => {
  if (!theme) return null;

  return (
    <EffectLayer aria-hidden="true">
      {theme === "hacker" && matrixColumns.map((column, index) => (
        <span
          className="matrix-column"
          key={`${column}-${index}`}
          style={{
            "--delay": `${-(index % 5) * 1.7}s`,
            "--duration": `${7 + (index % 4) * 1.8}s`,
            "--left": `${4 + index * 8.2}%`,
          }}
        >
          {column}
        </span>
      ))}
      {theme === "cute" && particles.map((particle, index) => (
        <span
          className="floating-heart"
          key={`heart-${index}`}
          style={{
            "--delay": particle.delay,
            "--duration": particle.duration,
            "--left": particle.left,
            "--size": particle.size,
          }}
        >
          {"\u2665"}
        </span>
      ))}
      {theme === "space" && particles.map((particle, index) => (
        <span
          className="space-star"
          key={`star-${index}`}
          style={{
            "--delay": particle.delay,
            "--duration": particle.duration,
            "--left": particle.left,
            "--size": `${2 + (index % 3) * 1.5}px`,
            "--top": particle.top,
          }}
        />
      ))}
    </EffectLayer>
  );
};

EasterThemeEffects.propTypes = propTypes;

export default EasterThemeEffects;