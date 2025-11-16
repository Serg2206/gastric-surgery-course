
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Zap, Shield, Activity, Microscope } from 'lucide-react';
import Image from 'next/image';

interface Subtype {
  id: string;
  name: string;
  shortName: string;
  frequency: number;
  characteristics: string;
  prognosis: string;
  therapy: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

const subtypes: Subtype[] = [
  {
    id: 'ebv',
    name: 'EBV-положительный',
    shortName: 'EBV+',
    frequency: 9,
    characteristics: 'Высокая мутационная нагрузка, инфильтрация иммунными клетками',
    prognosis: 'Благоприятный прогноз',
    therapy: 'Хороший ответ на иммунотерапию (анти-PD1)',
    icon: Microscope,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 border-purple-200'
  },
  {
    id: 'msi',
    name: 'Микросателлитная нестабильность',
    shortName: 'MSI',
    frequency: 22,
    characteristics: 'Дефект системы репарации ДНК, высокая мутационная нагрузка',
    prognosis: 'Наилучший прогноз',
    therapy: 'Эффективна иммунотерапия',
    icon: Zap,
    color: 'text-green-600',
    bgColor: 'bg-green-50 border-green-200'
  },
  {
    id: 'gs',
    name: 'Геномно-стабильный',
    shortName: 'GS',
    frequency: 20,
    characteristics: 'CDH1 мутации, диффузный тип, молодые пациенты',
    prognosis: 'Неблагоприятный прогноз',
    therapy: 'Химиотерапия, таргетная терапия',
    icon: Shield,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 border-blue-200'
  },
  {
    id: 'cin',
    name: 'Хромосомно-нестабильный',
    shortName: 'CIN',
    frequency: 49,
    characteristics: 'TP53 мутации, кишечный тип, анеуплоидия',
    prognosis: 'Средний прогноз',
    therapy: 'Стандартная химиотерапия',
    icon: Activity,
    color: 'text-red-600',
    bgColor: 'bg-red-50 border-red-200'
  }
];

export function TCGASubtypes() {
  const [selectedSubtype, setSelectedSubtype] = useState<Subtype | null>(null);

  return (
    <div className="space-y-6">
      {/* Main infographic */}
      <Card className="medical-card">
        <CardContent className="p-6">
          <div className="relative aspect-video rounded-xl overflow-hidden mb-6">
            <Image
              src="https://static.abacusaicdn.net/images/c58b8910-995c-4851-8d73-e89e49341c93.png"
              alt="TCGA классификация рака желудка"
              fill
              className="object-contain"
            />
          </div>
          
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Молекулярная классификация TCGA
            </h3>
            <p className="text-gray-600">
              Нажмите на карточку подтипа для подробной информации
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Interactive subtype cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {subtypes.map((subtype) => (
          <Card
            key={subtype.id}
            className={`medical-card cursor-pointer transition-all duration-300 hover:shadow-xl ${
              selectedSubtype?.id === subtype.id ? 'ring-2 ring-medical-blue shadow-lg' : ''
            } ${subtype.bgColor}`}
            onClick={() => setSelectedSubtype(
              selectedSubtype?.id === subtype.id ? null : subtype
            )}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <subtype.icon className={`h-8 w-8 ${subtype.color}`} />
                <Badge variant="secondary">{subtype.shortName}</Badge>
              </div>
              <CardTitle className="text-lg">{subtype.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Частота</span>
                    <span className="text-sm font-semibold">{subtype.frequency}%</span>
                  </div>
                  <Progress value={subtype.frequency} className="h-2" />
                </div>
                
                <p className="text-sm text-gray-700 leading-relaxed">
                  {subtype.characteristics}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed information panel */}
      {selectedSubtype && (
        <Card className="medical-card border-medical-blue">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <selectedSubtype.icon className={`h-6 w-6 ${selectedSubtype.color}`} />
              <span>{selectedSubtype.name}</span>
              <Badge variant="medical">{selectedSubtype.frequency}%</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-medical-blue mb-2">Характеристики</h4>
                  <p className="text-sm text-gray-700">{selectedSubtype.characteristics}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-medical-blue mb-2">Прогноз</h4>
                  <p className="text-sm text-gray-700">{selectedSubtype.prognosis}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-medical-blue mb-2">Терапия</h4>
                  <p className="text-sm text-gray-700">{selectedSubtype.therapy}</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-medical-blue mb-2">Клиническое значение</h4>
              <p className="text-sm text-gray-700">
                Понимание молекулярного подтипа {selectedSubtype.name} критически важно для выбора оптимальной терапевтической стратегии и прогнозирования ответа на лечение.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
