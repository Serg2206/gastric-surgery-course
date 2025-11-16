
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, RotateCcw } from 'lucide-react';

type ReconstructionMethod = 'roux-en-y' | 'jejunal-interposition';

interface MethodInfo {
  name: string;
  description: string;
  pros: string[];
  cons: string[];
  indications: string[];
}

const methods: Record<ReconstructionMethod, MethodInfo> = {
  'roux-en-y': {
    name: 'Реконструкция по Roux-en-Y',
    description: 'Наиболее распространенный метод реконструкции после тотальной гастрэктомии',
    pros: [
      'Предотвращает желчный рефлюкс',
      'Относительно простая техника',
      'Низкий риск эзофагита',
      'Хорошо изученная методика'
    ],
    cons: [
      'Возможен dumping-синдром',
      'Roux-stasis синдром у 10-30% пациентов',
      'Нарушение всасывания витамина B12',
      'Требуется длинная петля (40-60 см)'
    ],
    indications: [
      'Тотальная гастрэктомия',
      'Дистальная субтотальная резекция',
      'Проксимальная гастрэктомия (реже)'
    ]
  },
  'jejunal-interposition': {
    name: 'Интерпозиция тощей кишки',
    description: 'Создание резервуара из сегмента тощей кишки между пищеводом и двенадцатиперстной кишкой',
    pros: [
      'Сохраняется пассаж через ДПК',
      'Лучшее всасывание нутриентов',
      'Резервуарная функция',
      'Меньше dumping-синдрома'
    ],
    cons: [
      'Технически сложнее',
      'Три анастомоза (выше риск несостоятельности)',
      'Более длительная операция',
      'Риск ишемии интерпозиционного сегмента'
    ],
    indications: [
      'Молодые пациенты',
      'Хорошее общее состояние',
      'Желание улучшить качество жизни',
      'Тотальная гастрэктомия у пациентов без сопутствующих заболеваний'
    ]
  }
};

export function ReconstructionAnimation() {
  const [selectedMethod, setSelectedMethod] = useState<ReconstructionMethod>('roux-en-y');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = selectedMethod === 'roux-en-y'
    ? [
        'Пищевод после резекции желудка',
        'Мобилизация тощей кишки на 40-60 см от связки Трейтца',
        'Формирование эзофагоеюноанастомоза',
        'Пересечение тощей кишки',
        'Формирование еюноеюноанастомоза на расстоянии 40 см',
        'Завершенная реконструкция с Y-образной петлей'
      ]
    : [
        'Пищевод и ДПК после резекции желудка',
        'Выделение сегмента тощей кишки 15-20 см',
        'Формирование эзофагоеюноанастомоза',
        'Формирование еюнодуоденоанастомоза',
        'Восстановление непрерывности тощей кишки',
        'Завершенная интерпозиция с резервуарной функцией'
      ];

  const handlePlay = () => {
    setIsPlaying(true);
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false);
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const method = methods[selectedMethod];

  return (
    <div className="space-y-6">
      {/* Method Selection */}
      <div className="flex gap-4">
        <Button
          variant={selectedMethod === 'roux-en-y' ? 'default' : 'outline'}
          onClick={() => {
            setSelectedMethod('roux-en-y');
            handleReset();
          }}
          className="flex-1"
        >
          Roux-en-Y
        </Button>
        <Button
          variant={selectedMethod === 'jejunal-interposition' ? 'default' : 'outline'}
          onClick={() => {
            setSelectedMethod('jejunal-interposition');
            handleReset();
          }}
          className="flex-1"
        >
          Интерпозиция тощей кишки
        </Button>
      </div>

      {/* Animation Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{method.name}</CardTitle>
            <Badge>Шаг {currentStep + 1} / {steps.length}</Badge>
          </div>
          <p className="text-sm text-gray-600">{method.description}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Animation Area */}
          <div className="relative w-full aspect-video bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg overflow-hidden border-2 border-blue-200">
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <svg className="w-full h-full" viewBox="0 0 400 300">
                {/* Esophagus */}
                <line x1="200" y1="20" x2="200" y2="80" stroke="#8B4513" strokeWidth="8" />
                <text x="210" y="50" fill="#8B4513" fontSize="12">Пищевод</text>

                {selectedMethod === 'roux-en-y' ? (
                  <>
                    {/* Roux-en-Y */}
                    {currentStep >= 2 && (
                      <>
                        {/* Esophagojejunal anastomosis */}
                        <line x1="200" y1="80" x2="200" y2="140" stroke="#FF6B6B" strokeWidth="8" className="animate-pulse" />
                        <circle cx="200" cy="110" r="8" fill="#FF6B6B" />
                      </>
                    )}
                    {currentStep >= 1 && (
                      <>
                        {/* Jejunal limb */}
                        <path d="M 200 140 L 200 180 L 150 220 L 120 250" stroke="#FF6B6B" strokeWidth="6" fill="none" />
                        <text x="110" y="270" fill="#666" fontSize="10">Приводящая петля</text>
                      </>
                    )}
                    {currentStep >= 5 && (
                      <>
                        {/* Jejunojejunal anastomosis */}
                        <path d="M 200 140 L 200 180 L 250 220 L 280 250" stroke="#FF6B6B" strokeWidth="6" fill="none" />
                        <circle cx="200" cy="180" r="6" fill="#4CAF50" />
                        <text x="240" y="270" fill="#666" fontSize="10">Отводящая петля</text>
                        <text x="170" y="185" fill="#4CAF50" fontSize="10">Анастомоз</text>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {/* Jejunal Interposition */}
                    {currentStep >= 2 && (
                      <>
                        {/* Interposed jejunum */}
                        <rect x="170" y="90" width="60" height="80" fill="#FFE4B5" stroke="#FF6B6B" strokeWidth="4" rx="10" className="animate-pulse" />
                        <text x="175" y="135" fill="#666" fontSize="10">Интерпозит</text>
                        <circle cx="200" cy="90" r="6" fill="#FF6B6B" />
                        <text x="210" y="95" fill="#666" fontSize="9">Анастомоз 1</text>
                      </>
                    )}
                    {currentStep >= 3 && (
                      <>
                        {/* Connection to duodenum */}
                        <line x1="200" y1="170" x2="200" y2="230" stroke="#8B4513" strokeWidth="6" />
                        <circle cx="200" cy="170" r="6" fill="#4CAF50" />
                        <text x="210" y="175" fill="#666" fontSize="9">Анастомоз 2</text>
                        <text x="210" y="250" fill="#8B4513" fontSize="12">ДПК</text>
                      </>
                    )}
                    {currentStep >= 4 && (
                      <>
                        {/* Restored jejunum */}
                        <path d="M 170 130 L 100 130 L 80 180 L 90 230" stroke="#FF6B6B" strokeWidth="5" fill="none" />
                        <circle cx="100" cy="130" r="5" fill="#2196F3" />
                        <text x="50" y="250" fill="#666" fontSize="9">Анастомоз 3</text>
                      </>
                    )}
                  </>
                )}
              </svg>
            </div>

            {/* Current Step Description */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4">
              <p className="text-sm font-medium">{steps[currentStep]}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-2">
            <Button
              onClick={handlePlay}
              disabled={isPlaying || currentStep >= steps.length - 1}
              className="flex-1"
            >
              <Play className="w-4 h-4 mr-2" />
              {isPlaying ? 'Воспроизведение...' : 'Запустить анимацию'}
            </Button>
            <Button onClick={handleReset} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Сброс
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Method Comparison */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Преимущества</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {method.pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Недостатки</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {method.cons.map((con, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-600 mt-0.5">⚠</span>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Indications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Показания</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            {method.indications.map((indication, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>{indication}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
