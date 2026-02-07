import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import type { MealType } from '../data/foodTable';
import api from '@/services/api';

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (<>
    <div className="absolute inset-0 w-screen h-screen" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", left: 0, top: 0 }} onClick={onClose} />
    <div className="fixed min-w-2/3 bg-white inset-0 z-50 p-6 rounded-lg shadow-lg" style={{ padding: "2rem", gap: 6, left: "calc((2/3 * 100%) - 50%)", top: "4rem" }}>
      {children}
    </div>
  </>
  );
};

interface GenerateDietModalProps {
  setRefeicoes: (refeicoes: MealType[]) => void;
  targetCalories: number;
  setTargetCalories: (calories: number) => void;
}

const GenerateDietModal: React.FC<GenerateDietModalProps> = ({
  setRefeicoes,
  targetCalories,
  setTargetCalories,
}) => {
  const [allergies, setAllergies] = useState('');
  const [dietType, setDietType] = useState<'cutting' | 'bulking'>('cutting');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGenerateDiet = async () => {

    const {data: newRefeicoes, status} = await api.post('generate-diet', {
      body: {
        dietType, 
        allergies, 
        targetCalories
      }
    });

    if(status !== 200) {
      return console.log("Erro ao gerar dieta")
    }

    const refeicoesComTotais = newRefeicoes.map((refeicao: MealType) => ({
      ...refeicao,
      alimentos: refeicao.alimentos.map((alimento: any) => ({
        ...alimento,
        caloriasTotais: alimento.calorias * (alimento.quantidade / 100),
        carboidratosTotais: alimento.carboidratos * (alimento.quantidade / 100),
        proteinasTotais: alimento.proteinas * (alimento.quantidade / 100),
        gordurasTotais: alimento.gorduras * (alimento.quantidade / 100),
      })),
    }));

    setRefeicoes(refeicoesComTotais);
    setIsModalOpen(false);
  };

  return (
    <>
      <Button variant="outline" className="font-bold" onClick={() => setIsModalOpen(true)}>Gerar Dieta com IA</Button>
      <CustomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">Gerar Dieta com IA</h2>
        <div className="flex flex-col" style={{gap: 8}}>
          <div className="flex flex-col" style={{gap: 4}}>
            <label className="block text-sm font-medium text-gray-700">Objetivo de Kcal</label>
            <Input
              type="number"
              value={targetCalories}
              style={{ padding: 6, maxWidth: "100%" }}
              onChange={(e) => setTargetCalories(Number(e.target.value))}
              className="mt-1"
            />
          </div>
          <div className="flex flex-col" style={{gap: 4}}>
            <label className="block text-sm font-medium text-gray-700">Tipo de Dieta</label>
            <select
              value={dietType}
              onChange={(e) => setDietType(e.target.value as 'cutting' | 'bulking')}
              style={{padding: 6}}
              className="flex mt-1 w-full text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="cutting">Cutting</option>
              <option value="bulking">Bulking</option>
            </select>
          </div>
          <div className="flex flex-col" style={{gap: 4}}>
            <label className="block text-sm font-medium text-gray-700">Alergias</label>
            <Input
              type="text"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
                style={{ padding: 6 }}
              placeholder="Ex: Amendoim, Glúten"
              className="mt-1"
            />
          </div>
        </div>
        <div style={{ marginTop: 16 }} className="mt-6 flex justify-end space-x-4">
          <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
          <Button onClick={handleGenerateDiet}>Gerar</Button>
        </div>
      </CustomModal>
    </>
  );
};

export default GenerateDietModal;
