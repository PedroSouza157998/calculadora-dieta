import React, { useState } from 'react';
import { tabelaFoods } from '../data/foodTable';
import type { MealType, FoodNaMeal } from '../data/foodTable';
import AsyncSelect from 'react-select/async';
import { Button } from './ui/button';

interface RefeicaoProps {
  refeicao: MealType;
  onUpdateRefeicao: (refeicao: MealType) => void;
  onRemoveRefeicao: (id: number) => void;
}

const Refeicao: React.FC<RefeicaoProps> = ({ refeicao, onUpdateRefeicao, onRemoveRefeicao }) => {
  const [alimento, setAlimento] = useState<{ value: string, label: string }>();
  const [quantidade, setQuantidade] = useState<number>(0);

  const foodOptions = tabelaFoods.map(food => ({
    value: food.id.toString(),
    label: food.nome.charAt(0).toUpperCase() + food.nome.slice(1).toLowerCase(),
  }));

  const filterColors = (inputValue: string) => {
    return foodOptions.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = (
    inputValue: string,
    callback: (options: { label: string, value: string }[]) => void
  ) => {
    setTimeout(() => {
      callback(filterColors(inputValue));
    }, 1000);
  };

  const handleAddAlimento = () => {
    const alimentoBase = tabelaFoods.find(a => a.id === Number(alimento?.value));
    if (!alimentoBase) return;

    const novoAlimento: FoodNaMeal = {
      ...alimentoBase,
      quantidade,
      caloriasTotais: (alimentoBase.calorias / alimentoBase.qtd) * quantidade,
      proteinasTotais: (alimentoBase.proteinas / alimentoBase.qtd) * quantidade,
      gordurasTotais: (alimentoBase.gorduras / alimentoBase.qtd) * quantidade,
      carboidratosTotais: (alimentoBase.carboidratos / alimentoBase.qtd) * quantidade,
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

  const handleSelectAlimento = (option: { value: string, label: string }) => {
    if (option) setAlimento(option);

    const alimentoBase = tabelaFoods.find(a => a.id === Number(option.value));
    setQuantidade(alimentoBase?.qtd || 0);
    console.log(alimentoBase);
    if (!alimentoBase) return;
  }

  const caloriasDaRefeicao = refeicao.alimentos.reduce((total, alim) => total + alim.caloriasTotais, 0);

  return (
    <div className="flex flex-col gap-[1rem] bg-white p-[2rem] rounded-2xl shadow-lg border border-slate-200">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">{refeicao.nome}</h3>
          <span className="text-green-500 font-semibold">{Math.round(caloriasDaRefeicao)} kcal</span>
        </div>
        <button
          onClick={() => onRemoveRefeicao(refeicao.id)}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          Remover
        </button>
      </div>

      <div className="flex flex-wrap gap-[6px] items-center gap-4 mb-[.5rem] pb-[.5rem] border-b border-slate-200">
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 pb-6 border-b border-slate-200"> */}
        <AsyncSelect
          className='w-full'
          value={alimento}
          onChange={handleSelectAlimento as any}
          noOptionsMessage={({ inputValue }) => {
            if (!inputValue) return "Digite para pesquisar...";
            return 'Nenhum alimento encontrado';
          }}
          loadingMessage={() => "Carregando..."}
          loadOptions={loadOptions as any}
          placeholder="Alimento"
        />
        {!!quantidade && <div className="grid grid-cols-1 md:grid-cols-1">
          <input
          type="number"
          value={quantidade}
          onChange={(e) => setQuantidade(Number(e.target.value))}
          placeholder="Gramas"
          className="col-span-1 md:col-span-1 p-[.5rem] border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
        />
        <label className="text-[.75rem] text-[#949494] pl-[.25rem]">Quantidade em gramas</label>
        </div>}
        <Button
          variant="default"
          onClick={handleAddAlimento}
        // className="col-span-1 md:col-span-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          Adicionar
        </Button>
      </div>

      <ul className="space-y-3">
        {refeicao.alimentos.map(alimento => (
          <li key={alimento.idUnico} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
            <div>
              <span className="font-semibold text-slate-700">{alimento.nome.charAt(0).toUpperCase() + alimento.nome.slice(1).toLowerCase()}</span>
              <span className="text-sm text-slate-500 ml-2">({alimento.quantidade}g)</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-bold text-slate-800">{Math.round(alimento.caloriasTotais)} kcal</span>
              <button
                onClick={() => handleRemoveAlimento(alimento.idUnico)}
                className="bg-slate-200 text-slate-600 hover:bg-red-200 hover:text-red-700 font-bold w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-200"
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