
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Volume2, Maximize, Camera, RotateCcw } from 'lucide-react';
import Image from 'next/image';

const cameras = [
  {
    id: 'wide',
    name: 'Общий план',
    description: 'Панорамный вид операционной',
    active: true
  },
  {
    id: 'laparoscopic',
    name: 'Лапароскопия',
    description: 'Вид изнутри брюшной полости',
    active: false
  },
  {
    id: 'close-up',
    name: 'Крупный план',
    description: 'Детальный вид операционного поля',
    active: false
  }
];

export function SurgicalVideo360() {
  const [activeCamera, setActiveCamera] = useState('wide');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(1800); // 30 минут в секундах

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // В реальном приложении здесь был бы контроль видео
  };

  return (
    <div className="space-y-6">
      <Card className="medical-card overflow-hidden">
        <CardContent className="p-0">
          {/* Video Player Area */}
          <div className="relative aspect-video bg-black">
            <Image
              src="https://static.abacusaicdn.net/images/c6ae2667-1068-43cb-9803-8829c3100a37.jpg"
              alt="Хирургическое видео"
              fill
              className="object-cover"
            />
            
            {/* Video Overlay Controls */}
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <Button
                size="lg"
                className="rounded-full w-16 h-16"
                onClick={togglePlay}
              >
                {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
              </Button>
            </div>

            {/* Camera Selection Overlay */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {cameras.map((camera) => (
                <Button
                  key={camera.id}
                  variant={activeCamera === camera.id ? "default" : "secondary"}
                  size="sm"
                  className="flex items-center space-x-2"
                  onClick={() => setActiveCamera(camera.id)}
                >
                  <Camera className="h-4 w-4" />
                  <span>{camera.name}</span>
                </Button>
              ))}
            </div>

            {/* Current Camera Info */}
            <div className="absolute top-4 right-4">
              <Badge className="bg-black/50 text-white">
                🎥 {cameras.find(c => c.id === activeCamera)?.name}
              </Badge>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
              <div className="flex items-center space-x-3 text-white">
                <Button variant="ghost" size="sm" onClick={togglePlay}>
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                
                <div className="flex-1 space-y-2">
                  <div className="w-full bg-white/20 rounded-full h-1">
                    <div 
                      className="bg-medical-blue h-1 rounded-full transition-all"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Volume2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Maximize className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Camera Details */}
      <div className="grid md:grid-cols-3 gap-4">
        {cameras.map((camera) => (
          <Card
            key={camera.id}
            className={`cursor-pointer transition-all ${
              activeCamera === camera.id 
                ? 'ring-2 ring-medical-blue shadow-lg' 
                : 'hover:shadow-md'
            }`}
            onClick={() => setActiveCamera(camera.id)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center space-x-2">
                <Camera className="h-5 w-5 text-medical-blue" />
                <span>{camera.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{camera.description}</p>
              {activeCamera === camera.id && (
                <Badge variant="medical" className="mt-2">
                  Активная камера
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Operation Phases */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg">Этапы операции</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { time: '0:00-5:00', phase: 'Подготовка и разметка' },
              { time: '5:00-15:00', phase: 'Мобилизация большого сальника' },
              { time: '15:00-25:00', phase: 'Лимфодиссекция' },
              { time: '25:00-30:00', phase: 'Резекция и анастомоз' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div className="flex items-center space-x-3">
                  <Badge variant="outline">{item.time}</Badge>
                  <span className="font-medium">{item.phase}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    // В реальном приложении здесь был бы переход к моменту времени
                  }}
                >
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
