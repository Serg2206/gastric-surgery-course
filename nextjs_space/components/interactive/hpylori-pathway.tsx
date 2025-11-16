
'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, RotateCcw, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const pathwayStages = [
  {
    id: 1,
    name: 'Инфекция H. pylori',
    description: 'Начальная колонизация бактерией Helicobacter pylori слизистой оболочки желудка',
    duration: '2-4 недели',
    color: 'bg-red-500'
  },
  {
    id: 2,
    name: 'Хроническое воспаление',
    description: 'Развитие хронического гастрита с инфильтрацией воспалительными клетками',
    duration: 'месяцы-годы',
    color: 'bg-orange-500'
  },
  {
    id: 3,
    name: 'Атрофия',
    description: 'Потеря желез желудка и уменьшение секреции кислоты',
    duration: 'годы',
    color: 'bg-yellow-500'
  },
  {
    id: 4,
    name: 'Кишечная метаплазия',
    description: 'Замещение желудочного эпителия кишечным типом эпителия',
    duration: 'годы',
    color: 'bg-blue-500'
  },
  {
    id: 5,
    name: 'Дисплазия',
    description: 'Появление атипичных клеток с нарушенной архитектурой',
    duration: 'годы',
    color: 'bg-purple-500'
  },
  {
    id: 6,
    name: 'Аденокарцинома',
    description: 'Формирование инвазивной опухоли желудка',
    duration: 'злокачественная трансформация',
    color: 'bg-red-700'
  }
];

export function HpyloriPathway() {
  const [currentStage, setCurrentStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAnimation = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      let stage = 0;
      
      const interval = setInterval(() => {
        stage += 1;
        setCurrentStage(stage);
        
        if (stage >= pathwayStages.length) {
          clearInterval(interval);
          setIsPlaying(false);
        }
      }, 2000);
    }
  };

  const resetAnimation = () => {
    setCurrentStage(0);
    setIsPlaying(false);
  };

  return (
    <div className="space-y-6">
      <Card className="medical-card">
        <CardContent className="p-6">
          <div className="relative aspect-video rounded-xl overflow-hidden mb-6">
            <Image
              src="https://static.abacusaicdn.net/images/48a8f5b0-2583-44ba-ae42-d9f1159f76a0.png"
              alt="H. pylori pathway to cancer"
              fill
              className="object-contain"
            />
            
            {/* Overlay with current stage highlight */}
            {currentStage > 0 && (
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 max-w-sm text-center">
                  <Badge className={`mb-2 ${pathwayStages[currentStage - 1]?.color} text-white`}>
                    Этап {currentStage}
                  </Badge>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {pathwayStages[currentStage - 1]?.name}
                  </h4>
                  <p className="text-xs text-gray-600">
                    {pathwayStages[currentStage - 1]?.description}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Button 
              onClick={playAnimation}
              disabled={isPlaying}
              className="flex items-center space-x-2"
            >
              <Play className="h-4 w-4" />
              <span>Запустить анимацию</span>
            </Button>
            
            <Button 
              variant="outline"
              onClick={resetAnimation}
              className="flex items-center space-x-2"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Сбросить</span>
            </Button>
          </div>

          {/* Pathway stages timeline */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 text-center mb-4">
              Этапы канцерогенеза
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {pathwayStages.map((stage, index) => (
                <Card
                  key={stage.id}
                  className={`cursor-pointer transition-all duration-300 ${
                    currentStage >= stage.id 
                      ? 'ring-2 ring-medical-blue shadow-lg scale-105' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setCurrentStage(stage.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-full ${stage.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                        {stage.id}
                      </div>
                      <div className="flex-grow">
                        <h5 className="font-medium text-sm text-gray-900 mb-1">
                          {stage.name}
                        </h5>
                        <p className="text-xs text-gray-600 leading-relaxed mb-2">
                          {stage.description}
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          {stage.duration}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress indicator */}
      {currentStage > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1">
                  {pathwayStages.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index < currentStage ? 'bg-medical-blue' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Прогресс: {currentStage}/{pathwayStages.length}
                </span>
              </div>
              
              <div className="text-xs text-gray-600">
                Длительность процесса: 10-20 лет
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
