
'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { 
  LogOut, 
  BookOpen, 
  Home,
  Stethoscope 
} from 'lucide-react';

export function ClientHeader() {
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2">
          <Stethoscope className="h-8 w-8 text-medical-blue" />
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold gradient-text">SSV Наука</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            href="/" 
            className="flex items-center space-x-1 text-sm font-medium text-foreground/80 hover:text-medical-blue transition-colors"
          >
            <Home className="h-4 w-4" />
            <span>Главная</span>
          </Link>
          <Link 
            href="/course/gastric-cancer-surgery" 
            className="flex items-center space-x-1 text-sm font-medium text-foreground/80 hover:text-medical-blue transition-colors"
          >
            <BookOpen className="h-4 w-4" />
            <span>Курс</span>
          </Link>
        </nav>

        <div className="flex items-center space-x-3">
          {status === 'loading' ? (
            <div className="medical-spinner"></div>
          ) : session ? (
            <div className="flex items-center space-x-3">
              <div className="hidden sm:block text-sm">
                <span className="text-muted-foreground">Добро пожаловать,</span>
                <span className="ml-1 font-medium">{session.user?.name || session.user?.email}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => signOut()}
                className="flex items-center space-x-1"
              >
                <LogOut className="h-4 w-4" />
                <span>Выход</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link href="/auth/signin">
                <Button variant="ghost" size="sm">
                  Войти
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="medical" size="sm">
                  Регистрация
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
