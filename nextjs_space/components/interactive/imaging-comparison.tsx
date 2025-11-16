
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, Circle } from 'lucide-react';

interface ImagingMethod {
  id: string;
  name: string;
  pros: string[];
  cons: string[];
  bestFor: string[];
}

const imagingMethods: ImagingMethod[] = [
  {
    id: 'ct',
    name: 'Компьютерная томография (КТ)',
    pros: [
      'Быстрое получение изображений',
      'Высокое разрешение для оценки анатомии',
      'Доступность в большинстве клиник',
      'Хорошая визуализация лимфоузлов',
    ],
    cons: [
      'Ионизирующее излучение',
      'Низкий контраст мягких тканей',
      'Требуется контрастное усиление',
    ],
    bestFor: [
      'Первичное стадирование (T, N, M)',
      'Оценка резектабельности',
      'Поиск отдаленных метастазов',
      'Экстренная диагностика осложнений',
    ],
  },
  {
    id: 'mri',
    name: 'Магнитно-резонансная томография (МРТ)',
    pros: [
      'Превосходный контраст мягких тканей',
      'Нет ионизирующего излучения',
      'Лучше визуализирует инвазию в соседние органы',
      'Высокая чувствительность к метастазам в печень',
    ],
    cons: [
      'Длительное время исследования',
      'Ограниченная доступность',
      'Высокая стоимость',
      'Противопоказания (металлические имплантаты)',
    ],
    bestFor: [
      'Оценка глубины инвазии опухоли (T-стадия)',
      'Диагностика метастазов в печени',
      'Дифференциальная диагностика',
      'У пациентов с аллергией на йодсодержащие контрасты',
    ],
  },
  {
    id: 'pet-ct',
    name: 'ПЭТ-КТ с 18F-ФДГ',
    pros: [
      'Функциональная информация о метаболизме',
      'Выявление скрытых отдаленных метастазов',
      'Оценка ответа на химиотерапию',
      'Сочетание анатомической и метаболической информации',
    ],
    cons: [
      'Высокая стоимость',
      'Ограниченная доступность',
      'Низкое пространственное разрешение',
      'Ложноположительные результаты (воспаление)',
    ],
    bestFor: [
      'Поиск скрытых метастазов при М-стадировании',
      'Оценка эффективности неоадъювантной терапии',
      'Рестадирование при рецидиве',
      'Выявление второй первичной опухоли',
    ],
  },
];

interface Task {
  id: string;
  question: string;
  options: { method: string; text: string }[];
  correct: string;
  explanation: string;
}

const tasks: Task[] = [
  {
    id: '1',
    question: 'У пациента подозрение на рак желудка. Какой метод лучше выбрать для первичного стадирования?',
    options: [
      { method: 'ct', text: 'КТ с контрастированием' },
      { method: 'mri', text: 'МРТ брюшной полости' },
      { method: 'pet-ct', text: 'ПЭТ-КТ' },
    ],
    correct: 'ct',
    explanation: 'КТ с контрастированием - золотой стандарт для первичного стадирования, так как быстро оценивает T, N и M стадии с хорошим соотношением информативность/доступность.',
  },
  {
    id: '2',
    question: 'После неоадъювантной химиотерапии нужно оценить ответ опухоли. Какой метод предпочтительнее?',
    options: [
      { method: 'ct', text: 'Контрольная КТ' },
      { method: 'pet-ct', text: 'ПЭТ-КТ' },
      { method: 'mri', text: 'МРТ желудка' },
    ],
    correct: 'pet-ct',
    explanation: 'ПЭТ-КТ позволяет оценить метаболический ответ опухоли на лечение, что дает более точную информацию, чем только анатомические изменения размеров.',
  },
  {
    id: '3',
    question: 'У пациента аллергия на йодсодержащие контрасты. Нужно уточнить глубину инвазии. Что выбрать?',
    options: [
      { method: 'ct', text: 'КТ без контраста' },
      { method: 'mri', text: 'МРТ с гадолинием' },
      { method: 'pet-ct', text: 'ПЭТ-КТ' },
    ],
    correct: 'mri',
    explanation: 'МРТ с гадолиниевым контрастом - отличная альтернатива при аллергии на йод. МРТ превосходно визуализирует глубину инвазии благодаря высокому контрасту мягких тканей.',
  },
];

export function ImagingComparison() {
  const [currentTask, setCurrentTask] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswer = (method: string) => {
    setSelectedAnswer(method);
    setShowExplanation(true);
  };

  const nextTask = () => {
    setCurrentTask((prev) => (prev + 1) % tasks.length);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const task = tasks[currentTask];
  const isCorrect = selectedAnswer === task.correct;

  return (
    <div className="space-y-6">
      {/* Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>Сравнение методов визуализации</CardTitle>
          <p className="text-sm text-gray-600">
            Изучите характеристики каждого метода и выберите подходящий для конкретной клинической ситуации.
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="ct" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="ct">КТ</TabsTrigger>
              <TabsTrigger value="mri">МРТ</TabsTrigger>
              <TabsTrigger value="pet-ct">ПЭТ-КТ</TabsTrigger>
            </TabsList>

            {imagingMethods.map((method) => (
              <TabsContent key={method.id} value={method.id} className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-3">{method.name}</h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        Преимущества
                      </h4>
                      <ul className="space-y-1 text-sm text-green-800">
                        {method.pros.map((pro, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-green-600 mt-0.5">•</span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-red-50 p-4 rounded-lg">
                      <h4 className="font-medium text-red-900 mb-2 flex items-center gap-2">
                        <Circle className="w-4 h-4" />
                        Ограничения
                      </h4>
                      <ul className="space-y-1 text-sm text-red-800">
                        {method.cons.map((con, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-red-600 mt-0.5">•</span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Наилучшее применение:</h4>
                    <ul className="space-y-1 text-sm text-blue-800">
                      {method.bestFor.map((use, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5">•</span>
                          {use}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Interactive Quiz */}
      <Card>
        <CardHeader>
          <CardTitle>Клинический кейс {currentTask + 1} из {tasks.length}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium text-gray-900">{task.question}</p>
          </div>

          <div className="space-y-2">
            {task.options.map((option) => (
              <button
                key={option.method}
                onClick={() => handleAnswer(option.method)}
                disabled={showExplanation}
                className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                  !showExplanation
                    ? 'hover:border-blue-500 hover:bg-blue-50 border-gray-200'
                    : option.method === task.correct
                    ? 'border-green-500 bg-green-50'
                    : option.method === selectedAnswer
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 bg-gray-50'
                } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center gap-3">
                  {showExplanation && (
                    <div>
                      {option.method === task.correct ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : option.method === selectedAnswer ? (
                        <Circle className="w-5 h-5 text-red-600" />
                      ) : null}
                    </div>
                  )}
                  <span className="font-medium">{option.text}</span>
                </div>
              </button>
            ))}
          </div>

          {showExplanation && (
            <div
              className={`p-4 rounded-lg ${
                isCorrect ? 'bg-green-50 text-green-900' : 'bg-yellow-50 text-yellow-900'
              }`}
            >
              <h4 className="font-semibold mb-2">
                {isCorrect ? '✅ Правильно!' : '💡 Пояснение:'}
              </h4>
              <p className="text-sm">{task.explanation}</p>
            </div>
          )}

          {showExplanation && (
            <button
              onClick={nextTask}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Следующий кейс →
            </button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
