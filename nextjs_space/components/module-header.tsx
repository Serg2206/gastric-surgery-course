
'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Clock, BookOpen, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Module {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  order: number;
  content: any;
  course: {
    id: string;
    title: string;
  };
}

interface ModuleHeaderProps {
  module: Module;
  progress?: number;
}

export function ModuleHeader({ module, progress = 0 }: ModuleHeaderProps) {
  return (
    <section className="py-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Link href={`/course/${module.course.id}`}>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Назад к курсу
              </Button>
            </Link>
            <Badge className="bg-white/20 text-white">
              Модуль {module.order}
            </Badge>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-4">
              <h1 className="text-3xl sm:text-4xl font-bold">
                {module.title}
              </h1>
              <p className="text-blue-100 text-lg leading-relaxed">
                {module.description}
              </p>

              <div className="flex flex-wrap gap-6 text-blue-100">
                {module.content?.duration && (
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>{module.content.duration}</span>
                  </div>
                )}
                {module.content?.lessons && (
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5" />
                    <span>{module.content.lessons} уроков</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Интерактивные элементы</span>
                </div>
              </div>

              {progress > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-100">Прогресс модуля</span>
                    <span className="text-sm text-blue-100">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2 bg-blue-800" />
                </div>
              )}
            </div>

            {module.imageUrl && (
              <div className="relative">
                <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    src={module.imageUrl}
                    alt={module.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
