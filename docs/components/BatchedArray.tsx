'use client';

import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

export default function Array() {
  const [hovered, setHovered] = useState(false);
  const iconRef = useRef<HTMLSpanElement | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ top: number; left: number } | null>(null);

  useEffect(() => {
    if (hovered && iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      setTooltipPos({
        top: rect.top - 50, // adjust offset
        left: rect.left + rect.width / 2,
      });
    }
  }, [hovered]);

  return (
    <>
      <span style={{ position: 'relative', display: 'inline-block', cursor: 'help' }}>
        <span
          ref={iconRef}
          style={{ cursor: 'help' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          *
        </span>
      </span>

      {hovered && tooltipPos &&
        ReactDOM.createPortal(
          <div
            style={{
              position: 'fixed',
              top: tooltipPos.top,
              left: tooltipPos.left,
              transform: 'translateX(-50%)',
              maxWidth: '200px',
              backgroundColor: 'black',
              color: 'white',
              textAlign: 'center',
              borderRadius: '20px',
              padding: '5px 12px',
              zIndex: 1,
              whiteSpace: 'normal',
              wordWrap: 'break-word',
              pointerEvents: 'none',
            }}
          >
            array if batched
          </div>,
          document.body
        )
      }
    </>
  );
}
