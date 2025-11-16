
'use client';

import { Button } from '@/components/ui/button';
import { PlayCircle, ArrowRight, Users, Video } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function HeroSection() {
  const [videoCount, setVideoCount] = useState(0);
  const [doctorsCount, setDoctorsCount] = useState(0);

  useEffect(() => {
    // Animate numbers on mount
    const animateCount = (target: number, setter: (value: number) => void) => {
      let current = 0;
      const increment = target / 100;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(current));
        }
      }, 20);
    };

    animateCount(500, setVideoCount);
    animateCount(5000, setDoctorsCount);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16 sm:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
                Профессиональное{' '}
                <span className="gradient-text">медицинское</span>{' '}
                <span className="gradient-text">образование</span>{' '}
                для хирургов
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                Изучайте современные методики лечения рака желудка через 500+ интерактивных 
                видео уроков, 3D-анимации и практические симуляции от ведущих экспертов.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/course/gastric-cancer-surgery">
                <Button variant="medical" size="lg" className="w-full sm:w-auto">
                  Начать обучение бесплатно
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto"
                onClick={() => {
                  // Показать демо-видео или перейти к модулю 1
                  window.location.href = '/course/gastric-cancer-surgery/module-1';
                }}
              >
                <PlayCircle className="mr-2 h-5 w-5" />
                Смотреть демо
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 pt-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-medical-blue-light rounded-full">
                  <Video className="h-5 w-5 text-medical-blue" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 animate-counter">
                    {videoCount}+
                  </div>
                  <div className="text-sm text-gray-600">видео уроков</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-medical-blue-light rounded-full">
                  <Users className="h-5 w-5 text-medical-blue" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 animate-counter">
                    {doctorsCount}+
                  </div>
                  <div className="text-sm text-gray-600">врачей обучились</div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-4">
              <div className="flex items-center space-x-1 text-sm text-green-700">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Бесплатный доступ к 10 урокам</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-green-700">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Без рекламы и отвлекающих элементов</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-green-700">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>3 дня в неделю, новые материалы</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-medical-blue to-blue-700 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://i.ytimg.com/vi/1xZ5NZfibE8/maxresdefault.jpg"
                alt="Медицинское образование для хирургов"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <div className="text-sm font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  💡 Интерактивные модули
                </div>
              </div>
            </div>

            {/* Floating statistics */}
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
              <div className="text-center">
                <div className="text-2xl font-bold text-medical-blue">98%</div>
                <div className="text-xs text-gray-600">рейтинг успеха</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
