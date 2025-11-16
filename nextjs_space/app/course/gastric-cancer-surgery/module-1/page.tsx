
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ModuleHeader } from '@/components/module-header';
import { GeneticLandscape } from '@/components/interactive/genetic-landscape';
import { TCGASubtypes } from '@/components/interactive/tcga-subtypes';
import { HpyloriPathway } from '@/components/interactive/hpylori-pathway';
import { ModuleNavigation } from '@/components/module-navigation';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';

export default async function Module1Page() {
  const module = await db.module.findUnique({
    where: { id: 'module-1' },
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
          {/* Генетический ландшафт */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              🧠 Интерактивная схема: Генетический ландшафт рака желудка
            </h2>
            <p className="text-gray-600 mb-8">
              Кликните на гены, чтобы узнать их функции, частоту мутаций и связь с подтипами рака желудка по классификации TCGA.
            </p>
            <GeneticLandscape />
          </section>

          {/* H. pylori pathway */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              🎥 Анимированное видео: Путь от Helicobacter к раку
            </h2>
            <p className="text-gray-600 mb-8">
              Визуализация процесса развития рака желудка от инфекции H. pylori до формирования опухоли.
            </p>
            <HpyloriPathway />
          </section>

          {/* TCGA Subtypes */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              📊 Инфографика: 4 подтипа рака желудка по TCGA
            </h2>
            <p className="text-gray-600 mb-8">
              Наглядное сравнение молекулярных подтипов с ключевыми маркерами и терапевтическими особенностями.
            </p>
            <TCGASubtypes />
          </section>
        </div>

        <ModuleNavigation 
          currentModule={module}
          previousModule={null}
          nextModule="module-3"
        />
      </main>
      <Footer />
    </div>
  );
}
