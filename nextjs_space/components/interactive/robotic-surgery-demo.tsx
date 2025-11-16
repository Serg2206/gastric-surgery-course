
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, Video, Info } from 'lucide-react';

export function RoboticSurgeryDemo() {
  const [activeView, setActiveView] = useState<'overview' | 'advantages' | 'techniques'>('overview');

  const advantages = [
    {
      title: '3D визуализация высокой четкости',
      description: 'Стереоскопическое изображение с 10-кратным увеличением обеспечивает превосходную визуализацию анатомических структур',
      impact: 'Улучшает точность диссекции и сохранение важных структур'
    },
    {
      title: 'Семь степеней свободы',
      description: 'Инструменты EndoWrist® превосходят возможности человеческого запястья',
      impact: 'Позволяет выполнять сложные манипуляции в труднодоступных областях'
    },
    {
      title: 'Подавление тремора',
      description: 'Система автоматически фильтрует физиологический тремор хирурга',
      impact: 'Повышает точность микрохирургических манипуляций'
    },
    {
      title: 'Масштабирование движений',
      description: 'Движения рук хирурга могут масштабироваться (например, 3:1)',
      impact: 'Обеспечивает максимальную точность в ограниченном пространстве'
    },
    {
      title: 'Эргономичная консоль',
      description: 'Хирург работает сидя в удобном положении',
      impact: 'Снижает усталость при длительных операциях'
    }
  ];

  const techniques = [
    {
      name: 'Роботическая дистальная гастрэктомия',
      duration: '180-240 мин',
      difficulty: 'Средняя',
      advantages: ['Улучшенная визуализация при D2 лимфодиссекции', 'Точное наложение анастомоза'],
      results: 'Онкологические результаты сопоставимы с открытой хирургией при меньшей кровопотере'
    },
    {
      name: 'Роботическая тотальная гастрэктомия',
      duration: '240-300 мин',
      difficulty: 'Высокая',
      advantages: ['Превосходная визуализация в области пищеводного отверстия', 'Прецизионная диссекция вокруг чревного ствола'],
      results: 'Меньше послеоперационных осложнений, сокращение сроков госпитализации'
    },
    {
      name: 'Роботическая D2+ лимфодиссекция',
      duration: '+30-40 мин к основной операции',
      difficulty: 'Высокая',
      advantages: ['Улучшенная визуализация станций 12a, 14v', 'Безопасная диссекция вокруг крупных сосудов'],
      results: 'Больше удаленных лимфоузлов при меньшей кровопотере'
    }
  ];

  const clinicalEvidence = [
    {
      study: 'KLASS-11 (2020)',
      finding: 'Роботическая дистальная гастрэктомия не уступает лапароскопической по онкологическим исходам',
      level: 'Уровень I (РКИ)'
    },
    {
      study: 'Meta-анализ (2021)',
      finding: 'Меньшая кровопотеря (на 50 мл) и больше удаленных лимфоузлов (+2.5) при роботической хирургии',
      level: 'Уровень II'
    },
    {
      study: 'Multi-center study (2022)',
      finding: 'Кривая обучения: 25-30 операций для достижения стабильных результатов',
      level: 'Уровень III'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle>Роботическая хирургия - будущее онкологии</CardTitle>
          <p className="text-sm text-gray-600">
            Система da Vinci представляет собой следующий этап эволюции малоинвазивной хирургии
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Обзор</TabsTrigger>
              <TabsTrigger value="advantages">Преимущества</TabsTrigger>
              <TabsTrigger value="techniques">Техники</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              {/* Video Simulation Area */}
              <div className="relative w-full aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Video className="w-16 h-16 text-blue-400 mx-auto" />
                    <div className="text-white">
                      <p className="text-lg font-semibold">Роботическая гастрэктомия</p>
                      <p className="text-sm text-gray-400">Вид с консоли хирурга</p>
                    </div>
                  </div>
                </div>
                
                {/* Simulated instrument display */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                  <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                    Instrument 1: Monopolar Curved Scissors
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                    Instrument 2: Maryland Bipolar Forceps
                  </Badge>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Точность</h4>
                  <p className="text-sm text-blue-800">
                    Движения масштабируются до микрометров, подавление тремора
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Визуализация</h4>
                  <p className="text-sm text-green-800">
                    3D HD изображение с 10x увеличением
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">Эргономика</h4>
                  <p className="text-sm text-purple-800">
                    Комфортное положение хирурга, меньше усталости
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="advantages" className="space-y-4">
              {advantages.map((adv, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-900">{adv.title}</h4>
                        <p className="text-sm text-gray-600">{adv.description}</p>
                        <div className="bg-green-50 p-3 rounded-lg">
                          <p className="text-sm text-green-800">
                            <span className="font-medium">Клиническое значение:</span> {adv.impact}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="techniques" className="space-y-4">
              {techniques.map((technique, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{technique.name}</CardTitle>
                      <Badge variant={
                        technique.difficulty === 'Высокая' ? 'destructive' :
                        technique.difficulty === 'Средняя' ? 'default' : 'secondary'
                      }>
                        {technique.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>⏱ Продолжительность: {technique.duration}</span>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Преимущества:</h5>
                      <ul className="space-y-1">
                        {technique.advantages.map((adv, i) => (
                          <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-blue-600 mt-0.5">•</span>
                            {adv}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h5 className="font-medium text-blue-900 mb-1">Клинические результаты:</h5>
                      <p className="text-sm text-blue-800">{technique.results}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Clinical Evidence */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="w-5 h-5" />
            Научные доказательства
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {clinicalEvidence.map((evidence, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{evidence.study}</h4>
                  <Badge variant="outline">{evidence.level}</Badge>
                </div>
                <p className="text-sm text-gray-700">{evidence.finding}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cost-Benefit Note */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="pt-6">
          <h4 className="font-semibold text-amber-900 mb-2">Важное замечание</h4>
          <p className="text-sm text-amber-800">
            Несмотря на клинические преимущества, роботическая хирургия значительно дороже традиционной лапароскопии. 
            Стоимость системы da Vinci составляет $1-2.5 млн, а расходные материалы на одну операцию - $1500-3000. 
            Необходим тщательный анализ соотношения затрат и пользы в каждом конкретном учреждении.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
