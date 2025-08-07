import React, { useState } from 'react';
import type { MealType } from './data/foodTable';
import Refeicao from './components/Meal';

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
    <div className="flex justify-center min-h-screen bg-gray-100 font-sans">
      <div className="container mx-auto p-4 md:p-8">

        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 text-center">
            diet<span className="text-yellow-500">AI</span> 🥗
          </h1>
          <p className="text-gray-600 mt-2">Sua calculadora de dieta pessoal e inteligente</p>
        </header>

        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Adicionar Nova Refeição</h2>
          <form onSubmit={handleAddRefeicao} className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={nomeRefeicao}
              onChange={(e) => setNomeRefeicao(e.target.value)}
              placeholder="Ex: Café da Manhã"
              className="flex-grow p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white border-none font-bold py-3 px-6 rounded-md shadow-md hover:shadow-lg transition-all duration-300"
            >
              Criar Refeição
            </button>
          </form>
        </div>

        <main>
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
          <footer className="mt-10 p-6 bg-green-700 text-white rounded-lg shadow-xl text-center sticky bottom-4">
            <h2 className="text-3xl font-extrabold">
              Total de Calorias: {Math.round(caloriasTotais)} kcal
            </h2>
          </footer>
        )}

      </div>
    </div>
  );
}

export default App;