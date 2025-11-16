
import Link from 'next/link';
import { Stethoscope, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Stethoscope className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">SSV Наука</span>
            </div>
            <p className="text-gray-400 text-sm">
              Профессиональная медицинская образовательная платформа для хирургов
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Обучение</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <Link href="/course/gastric-cancer-surgery" className="block hover:text-white transition-colors">
                Хирургия рака желудка
              </Link>
              <Link href="/course/gastric-cancer-surgery/module-1" className="block hover:text-white transition-colors">
                Молекулярные основы
              </Link>
              <Link href="/course/gastric-cancer-surgery/module-3" className="block hover:text-white transition-colors">
                Основные операции
              </Link>
              <Link href="/course/gastric-cancer-surgery/module-4" className="block hover:text-white transition-colors">
                Лимфодиссекция
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Платформа</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <Link href="/auth/signin" className="block hover:text-white transition-colors">
                Войти в систему
              </Link>
              <Link href="/auth/signup" className="block hover:text-white transition-colors">
                Регистрация
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Контакты</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@ssvnauka.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+7 (495) 123-45-67</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} SSV Наука. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
