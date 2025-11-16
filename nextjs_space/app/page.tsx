import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { FeaturesSection } from '@/components/features-section';
import { RecommendedMaterials } from '@/components/recommended-materials';
import { Footer } from '@/components/footer';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <RecommendedMaterials />
      </main>
      <Footer />
    </div>
  );
}