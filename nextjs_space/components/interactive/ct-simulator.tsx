
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import Image from 'next/image';

interface Marker {
  id: string;
  x: number;
  y: number;
  type: 'tumor' | 'lymph-node' | 'invasion';
  label: string;
  found: boolean;
}

export function CTSimulator() {
  const [currentCase, setCurrentCase] = useState(0);
  const [markers, setMarkers] = useState<Marker[]>([
    { id: '1', x: 45, y: 50, type: 'tumor', label: 'Первичная опухоль', found: false },
    { id: '2', x: 35, y: 55, type: 'lymph-node', label: 'Пораженный лимфоузел (станция 7)', found: false },
    { id: '3', x: 60, y: 48, type: 'invasion', label: 'Инвазия в серозную оболочку', found: false },
  ]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showHints, setShowHints] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Check if click is near any marker
    const nearbyMarker = markers.find(
      m => !m.found && Math.abs(m.x - x) < 5 && Math.abs(m.y - y) < 5
    );

    if (nearbyMarker) {
      setMarkers(prev =>
        prev.map(m => (m.id === nearbyMarker.id ? { ...m, found: true } : m))
      );
      setFeedback(`✅ Правильно! Вы нашли: ${nearbyMarker.label}`);
    } else {
      setFeedback('❌ Здесь нет патологии. Попробуйте еще раз.');
    }

    setTimeout(() => setFeedback(null), 3000);
  };

  const allFound = markers.every(m => m.found);
  const foundCount = markers.filter(m => m.found).length;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Интерактивный КТ-симулятор</CardTitle>
        <p className="text-sm text-gray-600">
          Найдите все патологические изменения на КТ-снимке. Кликните на область, которую считаете подозрительной.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              Найдено: {foundCount} / {markers.length}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowHints(!showHints)}
            >
              {showHints ? 'Скрыть подсказки' : 'Показать подсказки'}
            </Button>
          </div>
          {allFound && (
            <Badge className="bg-green-500">
              <CheckCircle2 className="w-4 h-4 mr-1" />
              Все найдено!
            </Badge>
          )}
        </div>

        {/* CT Image with markers */}
        <div className="relative">
          <div
            onClick={handleClick}
            className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden cursor-crosshair border-2 border-gray-300"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900">
                {/* Simulated CT scan visualization */}
                <div className="absolute inset-0 opacity-60">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    {/* Body outline */}
                    <ellipse cx="50" cy="50" rx="35" ry="30" fill="#1a1a1a" stroke="#444" strokeWidth="0.5" />
                    {/* Spine */}
                    <circle cx="50" cy="70" r="3" fill="#555" />
                    {/* Stomach region */}
                    <path d="M 35 45 Q 45 40, 55 45 T 65 50 Q 60 58, 50 58 T 35 50 Z" fill="#2a2a2a" stroke="#666" strokeWidth="0.5" />
                    {/* Tumor (darker area) */}
                    <circle cx="45" cy="50" r="4" fill="#8B0000" opacity="0.7" />
                    {/* Lymph node */}
                    <circle cx="35" cy="55" r="2" fill="#A52A2A" opacity="0.6" />
                    {/* Invasion indicator */}
                    <circle cx="60" cy="48" r="2.5" fill="#DC143C" opacity="0.5" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Markers */}
            {markers.map(marker => (
              <div
                key={marker.id}
                className="absolute w-8 h-8 -ml-4 -mt-4 pointer-events-none"
                style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
              >
                {marker.found ? (
                  <div className="relative">
                    <CheckCircle2 className="w-8 h-8 text-green-400 animate-pulse" />
                    {showHints && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                        {marker.label}
                      </div>
                    )}
                  </div>
                ) : showHints ? (
                  <div className="relative">
                    <AlertCircle className="w-8 h-8 text-yellow-400 animate-bounce" />
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                      Здесь есть патология
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        {/* Feedback */}
        {feedback && (
          <div className={`p-3 rounded-lg ${feedback.includes('✅') ? 'bg-green-50 text-green-800' : 'bg-yellow-50 text-yellow-800'}`}>
            {feedback}
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Что нужно найти:</h4>
          <ul className="space-y-1 text-sm text-blue-800">
            {markers.map(marker => (
              <li key={marker.id} className="flex items-center gap-2">
                {marker.found ? (
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-gray-400" />
                )}
                {marker.label}
              </li>
            ))}
          </ul>
        </div>

        {allFound && (
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">Отличная работа!</h4>
            <p className="text-sm text-green-800">
              Вы успешно идентифицировали все патологические изменения. В реальной практике такая внимательность 
              помогает точно определить стадию заболевания и выбрать оптимальную тактику лечения.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
