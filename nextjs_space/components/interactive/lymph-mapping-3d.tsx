
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, Eye, EyeOff, Layers } from 'lucide-react';
import Image from 'next/image';

const lymphGroups = [
  {
    id: 'perigastric',
    name: 'Перигастральные (1-6)',
    stations: ['1', '2', '3', '4sa', '4sb', '4d', '5', '6'],
    color: 'bg-blue-500',
    description: 'Лимфоузлы непосредственно прилежащие к желудку'
  },
  {
    id: 'celiac',
    name: 'Чревные (7-9)',
    stations: ['7', '8a', '8p', '9'],
    color: 'bg-red-500',
    description: 'Лимфоузлы в области чревного ствола'
  },
  {
    id: 'splenic-hepatic',
    name: 'Селезеночные/Печеночные (10-12)',
    stations: ['10', '11p', '11d', '12a', '12b', '12p'],
    color: 'bg-green-500',
    description: 'Лимфоузлы селезеночной и печеночной зон'
  },
  {
    id: 'retropancreatic',
    name: 'Ретропанкреатические (13-16)',
    stations: ['13', '14a', '14v', '15', '16a1', '16b1'],
    color: 'bg-purple-500',
    description: 'Лимфоузлы позади поджелудочной железы'
  }
];

export function LymphMapping3D() {
  const [visibleGroups, setVisibleGroups] = useState<Set<string>>(
    new Set(lymphGroups.map(g => g.id))
  );
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [viewMode, setViewMode] = useState<'3d' | 'layers'>('3d');

  const toggleGroupVisibility = (groupId: string) => {
    const newVisible = new Set(visibleGroups);
    if (newVisible.has(groupId)) {
      newVisible.delete(groupId);
    } else {
      newVisible.add(groupId);
    }
    setVisibleGroups(newVisible);
  };

  const showAllGroups = () => {
    setVisibleGroups(new Set(lymphGroups.map(g => g.id)));
  };

  const hideAllGroups = () => {
    setVisibleGroups(new Set());
  };

  const resetView = () => {
    setRotation(0);
    setSelectedGroup(null);
    setViewMode('3d');
  };

  return (
    <div className="space-y-6">
      {/* 3D Viewer */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Layers className="h-6 w-6 text-medical-blue" />
            <span>3D визуализация лимфатической системы</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="relative aspect-video bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border-2 border-dashed border-blue-200 overflow-hidden">
            <div
              className="relative w-full h-full transition-transform duration-500"
              style={{
                transform: `rotateY(${rotation}deg)`,
                transformStyle: 'preserve-3d'
              }}
            >
              <Image
                src="https://static.abacusaicdn.net/images/b77c1975-4142-4576-bb7c-3865068d594f.jpg"
                alt="3D визуализация лимфатической системы"
                fill
                className="object-contain"
              />
              
              {/* Virtual lymph node groups overlay */}
              {lymphGroups.map((group, index) => (
                visibleGroups.has(group.id) && (
                  <div
                    key={group.id}
                    className="absolute animate-pulse"
                    style={{
                      left: `${20 + index * 20}%`,
                      top: `${30 + (index % 2) * 30}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <div 
                      className={`w-6 h-6 rounded-full ${group.color} opacity-80 shadow-lg cursor-pointer transform hover:scale-125 transition-all`}
                      onClick={() => setSelectedGroup(
                        selectedGroup === group.id ? null : group.id
                      )}
                    />
                    {selectedGroup === group.id && (
                      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-2 z-10 min-w-[150px]">
                        <div className="text-xs font-semibold">{group.name}</div>
                        <div className="text-xs text-gray-600 mt-1">
                          {group.stations.slice(0, 3).join(', ')}...
                        </div>
                      </div>
                    )}
                  </div>
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
                onClick={() => setRotation(rotation - 45)}
              >
                ⟲ Поворот влево
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRotation(rotation + 45)}
              >
                Поворот вправо ⟳
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={resetView}
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                Сбросить
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === '3d' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('3d')}
              >
                3D вид
              </Button>
              <Button
                variant={viewMode === 'layers' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('layers')}
              >
                <Layers className="h-4 w-4 mr-1" />
                Слои
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={showAllGroups}
              >
                <Eye className="h-4 w-4 mr-1" />
                Показать все
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={hideAllGroups}
              >
                <EyeOff className="h-4 w-4 mr-1" />
                Скрыть все
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Group Controls */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {lymphGroups.map((group) => (
          <Card
            key={group.id}
            className={`cursor-pointer transition-all ${
              selectedGroup === group.id 
                ? 'ring-2 ring-medical-blue shadow-lg' 
                : 'hover:shadow-md'
            } ${!visibleGroups.has(group.id) ? 'opacity-50' : ''}`}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className={`w-4 h-4 rounded-full ${group.color}`}></div>
                  <Badge variant="secondary" className="text-xs">
                    {group.stations.length} станций
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleGroupVisibility(group.id)}
                  className="text-xs p-1"
                >
                  {visibleGroups.has(group.id) ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                </Button>
              </div>
              
              <h4 className="font-medium text-sm mb-2" onClick={() => setSelectedGroup(group.id)}>
                {group.name}
              </h4>
              
              <p className="text-xs text-gray-600 mb-3">
                {group.description}
              </p>
              
              <div className="flex flex-wrap gap-1">
                {group.stations.slice(0, 4).map((station) => (
                  <Badge key={station} variant="outline" className="text-xs">
                    {station}
                  </Badge>
                ))}
                {group.stations.length > 4 && (
                  <Badge variant="outline" className="text-xs">
                    +{group.stations.length - 4}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Group Details */}
      {selectedGroup && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            {(() => {
              const group = lymphGroups.find(g => g.id === selectedGroup);
              return group ? (
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-6 h-6 rounded-full ${group.color}`}></div>
                    <h3 className="text-lg font-semibold">{group.name}</h3>
                    <Badge variant="secondary">{group.stations.length} станций</Badge>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-medical-blue mb-3">Включенные станции</h4>
                      <div className="grid grid-cols-4 gap-2">
                        {group.stations.map((station) => (
                          <Badge key={station} variant="outline" className="justify-center">
                            {station}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-medical-blue mb-3">Анатомическая область</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {group.description}
                      </p>
                      <div className="mt-3">
                        <Badge className="bg-green-100 text-green-800">
                          D2-лимфодиссекция
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null;
            })()}
          </CardContent>
        </Card>
      )}

      {/* Layer View */}
      {viewMode === 'layers' && (
        <Card className="bg-gray-50">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Послойное отображение</h3>
            <div className="space-y-4">
              {lymphGroups.map((group, index) => (
                <div key={group.id} className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-gray-400">
                    {index + 1}
                  </div>
                  <div className={`w-4 h-4 rounded-full ${group.color}`}></div>
                  <div className="flex-grow">
                    <h4 className="font-medium">{group.name}</h4>
                    <p className="text-sm text-gray-600">{group.description}</p>
                  </div>
                  <Button
                    variant={visibleGroups.has(group.id) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => toggleGroupVisibility(group.id)}
                  >
                    {visibleGroups.has(group.id) ? 'Скрыть' : 'Показать'}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
