
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { 
  Brain, 
  Video, 
  Zap, 
  Award,
  Stethoscope,
  MonitorPlay 
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Интерактивные 3D-модели',
    description: 'Изучайте анатомию и хирургические техники с помощью интерактивных 3D-моделей и анимаций.'
  },
  {
    icon: Video,
    title: '360° хирургические видео',
    description: 'Наблюдайте операции с разных углов и переключайтесь между камерами в реальном времени.'
  },
  {
    icon: MonitorPlay,
    title: 'Симуляторы операций',
    description: 'Практикуйте навыки в безопасной симулированной среде перед реальными операциями.'
  },
  {
    icon: Zap,
    title: 'Мгновенная обратная связь',
    description: 'Получайте немедленные результаты и рекомендации по улучшению техники.'
  },
  {
    icon: Award,
    title: 'Сертификация',
    description: 'Получите профессиональные сертификаты после успешного завершения модулей.'
  },
  {
    icon: Stethoscope,
    title: 'Экспертные разборы',
    description: 'Реальные клинические случаи и их разбор от ведущих хирургов-онкологов.'
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Преимущества нашей{' '}
            <span className="gradient-text">платформы</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Современные технологии обучения, которые сделают вас лучшим хирургом
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="interactive-hover group border-0 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className="mx-auto w-12 h-12 bg-medical-blue-light rounded-full flex items-center justify-center group-hover:bg-medical-blue group-hover:text-white transition-colors">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
