
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CourseOverview } from '@/components/course-overview';
import { ModulesList } from '@/components/modules-list';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';

export default async function CoursePage() {
  const course = await db.course.findUnique({
    where: { id: 'gastric-cancer-surgery' },
    include: {
      modules: {
        orderBy: { order: 'asc' }
      }
    }
  });

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <CourseOverview course={course} />
        <ModulesList modules={course.modules} courseId={course.id} />
      </main>
      <Footer />
    </div>
  );
}
