import React from "react";
import styled from "styled-components";

const ProgressTrack = styled.div`
  height: 3px;
  inset: 0 0 auto;
  pointer-events: none;
  position: fixed;
  z-index: 1100;

  span {
    background: var(--cyan);
    display: block;
    height: 100%;
    transform: scaleX(${({ $progress }) => $progress});
    transform-origin: left;
    width: 100%;
  }
`;

const ScrollProgress = () => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    let frame;
    const update = () => {
      const root = document.documentElement;
      const available = root.scrollHeight - root.clientHeight;
      setProgress(available > 0 ? root.scrollTop / available : 0);
      frame = undefined;
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <ProgressTrack $progress={progress} aria-hidden="true">
      <span />
    </ProgressTrack>
  );
};

export default ScrollProgress;