

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ModuleHeader } from '@/components/module-header';
import { ModuleNavigation } from '@/components/module-navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';

export default async function Module8Page() {
  const module = await db.module.findUnique({
    where: { id: 'module-8' },
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
          {/* Протоколы химиотерапии */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              💊 Протоколы неоадъювантной и адъювантной химиотерапии
            </h2>
            <p className="text-gray-600 mb-8">
              Современные схемы мультимодального лечения рака желудка с доказанной эффективностью.
            </p>

            <div className="space-y-6">
              {/* FLOT Protocol */}
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        Протокол FLOT
                        <Badge className="bg-green-600">Золотой стандарт</Badge>
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        5-FU + Лейковорин + Оксалиплатин + Доцетаксел
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Схема применения</h4>
                    <div className="text-sm text-blue-800 space-y-2">
                      <p><strong>Доцетаксел:</strong> 50 мг/м² в/в в день 1</p>
                      <p><strong>Оксалиплатин:</strong> 85 мг/м² в/в в день 1</p>
                      <p><strong>Лейковорин:</strong> 200 мг/м² в/в в день 1</p>
                      <p><strong>5-FU:</strong> 2600 мг/м² 24-часовая инфузия в день 1</p>
                      <p className="pt-2 border-t border-blue-200"><strong>Цикл:</strong> каждые 2 недели (14 дней)</p>
                      <p><strong>Продолжительность:</strong> 4 цикла до операции + 4 цикла после операции</p>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">Клинические данные (FLOT4-AIO)</h4>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Медиана общей выживаемости: 50 месяцев vs. 35 месяцев (ECF/ECX)</li>
                      <li>• Частота патологического полного ответа (pCR): 16% vs. 6%</li>
                      <li>• R0-резекция: 84% vs. 78%</li>
                      <li>• 5-летняя выживаемость: 45% vs. 36%</li>
                    </ul>
                  </div>

                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-medium text-amber-900 mb-2">⚠️ Управление токсичностью</h4>
                    <ul className="text-sm text-amber-800 space-y-1">
                      <li>• Нейтропения 3-4 степени: 45% (профилактика Г-КСФ при необходимости)</li>
                      <li>• Диарея: лоперамид, при тяжелой - редукция дозы 5-FU</li>
                      <li>• Периферическая нейропатия: редукция/отмена оксалиплатина при 2-3 степени</li>
                      <li>• Стоматит: профилактика льдом, хлоргексидин</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* FOLFOX Protocol */}
              <Card>
                <CardHeader>
                  <CardTitle>Протокол FOLFOX</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    5-FU + Лейковорин + Оксалиплатин (без доцетаксела)
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Схема FOLFOX-4</h4>
                    <div className="text-sm text-blue-800 space-y-2">
                      <p><strong>Оксалиплатин:</strong> 85 мг/м² в/в 2-часовая инфузия, день 1</p>
                      <p><strong>Лейковорин:</strong> 200 мг/м² в/в 2-часовая инфузия, дни 1-2</p>
                      <p><strong>5-FU болюс:</strong> 400 мг/м² в/в болюс, дни 1-2</p>
                      <p><strong>5-FU инфузия:</strong> 600 мг/м² в/в 22-часовая инфузия, дни 1-2</p>
                      <p className="pt-2 border-t border-blue-200"><strong>Цикл:</strong> каждые 2 недели</p>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-2">Показания</h4>
                    <ul className="text-sm text-purple-800 space-y-1">
                      <li>• Адъювантная терапия после R0-резекции</li>
                      <li>• Метастатическая болезнь (паллиативная терапия)</li>
                      <li>• Пациенты, не переносящие доцетаксел</li>
                      <li>• Альтернатива FLOT при локально распространенном раке</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* XELOX Protocol */}
              <Card>
                <CardHeader>
                  <CardTitle>Протокол XELOX (CAPOX)</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    Капецитабин + Оксалиплатин (пероральный режим)
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Схема применения</h4>
                    <div className="text-sm text-blue-800 space-y-2">
                      <p><strong>Оксалиплатин:</strong> 130 мг/м² в/в 2-часовая инфузия, день 1</p>
                      <p><strong>Капецитабин:</strong> 1000 мг/м² перорально 2 раза в день, дни 1-14</p>
                      <p className="pt-2 border-t border-blue-200"><strong>Цикл:</strong> каждые 3 недели (21 день)</p>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">Преимущества</h4>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Пероральный прием (удобство для пациента)</li>
                      <li>• Не требуется центральный венозный катетер</li>
                      <li>• Меньше визитов в клинику</li>
                      <li>• Эквивалентная эффективность FOLFOX в адъювантном режиме</li>
                    </ul>
                  </div>

                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-medium text-amber-900 mb-2">⚠️ Специфические побочные эффекты</h4>
                    <ul className="text-sm text-amber-800 space-y-1">
                      <li>• Ладонно-подошвенный синдром: увлажняющие кремы, при 2-3 ст. - перерыв/редукция</li>
                      <li>• Диарея: более частая, чем при FOLFOX</li>
                      <li>• Требуется контроль функции почек (клиренс креатинина &gt;50 мл/мин)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Таргетная терапия */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              🎯 Таргетная и иммунотерапия
            </h2>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Трастузумаб (Herceptin) при HER2+ раке желудка</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Показания (ToGA trial)</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• HER2+ (IHC 3+ или IHC 2+/FISH+) метастатический рак желудка/ГЭП</li>
                      <li>• В комбинации с химиотерапией (цисплатин + 5-FU или капецитабин)</li>
                      <li>• Медиана OS: 13.8 мес vs. 11.1 мес (только ХТ)</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-2">Дозировка</h4>
                    <p className="text-sm text-purple-800">
                      <strong>Нагрузочная доза:</strong> 8 мг/кг в/в<br/>
                      <strong>Поддерживающая доза:</strong> 6 мг/кг в/в каждые 3 недели
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Иммунотерапия (Пембролизумаб, Ниволумаб)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">Показания</h4>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• PD-L1+ (CPS ≥1) метастатический рак желудка/ГЭП</li>
                      <li>• MSI-high опухоли (особенно эффективны)</li>
                      <li>• Вторая линия терапии после прогрессирования на химиотерапии</li>
                      <li>• Пембролизумаб + химиотерапия в первой линии (KEYNOTE-062, -811)</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Клинические результаты</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Частота ответа: 15-25% в неселектированной популяции</li>
                      <li>• У MSI-high: частота ответа до 50-60%</li>
                      <li>• Длительность ответа: медиана &gt;18 месяцев</li>
                    </ul>
                  </div>

                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <h4 className="font-medium text-amber-900 mb-2">⚠️ Иммуноопосредованные побочные эффекты</h4>
                    <ul className="text-sm text-amber-800 space-y-1">
                      <li>• Колит, пневмонит, гепатит, эндокринопатии</li>
                      <li>• Требуется быстрое распознавание и лечение (кортикостероиды)</li>
                      <li>• Мониторинг функции щитовидной железы, печени, легких</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Мультидисциплинарный подход */}
          <section>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                🏥 Мультидисциплинарный подход: когда направлять на неоадъювантную терапию?
              </h3>
              <div className="bg-white p-4 rounded-lg space-y-3 text-sm">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-medium text-green-900">Абсолютные показания к неоадъювантной терапии:</h4>
                  <ul className="text-gray-700 mt-2 space-y-1">
                    <li>• cT3-4 (инвазия в субсерозу/серозу или соседние органы)</li>
                    <li>• cN+ (клинически позитивные лимфоузлы)</li>
                    <li>• Опухоль кардиоэзофагеального перехода (Siewert II-III)</li>
                  </ul>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium text-blue-900">Первичная хирургия (без неоадъювантной ХТ):</h4>
                  <ul className="text-gray-700 mt-2 space-y-1">
                    <li>• cT1-2N0 (ранний рак без поражения лимфоузлов)</li>
                    <li>• Возможно прямое хирургическое лечение с последующей адъювантной терапией</li>
                  </ul>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-medium text-purple-900">Роль МДК (Мультидисциплинарной комиссии):</h4>
                  <ul className="text-gray-700 mt-2 space-y-1">
                    <li>• Оценка резектабельности (хирург)</li>
                    <li>• Интерпретация стадии (радиолог)</li>
                    <li>• Оценка морфологии и маркеров (патоморфолог)</li>
                    <li>• Выбор протокола и оценка переносимости (онколог)</li>
                    <li>• Координация лечения и сроков (онколог + хирург)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>

        <ModuleNavigation 
          currentModule={module}
          previousModule="module-7"
          nextModule="module-9"
        />
      </main>
      <Footer />
    </div>
  );
}
