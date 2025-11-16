

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ModuleHeader } from '@/components/module-header';
import { EndoscopyMarking } from '@/components/interactive/endoscopy-marking';
import { ModuleNavigation } from '@/components/module-navigation';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';

export default async function Module7Page() {
  const module = await db.module.findUnique({
    where: { id: 'module-7' },
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
          {/* ESD симулятор */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              🔍 Симулятор разметки: Эндоскопическая диссекция в подслизистом слое (ESD)
            </h2>
            <p className="text-gray-600 mb-8">
              Отработайте навыки правильной разметки границ опухоли перед выполнением ESD.
            </p>
            <EndoscopyMarking />
          </section>

          {/* Техника ESD */}
          <section>
            <div className="bg-indigo-50 p-6 rounded-lg space-y-4">
              <h3 className="text-xl font-semibold text-indigo-900">
                Техника эндоскопической подслизистой диссекции (ESD)
              </h3>
              
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Пошаговый протокол ESD</h4>
                <ol className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center font-semibold text-indigo-900">1</span>
                    <div>
                      <span className="font-medium">Разметка границ</span>
                      <p className="text-gray-600 mt-1">Метки наносятся электрокоагулятором на расстоянии 0.5-1 см от видимого края поражения (для интрамукозного рака 0.5 см, для подслизистой инвазии 1 см).</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center font-semibold text-indigo-900">2</span>
                    <div>
                      <span className="font-medium">Инъекция раствора</span>
                      <p className="text-gray-600 mt-1">Введение гиалуроновой кислоты, глицерола или физиологического раствора с добавлением индигокармина и адреналина для создания подушки в подслизистом слое.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center font-semibold text-indigo-900">3</span>
                    <div>
                      <span className="font-medium">Циркулярный надрез</span>
                      <p className="text-gray-600 mt-1">Разрез слизистой оболочки по наружной стороне меток с использованием IT-knife, Dual knife или Hook knife.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center font-semibold text-indigo-900">4</span>
                    <div>
                      <span className="font-medium">Подслизистая диссекция</span>
                      <p className="text-gray-600 mt-1">Последовательная диссекция подслизистого слоя от дистального к проксимальному краю. Постоянная реинъекция раствора для поддержания подушки.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center font-semibold text-indigo-900">5</span>
                    <div>
                      <span className="font-medium">Гемостаз</span>
                      <p className="text-gray-600 mt-1">Коагуляция всех видимых сосудов с помощью Coagrasper или горячих биопсийных щипцов.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center font-semibold text-indigo-900">6</span>
                    <div>
                      <span className="font-medium">Оценка препарата</span>
                      <p className="text-gray-600 mt-1">Препарат растягивается на пробковой доске и фиксируется для гистологического исследования. Оцениваются размеры, глубина инвазии, латеральные и вертикальные границы.</p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Показания к ESD при раннем раке желудка</h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="border-l-4 border-green-500 pl-4 py-2">
                    <h5 className="font-medium text-green-900">Абсолютные показания:</h5>
                    <ul className="mt-1 space-y-1">
                      <li>• Интрамукозный (cT1a) дифференцированный рак без язвы любого размера</li>
                      <li>• Интрамукозный дифференцированный рак с язвой ≤3 см</li>
                      <li>• Интрамукозный недифференцированный рак без язвы ≤2 см</li>
                    </ul>
                  </div>
                  <div className="border-l-4 border-amber-500 pl-4 py-2">
                    <h5 className="font-medium text-amber-900">Расширенные показания (требуют опыта):</h5>
                    <ul className="mt-1 space-y-1">
                      <li>• Интрамукозный дифференцированный рак с язвой &gt;3 см</li>
                      <li>• Подслизистая инвазия (&lt;500 мкм, SM1&rpar; дифференцированный рак ≤3 см</li>
                    </ul>
                  </div>
                  <div className="border-l-4 border-red-500 pl-4 py-2">
                    <h5 className="font-medium text-red-900">Противопоказания:</h5>
                    <ul className="mt-1 space-y-1">
                      <li>• Недифференцированный рак с подслизистой инвазией</li>
                      <li>• Лимфоваскулярная инвазия</li>
                      <li>• Нескорректированная коагулопатия</li>
                      <li>• Тяжелое общее состояние пациента</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="font-medium text-red-900 mb-2">⚠️ Осложнения ESD и их управление</h4>
                <div className="space-y-3 text-sm text-red-800">
                  <div>
                    <h5 className="font-medium">Интраоперационное кровотечение (5-15%)</h5>
                    <p className="text-gray-700 mt-1">Управление: немедленная коагуляция Coagrasper, гемостатические клипсы при артериальном кровотечении. При массивном кровотечении - прерывание процедуры.</p>
                  </div>
                  <div>
                    <h5 className="font-medium">Перфорация (1-5%)</h5>
                    <p className="text-gray-700 mt-1">Управление: при малой перфорации (&lt;1 см) - эндоскопическое клипирование. При большой или не поддающейся клипированию - экстренная лапароскопия/лапаротомия.</p>
                  </div>
                  <div>
                    <h5 className="font-medium">Отсроченное кровотечение (3-7%)</h5>
                    <p className="text-gray-700 mt-1">Профилактика: тщательная коагуляция всех видимых сосудов, ИПП в высоких дозах первые 48 часов. При кровотечении - экстренная эндоскопия.</p>
                  </div>
                  <div>
                    <h5 className="font-medium">Стеноз (1-3%, чаще при циркулярных резекциях)</h5>
                    <p className="text-gray-700 mt-1">Профилактика: избегать циркулярных резекций &gt;3/4 окружности. Лечение: эндоскопическая баллонная дилатация, в тяжелых случаях - стентирование.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Критерии curativ резекции */}
          <section>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-900 mb-4">
                Критерии куративной резекции (R0)
              </h3>
              <div className="bg-white p-4 rounded-lg space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <div>
                    <span className="font-medium">Резекция en bloc</span>
                    <p className="text-gray-600">Опухоль удалена единым блоком без фрагментации</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <div>
                    <span className="font-medium">Латеральные границы негативны</span>
                    <p className="text-gray-600">Горизонтальные края резекции не содержат опухолевых клеток</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <div>
                    <span className="font-medium">Вертикальная граница негативна</span>
                    <p className="text-gray-600">Подслизистый край резекции свободен от опухоли</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <div>
                    <span className="font-medium">Отсутствие лимфоваскулярной инвазии</span>
                    <p className="text-gray-600">Нет признаков поражения лимфатических или кровеносных сосудов</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <div>
                    <span className="font-medium">Соответствие показаниям</span>
                    <p className="text-gray-600">Гистологические характеристики соответствуют предоперационным критериям</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <span className="font-medium">Важно:</span> При несоответствии критериям куративности (non-curative resection) показана дополнительная хирургическая гастрэктомия с лимфодиссекцией, так как риск метастазов в лимфоузлы составляет 15-20%.
                </p>
              </div>
            </div>
          </section>
        </div>

        <ModuleNavigation 
          currentModule={module}
          previousModule="module-6"
          nextModule="module-8"
        />
      </main>
      <Footer />
    </div>
  );
}
