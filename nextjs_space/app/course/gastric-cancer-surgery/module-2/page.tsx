

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ModuleHeader } from '@/components/module-header';
import { CTSimulator } from '@/components/interactive/ct-simulator';
import { ImagingComparison } from '@/components/interactive/imaging-comparison';
import { ModuleNavigation } from '@/components/module-navigation';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';

export default async function Module2Page() {
  const module = await db.module.findUnique({
    where: { id: 'module-2' },
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
          {/* КТ-симулятор */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              🤖 Интерактивный симулятор: Найди признаки на КТ
            </h2>
            <p className="text-gray-600 mb-8">
              Отработайте навыки интерпретации КТ-снимков. Найдите опухоль, пораженные лимфоузлы и признаки инвазии.
            </p>
            <CTSimulator />
          </section>

          {/* Сравнение методов визуализации */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              📊 Сравнительная таблица: КТ vs. МРТ vs. ПЭТ-КТ
            </h2>
            <p className="text-gray-600 mb-8">
              Интерактивное сравнение методов диагностической визуализации с клиническими кейсами.
            </p>
            <ImagingComparison />
          </section>

          {/* Клинические рекомендации */}
          <section>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">
                Ключевые принципы стадирования
              </h3>
              <div className="space-y-3 text-blue-800">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-medium mb-2">T-стадия (глубина инвазии)</h4>
                  <ul className="text-sm space-y-1">
                    <li>• T1a: ограничена слизистой оболочкой</li>
                    <li>• T1b: инвазия подслизистого слоя</li>
                    <li>• T2: инвазия мышечного слоя</li>
                    <li>• T3: инвазия субсерозы</li>
                    <li>• T4a: перфорация серозной оболочки</li>
                    <li>• T4b: инвазия соседних органов</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-medium mb-2">N-стадия (лимфоузлы)</h4>
                  <ul className="text-sm space-y-1">
                    <li>• N0: нет метастазов</li>
                    <li>• N1: 1-2 регионарных лимфоузла</li>
                    <li>• N2: 3-6 регионарных лимфоузлов</li>
                    <li>• N3a: 7-15 регионарных лимфоузлов</li>
                    <li>• N3b: ≥16 регионарных лимфоузлов</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-medium mb-2">M-стадия (отдаленные метастазы)</h4>
                  <ul className="text-sm space-y-1">
                    <li>• M0: нет отдаленных метастазов</li>
                    <li>• M1: отдаленные метастазы (печень, легкие, брюшина, отдаленные лимфоузлы)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>

        <ModuleNavigation 
          currentModule={module}
          previousModule="module-1"
          nextModule="module-3"
        />
      </main>
      <Footer />
    </div>
  );
}
