
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Clock, 
  Users, 
  ArrowRight,
  Video,
  Brain,
  Microscope
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const modules = [
  {
    id: 'module-1',
    title: 'Введение и молекулярные основы',
    description: 'Изучите этиологию и молекулярную биологию рака желудка, включая роль H. pylori и генетические факторы.',
    image: 'https://static.abacusaicdn.net/images/fba9720f-e4a5-44a1-9d29-70a57b06a8aa.png',
    duration: '2 часа',
    lessons: 8,
    difficulty: 'Начальный',
    icon: Microscope,
    tags: ['Молекулярная биология', 'Генетика', 'H. pylori'],
    available: true
  },
  {
    id: 'module-3',
    title: 'Хирургия: Основные операции',
    description: 'Детально освойте технику дистальной резекции и тотальной гастрэктомии с 360° видео.',
    image: 'https://static.abacusaicdn.net/images/c2e664d1-5a23-4344-97e0-d5915b3a9ef5.jpg',
    duration: '3 часа',
    lessons: 12,
    difficulty: 'Продвинутый',
    icon: Video,
    tags: ['Хирургические техники', '3D-анимация', '360° видео'],
    available: true
  },
  {
    id: 'module-4',
    title: 'Лимфодиссекция',
    description: 'Освойте технику расширенной D2+ и D3 лимфодиссекции с интерактивной 3D-картой.',
    image: 'https://static.abacusaicdn.net/images/01db2b96-bdc2-4c95-8ac7-a3282095ff12.png',
    duration: '2.5 часа',
    lessons: 10,
    difficulty: 'Экспертный',
    icon: Brain,
    tags: ['Лимфосистема', 'Интерактивная карта', 'D2+ техника'],
    available: true
  }
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Начальный':
      return 'bg-green-100 text-green-800';
    case 'Продвинутый':
      return 'bg-blue-100 text-blue-800';
    case 'Экспертный':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export function RecommendedMaterials() {
  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Рекомендуемые{' '}
            <span className="gradient-text">материалы</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Начните с этих интерактивных модулей для изучения хирургии рака желудка
          </p>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {modules.map((module) => (
            <Card 
              key={module.id} 
              className="interactive-hover group border-0 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative aspect-video">
                <Image
                  src={module.image}
                  alt={module.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-4 right-4">
                  <div className="p-2 bg-white/20 backdrop-blur-sm rounded-full">
                    <module.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4">
                  <Badge className={getDifficultyColor(module.difficulty)}>
                    {module.difficulty}
                  </Badge>
                </div>
              </div>

              <CardHeader className="space-y-3">
                <CardTitle className="text-lg font-semibold group-hover:text-medical-blue transition-colors">
                  {module.title}
                </CardTitle>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {module.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{module.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{module.lessons} уроков</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {module.tags?.slice(0, 2)?.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {module.available ? (
                  <Link href={`/course/gastric-cancer-surgery/${module.id}`}>
                    <Button className="w-full group/btn">
                      Начать изучение
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </Link>
                ) : (
                  <Button disabled className="w-full">
                    Скоро доступно
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/course/gastric-cancer-surgery">
            <Button variant="outline" size="lg">
              <BookOpen className="mr-2 h-5 w-5" />
              Посмотреть все модули курса
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
