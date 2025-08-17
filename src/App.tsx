import React, { useState } from 'react';
import type { MealType } from './data/foodTable';
import Refeicao from './components/Meal';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';

function App() {
  const [refeicoes, setRefeicoes] = useState<MealType[]>([]);
  const [nomeRefeicao, setNomeRefeicao] = useState<string>('');

  const handleAddRefeicao = (e: React.FormEvent) => {
    e.preventDefault();
    if (nomeRefeicao.trim() === '') return;

    const novaRefeicao: MealType = {
      id: Date.now(),
      nome: nomeRefeicao,
      alimentos: [],
    };
    setRefeicoes([...refeicoes, novaRefeicao]);
    setNomeRefeicao('');
  };

  const handleUpdateRefeicao = (refeicaoAtualizada: MealType) => {
    setRefeicoes(refeicoes.map(r => r.id === refeicaoAtualizada.id ? refeicaoAtualizada : r));
  };

  const handleRemoveRefeicao = (id: number) => {
    setRefeicoes(refeicoes.filter(r => r.id !== id));
  };

  const caloriasTotais = refeicoes.reduce((total, refeicao) => {
    return total + refeicao.alimentos.reduce((subtotal: number, alimento: any) => subtotal + alimento.caloriasTotais, 0);
  }, 0);

  return (
    <div className="bg-slate-50 font-sans">
      <div className="container mx-auto max-w-4xl p-4 md:p-8">

        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-800">
            diet<span className="text-green-500">AI</span>
          </h1>
          <p className="text-slate-500 mt-3 text-lg">Sua calculadora de dieta pessoal e inteligente</p>
        </header>

        <div className="w-1/2 bg-white p-6 rounded-2xl shadow-lg m-auto mb-8 border rounded-lg border-slate-200" style={{paddingInline: 24}}>
          <h2 className="text-2xl text-center font-bold text-slate-800 mb-4">Adicionar Nova Refeição</h2>
          <form onSubmit={handleAddRefeicao}>
            <div className="flex flex-col items-end sm:flex-row" style={{gap: 16, paddingBottom:  16}}>
            <Input
              type="text"
              value={nomeRefeicao}
              onChange={(e) => setNomeRefeicao(e.target.value)}
              style={{ padding: 6 }}
              placeholder="Ex: Café da Manhã"
            />
            <Button
              type="submit"
              variant="default"
              className='border-none cursor-pointer w-fit'
              style={{paddingInline: 24, paddingBlock: 8}}
              // className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              Criar
            </Button>
            </div>
          </form>
        </div>

        <main className="space-y-6">
          {refeicoes.map(refeicao => (
            <Refeicao
              key={refeicao.id}
              refeicao={refeicao}
              onUpdateRefeicao={handleUpdateRefeicao}
              onRemoveRefeicao={handleRemoveRefeicao}
            />
          ))}
        </main>

        {refeicoes.length > 0 && (
          <footer className="mt-12 p-6 bg-slate-800 text-white rounded-2xl shadow-xl text-center">
            <h2 className="text-4xl font-extrabold">
              <span className="text-green-400">{Math.round(caloriasTotais)}</span> kcal
            </h2>
            <p className="text-slate-400 mt-1">Total de Calorias Consumidas</p>
          </footer>
        )}

      </div>
    </div>
  );
}

export default App;