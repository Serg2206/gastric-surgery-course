
'use client';

import dynamic from 'next/dynamic';

const ClientHeader = dynamic(() => import('./client-header').then(mod => ({ default: mod.ClientHeader })), {
  ssr: false,
  loading: () => (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold gradient-text">SSV Наука</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="medical-spinner"></div>
        </div>
      </div>
    </header>
  )
});

export function Header() {
  return <ClientHeader />;
}
