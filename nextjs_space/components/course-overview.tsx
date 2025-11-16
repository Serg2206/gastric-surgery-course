
'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Clock, 
  BookOpen, 
  Users, 
  Award,
  Play,
  CheckCircle
} from 'lucide-react';
import Image from 'next/image';

interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  category: string;
  difficulty: string;
  duration: string;
  modules: any[];
}

interface CourseOverviewProps {
  course: Course;
}

export function CourseOverview({ course }: CourseOverviewProps) {
  const totalModules = course.modules?.length || 0;
  const activeModules = course.modules?.filter(m => m.isActive)?.length || 3;
  const progress = 0; // This would come from user progress

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'advanced':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'Начальный';
      case 'intermediate':
        return 'Средний';
      case 'advanced':
        return 'Продвинутый';
      default:
        return difficulty;
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Badge className={getDifficultyColor(course.difficulty)}>
                  {getDifficultyLabel(course.difficulty)}
                </Badge>
                <Badge variant="secondary">
                  {course.category}
                </Badge>
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
                {course.title}
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                {course.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-medical-blue" />
                <span className="text-sm text-gray-600">{course.duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-medical-blue" />
                <span className="text-sm text-gray-600">{activeModules} активных модуля</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-medical-blue" />
                <span className="text-sm text-gray-600">5,000+ студентов</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-medical-blue" />
                <span className="text-sm text-gray-600">Сертификат включен</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Прогресс курса</span>
                <span className="text-sm text-gray-600">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                size="lg" 
                className="w-full sm:w-auto"
                onClick={() => {
                  window.location.href = '/course/gastric-cancer-surgery/module-1';
                }}
              >
                <Play className="mr-2 h-5 w-5" />
                Начать обучение
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto"
                onClick={() => {
                  // Прокрутка к списку модулей
                  const modulesSection = document.querySelector('.modules-list');
                  if (modulesSection) {
                    modulesSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <CheckCircle className="mr-2 h-5 w-5" />
                Посмотреть программу
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              {course.imageUrl && (
                <Image
                  src={course.imageUrl}
                  alt={course.title}
                  fill
                  className="object-cover"
                  priority
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            
            {/* Floating achievement badges */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-4 border">
              <div className="text-center">
                <div className="text-2xl font-bold text-medical-blue">98%</div>
                <div className="text-xs text-gray-600">успешности</div>
              </div>
            </div>
            
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-4 border">
              <div className="text-center">
                <div className="text-2xl font-bold text-medical-blue">{activeModules}</div>
                <div className="text-xs text-gray-600">модуля</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
