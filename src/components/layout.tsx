// src/components/Layout.tsx

import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className="topbar">
          CIED
      </header>

      <main>
        {children}
      </main>
    </div>
  );
}
