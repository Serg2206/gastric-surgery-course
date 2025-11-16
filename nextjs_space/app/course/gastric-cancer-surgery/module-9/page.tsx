

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ModuleHeader } from '@/components/module-header';
import { ModuleNavigation } from '@/components/module-navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle } from 'lucide-react';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';

export default async function Module9Page() {
  const module = await db.module.findUnique({
    where: { id: 'module-9' },
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
          {/* Алгоритмы диагностики осложнений */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              📋 Алгоритмы диагностики и лечения осложнений
            </h2>
            <p className="text-gray-600 mb-8">
              Пошаговые протоколы для раннего выявления и эффективного управления интра- и послеоперационными осложнениями.
            </p>

            <div className="space-y-6">
              {/* Несостоятельность анастомоза */}
              <Card className="border-red-200">
                <CardHeader className="bg-red-50">
                  <CardTitle className="flex items-center gap-2 text-red-900">
                    <AlertCircle className="w-5 h-5" />
                    Несостоятельность анастомоза
                  </CardTitle>
                  <p className="text-sm text-red-700">Частота: 3-10% | Летальность: 20-40%</p>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-medium text-amber-900 mb-2">⚠️ Клинические признаки</h4>
                    <ul className="text-sm text-amber-800 space-y-1">
                      <li>• Лихорадка &gt;38.5°C на 4-7 послеоперационный день</li>
                      <li>• Тахикардия (&gt;100 уд/мин)</li>
                      <li>• Боль в эпигастрии/левом подреберье</li>
                      <li>• Отделяемое по дренажу (гнойное, желчное, кишечное содержимое)</li>
                      <li>• Лейкоцитоз, повышение СРБ/прокальцитонина</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-3">Диагностический алгоритм</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                        <div className="text-sm">
                          <p className="font-medium text-gray-900">Клиническая оценка</p>
                          <p className="text-gray-600">Симптомы + физикальное обследование</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
                        <div className="text-sm">
                          <p className="font-medium text-gray-900">Лабораторные анализы</p>
                          <p className="text-gray-600">ОАК, СРБ, прокальцитонин, анализ отделяемого по дренажу</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
                        <div className="text-sm">
                          <p className="font-medium text-gray-900">КТ брюшной полости с контрастом</p>
                          <p className="text-gray-600">Поиск скоплений жидкости, абсцессов, экстравазации контраста</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">4</div>
                        <div className="text-sm">
                          <p className="font-medium text-gray-900">Эндоскопия</p>
                          <p className="text-gray-600">При сомнениях - визуализация анастомоза, возможность эндоскопической терапии</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-3">Лечебная тактика</h4>
                    <div className="space-y-3 text-sm text-gray-700">
                      <div className="border-l-4 border-green-500 pl-3">
                        <h5 className="font-medium text-green-900">Консервативное лечение (ограниченная несостоятельность)</h5>
                        <ul className="mt-1 space-y-1 text-gray-600">
                          <li>• Голод (NPO), парентеральное/энтеральное питание через еюностому</li>
                          <li>• Широкоспектральные антибиотики</li>
                          <li>• Адекватное дренирование (при наличии дренажа на месте)</li>
                          <li>• Эндоскопическая установка стента или клипирование (если возможно)</li>
                          <li>• Мониторинг: клиника + КТ динамика</li>
                        </ul>
                      </div>

                      <div className="border-l-4 border-orange-500 pl-3">
                        <h5 className="font-medium text-orange-900">Интервенционное лечение</h5>
                        <ul className="mt-1 space-y-1 text-gray-600">
                          <li>• Чрескожное дренирование абсцесса под КТ/УЗИ контролем</li>
                          <li>• Эндоскопическое стентирование области несостоятельности</li>
                          <li>• Эндоскопическое клипирование малых дефектов</li>
                        </ul>
                      </div>

                      <div className="border-l-4 border-red-500 pl-3">
                        <h5 className="font-medium text-red-900">Хирургическое лечение (показания)</h5>
                        <ul className="mt-1 space-y-1 text-gray-600">
                          <li>• Разлитой перитонит</li>
                          <li>• Сепсис, не контролируемый консервативно</li>
                          <li>• Обширная несостоятельность (&gt;1 см)</li>
                          <li>• Неэффективность консервативного лечения 48-72 часа</li>
                        </ul>
                        <p className="mt-2 text-gray-600">
                          <strong>Объем:</strong> лаваж + дренирование ± деконструкция анастомоза с формированием эзофагостомы и еюностомы
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Послеоперационное кровотечение */}
              <Card className="border-red-200">
                <CardHeader className="bg-red-50">
                  <CardTitle className="flex items-center gap-2 text-red-900">
                    <AlertCircle className="w-5 h-5" />
                    Послеоперационное внутрибрюшное кровотечение
                  </CardTitle>
                  <p className="text-sm text-red-700">Частота: 1-5% | Требует экстренной интервенции</p>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-medium text-amber-900 mb-2">⚠️ Клинические признаки</h4>
                    <ul className="text-sm text-amber-800 space-y-1">
                      <li>• Геморрагическое отделяемое по дренажу (&gt;100-200 мл/час)</li>
                      <li>• Гипотония, тахикардия</li>
                      <li>• Снижение гемоглобина &gt;2 г/дл за 24 часа</li>
                      <li>• Увеличение окружности живота, напряжение передней брюшной стенки</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Тактика</h4>
                    <ol className="text-sm text-blue-800 space-y-2">
                      <li className="flex gap-2">
                        <span className="font-bold">1.</span>
                        <span>Реанимационные мероприятия: два в/в доступа, инфузионная терапия, гемотрансфузия</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold">2.</span>
                        <span>КТ-ангиография (если гемодинамика стабильна) для локализации источника</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold">3.</span>
                        <span>Эндоваскулярная эмболизация (если источник локализован на КТ-ангиографии)</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold">4.</span>
                        <span>Экстренная релапаротомия при нестабильной гемодинамике или неэффективности эмболизации</span>
                      </li>
                    </ol>
                  </div>
                </CardContent>
              </Card>

              {/* Панкреатический свищ */}
              <Card className="border-orange-200">
                <CardHeader className="bg-orange-50">
                  <CardTitle className="text-orange-900">Панкреатический свищ после спленэктомии</CardTitle>
                  <p className="text-sm text-orange-700">Частота: 5-20% при D2 лимфодиссекции с удалением селезенки</p>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Диагностика</h4>
                    <p className="text-sm text-blue-800 mb-2">
                      Отделяемое по дренажу &gt;50 мл/день с повышенным содержанием амилазы (&gt;3× верхней границы нормы в сыворотке) после 3-го послеоперационного дня
                    </p>
                    <p className="text-sm text-blue-800">
                      <strong>Классификация ISGPS:</strong> Grade A (биохимический), Grade B (клинически значимый), Grade C (тяжелый, требует интервенции)
                    </p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">Лечение</h4>
                    <ul className="text-sm text-green-800 space-y-2">
                      <li>• <strong>Grade A:</strong> Наблюдение, дренаж удаляется по мере уменьшения отделяемого</li>
                      <li>• <strong>Grade B:</strong> Продленное дренирование, октреотид 100 мкг п/к 3 р/д, парентеральное питание</li>
                      <li>• <strong>Grade C:</strong> Интервенционное дренирование при абсцессе, хирургия при перитоните/сепсисе</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-2">Профилактика</h4>
                    <ul className="text-sm text-purple-800 space-y-1">
                      <li>• Careful handling of pancreatic tail during splenectomy</li>
                      <li>• Использование сшивающих аппаратов или перевязки культи поджелудочной железы</li>
                      <li>• Адекватное дренирование зоны риска</li>
                      <li>• Сохранение селезенки при возможности (спленосохраняющая лимфодиссекция)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Дуоденальный свищ */}
              <Card className="border-yellow-200">
                <CardHeader className="bg-yellow-50">
                  <CardTitle className="text-yellow-900">Несостоятельность культи двенадцатиперстной кишки</CardTitle>
                  <p className="text-sm text-yellow-700">Частота: 1-3% | Серьезное осложнение</p>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-medium text-amber-900 mb-2">Факторы риска</h4>
                    <ul className="text-sm text-amber-800 space-y-1">
                      <li>• Технически сложная диссекция в области головки ПЖ</li>
                      <li>• Объемная опухоль с инвазией в ДПК</li>
                      <li>• Неоадъювантная химиотерапия (нарушение заживления)</li>
                      <li>• Сопутствующий панкреатит</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Лечебная тактика</h4>
                    <ul className="text-sm text-blue-800 space-y-2">
                      <li>• <strong>Ранняя несостоятельность (1-4 день):</strong> Экстренная релапаротомия, реперация культи</li>
                      <li>• <strong>Поздняя несостоятельность (&gt;5 день):</strong> Консервативное лечение предпочтительно - NPO, октреотид, антибиотики, парентеральное питание, адекватное дренирование</li>
                      <li>• Чрескожное дренирование скоплений под КТ/УЗИ контролем</li>
                      <li>• Эндоскопические методы (назодуоденальный зонд для декомпрессии, стентирование при возможности)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Миниинвазивное дренирование */}
          <section>
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Миниинвазивное дренирование внутрибрюшного абсцесса под контролем КТ/УЗИ
              </h3>
              
              <div className="bg-white p-4 rounded-lg mb-4">
                <h4 className="font-medium text-gray-900 mb-3">Показания</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Отграниченное скопление жидкости/абсцесс &gt;3-4 см в диаметре</li>
                  <li>• Клиника сепсиса при локализованной инфекции</li>
                  <li>• Альтернатива хирургическому вмешательству у пациентов с высоким риском</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg mb-4">
                <h4 className="font-medium text-gray-900 mb-3">Техника</h4>
                <ol className="text-sm text-gray-700 space-y-2">
                  <li className="flex gap-2"><span className="font-semibold">1.</span>КТ/УЗИ навигация для выбора оптимальной траектории</li>
                  <li className="flex gap-2"><span className="font-semibold">2.</span>Местная анестезия ± седация</li>
                  <li className="flex gap-2"><span className="font-semibold">3.</span>Пункция иглой под контролем визуализации</li>
                  <li className="flex gap-2"><span className="font-semibold">4.</span>Проводниковая техника (Seldinger) для установки дренажа 10-14 Fr</li>
                  <li className="flex gap-2"><span className="font-semibold">5.</span>Аспирация содержимого + посев на флору</li>
                  <li className="flex gap-2"><span className="font-semibold">6.</span>Фиксация дренажа к коже</li>
                </ol>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">Эффективность</h4>
                <p className="text-sm text-green-800">
                  Успешное разрешение у 70-90% пациентов. Требуется смена дренажа при закупорке, возможна установка множественных дренажей при необходимости.
                </p>
              </div>
            </div>
          </section>

          {/* Профилактика осложнений */}
          <section>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">
                Профилактика интра- и послеоперационных осложнений
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Интраоперационная профилактика</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Тщательный гемостаз (снижает риск гематомы и инфекции)</li>
                    <li>• Проверка герметичности анастомоза (воздушная проба, метиленовый синий)</li>
                    <li>• Адекватное кровоснабжение концов анастомоза</li>
                    <li>• Отсутствие натяжения</li>
                    <li>• Дренаж в область анастомоза</li>
                    <li>• Назоеюнальный зонд для ранней энтеральной поддержки</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Послеоперационная профилактика</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Раннее энтеральное питание (через 24-48 часов)</li>
                    <li>• Тромбопрофилактика (НМГ)</li>
                    <li>• Ранняя мобилизация</li>
                    <li>• Адекватное обезболивание (эпидуральная анальгезия)</li>
                    <li>• Мониторинг дренажей, лабораторных показателей</li>
                    <li>• Антибиотикопрофилактика (1-2 дозы периоперационно)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>

        <ModuleNavigation 
          currentModule={module}
          previousModule="module-8"
          nextModule="module-10"
        />
      </main>
      <Footer />
    </div>
  );
}
