
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Module {
  id: string;
  title: string;
  course: {
    id: string;
  };
}

interface ModuleNavigationProps {
  currentModule: Module;
  previousModule?: string | null;
  nextModule?: string | null;
}

const moduleLinks = {
  'module-1': { title: 'Введение и молекулярные основы' },
  'module-3': { title: 'Хирургия: Основные операции' },
  'module-4': { title: 'Лимфодиссекция' }
};

export function ModuleNavigation({ 
  currentModule, 
  previousModule, 
  nextModule 
}: ModuleNavigationProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              {previousModule ? (
                <Link href={`/course/${currentModule.course.id}/${previousModule}`}>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <ArrowLeft className="h-4 w-4" />
                    <div className="text-left">
                      <div className="text-xs text-gray-500">Предыдущий модуль</div>
                      <div className="font-medium">
                        {moduleLinks[previousModule as keyof typeof moduleLinks]?.title}
                      </div>
                    </div>
                  </Button>
                </Link>
              ) : (
                <div></div>
              )}

              <Link href={`/course/${currentModule.course.id}`}>
                <Button variant="ghost">
                  Вернуться к курсу
                </Button>
              </Link>

              {nextModule ? (
                <Link href={`/course/${currentModule.course.id}/${nextModule}`}>
                  <Button className="flex items-center space-x-2">
                    <div className="text-right">
                      <div className="text-xs text-blue-100">Следующий модуль</div>
                      <div className="font-medium">
                        {moduleLinks[nextModule as keyof typeof moduleLinks]?.title}
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <div></div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
