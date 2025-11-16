
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';

interface Mark {
  id: string;
  x: number;
  y: number;
}

export function EndoscopyMarking() {
  const [marks, setMarks] = useState<Mark[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Correct marking area (approximate boundaries for tumor margin)
  const tumorCenter = { x: 50, y: 50 };
  const tumorRadius = 15;
  const safeMargin = 5; // 0.5cm margin converted to %

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isComplete) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newMark: Mark = {
      id: `mark-${Date.now()}`,
      x,
      y,
    };

    const updatedMarks = [...marks, newMark];
    setMarks(updatedMarks);

    // Check if marking is complete (at least 4 marks around the tumor)
    if (updatedMarks.length >= 4) {
      validateMarking(updatedMarks);
    }
  };

  const validateMarking = (currentMarks: Mark[]) => {
    // Check if all marks are at safe margin distance from tumor
    const allValid = currentMarks.every(mark => {
      const distance = Math.sqrt(
        Math.pow(mark.x - tumorCenter.x, 2) + Math.pow(mark.y - tumorCenter.y, 2)
      );
      const expectedDistance = tumorRadius + safeMargin;
      return Math.abs(distance - expectedDistance) < 3; // Allow 3% tolerance
    });

    // Check if marks are distributed around the tumor
    const angles = currentMarks.map(mark =>
      Math.atan2(mark.y - tumorCenter.y, mark.x - tumorCenter.x)
    );
    const anglesSorted = [...angles].sort((a, b) => a - b);
    const wellDistributed = anglesSorted.every((angle, i) => {
      if (i === 0) return true;
      const diff = angle - anglesSorted[i - 1];
      return diff > Math.PI / 6; // At least 30 degrees apart
    });

    if (allValid && wellDistributed) {
      setIsComplete(true);
      setFeedback('✅ Отличная работа! Границы размечены правильно с соблюдением безопасного отступа.');
    } else if (!allValid) {
      setFeedback('⚠️ Некоторые метки расположены слишком близко или далеко от опухоли. Оптимальный отступ - 0.5 см.');
    } else if (!wellDistributed) {
      setFeedback('⚠️ Метки должны равномерно распределяться вокруг опухоли.');
    }
  };

  const handleReset = () => {
    setMarks([]);
    setIsComplete(false);
    setFeedback(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Симулятор разметки границ для ESD</CardTitle>
          <p className="text-sm text-gray-600">
            Нанесите минимум 4 метки вокруг опухоли, соблюдая безопасный отступ 0.5 см от края.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Instructions */}
          <div className="bg-blue-50 p-4 rounded-lg space-y-2">
            <h4 className="font-medium text-blue-900 flex items-center gap-2">
              <Info className="w-4 h-4" />
              Инструкция:
            </h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Кликайте на изображение, чтобы поставить метки</li>
              <li>• Метки должны быть на расстоянии 0.5 см от края опухоли</li>
              <li>• Разместите минимум 4 метки равномерно по окружности</li>
              <li>• После завершения система оценит правильность разметки</li>
            </ul>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between">
            <Badge variant="outline">
              Меток поставлено: {marks.length} / 4+
            </Badge>
            <Button onClick={handleReset} variant="outline" size="sm">
              Начать заново
            </Button>
          </div>

          {/* Endoscopy Image with marking */}
          <div
            onClick={handleImageClick}
            className={`relative w-full aspect-video bg-gradient-radial from-pink-200 via-red-300 to-red-400 rounded-lg overflow-hidden ${
              isComplete ? 'cursor-default' : 'cursor-crosshair'
            } border-2 border-gray-300`}
          >
            {/* Simulated endoscopic view */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Gastric mucosa texture */}
                <circle cx="50" cy="50" r="45" fill="url(#mucosaGradient)" />
                
                {/* Tumor (darker, irregular area) */}
                <ellipse
                  cx="50"
                  cy="50"
                  rx="15"
                  ry="13"
                  fill="#8B0000"
                  opacity="0.7"
                />
                <circle cx="52" cy="48" r="10" fill="#660000" opacity="0.5" />
                
                {/* Blood vessels */}
                <path d="M 20 30 Q 40 35, 60 30" stroke="#C41E3A" strokeWidth="0.5" fill="none" opacity="0.6" />
                <path d="M 25 70 Q 50 65, 75 70" stroke="#C41E3A" strokeWidth="0.5" fill="none" opacity="0.6" />

                {/* Gradient definition */}
                <defs>
                  <radialGradient id="mucosaGradient">
                    <stop offset="0%" stopColor="#FFB6C1" />
                    <stop offset="50%" stopColor="#FF69B4" />
                    <stop offset="100%" stopColor="#DC143C" />
                  </radialGradient>
                </defs>
              </svg>

              {/* Correct margin guide (shown faintly) */}
              {!isComplete && (
                <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
                  <ellipse
                    cx="50"
                    cy="50"
                    rx={tumorRadius + safeMargin}
                    ry={tumorRadius + safeMargin - 2}
                    fill="none"
                    stroke="yellow"
                    strokeWidth="1"
                    strokeDasharray="2,2"
                  />
                </svg>
              )}
            </div>

            {/* Marking points */}
            {marks.map(mark => (
              <div
                key={mark.id}
                className="absolute w-3 h-3 -ml-1.5 -mt-1.5 pointer-events-none"
                style={{ left: `${mark.x}%`, top: `${mark.y}%` }}
              >
                <div className="relative">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full border-2 border-white shadow-lg" />
                  {/* Connection to next mark */}
                  {marks.length > 1 && mark.id !== marks[marks.length - 1].id && (
                    <div className="absolute top-1/2 left-1/2 w-1 h-1" />
                  )}
                </div>
              </div>
            ))}

            {/* Connecting lines between marks */}
            {marks.length > 1 && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                {marks.map((mark, index) => {
                  if (index === marks.length - 1 && marks.length >= 4) {
                    // Connect last mark to first
                    return (
                      <line
                        key={`line-${mark.id}`}
                        x1={mark.x}
                        y1={mark.y}
                        x2={marks[0].x}
                        y2={marks[0].y}
                        stroke="yellow"
                        strokeWidth="0.3"
                        opacity="0.6"
                      />
                    );
                  } else if (index < marks.length - 1) {
                    return (
                      <line
                        key={`line-${mark.id}`}
                        x1={mark.x}
                        y1={mark.y}
                        x2={marks[index + 1].x}
                        y2={marks[index + 1].y}
                        stroke="yellow"
                        strokeWidth="0.3"
                        opacity="0.6"
                      />
                    );
                  }
                  return null;
                })}
              </svg>
            )}

            {/* Completion overlay */}
            {isComplete && (
              <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                <div className="bg-white rounded-lg p-4 shadow-lg">
                  <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
                </div>
              </div>
            )}
          </div>

          {/* Feedback */}
          {feedback && (
            <div
              className={`p-4 rounded-lg ${
                isComplete
                  ? 'bg-green-50 text-green-800'
                  : 'bg-yellow-50 text-yellow-800'
              }`}
            >
              <p className="text-sm font-medium">{feedback}</p>
            </div>
          )}

          {/* Additional info */}
          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="pt-4">
              <h4 className="font-semibold text-purple-900 mb-2">Клинические рекомендации:</h4>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Отступ от видимого края опухоли: минимум 0.5 см для интрамукозного рака</li>
                <li>• При подслизистой инвазии: 1 см отступ</li>
                <li>• Метки наносятся электрокоагулятором на расстоянии 0.5-1 см друг от друга</li>
                <li>• После разметки вводится раствор для создания подушки в подслизистом слое</li>
              </ul>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
