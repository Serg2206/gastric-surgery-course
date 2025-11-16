
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Download, CheckCircle, AlertCircle, Clock } from 'lucide-react';

const checklistItems = [
  {
    id: 'positioning',
    title: 'Позиционирование пациента',
    description: 'Положение пациента на спине с приподнятым головным концом',
    category: 'preparation',
    required: true,
    timeEstimate: '5 мин'
  },
  {
    id: 'marking',
    title: 'Предоперационная разметка',
    description: 'Отметить границы резекции и места установки троакаров',
    category: 'preparation',
    required: true,
    timeEstimate: '3 мин'
  },
  {
    id: 'trocar-setup',
    title: 'Установка троакаров',
    description: 'Установка 5 троакаров по стандартной схеме',
    category: 'preparation',
    required: true,
    timeEstimate: '10 мин'
  },
  {
    id: 'omentum-mobilization',
    title: 'Мобилизация большого сальника',
    description: 'Разделение сальниково-ободочной связки',
    category: 'surgery',
    required: true,
    timeEstimate: '15 мин'
  },
  {
    id: 'right-gastric-artery',
    title: 'Лигирование правой желудочной артерии',
    description: 'Пересечение и лигирование правой желудочной артерии',
    category: 'surgery',
    required: true,
    timeEstimate: '10 мин'
  },
  {
    id: 'duodenum-mobilization',
    title: 'Мобилизация двенадцатиперстной кишки',
    description: 'Кохеризация и мобилизация 12-перстной кишки',
    category: 'surgery',
    required: true,
    timeEstimate: '20 мин'
  },
  {
    id: 'stomach-division',
    title: 'Пересечение желудка',
    description: 'Пересечение желудка степлером на уровне антрума',
    category: 'surgery',
    required: true,
    timeEstimate: '5 мин'
  },
  {
    id: 'anastomosis',
    title: 'Формирование анастомоза',
    description: 'Гастроеюноанастомоз по Ру',
    category: 'reconstruction',
    required: true,
    timeEstimate: '25 мин'
  },
  {
    id: 'leak-test',
    title: 'Проверка герметичности',
    description: 'Тест на герметичность анастомоза метиленовым синим',
    category: 'verification',
    required: true,
    timeEstimate: '5 мин'
  },
  {
    id: 'drainage',
    title: 'Дренирование',
    description: 'Установка дренажа в подпеченочное пространство',
    category: 'completion',
    required: false,
    timeEstimate: '3 мин'
  }
];

const categories = {
  preparation: { name: 'Подготовка', color: 'bg-blue-100 text-blue-800' },
  surgery: { name: 'Хирургия', color: 'bg-red-100 text-red-800' },
  reconstruction: { name: 'Реконструкция', color: 'bg-green-100 text-green-800' },
  verification: { name: 'Проверка', color: 'bg-yellow-100 text-yellow-800' },
  completion: { name: 'Завершение', color: 'bg-purple-100 text-purple-800' }
};

export function SurgicalChecklist() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleItem = (itemId: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(itemId)) {
      newChecked.delete(itemId);
    } else {
      newChecked.add(itemId);
    }
    setCheckedItems(newChecked);
  };

  const filteredItems = selectedCategory
    ? checklistItems.filter(item => item.category === selectedCategory)
    : checklistItems;

  const completionRate = Math.round((checkedItems.size / checklistItems.length) * 100);
  const requiredItems = checklistItems.filter(item => item.required);
  const completedRequired = requiredItems.filter(item => checkedItems.has(item.id)).length;

  const downloadPDF = () => {
    // В реальном приложении здесь была бы генерация и скачивание PDF
    alert('PDF-файл с чек-листом будет скачан (функция в разработке)');
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="medical-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-6 w-6 text-medical-blue" />
              <span>Прогресс операции</span>
            </CardTitle>
            <Button onClick={downloadPDF} className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Скачать PDF</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-medical-blue mb-2">
                {completionRate}%
              </div>
              <div className="text-sm text-gray-600">Общий прогресс</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-medical-blue h-2 rounded-full transition-all duration-300"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {completedRequired}/{requiredItems.length}
              </div>
              <div className="text-sm text-gray-600">Обязательные этапы</div>
              <div className="flex items-center justify-center mt-2">
                {completedRequired === requiredItems.length ? (
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Завершено
                  </Badge>
                ) : (
                  <Badge variant="outline">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    В процессе
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {checklistItems.reduce((sum, item) => 
                  checkedItems.has(item.id) 
                    ? sum + parseInt(item.timeEstimate) 
                    : sum, 0
                )}
              </div>
              <div className="text-sm text-gray-600">Минут выполнено</div>
              <div className="flex items-center justify-center mt-2">
                <Clock className="h-4 w-4 text-blue-600 mr-1" />
                <span className="text-xs">
                  из {checklistItems.reduce((sum, item) => sum + parseInt(item.timeEstimate), 0)} мин
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory(null)}
        >
          Все этапы
        </Button>
        {Object.entries(categories).map(([key, category]) => (
          <Button
            key={key}
            variant={selectedCategory === key ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(key)}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Checklist Items */}
      <div className="space-y-3">
        {filteredItems.map((item) => (
          <Card
            key={item.id}
            className={`cursor-pointer transition-all ${
              checkedItems.has(item.id) 
                ? 'bg-green-50 border-green-200' 
                : 'hover:shadow-md'
            }`}
            onClick={() => toggleItem(item.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <Checkbox
                  checked={checkedItems.has(item.id)}
                  onChange={() => toggleItem(item.id)}
                  className="mt-1"
                />
                
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`font-medium ${
                      checkedItems.has(item.id) ? 'line-through text-gray-500' : ''
                    }`}>
                      {item.title}
                    </h4>
                    <div className="flex items-center space-x-2">
                      <Badge className={categories[item.category as keyof typeof categories].color}>
                        {categories[item.category as keyof typeof categories].name}
                      </Badge>
                      {item.required && (
                        <Badge variant="destructive" className="text-xs">
                          Обязательно
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {item.timeEstimate}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className={`text-sm ${
                    checkedItems.has(item.id) ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {item.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Completion Message */}
      {completedRequired === requiredItems.length && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              Все обязательные этапы завершены!
            </h3>
            <p className="text-green-700">
              Операция может быть безопасно завершена. Не забудьте выполнить финальную проверку.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
