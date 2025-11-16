
'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, ZoomIn, ZoomOut, Info } from 'lucide-react';
import Image from 'next/image';

const anatomyStructures = [
  {
    id: 'right-gastric-artery',
    name: 'Правая желудочная артерия',
    description: 'Основная артерия, питающая малую кривизну желудка',
    position: { x: 60, y: 40 },
    color: 'bg-red-500'
  },
  {
    id: 'right-gastroepiploic',
    name: 'Правая желудочно-сальниковая артерия',
    description: 'Питает большую кривизну желудка и большой сальник',
    position: { x: 70, y: 65 },
    color: 'bg-blue-500'
  },
  {
    id: 'greater-omentum',
    name: 'Большой сальник',
    description: 'Складка брюшины, покрывающая органы брюшной полости',
    position: { x: 45, y: 70 },
    color: 'bg-green-500'
  },
  {
    id: 'lesser-omentum',
    name: 'Малый сальник',
    description: 'Соединяет малую кривизну желудка с печенью',
    position: { x: 55, y: 30 },
    color: 'bg-purple-500'
  }
];

export function AnatomyVisualization3D() {
  const [selectedStructure, setSelectedStructure] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [visibleStructures, setVisibleStructures] = useState(
    anatomyStructures.map(s => s.id)
  );

  const toggleStructureVisibility = (structureId: string) => {
    setVisibleStructures(prev =>
      prev.includes(structureId)
        ? prev.filter(id => id !== structureId)
        : [...prev, structureId]
    );
  };

  const resetView = () => {
    setZoom(100);
    setRotation(0);
    setSelectedStructure(null);
  };

  return (
    <div className="space-y-6">
      {/* 3D Model Viewer */}
      <Card className="medical-card">
        <CardContent className="p-6">
          <div className="relative aspect-video bg-gradient-to-br from-blue-50 to-white rounded-xl border-2 border-dashed border-blue-200 overflow-hidden">
            <div
              className="relative w-full h-full transition-transform duration-300"
              style={{
                transform: `scale(${zoom / 100}) rotate(${rotation}deg)`
              }}
            >
              <Image
                src="https://static.abacusaicdn.net/images/c2e664d1-5a23-4344-97e0-d5915b3a9ef5.jpg"
                alt="3D анатомическая модель"
                fill
                className="object-contain"
              />
              
              {/* Interactive Structure Markers */}
              {anatomyStructures.map((structure) => (
                visibleStructures.includes(structure.id) && (
                  <button
                    key={structure.id}
                    className="absolute w-8 h-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-125 transition-all duration-200 flex items-center justify-center text-white font-bold text-xs svg-clickable"
                    style={{
                      left: `${structure.position.x}%`,
                      top: `${structure.position.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    onClick={() => setSelectedStructure(
                      selectedStructure === structure.id ? null : structure.id
                    )}
                  >
                    <div className={`w-full h-full rounded-full ${structure.color} flex items-center justify-center shadow-lg border-2 border-white ${selectedStructure === structure.id ? 'ring-2 ring-yellow-400' : ''}`}>
                      <Info className="h-4 w-4" />
                    </div>
                  </button>
                )
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setZoom(Math.max(50, zoom - 25))}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm text-gray-600 min-w-[60px] text-center">
                {zoom}%
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setZoom(Math.min(200, zoom + 25))}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRotation((rotation - 90) % 360)}
              >
                ⟲ Повернуть
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={resetView}
              >
                <RotateCcw className="h-4 w-4" />
                Сбросить
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Structure Controls */}
      <div className="grid md:grid-cols-2 gap-4">
        {anatomyStructures.map((structure) => (
          <Card
            key={structure.id}
            className={`cursor-pointer transition-all ${
              selectedStructure === structure.id 
                ? 'ring-2 ring-medical-blue shadow-lg' 
                : 'hover:shadow-md'
            } ${!visibleStructures.includes(structure.id) ? 'opacity-50' : ''}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${structure.color}`}></div>
                  <h4 className="font-medium text-sm">{structure.name}</h4>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleStructureVisibility(structure.id)}
                  className="text-xs"
                >
                  {visibleStructures.includes(structure.id) ? 'Скрыть' : 'Показать'}
                </Button>
              </div>
              
              <p className="text-xs text-gray-600 mb-3">
                {structure.description}
              </p>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedStructure(structure.id)}
                >
                  <Info className="h-3 w-3 mr-1" />
                  Подробнее
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Structure Details */}
      {selectedStructure && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            {(() => {
              const structure = anatomyStructures.find(s => s.id === selectedStructure);
              return structure ? (
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-6 h-6 rounded-full ${structure.color}`}></div>
                    <h3 className="text-lg font-semibold">{structure.name}</h3>
                  </div>
                  <p className="text-gray-700 mb-4">{structure.description}</p>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-medical-blue mb-2">Хирургические особенности:</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Критически важно для мобилизации желудка</li>
                      <li>• Требует аккуратной диссекции для предотвращения кровотечения</li>
                      <li>• Ключевой ориентир при лапароскопической хирургии</li>
                    </ul>
                  </div>
                </div>
              ) : null;
            })()}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
