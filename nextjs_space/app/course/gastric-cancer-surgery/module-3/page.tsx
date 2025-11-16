
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ModuleHeader } from '@/components/module-header';
import { SurgicalVideo360 } from '@/components/interactive/surgical-video-360';
import { AnatomyVisualization3D } from '@/components/interactive/anatomy-visualization-3d';
import { SurgicalChecklist } from '@/components/interactive/surgical-checklist';
import { ModuleNavigation } from '@/components/module-navigation';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';

export default async function Module3Page() {
  const module = await db.module.findUnique({
    where: { id: 'module-3' },
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
          {/* Хирургическое 360° видео */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              🎥 Хирургическое видео с возможностью переключения углов обзора
            </h2>
            <p className="text-gray-600 mb-8">
              Наблюдайте операцию с разных углов: общий план, лапароскопическая камера, крупный план. Переключайтесь между камерами в реальном времени.
            </p>
            <SurgicalVideo360 />
          </section>

          {/* 3D-анимация анатомии */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              🎨 3D-анимация: Анатомия мобилизации
            </h2>
            <p className="text-gray-600 mb-8">
              Интерактивная 3D-модель, демонстрирующая анатомические структуры и технику мобилизации. Вы можете вращать модель и изучать ключевые элементы.
            </p>
            <AnatomyVisualization3D />
          </section>

          {/* Интерактивный чек-лист */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              📋 Интерактивный чек-лист для операционной
            </h2>
            <p className="text-gray-600 mb-8">
              Полный список этапов операции с возможностью отметки выполненных пунктов. Можно скачать как PDF для использования в операционной.
            </p>
            <SurgicalChecklist />
          </section>
        </div>

        <ModuleNavigation 
          currentModule={module}
          previousModule="module-1"
          nextModule="module-4"
        />
      </main>
      <Footer />
    </div>
  );
}
