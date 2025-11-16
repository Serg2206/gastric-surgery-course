
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Lock,
  Clock,
  BookOpen,
  PlayCircle,
  CheckCircle,
  ArrowRight,
  Microscope,
  Video,
  Brain,
  Users,
  Zap,
  MapPin,
  Activity,
  Stethoscope,
  Target,
  Award
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Module {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  order: number;
  isActive: boolean;
  content: any;
}

interface ModulesListProps {
  modules: Module[];
  courseId: string;
}

const moduleIcons = {
  'module-1': Microscope,
  'module-2': Users,
  'module-3': Video,
  'module-4': Brain,
  'module-5': Target,
  'module-6': Activity,
  'module-7': MapPin,
  'module-8': Zap,
  'module-9': Stethoscope,
  'module-10': Award,
};

const allModules = [
  {
    id: 'module-1',
    title: 'Введение и молекулярные основы',
    description: 'Этиология и молекулярная биология рака желудка',
    isActive: true,
    order: 1
  },
  {
    id: 'module-2',
    title: 'Диагностика и стадирование',
    description: 'Интерпретация КТ, МРТ, ПЭТ-КТ исследований',
    isActive: false,
    order: 2
  },
  {
    id: 'module-3',
    title: 'Хирургия: Основные операции',
    description: 'Дистальная резекция и тотальная гастрэктомия',
    isActive: true,
    order: 3
  },
  {
    id: 'module-4',
    title: 'Лимфодиссекция',
    description: 'Расширенная D2+ и D3 лимфодиссекция',
    isActive: true,
    order: 4
  },
  {
    id: 'module-5',
    title: 'Реконструкция',
    description: 'Методы реконструкции после гастрэктомии',
    isActive: false,
    order: 5
  },
  {
    id: 'module-6',
    title: 'Лапароскопия и робототехника',
    description: 'Малоинвазивные технологии в хирургии',
    isActive: false,
    order: 6
  },
  {
    id: 'module-7',
    title: 'Эндоскопия',
    description: 'Эндоскопическая диссекция в подслизистом слое',
    isActive: false,
    order: 7
  },
  {
    id: 'module-8',
    title: 'Мультимодальное лечение',
    description: 'Неоадъювантная и адъювантная терапия',
    isActive: false,
    order: 8
  },
  {
    id: 'module-9',
    title: 'Осложнения',
    description: 'Диагностика и лечение послеоперационных осложнений',
    isActive: false,
    order: 9
  },
  {
    id: 'module-10',
    title: 'Практика',
    description: 'Клинические случаи и симуляционный тренинг',
    isActive: false,
    order: 10
  }
];

export function ModulesList({ modules, courseId }: ModulesListProps) {
  const getModuleProgress = (moduleId: string) => {
    // This would come from user progress data
    return 0;
  };

  const isModuleAccessible = (moduleId: string) => {
    return ['module-1', 'module-3', 'module-4'].includes(moduleId);
  };

  return (
    <section className="py-16 bg-gray-50 modules-list">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Программа{' '}
            <span className="gradient-text">курса</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            10 интерактивных модулей с современными медиа-форматами
          </p>
        </div>

        <div className="grid gap-6">
          {allModules.map((module, index) => {
            const IconComponent = moduleIcons[module.id as keyof typeof moduleIcons];
            const isAccessible = isModuleAccessible(module.id);
            const progress = getModuleProgress(module.id);
            const dbModule = modules.find(m => m.id === module.id);

            return (
              <Card 
                key={module.id}
                className={`interactive-hover group transition-all duration-300 ${
                  isAccessible 
                    ? 'border-medical-blue/20 hover:border-medical-blue/40 shadow-md hover:shadow-lg' 
                    : 'opacity-60 bg-gray-50'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-6">
                    <div className="flex-shrink-0">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                        isAccessible 
                          ? 'bg-medical-blue text-white' 
                          : 'bg-gray-300 text-gray-500'
                      }`}>
                        {isAccessible ? (
                          <IconComponent className="h-8 w-8" />
                        ) : (
                          <Lock className="h-8 w-8" />
                        )}
                      </div>
                    </div>

                    <div className="flex-grow space-y-2">
                      <div className="flex items-center gap-3">
                        <Badge variant={isAccessible ? "default" : "secondary"}>
                          Модуль {module.order}
                        </Badge>
                        {isAccessible && (
                          <Badge variant="medical" className="text-xs">
                            Доступно
                          </Badge>
                        )}
                        {!isAccessible && (
                          <Badge variant="outline" className="text-xs">
                            Скоро
                          </Badge>
                        )}
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-medical-blue transition-colors">
                        {module.title}
                      </h3>

                      <p className="text-gray-600">
                        {module.description}
                      </p>

                      {dbModule?.content && (
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{dbModule.content.duration || '2 часа'}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4" />
                            <span>{dbModule.content.lessons || 8} уроков</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex-shrink-0">
                      {isAccessible ? (
                        <Link href={`/course/${courseId}/${module.id}`}>
                          <Button 
                            variant="medical" 
                            className="group/btn"
                          >
                            {progress > 0 ? (
                              <>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Продолжить
                              </>
                            ) : (
                              <>
                                <PlayCircle className="mr-2 h-4 w-4" />
                                Начать
                              </>
                            )}
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                          </Button>
                        </Link>
                      ) : (
                        <Button disabled variant="outline">
                          <Lock className="mr-2 h-4 w-4" />
                          Заблокировано
                        </Button>
                      )}
                    </div>
                  </div>

                  {progress > 0 && (
                    <div className="mt-4 pl-22">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-gray-500">Прогресс</span>
                        <span className="text-xs text-gray-500">{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-medical-blue h-2 rounded-full progress-bar"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
