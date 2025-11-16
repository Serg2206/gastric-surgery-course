

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ModuleHeader } from '@/components/module-header';
import { ModuleNavigation } from '@/components/module-navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, BookOpen, Award } from 'lucide-react';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';

export default async function Module10Page() {
  const module = await db.module.findUnique({
    where: { id: 'module-10' },
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
          {/* Мультидисциплинарный разбор случаев */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Users className="w-7 h-7 mr-2 text-purple-600" />
              Мультидисциплинарный разбор сложных случаев
            </h2>
            <p className="text-gray-600 mb-8">
              Анализ реальных клинических случаев с участием хирурга, онколога, радиолога и патоморфолога.
            </p>

            <div className="space-y-6">
              {/* Клинический случай 1 */}
              <Card className="border-purple-200">
                <CardHeader className="bg-purple-50">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-purple-900">Клинический случай №1: Локально распространенный рак кардии</CardTitle>
                      <p className="text-sm text-purple-700 mt-1">Пациент 58 лет с опухолью кардиоэзофагеального перехода (Siewert II)</p>
                    </div>
                    <Badge variant="outline" className="bg-purple-100 text-purple-900">Сложный</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Анамнез</h4>
                    <p className="text-sm text-gray-700">
                      Дисфагия 2 степени в течение 3 месяцев, потеря веса 8 кг. Эндоскопически: опухоль кардии 5 см, переходящая на нижнюю треть пищевода. Биопсия: аденокарцинома G2.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Стадирование</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• КТ: опухоль 5×4 см, инвазия в субсерозу, увеличенные перигастральные и малой кривизны лимфоузлы (3 узла &gt;1 см)</li>
                      <li>• ПЭТ-КТ: FDG-avid первичная опухоль (SUV 8.2) и регионарные лимфоузлы, нет отдаленных метастазов</li>
                      <li>• Стадия: cT3N2M0 (стадия IIIA)</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-900 mb-3">💬 Обсуждение на МДК</h4>
                    <div className="space-y-3 text-sm">
                      <div className="border-l-4 border-green-500 pl-3">
                        <p className="font-medium text-green-900">Онколог:</p>
                        <p className="text-gray-700">Рекомендуется неоадъювантная химиотерапия FLOT 4 цикла для downstaging и улучшения резектабельности. После этого - хирургия + 4 цикла адъювантно.</p>
                      </div>
                      <div className="border-l-4 border-purple-500 pl-3">
                        <p className="font-medium text-purple-900">Хирург:</p>
                        <p className="text-gray-700">После неоадъювантной терапии планируется проксимальная гастрэктомия с резекцией нижней трети пищевода + D2 лимфодиссекция. Возможна лапароскопическая техника при хорошем ответе на ХТ.</p>
                      </div>
                      <div className="border-l-4 border-blue-500 pl-3">
                        <p className="font-medium text-blue-900">Радиолог:</p>
                        <p className="text-gray-700">После 2-4 циклов ХТ необходима рестадирующая КТ для оценки ответа и подтверждения резектабельности. Возможно добавление ПЭТ-КТ для метаболической оценки.</p>
                      </div>
                      <div className="border-l-4 border-orange-500 pl-3">
                        <p className="font-medium text-orange-900">Патоморфолог:</p>
                        <p className="text-gray-700">После операции важна оценка степени лечебного патоморфоза (TRG по Mandard/Becker), статус границ резекции и количество пораженных лимфоузлов для прогноза.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">✓ Итоговое решение МДК</h4>
                    <ol className="text-sm text-green-800 space-y-1">
                      <li>1. Неоадъювантная химиотерапия FLOT 4 цикла</li>
                      <li>2. Рестадирование после 2 и 4 циклов (КТ)</li>
                      <li>3. Хирургия через 4-6 недель после завершения ХТ</li>
                      <li>4. Адъювантная ХТ FLOT 4 цикла (начало через 6-8 недель после операции)</li>
                    </ol>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Исход</h4>
                    <p className="text-sm text-gray-700">
                      После 4 циклов FLOT отмечен частичный ответ (уменьшение опухоли до 3 см, регрессия лимфоузлов). Выполнена лапароскопическая проксимальная гастрэктомия с резекцией пищевода + D2 лимфодиссекция. Патоморфологически: умеренная регрессия опухоли (TRG 2), ypT2N1 (2/38 лимфоузлов), R0. Послеоперационный период без осложнений. Завершены 4 адъювантных цикла FLOT. Рецидивов нет через 18 месяцев наблюдения.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Клинический случай 2 */}
              <Card className="border-red-200">
                <CardHeader className="bg-red-50">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-red-900">Клинический случай №2: Раннее выявление рецидива</CardTitle>
                      <p className="text-sm text-red-700 mt-1">Пациентка 62 года после тотальной гастрэктомии 18 месяцев назад</p>
                    </div>
                    <Badge variant="outline" className="bg-red-100 text-red-900">Рецидив</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">История болезни</h4>
                    <p className="text-sm text-gray-700">
                      Тотальная гастрэктомия + D2 лимфодиссекция 18 месяцев назад по поводу аденокарциномы антрального отдела, pT3N2M0, стадия IIIA. Получала адъювантную ХТ XELOX 6 циклов. Плановое наблюдение: легкий дискомфорт в животе, повышение СА 19-9 с 25 до 180 U/ml.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Дообследование</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• КТ: небольшое утолщение брюшины в области культи ДПК, минимальный асцит</li>
                      <li>• ПЭТ-КТ: очаговое накопление FDG в брюшине (SUV 5.8)</li>
                      <li>• Лапароскопия: перитонеальный карциноматоз (P1, ограниченный верхним этажом)</li>
                      <li>• Биопсия асцита: аденокарцинома</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-900 mb-3">💬 Обсуждение на МДК</h4>
                    <div className="space-y-3 text-sm">
                      <div className="border-l-4 border-red-500 pl-3">
                        <p className="font-medium text-red-900">Хирург:</p>
                        <p className="text-gray-700">Радикальная циторедуктивная хирургия не показана при диссеминированном перитонеальном процессе. Возможна циторедукция + HIPEC при ограниченном процессе, но требуется тщательная селекция.</p>
                      </div>
                      <div className="border-l-4 border-purple-500 pl-3">
                        <p className="font-medium text-purple-900">Онколог:</p>
                        <p className="text-gray-700">Системная химиотерапия второй линии. Варианты: рамуцирумаб + паклитаксел (при HER2-негативном) или трастузумаб + химиотерапия (если HER2+). Рассмотреть иммунотерапию при PD-L1+ или MSI-high.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <h4 className="font-medium text-amber-900 mb-2">Дополнительное тестирование</h4>
                    <ul className="text-sm text-amber-800 space-y-1">
                      <li>• HER2 статус: негативный (IHC 1+)</li>
                      <li>• PD-L1 CPS: 8 (позитивный)</li>
                      <li>• MSI: MSS (микросателлитно-стабильный)</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">✓ Итоговое решение МДК</h4>
                    <p className="text-sm text-green-800 mb-2">Паллиативная системная терапия:</p>
                    <ol className="text-sm text-green-800 space-y-1">
                      <li>1. Пембролизумаб 200 мг в/в каждые 3 недели + паклитаксел 80 мг/м² еженедельно</li>
                      <li>2. Оценка ответа каждые 6-9 недель (КТ, опухолевые маркеры)</li>
                      <li>3. Симптоматическая терапия (противорвотные, нутритивная поддержка)</li>
                      <li>4. Контроль качества жизни</li>
                    </ol>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-2">Обучающие моменты</h4>
                    <ul className="text-sm text-purple-800 space-y-1">
                      <li>• Важность регулярного мониторинга онкомаркеров в послеоперационном периоде</li>
                      <li>• Низкий порог для проведения ПЭТ-КТ при подозрении на рецидив</li>
                      <li>• Роль лапароскопии в диагностике перитонеального карциноматоза</li>
                      <li>• Значимость молекулярного тестирования для выбора оптимальной терапии</li>
                      <li>• Мультидисциплинарный подход критичен для паллиативных пациентов</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Симуляционный тренинг */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <BookOpen className="w-7 h-7 mr-2 text-blue-600" />
              Симуляционный тренинг и практические навыки
            </h2>
            <p className="text-gray-600 mb-8">
              Отработка ключевых хирургических навыков в безопасной контролируемой среде.
            </p>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Лапароскопические навыки базового уровня</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Упражнение 1: Координация инструментов</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Перенос объектов между точками</li>
                        <li>• Прицеливание и касание мишеней</li>
                        <li>• Время выполнения: до 90 секунд</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-2">Упражнение 2: Точные манипуляции</h4>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• Размещение колец на штырьках</li>
                        <li>• Развитие мелкой моторики</li>
                        <li>• Время выполнения: до 120 секунд</li>
                      </ul>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-medium text-purple-900 mb-2">Упражнение 3: Резка по контуру</h4>
                      <ul className="text-sm text-purple-800 space-y-1">
                        <li>• Вырезание круга из марли</li>
                        <li>• Точность и аккуратность</li>
                        <li>• Время выполнения: до 180 секунд</li>
                      </ul>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h4 className="font-medium text-orange-900 mb-2">Упражнение 4: Наложение узлов</h4>
                      <ul className="text-sm text-orange-800 space-y-1">
                        <li>• Интракорпоральные узлы</li>
                        <li>• Ключевой навык</li>
                        <li>• Цель: 5 узлов за 300 секунд</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Продвинутые хирургические навыки</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">Тренинг на животных моделях / кадаверах</h4>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">1.</span>
                        <div>
                          <span className="font-medium">Мобилизация желудка</span>
                          <p className="text-gray-600">Практика разделения большого сальника, малого сальника, связок</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">2.</span>
                        <div>
                          <span className="font-medium">Идентификация и лигирование сосудов</span>
                          <p className="text-gray-600">Левая желудочная артерия, правая желудочная, правая желудочно-сальниковая</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">3.</span>
                        <div>
                          <span className="font-medium">Лимфодиссекция</span>
                          <p className="text-gray-600">D1, D1+, D2 лимфодиссекция с правильной идентификацией станций</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">4.</span>
                        <div>
                          <span className="font-medium">Формирование анастомоза</span>
                          <p className="text-gray-600">Ручной и аппаратный эзофагоеюноанастомоз, гастроеюноанастомоз</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-amber-200 bg-amber-50">
                <CardHeader>
                  <CardTitle className="text-amber-900">10 распространенных ошибок при наложении пищеводно-кишечного анастомоза</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-amber-600 min-w-6">1.</span>
                      <div>
                        <span className="font-medium">Недостаточная мобилизация пищевода</span>
                        <p className="text-gray-600">→ Натяжение анастомоза → Несостоятельность</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-amber-600 min-w-6">2.</span>
                      <div>
                        <span className="font-medium">Повреждение кровоснабжения пищевода</span>
                        <p className="text-gray-600">→ Ишемия → Несостоятельность</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-amber-600 min-w-6">3.</span>
                      <div>
                        <span className="font-medium">Слишком длинная приводящая петля</span>
                        <p className="text-gray-600">→ Натяжение/скручивание → Roux-stasis синдром</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-amber-600 min-w-6">4.</span>
                      <div>
                        <span className="font-medium">Несоответствие диаметров</span>
                        <p className="text-gray-600">→ Стеноз или протечка на линии шва</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-amber-600 min-w-6">5.</span>
                      <div>
                        <span className="font-medium">Слабые/редкие швы задней стенки</span>
                        <p className="text-gray-600">→ Несостоятельность наиболее уязвимого места</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-amber-600 min-w-6">6.</span>
                      <div>
                        <span className="font-medium">Сквозной прокол слизистой</span>
                        <p className="text-gray-600">→ Контаминация → Повышенный риск инфекции</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-amber-600 min-w-6">7.</span>
                      <div>
                        <span className="font-medium">Чрезмерное натяжение швов</span>
                        <p className="text-gray-600">→ Ишемия тканей → Несостоятельность</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-amber-600 min-w-6">8.</span>
                      <div>
                        <span className="font-medium">Неадекватная инверсия слизистой</span>
                        <p className="text-gray-600">→ Слизистая внутри анастомоза → Стриктура</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-amber-600 min-w-6">9.</span>
                      <div>
                        <span className="font-medium">Недостаточный гемостаз линии шва</span>
                        <p className="text-gray-600">→ Гематома → Несостоятельность</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-amber-600 min-w-6">10.</span>
                      <div>
                        <span className="font-medium">Отсутствие проверки герметичности</span>
                        <p className="text-gray-600">→ Пропущенные дефекты → Несостоятельность</p>
                      </div>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Сертификация */}
          <section>
            <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-900">
                  <Award className="w-6 h-6" />
                  Завершение курса и сертификация
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-4">Поздравляем с завершением курса!</h4>
                  <p className="text-gray-700 mb-4">
                    Вы успешно прошли комплексный курс по современной хирургии рака желудка, охватывающий:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700 mb-6">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Молекулярные основы и этиологию рака желудка</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Современные методы диагностики и стадирования</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Хирургические техники: открытая, лапароскопическая, роботическая</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Расширенную лимфодиссекцию (D2, D2+)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Методы реконструкции после гастрэктомии</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Эндоскопические органосохраняющие методики (ESD)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Мультимодальное лечение (химиотерапия, таргетная, иммунотерапия)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Управление осложнениями</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Мультидисциплинарный подход и клинические разборы</span>
                    </li>
                  </ul>

                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h5 className="font-medium text-green-900 mb-2">Следующие шаги:</h5>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Регулярное участие в мультидисциплинарных конференциях</li>
                      <li>• Практика на симуляторах для поддержания навыков</li>
                      <li>• Ассистирование и менторство опытных хирургов</li>
                      <li>• Чтение актуальных публикаций и клинических рекомендаций</li>
                      <li>• Участие в профессиональных сообществах (IGCA, JGCA, ESMO)</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-3">Рекомендуемая литература</h4>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li>• Japanese Gastric Cancer Treatment Guidelines (JGCA) - последняя версия</li>
                    <li>• ESMO Clinical Practice Guidelines for gastric cancer</li>
                    <li>• NCCN Guidelines for Gastric Cancer</li>
                    <li>• Strong VE, et al. "Gastric Cancer: Principles and Practice" (учебник)</li>
                    <li>• Gastric Cancer Journal - ведущий профильный журнал</li>
                    <li>• Annals of Surgical Oncology - регулярные обновления</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        <ModuleNavigation 
          currentModule={module}
          previousModule="module-9"
          nextModule={null}
        />
      </main>
      <Footer />
    </div>
  );
}
