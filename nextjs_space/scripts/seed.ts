
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  // Create test admin user
  const hashedPassword = await bcrypt.hash('johndoe123', 12);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      email: 'john@doe.com',
      password: hashedPassword,
      name: 'Тестовый Администратор',
      fullName: 'Тестовый Администратор',
      specialization: 'Хирург-онколог',
    },
  });

  console.log('Admin user created:', adminUser.email);

  // Create main course
  const course = await prisma.course.upsert({
    where: { id: 'gastric-cancer-surgery' },
    update: {},
    create: {
      id: 'gastric-cancer-surgery',
      title: 'Хирургия рака желудка',
      description: 'Комплексный курс по современным методам хирургического лечения рака желудка. Включает теоретические основы, практические техники и интерактивные модули.',
      imageUrl: 'https://static.abacusaicdn.net/images/c2e664d1-5a23-4344-97e0-d5915b3a9ef5.jpg',
      category: 'Онкологическая хирургия',
      difficulty: 'advanced',
      duration: '40 часов',
    },
  });

  console.log('Course created:', course.title);

  // Create modules
  const modules = [
    {
      id: 'module-1',
      title: 'Введение и молекулярные основы',
      description: 'Этиология и молекулярная биология рака желудка. Роль H. pylori, генетические факторы, классификация по TCGA.',
      imageUrl: 'https://static.abacusaicdn.net/images/2510fca7-e634-41e4-a53a-1bc18af2694a.png',
      order: 1,
      content: {
        sections: [
          {
            id: 'genetic-landscape',
            title: 'Генетический ландшафт',
            type: 'interactive',
            imageUrl: 'https://static.abacusaicdn.net/images/fba9720f-e4a5-44a1-9d29-70a57b06a8aa.png',
            genes: [
              {
                name: 'CDH1',
                description: 'Ген кодирующий E-кадгерин, мутации которого связаны с диффузным типом рака желудка',
                frequency: '30-50%',
                function: 'Межклеточная адгезия'
              },
              {
                name: 'TP53',
                description: 'Опухолевый супрессор, часто мутирует при раке желудка',
                frequency: '60-70%',
                function: 'Контроль клеточного цикла'
              },
              {
                name: 'PIK3CA',
                description: 'Онкоген, активирующий PI3K/AKT сигнальный путь',
                frequency: '15-25%',
                function: 'Клеточный рост и выживание'
              }
            ]
          },
          {
            id: 'h-pylori-pathway',
            title: 'Путь от Helicobacter к раку',
            type: 'video',
            imageUrl: 'https://static.abacusaicdn.net/images/48a8f5b0-2583-44ba-ae42-d9f1159f76a0.png',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            stages: ['Инфекция H. pylori', 'Хроническое воспаление', 'Атрофия', 'Метаплазия', 'Дисплазия', 'Рак']
          },
          {
            id: 'tcga-subtypes',
            title: '4 подтипа рака желудка по TCGA',
            type: 'infographic',
            imageUrl: 'https://static.abacusaicdn.net/images/c58b8910-995c-4851-8d73-e89e49341c93.png',
            subtypes: [
              {
                name: 'EBV-положительный',
                frequency: '9%',
                characteristics: 'Высокая мутационная нагрузка, ответ на иммунотерапию'
              },
              {
                name: 'MSI',
                frequency: '22%',
                characteristics: 'Микросателлитная нестабильность, хороший прогноз'
              },
              {
                name: 'Геномно-стабильный',
                frequency: '20%',
                characteristics: 'CDH1 мутации, диффузный тип'
              },
              {
                name: 'Хромосомно-нестабильный',
                frequency: '49%',
                characteristics: 'TP53 мутации, кишечный тип'
              }
            ]
          }
        ],
        duration: '2 часа',
        lessons: 8
      }
    },
    {
      id: 'module-2',
      title: 'Диагностика и стадирование',
      description: 'Современные методы визуализации (КТ, МРТ, ПЭТ-КТ) для точного стадирования рака желудка.',
      imageUrl: 'https://static.abacusaicdn.net/images/ced14cc7-0ecb-4afa-860b-97f4624dcc5d.png',
      order: 2,
      content: {
        sections: [
          {
            id: 'ct-simulator',
            title: 'Интерактивный КТ-симулятор',
            type: 'interactive',
            description: 'Практика интерпретации КТ-снимков'
          },
          {
            id: 'imaging-comparison',
            title: 'Сравнение методов визуализации',
            type: 'interactive',
            description: 'КТ vs МРТ vs ПЭТ-КТ с клиническими кейсами'
          }
        ],
        duration: '2 часа',
        lessons: 8
      }
    },
    {
      id: 'module-3',
      title: 'Хирургия: Основные операции',
      description: 'Детальная техника дистальной резекции и тотальной гастрэктомии с интерактивными 3D-анимациями.',
      imageUrl: 'https://static.abacusaicdn.net/images/1f3df19c-b84a-49e3-b82a-56f669378d1c.png',
      order: 3,
      content: {
        sections: [
          {
            id: 'surgical-video',
            title: 'Хирургическое видео 360°',
            type: 'video-360',
            cameras: [
              { name: 'Общий план', angle: 'wide' },
              { name: 'Лапароскопия', angle: 'laparoscopic' },
              { name: 'Крупный план', angle: 'close-up' }
            ]
          },
          {
            id: '3d-anatomy',
            title: '3D-анатомия мобилизации',
            type: 'interactive-3d',
            imageUrl: 'https://static.abacusaicdn.net/images/c2e664d1-5a23-4344-97e0-d5915b3a9ef5.jpg',
            structures: [
              'Правая желудочная артерия',
              'Правая желудочно-сальниковая артерия',
              'Большой сальник',
              'Малый сальник'
            ]
          },
          {
            id: 'surgical-checklist',
            title: 'Чек-лист для операционной',
            type: 'checklist',
            items: [
              'Предоперационная разметка',
              'Позиционирование пациента',
              'Установка троакаров',
              'Мобилизация большого сальника',
              'Лигирование правой желудочной артерии',
              'Пересечение желудка',
              'Формирование анастомоза',
              'Проверка герметичности',
              'Дренирование'
            ]
          }
        ],
        duration: '3 часа',
        lessons: 12
      }
    },
    {
      id: 'module-4',
      title: 'Лимфодиссекция',
      description: 'Техника расширенной D2+ и D3 лимфодиссекции с интерактивной 3D-картой лимфоколлекторов.',
      imageUrl: 'https://static.abacusaicdn.net/images/0672edc8-1d5a-4fdd-af93-a52afe70a2c6.png',
      order: 4,
      content: {
        sections: [
          {
            id: 'lymph-node-map',
            title: 'Интерактивная карта лимфоузлов',
            type: 'interactive-map',
            imageUrl: 'https://static.abacusaicdn.net/images/01db2b96-bdc2-4c95-8ac7-a3282095ff12.png',
            stations: [
              {
                number: '7',
                name: 'Левая желудочная артерия',
                description: 'Лимфоузлы вдоль левой желудочной артерии',
                level: 'D2'
              },
              {
                number: '8',
                name: 'Общая печеночная артерия',
                description: 'Лимфоузлы передней группы',
                level: 'D2'
              },
              {
                number: '9',
                name: 'Чревная артерия',
                description: 'Лимфоузлы чревного ствола',
                level: 'D2'
              },
              {
                number: '11p',
                name: 'Селезеночная артерия проксимальная',
                description: 'Проксимальные лимфоузлы селезеночной артерии',
                level: 'D2'
              },
              {
                number: '12a',
                name: 'Печеночная артерия левая',
                description: 'Лимфоузлы левой печеночной артерии',
                level: 'D2+'
              },
              {
                number: '12b',
                name: 'Печеночная артерия правая',
                description: 'Лимфоузлы правой печеночной артерии',
                level: 'D2+'
              },
              {
                number: '14v',
                name: 'Верхние брыжеечные сосуды',
                description: 'Лимфоузлы верхней брыжеечной вены',
                level: 'D3'
              }
            ]
          },
          {
            id: 'key-vessels',
            title: 'Ключевые сосуды при D2-лимфодиссекции',
            type: 'infographic',
            imageUrl: 'https://static.abacusaicdn.net/images/d0ded6f1-3b2f-419e-8cb5-3875fa278fd2.png',
            vessels: [
              {
                name: 'Чревный ствол',
                type: 'Артерия',
                importance: 'Основной ориентир для диссекции'
              },
              {
                name: 'Левая желудочная артерия',
                type: 'Артерия',
                importance: 'Первая ветвь для лигирования'
              },
              {
                name: 'Селезеночная артерия',
                type: 'Артерия',
                importance: 'Граница проксимальной диссекции'
              },
              {
                name: 'Общая печеночная артерия',
                type: 'Артерия',
                importance: 'Диссекция группы 8'
              }
            ]
          },
          {
            id: '3d-lymph-mapping',
            title: '3D визуализация лимфосистемы',
            type: 'interactive-3d',
            imageUrl: 'https://static.abacusaicdn.net/images/b77c1975-4142-4576-bb7c-3865068d594f.jpg',
            description: 'Трехмерная модель с возможностью включения/выключения групп лимфоузлов'
          }
        ],
        duration: '2.5 часа',
        lessons: 10
      }
    },
    {
      id: 'module-5',
      title: 'Реконструкция',
      description: 'Методы реконструкции после гастрэктомии: Roux-en-Y и интерпозиция тощей кишки.',
      imageUrl: 'https://static.abacusaicdn.net/images/27619d02-6cd1-41f6-a943-2e5ef53b21cf.png',
      order: 5,
      content: {
        sections: [
          {
            id: 'reconstruction-animation',
            title: 'Анимация методов реконструкции',
            type: 'interactive',
            description: 'Сравнение Roux-en-Y и интерпозиции'
          }
        ],
        duration: '2 часа',
        lessons: 9
      }
    },
    {
      id: 'module-6',
      title: 'Лапароскопия и робототехника',
      description: 'Современные малоинвазивные технологии в хирургии рака желудка.',
      imageUrl: 'https://static.abacusaicdn.net/images/c5173d87-6bd5-4dcc-b916-0a621be405fa.png',
      order: 6,
      content: {
        sections: [
          {
            id: 'robotic-surgery',
            title: 'Роботическая хирургия da Vinci',
            type: 'interactive',
            description: 'Преимущества и техника роботической гастрэктомии'
          }
        ],
        duration: '2.5 часа',
        lessons: 10
      }
    },
    {
      id: 'module-7',
      title: 'Эндоскопия',
      description: 'Органосохраняющие эндоскопические методики лечения раннего рака (ESD).',
      imageUrl: 'https://static.abacusaicdn.net/images/fc7e0494-9dfa-4ff9-8bfd-39c44b2c8708.png',
      order: 7,
      content: {
        sections: [
          {
            id: 'endoscopy-marking',
            title: 'Симулятор разметки для ESD',
            type: 'interactive',
            description: 'Практика правильной разметки границ опухоли'
          }
        ],
        duration: '2 часа',
        lessons: 8
      }
    },
    {
      id: 'module-8',
      title: 'Мультимодальное лечение',
      description: 'Протоколы неоадъювантной и адъювантной химиотерапии, таргетная и иммунотерапия.',
      imageUrl: 'https://static.abacusaicdn.net/images/f141d8a6-ad3f-4605-ab2a-0d92cd82cf6e.png',
      order: 8,
      content: {
        sections: [
          {
            id: 'chemotherapy-protocols',
            title: 'Протоколы химиотерапии',
            type: 'educational',
            description: 'FLOT, FOLFOX, XELOX схемы'
          },
          {
            id: 'targeted-therapy',
            title: 'Таргетная и иммунотерапия',
            type: 'educational',
            description: 'Трастузумаб, Пембролизумаб, Ниволумаб'
          }
        ],
        duration: '2.5 часа',
        lessons: 11
      }
    },
    {
      id: 'module-9',
      title: 'Осложнения',
      description: 'Алгоритмы диагностики и лечения интра- и послеоперационных осложнений.',
      imageUrl: 'https://static.abacusaicdn.net/images/77a2cde8-8bc2-4e87-ba40-15f18020f8e8.png',
      order: 9,
      content: {
        sections: [
          {
            id: 'complications-algorithm',
            title: 'Алгоритмы управления осложнениями',
            type: 'educational',
            description: 'Несостоятельность анастомоза, кровотечение, свищи'
          }
        ],
        duration: '2 часа',
        lessons: 9
      }
    },
    {
      id: 'module-10',
      title: 'Практика',
      description: 'Мультидисциплинарный разбор сложных случаев и симуляционный тренинг.',
      imageUrl: 'https://static.abacusaicdn.net/images/6c2f2755-8d75-4050-aa4c-5a572f096a2c.png',
      order: 10,
      content: {
        sections: [
          {
            id: 'mdt-cases',
            title: 'Разбор клинических случаев',
            type: 'case-study',
            description: 'Реальные сложные случаи с участием МДК'
          },
          {
            id: 'simulation-training',
            title: 'Симуляционный тренинг',
            type: 'practical',
            description: 'Отработка хирургических навыков'
          }
        ],
        duration: '3 часа',
        lessons: 12
      }
    }
  ];

  for (const moduleData of modules) {
    await prisma.module.upsert({
      where: { id: moduleData.id },
      update: {},
      create: {
        ...moduleData,
        courseId: course.id,
        isActive: true,
      },
    });
    console.log('Module created:', moduleData.title);
  }

  // Create enrollment for admin user
  await prisma.courseEnrollment.upsert({
    where: {
      userId_courseId: {
        userId: adminUser.id,
        courseId: course.id,
      }
    },
    update: {},
    create: {
      userId: adminUser.id,
      courseId: course.id,
      progress: 0,
    },
  });

  console.log('Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
