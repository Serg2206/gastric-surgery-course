
'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { X, Dna } from 'lucide-react';
import Image from 'next/image';

interface Gene {
  name: string;
  description: string;
  frequency: string;
  function: string;
  position: { x: number; y: number };
  color: string;
}

const genes: Gene[] = [
  {
    name: 'CDH1',
    description: 'Ген кодирующий E-кадгерин, мутации которого связаны с диффузным типом рака желудка. Играет ключевую роль в межклеточной адгезии и поддержании эпителиального барьера.',
    frequency: '30-50%',
    function: 'Межклеточная адгезия',
    position: { x: 20, y: 35 },
    color: 'bg-red-500'
  },
  {
    name: 'TP53',
    description: 'Опухолевый супрессор, часто мутирует при раке желудка. Контролирует клеточный цикл и апоптоз, предотвращая образование опухолей.',
    frequency: '60-70%',
    function: 'Контроль клеточного цикла',
    position: { x: 50, y: 25 },
    color: 'bg-blue-500'
  },
  {
    name: 'PIK3CA',
    description: 'Онкоген, активирующий PI3K/AKT сигнальный путь. Мутации приводят к усилению клеточного роста и выживания опухолевых клеток.',
    frequency: '15-25%',
    function: 'Клеточный рост и выживание',
    position: { x: 75, y: 45 },
    color: 'bg-green-500'
  }
];

export function GeneticLandscape() {
  const [selectedGene, setSelectedGene] = useState<Gene | null>(null);

  return (
    <div className="space-y-6">
      <Card className="medical-card">
        <CardContent className="p-6">
          <div className="relative aspect-video bg-gradient-to-br from-blue-50 to-white rounded-xl border-2 border-dashed border-blue-200 overflow-hidden">
            <Image
              src="https://static.abacusaicdn.net/images/fba9720f-e4a5-44a1-9d29-70a57b06a8aa.png"
              alt="Генетический ландшафт рака желудка"
              fill
              className="object-contain"
            />
            
            {/* Interactive gene markers */}
            {genes.map((gene) => (
              <button
                key={gene.name}
                className="absolute w-16 h-16 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center justify-center text-white font-bold text-sm svg-clickable"
                style={{
                  left: `${gene.position.x}%`,
                  top: `${gene.position.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={() => setSelectedGene(gene)}
              >
                <div className={`w-full h-full rounded-full ${gene.color} flex items-center justify-center shadow-lg border-2 border-white`}>
                  <Dna className="h-6 w-6" />
                </div>
              </button>
            ))}
          </div>
          
          <div className="mt-6">
            <p className="text-sm text-gray-600 text-center">
              💡 Нажмите на цветные маркеры генов для получения подробной информации
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {genes.map((gene) => (
                <Button
                  key={gene.name}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                  onClick={() => setSelectedGene(gene)}
                >
                  <div className={`w-3 h-3 rounded-full ${gene.color}`}></div>
                  <span>{gene.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gene Details Modal */}
      <Dialog open={!!selectedGene} onOpenChange={() => setSelectedGene(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-3 text-xl">
              <div className={`w-8 h-8 rounded-full ${selectedGene?.color} flex items-center justify-center`}>
                <Dna className="h-5 w-5 text-white" />
              </div>
              <span>Ген {selectedGene?.name}</span>
            </DialogTitle>
          </DialogHeader>
          
          {selectedGene && (
            <div className="space-y-6 pt-4">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-medical-blue mb-2">Частота мутаций</h4>
                    <div className="text-2xl font-bold text-gray-900">{selectedGene.frequency}</div>
                    <p className="text-sm text-gray-600">при раке желудка</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-medical-blue mb-2">Основная функция</h4>
                    <Badge variant="medical" className="text-sm">
                      {selectedGene.function}
                    </Badge>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <h4 className="font-semibold text-medical-blue mb-3">Описание и роль в онкогенезе</h4>
                <p className="text-gray-700 leading-relaxed">
                  {selectedGene.description}
                </p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-medical-blue mb-2">Клиническое значение</h4>
                <p className="text-sm text-gray-700">
                  Мутации в гене {selectedGene.name} имеют важное значение для понимания механизмов развития рака желудка и выбора терапевтической стратегии.
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
