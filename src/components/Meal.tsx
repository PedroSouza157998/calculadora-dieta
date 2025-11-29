import React, { useMemo, useState } from 'react';
import { type MealType, type FoodNaMeal, processarDadosAlimentos } from '../data/foodTable';
import AsyncSelect from 'react-select/async';
import { Button } from './ui/button';
import { removeAcentos } from '@/lib/utils';
import { runLLM } from '@/services/llm.service';

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
  // const [table, setTable] = useState<'ibge' | 'taco'>("ibge");
  const table = 'ibge'



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

  const handleAddAlimento = async () => {
    const alimentoBase = tabelaFoods.find(a => a.id === Number(alimento?.value));
    if (!alimentoBase) return;
    console.log(alimentoBase)

    let total_grams = quantidade;
    if (referencia) {
      const { grams } = await runLLM(
        `Eu estou lhe utilizando para alimentar a minha aplicação com dados de refeições,
        com base no alimento ${alimentoBase.nome} quantos gramas tem uma porção de 1 ${referencia}?
        Responda no formato json: { 'grams': '' }
        `)

      total_grams = grams * quantidade
    }

    console.log({ total_grams, quantidade, referencia })

    console.log(total_grams)

    const novoAlimento: FoodNaMeal = {
      ...alimentoBase,
      quantidade: total_grams,
      quantidadePorcao: quantidade,
      referencia,
      caloriasTotais: (alimentoBase.calorias / alimentoBase.qtd) * total_grams,
      proteinasTotais: (alimentoBase.proteinas / alimentoBase.qtd) * total_grams,
      gordurasTotais: (alimentoBase.gorduras / alimentoBase.qtd) * total_grams,
      carboidratosTotais: (alimentoBase.carboidratos / alimentoBase.qtd) * total_grams,
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
  console.log(refeicao)

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
          className="text-[#FFF] no-print"
        >
          Remover
        </Button>
      </div>

      <div className="flex flex-wrap gap-[6px] items-start gap-4 mb-[.5rem] pb-[.5rem] border-b border-slate-200 no-print">
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
            value={quantidade || 0}
            onChange={(e) => setQuantidade(Number(e.target.value) || 1)}
            placeholder="Gramas"
            className="col-span-1 md:col-span-1 p-[.5rem] border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
          />
          <label className="text-[.75rem] text-[#949494] pl-[.25rem]">Quantidade</label>
        </div>}
        {!!quantidade && <div className="grid grid-cols-1 md:grid-cols-1">
          <select
            value={referencia}
            onChange={(e) => {
              if (!e.target.value) setQuantidade(100)
              else setQuantidade(1)
              setReferencia(e.target.value)
            }}
            className="col-span-1 md:col-span-1 p-[.5rem] border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
          >
            <option value="">Gramas</option>
            <option value="colher_cha">Colher de chá</option>
            <option value="colher_sopa">Colher de sopa</option>
            <option value="concha">Concha</option>
            <option value="xicara">Xícara</option>
            <option value="unidade">Unidade</option>
          </select>
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
              <span className="text-sm text-slate-500 ml-2">({alimento.referencia ? `${alimento.quantidadePorcao} - ${alimento.referencia}` : `${alimento.quantidade}g`})</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-bold text-slate-800">{Math.round(alimento.caloriasTotais)} kcal</span>
              <Button
                variant="destructive"
                className="text-[#FFF] text-[1.5rem] p-[.5rem] h-[24px] w-[24px] ml-[1rem] rounded-full no-print"
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