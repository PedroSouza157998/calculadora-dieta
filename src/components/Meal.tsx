import React, { useState } from 'react';
import { tabelaFoods } from '../data/foodTable';
import type { MealType, FoodNaMeal } from '../data/foodTable';

// Tipagem das props do componente
interface RefeicaoProps {
  refeicao: MealType;
  onUpdateRefeicao: (refeicao: MealType) => void;
  onRemoveRefeicao: (id: number) => void;
}

const Refeicao: React.FC<RefeicaoProps> = ({ refeicao, onUpdateRefeicao, onRemoveRefeicao }) => {
  // ALTERAÇÃO AQUI: Garanta que o estado inicial seja o ID do primeiro item da lista processada.
  const [alimentoId, setAlimentoId] = useState<number>(tabelaFoods[0]?.id ?? 0);
  const [quantidade, setQuantidade] = useState<number>(100);

  const handleAddAlimento = () => {
    // A lógica aqui agora compara números, o que é mais seguro
    const alimentoBase = tabelaFoods.find(a => a.id === alimentoId);
    if (!alimentoBase) return;
    console.log({
      ...alimentoBase,
      quantidade,
      caloriasTotais: (alimentoBase.calorias * quantidade),
      idUnico: Date.now(),
      alimentoBase 
    })

    const novoAlimento: FoodNaMeal = {
      ...alimentoBase,
      quantidade,
      caloriasTotais: (alimentoBase.calorias * quantidade),
      idUnico: Date.now(),
    };

    onUpdateRefeicao({
      ...refeicao,
      alimentos: [...refeicao.alimentos, novoAlimento],
    });
  };

  const handleRemoveAlimento = (idUnico: number) => {
    onUpdateRefeicao({
      ...refeicao,
      alimentos: refeicao.alimentos.filter(a => a.idUnico !== idUnico),
    });
  };

  const caloriasDaRefeicao = refeicao.alimentos.reduce((total, alim) => total + alim.caloriasTotais, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-2xl font-bold text-green-700">{refeicao.nome} ({Math.round(caloriasDaRefeicao)} kcal)</h3>
        <button
          onClick={() => onRemoveRefeicao(refeicao.id)}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-full transition-colors duration-300"
        >
          Remover
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <select
          value={alimentoId}
          // ALTERAÇÃO AQUI: Convertemos o valor do evento para número
          onChange={(e) => setAlimentoId(Number(e.target.value))}
          className="col-span-1 md:col-span-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
        >
          {tabelaFoods.map(alimento => (
            <option key={alimento.id} value={alimento.id}>
              {/* Deixando o nome mais legível com Capitalize */}
              {alimento.nome.charAt(0).toUpperCase() + alimento.nome.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={quantidade}
          onChange={(e) => setQuantidade(Number(e.target.value))}
          placeholder="Gramas"
          className="col-span-1 md:col-span-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
        />
        <button
          onClick={handleAddAlimento}
          className="col-span-1 md:col-span-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
        >
          Adicionar Alimento
        </button>
      </div>

       <ul className="space-y-2">
        {refeicao.alimentos.map(alimento => (
          <li key={alimento.idUnico} className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
            <span>{alimento.nome.charAt(0).toUpperCase() + alimento.nome.slice(1).toLowerCase()} - {alimento.quantidade}</span>
            <div className="flex items-center gap-4">
              <span className="font-semibold">{Math.round(alimento.caloriasTotais)} kcal</span>
              <button
                onClick={() => handleRemoveAlimento(alimento.idUnico)}
                className="bg-red-200 text-red-700 hover:bg-red-300 font-bold w-6 h-6 rounded-full flex items-center justify-center"
              >
                ×
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Refeicao;