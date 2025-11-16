
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface Vessel {
  id: string;
  name: string;
  type: 'Артерия' | 'Вена';
  importance: string;
  diameter: string;
  origin: string;
  course: string;
  branches?: string[];
}

const vessels: Vessel[] = [
  {
    id: 'celiac-trunk',
    name: 'Чревный ствол',
    type: 'Артерия',
    importance: 'Основной ориентир для диссекции',
    diameter: '6-8 мм',
    origin: 'Передняя стенка аорты на уровне Th12',
    course: 'Короткий ствол длиной 1-2 см',
    branches: ['Левая желудочная артерия', 'Селезеночная артерия', 'Общая печеночная артерия']
  },
  {
    id: 'left-gastric',
    name: 'Левая желудочная артерия',
    type: 'Артерия',
    importance: 'Первая ветвь для лигирования',
    diameter: '3-4 мм',
    origin: 'Чревный ствол',
    course: 'Направляется к малой кривизне желудка',
    branches: ['Восходящая ветвь', 'Нисходящая ветвь']
  },
  {
    id: 'splenic-artery',
    name: 'Селезеночная артерия',
    type: 'Артерия',
    importance: 'Граница проксимальной диссекции',
    diameter: '4-6 мм',
    origin: 'Чревный ствол',
    course: 'Извилистый ход вдоль верхнего края поджелудочной железы',
    branches: ['Панкреатические ветви', 'Короткие желудочные артерии']
  },
  {
    id: 'common-hepatic',
    name: 'Общая печеночная артерия',
    type: 'Артерия',
    importance: 'Диссекция группы 8',
    diameter: '4-5 мм',
    origin: 'Чревный ствол',
    course: 'Направляется вправо к воротам печени',
    branches: ['Правая желудочная артерия', 'Желудочно-двенадцатиперстная артерия']
  },
  {
    id: 'portal-vein',
    name: 'Воротная вена',
    type: 'Вена',
    importance: 'Задняя граница диссекции группы 8',
    diameter: '10-12 мм',
    origin: 'Слияние селезеночной и верхней брыжеечной вен',
    course: 'Направляется к воротам печени'
  }
];

export function KeyVessels() {
  const [selectedVessel, setSelectedVessel] = useState<Vessel | null>(null);
  const [vesselFilter, setVesselFilter] = useState<'all' | 'Артерия' | 'Вена'>('all');

  const filteredVessels = vesselFilter === 'all' 
    ? vessels 
    : vessels.filter(vessel => vessel.type === vesselFilter);

  return (
    <div className="space-y-6">
      {/* Main Diagram */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-red-500" />
            <span>Схема ключевых сосудов</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="relative aspect-video rounded-xl overflow-hidden mb-6">
            <Image
              src="https://static.abacusaicdn.net/images/d0ded6f1-3b2f-419e-8cb5-3875fa278fd2.png"
              alt="Ключевые сосуды при лимфодиссекции"
              fill
              className="object-contain"
            />
          </div>
          
          {/* Filter Controls */}
          <div className="flex justify-center space-x-2">
            {(['all', 'Артерия', 'Вена'] as const).map((filter) => (
              <Badge
                key={filter}
                className={`cursor-pointer transition-colors ${
                  vesselFilter === filter 
                    ? 'bg-medical-blue text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setVesselFilter(filter)}
              >
                {filter === 'all' ? 'Все сосуды' : 
                 filter === 'Артерия' ? 'Артерии' : 'Вены'}
                {filter !== 'all' && (
                  <span className="ml-1">
                    ({vessels.filter(v => v.type === filter).length})
                  </span>
                )}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Vessels List */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredVessels.map((vessel) => (
          <Card
            key={vessel.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedVessel?.id === vessel.id 
                ? 'ring-2 ring-medical-blue shadow-lg' 
                : ''
            }`}
            onClick={() => setSelectedVessel(
              selectedVessel?.id === vessel.id ? null : vessel
            )}
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${
                    vessel.type === 'Артерия' ? 'bg-red-500' : 'bg-blue-500'
                  }`}></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{vessel.name}</h4>
                    <Badge 
                      variant="secondary"
                      className={vessel.type === 'Артерия' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}
                    >
                      {vessel.type}
                    </Badge>
                  </div>
                </div>
                <div className="text-right text-xs text-gray-500">
                  ⌀ {vessel.diameter}
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h5 className="text-sm font-semibold text-medical-blue mb-1">
                    Хирургическое значение
                  </h5>
                  <p className="text-sm text-gray-600">{vessel.importance}</p>
                </div>
                
                <div>
                  <h5 className="text-sm font-semibold text-medical-blue mb-1">
                    Анатомия
                  </h5>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div><strong>Происхождение:</strong> {vessel.origin}</div>
                    <div><strong>Ход:</strong> {vessel.course}</div>
                  </div>
                </div>

                {vessel.branches && (
                  <div>
                    <h5 className="text-sm font-semibold text-medical-blue mb-1">
                      Основные ветви
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      {vessel.branches.map((branch, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {branch}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Vessel Details */}
      {selectedVessel && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className={`w-6 h-6 rounded-full ${
                selectedVessel.type === 'Артерия' ? 'bg-red-500' : 'bg-blue-500'
              }`}></div>
              <span>{selectedVessel.name}</span>
              <Badge className={selectedVessel.type === 'Артерия' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}>
                {selectedVessel.type}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-4">
                  <h5 className="font-semibold text-medical-blue mb-3">Техника диссекции</h5>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-center space-x-2">
                      <ArrowRight className="h-4 w-4 text-medical-blue" />
                      <span>Идентификация анатомических ориентиров</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ArrowRight className="h-4 w-4 text-medical-blue" />
                      <span>Мобилизация окружающих тканей</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ArrowRight className="h-4 w-4 text-medical-blue" />
                      <span>Выделение сосуда на протяжении</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ArrowRight className="h-4 w-4 text-medical-blue" />
                      <span>Лимфодиссекция по ходу сосуда</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h5 className="font-semibold text-medical-blue mb-3">Меры предосторожности</h5>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div>• Контроль гемостаза при диссекции</div>
                    <div>• Предотвращение повреждения стенки</div>
                    <div>• Сохранение коллатерального кровотока</div>
                    <div>• Осторожность при работе с ветвями</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
