// components/CustomLayout.tsx
import React from 'react';

export default function CustomLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="custom-layout">
      <header>My Custom Header</header>
      <main>{children}</main>
      <footer>My Custom Footer</footer>
    </div>
  );
}
