'use client';

import { useEffect, useRef } from 'react';

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const normalizeCornerRadii = (radius, width, height) => {
  if (typeof radius === 'number') {
    const value = Math.max(0, Math.min(radius, width / 2, height / 2));
    return {
      topLeft: value,
      topRight: value,
      bottomRight: value,
      bottomLeft: value
    };
  }

  return {
    topLeft: Math.max(0, Math.min(radius.topLeft || 0, width / 2, height / 2)),
    topRight: Math.max(0, Math.min(radius.topRight || 0, width / 2, height / 2)),
    bottomRight: Math.max(0, Math.min(radius.bottomRight || 0, width / 2, height / 2)),
    bottomLeft: Math.max(0, Math.min(radius.bottomLeft || 0, width / 2, height / 2))
  };
};

const expandRoundedRect = (rect, amount) => {
  if (!amount) {
    return rect;
  }

  return {
    left: rect.left - amount,
    top: rect.top - amount,
    right: rect.right + amount,
    bottom: rect.bottom + amount,
    radius: {
      topLeft: (rect.radius.topLeft || 0) + amount,
      topRight: (rect.radius.topRight || 0) + amount,
      bottomRight: (rect.radius.bottomRight || 0) + amount,
      bottomLeft: (rect.radius.bottomLeft || 0) + amount
    }
  };
};

const isInsideRoundedRect = (x, y, rect) => {
  if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
    return false;
  }

  const width = rect.right - rect.left;
  const height = rect.bottom - rect.top;
  const radii = normalizeCornerRadii(rect.radius, width, height);

  if (
    x >= rect.left + radii.topLeft &&
    x <= rect.right - radii.topRight
  ) {
    return true;
  }

  if (
    y >= rect.top + radii.topLeft &&
    y <= rect.bottom - radii.bottomLeft
  ) {
    return true;
  }

  if (x < rect.left + radii.topLeft && y < rect.top + radii.topLeft) {
    return Math.hypot(x - (rect.left + radii.topLeft), y - (rect.top + radii.topLeft)) <= radii.topLeft;
  }

  if (x > rect.right - radii.topRight && y < rect.top + radii.topRight) {
    return Math.hypot(x - (rect.right - radii.topRight), y - (rect.top + radii.topRight)) <= radii.topRight;
  }

  if (x > rect.right - radii.bottomRight && y > rect.bottom - radii.bottomRight) {
    return Math.hypot(x - (rect.right - radii.bottomRight), y - (rect.bottom - radii.bottomRight)) <= radii.bottomRight;
  }

  if (x < rect.left + radii.bottomLeft && y > rect.bottom - radii.bottomLeft) {
    return Math.hypot(x - (rect.left + radii.bottomLeft), y - (rect.bottom - radii.bottomLeft)) <= radii.bottomLeft;
  }

  return true;
};

function DotGrid({
  children,
  className = '',
  color = '#49494b',
  dotSize = 2,
  gap = 6,
  radius = 72,
  maxOffset = 3,
  bleed = 6,
  outerRadius = 24,
  style
}) {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const contentRef = useRef(null);
  const dotsRef = useRef([]);
  const pointerRef = useRef(null);
  const drawRef = useRef(() => {});
  const frameRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;

    if (!root || !canvas) {
      return undefined;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return undefined;
    }

    const getMaskElements = () => {
      const content = contentRef.current;
      if (!content) {
        return [];
      }

      const wrappedRoot = content.firstElementChild;
      if (wrappedRoot && wrappedRoot.children.length > 0) {
        return Array.from(wrappedRoot.children);
      }

      return Array.from(content.children);
    };

    const getMaskRects = () => {
      return getMaskElements().map(element => {
        const rect = element.getBoundingClientRect();
        const rootRect = root.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(element);

        return {
          left: rect.left - rootRect.left,
          top: rect.top - rootRect.top,
          right: rect.right - rootRect.left,
          bottom: rect.bottom - rootRect.top,
          radius: {
            topLeft: parseFloat(computedStyle.borderTopLeftRadius) || 0,
            topRight: parseFloat(computedStyle.borderTopRightRadius) || 0,
            bottomRight: parseFloat(computedStyle.borderBottomRightRadius) || 0,
            bottomLeft: parseFloat(computedStyle.borderBottomLeftRadius) || 0
          }
        };
      });
    };

    const buildGrid = () => {
      const { width, height } = root.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const cellSize = dotSize + gap;
      const canvasWidth = width + bleed * 2;
      const canvasHeight = height + bleed * 2;
      const cols = Math.max(1, Math.floor((canvasWidth + gap) / cellSize));
      const rows = Math.max(1, Math.floor((canvasHeight + gap) / cellSize));
      const gridWidth = cols * cellSize - gap;
      const gridHeight = rows * cellSize - gap;
      const startX = -bleed + (canvasWidth - gridWidth) / 2;
      const startY = -bleed + (canvasHeight - gridHeight) / 2;

      canvas.width = Math.round(canvasWidth * dpr);
      canvas.height = Math.round(canvasHeight * dpr);
      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;

      context.setTransform(1, 0, 0, 1, 0, 0);
      context.scale(dpr, dpr);

      dotsRef.current = Array.from({ length: rows * cols }, (_, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);

        return {
          x: startX + col * cellSize,
          y: startY + row * cellSize
        };
      });
    };

    const draw = () => {
      const { width, height } = root.getBoundingClientRect();
      const canvasWidth = width + bleed * 2;
      const canvasHeight = height + bleed * 2;
      const maskRects = getMaskRects();
      const edgeSoftening = dotSize / 2 + 0.75;
      const exclusionRects = maskRects.map(rect => expandRoundedRect(rect, edgeSoftening));
      const visibleOuterRect = {
        left: 0,
        top: 0,
        right: width,
        bottom: height,
        radius: outerRadius
      };
      const bleedOuterRect = {
        left: -bleed,
        top: -bleed,
        right: width + bleed,
        bottom: height + bleed,
        radius: outerRadius + bleed
      };

      context.clearRect(0, 0, canvasWidth, canvasHeight);
      context.fillStyle = color;

      for (const dot of dotsRef.current) {
        let x = dot.x;
        let y = dot.y;

        if (pointerRef.current) {
          const dx = dot.x - pointerRef.current.x;
          const dy = dot.y - pointerRef.current.y;
          const distance = Math.hypot(dx, dy);

          if (distance > 0 && distance < radius) {
            const strength = 1 - distance / radius;
            x += clamp((dx / distance) * strength * maxOffset, -maxOffset, maxOffset);
            y += clamp((dy / distance) * strength * maxOffset, -maxOffset, maxOffset);
          }
        }

        if (!isInsideRoundedRect(dot.x, dot.y, visibleOuterRect)) {
          continue;
        }

        if (!isInsideRoundedRect(x, y, bleedOuterRect)) {
          continue;
        }

        if (exclusionRects.some(rect => isInsideRoundedRect(dot.x, dot.y, rect))) {
          continue;
        }

        context.beginPath();
        context.arc(x + bleed, y + bleed, dotSize / 2, 0, Math.PI * 2);
        context.fill();
      }
    };

    buildGrid();
    draw();

    const resizeObserver = new ResizeObserver(() => {
      buildGrid();
      draw();
    });

    resizeObserver.observe(root);

    drawRef.current = draw;

    return () => {
      resizeObserver.disconnect();
      drawRef.current = () => {};
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [bleed, color, dotSize, gap, maxOffset, outerRadius, radius]);

  const redraw = () => {
    if (frameRef.current) {
      return;
    }

    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      drawRef.current();
    });
  };

  const handlePointerMove = event => {
    if (!rootRef.current) {
      return;
    }

    const rect = rootRef.current.getBoundingClientRect();
    pointerRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };

    redraw();
  };

  const handlePointerLeave = () => {
    pointerRef.current = null;
    redraw();
  };

  return (
    <div
      ref={rootRef}
      className={`dot-grid ${className}`.trim()}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        '--dot-grid-bleed': `${bleed}px`,
        ...style
      }}
    >
      <canvas aria-hidden="true" ref={canvasRef} className="dot-grid__canvas" />
      <div ref={contentRef} className="dot-grid__content">{children}</div>

      <style jsx>{`
        .dot-grid {
          position: relative;
          width: 100%;
          min-width: 0;
          overflow: visible;
        }

        .dot-grid__canvas {
          position: absolute;
          top: calc(var(--dot-grid-bleed) * -1);
          right: calc(var(--dot-grid-bleed) * -1);
          bottom: calc(var(--dot-grid-bleed) * -1);
          left: calc(var(--dot-grid-bleed) * -1);
          pointer-events: none;
        }

        .dot-grid__content {
          position: relative;
          z-index: 1;
          width: 100%;
          min-width: 0;
        }
      `}</style>
    </div>
  );
}

export default DotGrid;
