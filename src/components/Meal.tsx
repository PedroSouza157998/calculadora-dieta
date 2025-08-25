import React, { useMemo, useState } from 'react';
import { type MealType, type FoodNaMeal, processarDadosAlimentos } from '../data/foodTable';
import AsyncSelect from 'react-select/async';
import { Button } from './ui/button';
import { removeAcentos } from '@/lib/utils';

interface RefeicaoProps {
  refeicao: MealType;
  onUpdateRefeicao: (refeicao: MealType) => void;
  onRemoveRefeicao: (id: number) => void;
}

type OptionType = { value: string; label: string };

const Refeicao: React.FC<RefeicaoProps> = ({ refeicao, onUpdateRefeicao, onRemoveRefeicao }) => {
  const [alimento, setAlimento] = useState<OptionType>();
  const [quantidade, setQuantidade] = useState<number>(0);
  const [referencia, setReferencia] = useState<string>("");
  const [table, setTable] = useState<'ibge' | 'taco'>("ibge");
  


  const tabelaFoods = useMemo(() => processarDadosAlimentos(table), [table])


  const foodOptions: OptionType[] = tabelaFoods.map(food => ({
    value: food.id.toString(),
    label: food.nome.charAt(0).toUpperCase() + food.nome.slice(1).toLowerCase(),
  }));

  const filterFood = (inputValue: string) => {
    return foodOptions.filter((i) =>
      removeAcentos(i.label.toLowerCase()).includes(removeAcentos(inputValue.toLowerCase()))
    );
  };

  const loadOptions = (
    inputValue: string,
    callback: (options: OptionType[]) => void
  ) => {
    setTimeout(() => {
      callback(filterFood(inputValue));
    }, 1000);
  };

  const handleAddAlimento = () => {
    const alimentoBase = tabelaFoods.find(a => a.id === Number(alimento?.value));
    if (!alimentoBase) return;

    const novoAlimento: FoodNaMeal = {
      ...alimentoBase,
      quantidade,
      referencia,
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

    setAlimento(undefined);
    setQuantidade(0);
    setReferencia("");
  };

  const handleRemoveAlimento = (idUnico: number) => {
    onUpdateRefeicao({
      ...refeicao,
      alimentos: refeicao.alimentos.filter(a => a.idUnico !== idUnico),
    });
  };

  const handleSelectAlimento = (option: OptionType | null) => {
    if (option) setAlimento(option);

    const alimentoBase = tabelaFoods.find(a => a.id === Number(option?.value));
    setQuantidade(alimentoBase?.qtd || 0);
    console.log(alimentoBase);
    if (!alimentoBase) return;
  }

  return (
    <div className="flex flex-col gap-[1rem] bg-white p-[2rem] rounded-2xl shadow-lg border border-slate-200">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">{refeicao.nome}</h3>
          {/* <select 
          value={table} 
          onChange={(e) => { e && setTable(e.target.value as any) }}
          className="col-span-1 md:col-span-1 p-[.5rem] border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
          >
            <option value="ibge">IBGE</option>
            <option value="taco">TACO</option>
          </select> */}
        </div>
        <Button
          variant="destructive"
          onClick={() => onRemoveRefeicao(refeicao.id)}
          className="text-[#FFF]"
        >
          Remover
        </Button>
      </div>

      <div className="flex flex-wrap gap-[6px] items-start gap-4 mb-[.5rem] pb-[.5rem] border-b border-slate-200">
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 pb-6 border-b border-slate-200"> */}
        <AsyncSelect
          className='w-full'
          value={alimento}
          onChange={handleSelectAlimento}
          noOptionsMessage={({ inputValue }) => {
            if (!inputValue) return "Digite para pesquisar...";
            return 'Nenhum alimento encontrado';
          }}
          loadingMessage={() => "Carregando..."}
          loadOptions={loadOptions}
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
        {!!quantidade && <div className="grid grid-cols-1 md:grid-cols-1">
          <input
          type="text"
          value={referencia}
          onChange={(e) => setReferencia(e.target.value)}
          placeholder="Porção"
          className="col-span-1 md:col-span-1 p-[.5rem] border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
        />
        <label className="text-[.75rem] text-[#949494] pl-[.25rem]">Referência da porção</label>
        </div>}
        <Button
          variant="default"
          onClick={handleAddAlimento}
        // className="col-span-1 md:col-span-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          Adicionar
        </Button>
      </div>

      <ul className="flex flex-col gap-[.5rem] space-y-3">
        {refeicao.alimentos.map(alimento => (
          <li key={alimento.idUnico} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
            <div>
              <span className="font-semibold text-slate-700">{alimento.nome.charAt(0).toUpperCase() + alimento.nome.slice(1).toLowerCase()}</span>
              <span className="text-sm text-slate-500 ml-2">({alimento.referencia ? `${alimento.quantidade}g - ${alimento.referencia}` : `${alimento.quantidade}g`})</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-bold text-slate-800">{Math.round(alimento.caloriasTotais)} kcal</span>
              <Button
                variant="destructive"
                className="text-[#FFF] text-[1.5rem] p-[.5rem] h-[24px] w-[24px] ml-[1rem] rounded-full"
                onClick={() => handleRemoveAlimento(alimento.idUnico)}
              >
                ×
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Refeicao;