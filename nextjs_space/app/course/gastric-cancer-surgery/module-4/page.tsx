
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ModuleHeader } from '@/components/module-header';
import { LymphNodeMap } from '@/components/interactive/lymph-node-map';
import { KeyVessels } from '@/components/interactive/key-vessels';
import { LymphMapping3D } from '@/components/interactive/lymph-mapping-3d';
import { ModuleNavigation } from '@/components/module-navigation';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';

export default async function Module4Page() {
  const module = await db.module.findUnique({
    where: { id: 'module-4' },
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
          {/* Интерактивная карта лимфоузлов */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              🧠 Интерактивная 3D-карта лимфоколлекторов
            </h2>
            <p className="text-gray-600 mb-8">
              Кликабельная схема желудка с лимфатическими станциями (7, 8, 9, 11p, 12a/b, 14v). При клике на станцию отображается подробная информация о ее расположении и значении.
            </p>
            <LymphNodeMap />
          </section>

          {/* Ключевые сосуды */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              📊 Инфографика-памятка: Ключевые сосуды при D2-лимфодиссекции
            </h2>
            <p className="text-gray-600 mb-8">
              Схема с подписями артерий и вен, которые необходимо выделить при выполнении D2-лимфодиссекции.
            </p>
            <KeyVessels />
          </section>

          {/* 3D визуализация лимфосистемы */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              🎨 3D визуализация лимфосистемы
            </h2>
            <p className="text-gray-600 mb-8">
              Трехмерная модель лимфатической системы с возможностью включения/выключения различных групп лимфоузлов.
            </p>
            <LymphMapping3D />
          </section>
        </div>

        <ModuleNavigation 
          currentModule={module}
          previousModule="module-3"
          nextModule={null}
        />
      </main>
      <Footer />
    </div>
  );
}
