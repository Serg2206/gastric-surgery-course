

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ModuleHeader } from '@/components/module-header';
import { ReconstructionAnimation } from '@/components/interactive/reconstruction-animation';
import { ModuleNavigation } from '@/components/module-navigation';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';

export default async function Module5Page() {
  const module = await db.module.findUnique({
    where: { id: 'module-5' },
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
          {/* Анимация методов реконструкции */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              🎥 Анимационное сравнение: Методы реконструкции
            </h2>
            <p className="text-gray-600 mb-8">
              Сравните различные техники реконструкции после гастрэктомии: Roux-en-Y и интерпозицию тощей кишки.
            </p>
            <ReconstructionAnimation />
          </section>

          {/* Техника формирования анастомоза */}
          <section>
            <div className="bg-purple-50 p-6 rounded-lg space-y-4">
              <h3 className="text-xl font-semibold text-purple-900">
                Техника формирования пищеводно-кишечного анастомоза
              </h3>
              
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Ручной анастомоз (конец в бок)</h4>
                <ol className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-purple-600 w-6">1.</span>
                    <span>Подготовка пищевода: удаление жировой клетчатки, освобождение на 2-3 см</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-purple-600 w-6">2.</span>
                    <span>Наложение держалок на заднюю полуокружность анастомоза</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-purple-600 w-6">3.</span>
                    <span>Формирование задней стенки непрерывным швом (Викрил 3-0)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-purple-600 w-6">4.</span>
                    <span>Вскрытие просвета пищевода и тощей кишки</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-purple-600 w-6">5.</span>
                    <span>Формирование передней стенки непрерывным швом</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-purple-600 w-6">6.</span>
                    <span>Дополнительные серозно-мышечные швы для укрепления</span>
                  </li>
                </ol>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Аппаратный анастомоз (циркулярный степлер)</h4>
                <ol className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-purple-600 w-6">1.</span>
                    <span>Кисетный шов на культе пищевода</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-purple-600 w-6">2.</span>
                    <span>Введение головки степлера (25-28 мм) в просвет пищевода</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-purple-600 w-6">3.</span>
                    <span>Затягивание кисетного шва вокруг центрального стержня</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-purple-600 w-6">4.</span>
                    <span>Введение корпуса степлера через энтеротомию в тощей кишке</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-purple-600 w-6">5.</span>
                    <span>Стыковка и срабатывание степлера</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-purple-600 w-6">6.</span>
                    <span>Ушивание энтеротомии линейным степлером или вручную</span>
                  </li>
                </ol>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h4 className="font-medium text-amber-900 mb-2 flex items-center gap-2">
                  ⚠️ Профилактика несостоятельности анастомоза
                </h4>
                <ul className="text-sm text-amber-800 space-y-1">
                  <li>• Обеспечение адекватного кровоснабжения обоих концов</li>
                  <li>• Отсутствие натяжения анастомоза</li>
                  <li>• Тщательный гемостаз по линии шва</li>
                  <li>• Проверка герметичности (воздушная проба или метиленовый синий)</li>
                  <li>• Назоеюнальный зонд для ранней энтеральной поддержки</li>
                  <li>• Дренаж в область анастомоза</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Качество жизни после реконструкции */}
          <section>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-900 mb-4">
                Качество жизни после различных реконструкций
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Питание</h4>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Roux-en-Y:</span> Частые малые приемы пищи, риск dumping-синдрома<br/>
                    <span className="font-medium">Интерпозиция:</span> Лучшая переносимость обычной пищи
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Нутритивный статус</h4>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Roux-en-Y:</span> Требуется пожизненный прием B12<br/>
                    <span className="font-medium">Интерпозиция:</span> Лучшее всасывание нутриентов
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Рефлюкс-эзофагит</h4>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Roux-en-Y:</span> Минимальный риск (5-10%)<br/>
                    <span className="font-medium">Интерпозиция:</span> Умеренный риск при прямой ДПК
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Вес</h4>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Roux-en-Y:</span> Потеря 15-20% от исходного<br/>
                    <span className="font-medium">Интерпозиция:</span> Потеря 10-15% от исходного
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <ModuleNavigation 
          currentModule={module}
          previousModule="module-4"
          nextModule="module-6"
        />
      </main>
      <Footer />
    </div>
  );
}
