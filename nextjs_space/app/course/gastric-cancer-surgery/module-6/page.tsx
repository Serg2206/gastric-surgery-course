

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ModuleHeader } from '@/components/module-header';
import { RoboticSurgeryDemo } from '@/components/interactive/robotic-surgery-demo';
import { ModuleNavigation } from '@/components/module-navigation';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';

export default async function Module6Page() {
  const module = await db.module.findUnique({
    where: { id: 'module-6' },
    include: {
      course: true
    }
  });

  if (!module) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pb-16">
        <ModuleHeader module={module} />
        
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Роботическая хирургия */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              🤖 Роботическая гастрэктомия - будущее хирургии (da Vinci)
            </h2>
            <p className="text-gray-600 mb-8">
              Изучите преимущества роботической системы da Vinci в хирургии рака желудка с видео-демонстрациями и научными данными.
            </p>
            <RoboticSurgeryDemo />
          </section>

          {/* Лапароскопическая техника */}
          <section>
            <div className="bg-blue-50 p-6 rounded-lg space-y-4">
              <h3 className="text-xl font-semibold text-blue-900">
                Лапароскопическая лимфодиссекция - мастер-класс
              </h3>
              
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Особенности лапароскопической техники</h4>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h5 className="font-medium text-blue-900 mb-1">Triangulation (триангуляция)</h5>
                    <p>Оптимальное расположение троакаров: рабочие инструменты под углом 60-90° друг к другу, камера между ними. Обеспечивает эргономичную работу и предотвращает столкновение инструментов.</p>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <h5 className="font-medium text-green-900 mb-1">Ультразвуковой скальпель (Harmonic)</h5>
                    <p>Одновременная коагуляция и разрез тканей при температуре 50-100°C. Минимизирует термическое повреждение окружающих тканей (зона повреждения 0-2 мм vs. 5-10 мм у электрокоагуляции).</p>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-4">
                    <h5 className="font-medium text-purple-900 mb-1">Тракция и контртракция</h5>
                    <p>Правильная тракция тканей создает оптимальную плоскость диссекции. Помощник должен обеспечивать стабильную экспозицию операционного поля.</p>
                  </div>

                  <div className="border-l-4 border-amber-500 pl-4">
                    <h5 className="font-medium text-amber-900 mb-1">Пневмоперитонеум</h5>
                    <p>Давление 12-14 мм рт.ст. Более низкое давление снижает послеоперационную боль, но ухудшает экспозицию. У пациентов с ХОБЛ рассмотреть 10 мм рт.ст.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Расположение троакаров для дистальной резекции</h4>
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-full h-full p-8" viewBox="0 0 200 150">
                    {/* Body outline */}
                    <ellipse cx="100" cy="75" rx="60" ry="50" fill="none" stroke="#666" strokeWidth="1" />
                    {/* Umbilicus */}
                    <circle cx="100" cy="75" r="3" fill="#888" />
                    <text x="105" y="78" fontSize="8" fill="#666">Пупок</text>
                    
                    {/* Trocar positions */}
                    {/* Camera */}
                    <circle cx="100" cy="60" r="5" fill="#2196F3" />
                    <text x="85" y="55" fontSize="8" fill="#2196F3">Камера 10мм</text>
                    
                    {/* Left hand */}
                    <circle cx="70" cy="70" r="4" fill="#4CAF50" />
                    <text x="45" y="68" fontSize="7" fill="#4CAF50">Левая рука 5мм</text>
                    
                    {/* Right hand */}
                    <circle cx="130" cy="70" r="4" fill="#4CAF50" />
                    <text x="135" y="68" fontSize="7" fill="#4CAF50">Правая рука 12мм</text>
                    
                    {/* Assistant left */}
                    <circle cx="60" cy="85" r="3" fill="#FF9800" />
                    <text x="35" y="90" fontSize="7" fill="#FF9800">Ассистент 5мм</text>
                    
                    {/* Assistant right */}
                    <circle cx="140" cy="85" r="3" fill="#FF9800" />
                    <text x="143" y="90" fontSize="7" fill="#FF9800">Ассистент 5мм</text>
                  </svg>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Камера: надпупочная позиция, 10-12 мм</li>
                  <li>• Правая рука хирурга: правая верхняя квадрант, 12 мм (для степлера)</li>
                  <li>• Левая рука хирурга: левая верхняя квадрант, 5 мм</li>
                  <li>• Ассистент: латерально с обеих сторон, 5 мм</li>
                  <li>• Дополнительный троакар для ретракции печени может потребоваться</li>
                </ul>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h4 className="font-medium text-amber-900 mb-2">⚠️ Осложнения, специфичные для лапароскопии</h4>
                <ul className="text-sm text-amber-800 space-y-1">
                  <li>• Повреждение при введении троакаров (кишка, сосуды)</li>
                  <li>• CO2 эмболия (редко, но потенциально фатально)</li>
                  <li>• Плохая визуализация при кровотечении</li>
                  <li>• Термическое повреждение вне поля зрения</li>
                  <li>• Конверсия: готовность к открытой операции при необходимости</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Кривая обучения */}
          <section>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-900 mb-4">
                Кривая обучения и тренинг
              </h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Этапы обучения</h4>
                  <ol className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="font-semibold text-purple-600 w-24">Этап 1:</span>
                      <span>Базовые лапароскопические навыки на симуляторе (20-30 часов)</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-semibold text-purple-600 w-24">Этап 2:</span>
                      <span>Ассистирование опытным хирургам (20-30 операций)</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-semibold text-purple-600 w-24">Этап 3:</span>
                      <span>Простые случаи под супервизией (первые 10-15 операций)</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-semibold text-purple-600 w-24">Этап 4:</span>
                      <span>Независимая работа с постепенным увеличением сложности</span>
                    </li>
                  </ol>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Числовые показатели</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Достижение стабильного времени операции: после 30-40 процедур</li>
                    <li>• Частота осложнений снижается до базового уровня: после 50-60 операций</li>
                    <li>• Частота конверсий стабилизируется: после 40 случаев</li>
                    <li>• Количество удаленных лимфоузлов достигает стандарта: после 30 операций</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>

        <ModuleNavigation 
          currentModule={module}
          previousModule="module-5"
          nextModule="module-7"
        />
      </main>
      <Footer />
    </div>
  );
}
