
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Info, MapPin } from 'lucide-react';
import Image from 'next/image';

interface LymphStation {
  number: string;
  name: string;
  description: string;
  level: string;
  position: { x: number; y: number };
  color: string;
}

const lymphStations: LymphStation[] = [
  {
    number: '7',
    name: 'Левая желудочная артерия',
    description: 'Лимфоузлы вдоль левой желудочной артерии. Обязательная станция при D2-лимфодиссекции.',
    level: 'D2',
    position: { x: 35, y: 25 },
    color: 'bg-red-500'
  },
  {
    number: '8',
    name: 'Общая печеночная артерия',
    description: 'Лимфоузлы передней группы вдоль общей печеночной артерии.',
    level: 'D2',
    position: { x: 65, y: 30 },
    color: 'bg-blue-500'
  },
  {
    number: '9',
    name: 'Чревная артерия',
    description: 'Лимфоузлы чревного ствола. Ключевая станция при распространенном процессе.',
    level: 'D2',
    position: { x: 50, y: 20 },
    color: 'bg-green-500'
  },
  {
    number: '11p',
    name: 'Селезеночная артерия проксимальная',
    description: 'Проксимальные лимфоузлы селезеночной артерии.',
    level: 'D2',
    position: { x: 25, y: 35 },
    color: 'bg-purple-500'
  },
  {
    number: '12a',
    name: 'Печеночная артерия левая',
    description: 'Лимфоузлы левой печеночной артерии. Выполняется при расширенной лимфодиссекции.',
    level: 'D2+',
    position: { x: 70, y: 20 },
    color: 'bg-orange-500'
  },
  {
    number: '12b',
    name: 'Печеночная артерия правая',
    description: 'Лимфоузлы правой печеночной артерии.',
    level: 'D2+',
    position: { x: 80, y: 35 },
    color: 'bg-pink-500'
  },
  {
    number: '14v',
    name: 'Верхние брыжеечные сосуды',
    description: 'Лимфоузлы верхней брыжеечной вены. Выполняется при D3-лимфодиссекции.',
    level: 'D3',
    position: { x: 60, y: 70 },
    color: 'bg-indigo-500'
  }
];

const levelColors = {
  'D2': 'bg-green-100 text-green-800',
  'D2+': 'bg-blue-100 text-blue-800',
  'D3': 'bg-red-100 text-red-800'
};

export function LymphNodeMap() {
  const [selectedStation, setSelectedStation] = useState<LymphStation | null>(null);
  const [visibleLevels, setVisibleLevels] = useState<Set<string>>(new Set(['D2', 'D2+', 'D3']));

  const toggleLevel = (level: string) => {
    const newVisible = new Set(visibleLevels);
    if (newVisible.has(level)) {
      newVisible.delete(level);
    } else {
      newVisible.add(level);
    }
    setVisibleLevels(newVisible);
  };

  const visibleStations = lymphStations.filter(station => 
    visibleLevels.has(station.level)
  );

  return (
    <div className="space-y-6">
      {/* Interactive Map */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-6 w-6 text-medical-blue" />
            <span>Интерактивная карта лимфатических станций</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="relative aspect-video rounded-xl overflow-hidden mb-6">
            <Image
              src="https://static.abacusaicdn.net/images/01db2b96-bdc2-4c95-8ac7-a3282095ff12.png"
              alt="Карта лимфатических станций"
              fill
              className="object-contain"
            />
            
            {/* Interactive lymph node markers */}
            {visibleStations.map((station) => (
              <button
                key={station.number}
                className="absolute w-12 h-12 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center justify-center text-white font-bold svg-clickable"
                style={{
                  left: `${station.position.x}%`,
                  top: `${station.position.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={() => setSelectedStation(
                  selectedStation?.number === station.number ? null : station
                )}
              >
                <div className={`w-full h-full rounded-full ${station.color} flex items-center justify-center shadow-lg border-2 border-white ${selectedStation?.number === station.number ? 'ring-4 ring-yellow-400' : ''}`}>
                  <span className="text-sm font-bold">{station.number}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Level Controls */}
          <div className="flex flex-wrap gap-2 justify-center">
            {Object.entries(levelColors).map(([level, colorClass]) => (
              <Button
                key={level}
                variant={visibleLevels.has(level) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleLevel(level)}
                className="flex items-center space-x-2"
              >
                <span>Уровень {level}</span>
                <Badge className={colorClass}>
                  {lymphStations.filter(s => s.level === level).length}
                </Badge>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Station List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleStations.map((station) => (
          <Card
            key={station.number}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedStation?.number === station.number 
                ? 'ring-2 ring-medical-blue shadow-lg' 
                : ''
            }`}
            onClick={() => setSelectedStation(station)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full ${station.color} flex items-center justify-center text-white font-bold text-sm`}>
                    {station.number}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Станция {station.number}</h4>
                    <Badge className={levelColors[station.level as keyof typeof levelColors]}>
                      {station.level}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <h5 className="font-semibold text-medical-blue text-sm mb-2">
                {station.name}
              </h5>
              
              <p className="text-xs text-gray-600 leading-relaxed">
                {station.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Station Details */}
      {selectedStation && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full ${selectedStation.color} flex items-center justify-center text-white font-bold`}>
                {selectedStation.number}
              </div>
              <span>Лимфатическая станция {selectedStation.number}</span>
              <Badge className={levelColors[selectedStation.level as keyof typeof levelColors]}>
                {selectedStation.level}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-medical-blue mb-2">{selectedStation.name}</h4>
              <p className="text-gray-700">{selectedStation.description}</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <h5 className="font-semibold text-medical-blue mb-2">Анатомические ориентиры</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Расположение вдоль основного сосуда</li>
                    <li>• Связь с окружающими структурами</li>
                    <li>• Типичные варианты расположения</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h5 className="font-semibold text-medical-blue mb-2">Хирургическая техника</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Последовательность диссекции</li>
                    <li>• Критические моменты операции</li>
                    <li>• Меры предосторожности</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
