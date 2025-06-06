'use client';

import React, { useState } from 'react';

export default function Array() {
  const [hovered, setHovered] = useState(false);

  return (
    <span style={{ position: 'relative', display: 'inline-block', cursor: 'help' }}>
      <span
        style={{ cursor: 'help' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        ⛁
      </span>
      {hovered && (
        <span style={{
          visibility: 'visible',
          maxWidth: '200px',
          backgroundColor: 'black',
          color: 'white',
          textAlign: 'center',
          borderRadius: '20px',
          padding: '5px 12px',
          position: 'absolute',
          zIndex: 1,
          bottom: '125%',
          left: '50%',
          transform: 'translateX(-50%)',
          whiteSpace: 'normal',
          wordWrap: 'break-word',
        }}>
          array
        </span>
      )}
    </span>
  );
}
