
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SessionProvider } from './providers/session-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { GoogleAnalytics } from '@/components/google-analytics';

export const dynamic = "force-dynamic";

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'SSV Наука - Хирургия рака желудка',
  description: 'Профессиональное медицинское образование для хирургов. Современная образовательная платформа с интерактивными модулями по хирургии рака желудка.',
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'SSV Наука - Хирургия рака желудка',
    description: 'Профессиональное медицинское образование для хирургов',
    url: '/',
    siteName: 'SSV Наука',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SSV Наука - Медицинское образование',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SessionProvider>
            {children}
            <Toaster />
          </SessionProvider>
        </ThemeProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
