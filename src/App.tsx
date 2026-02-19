import React, { useState } from 'react';
// import { useAuth0 } from "@auth0/auth0-react";
import type { MealType } from './data/foodTable';
import Refeicao from './components/Meal';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import GenerateDietModal from './components/GenerateDietModal';
import Dashboard from './components/Dashboard';

function App() {
  const [refeicoes, setRefeicoes] = useState<MealType[]>([]);
  const [nomeRefeicao, setNomeRefeicao] = useState<string>('');
  const [targetCalories, setTargetCalories] = useState<number>(2000);

  // const {
  //   isLoading,
  //   isAuthenticated,
  //   loginWithRedirect: login,
  //   logout: auth0Logout,
  //   user,
  // } = useAuth0();

  // const LoadingPage = <div className="flex justify-center items-center h-[100vh]"> Loading... </div>
  // const logout = () =>
  //   auth0Logout({ logoutParams: { returnTo: window.location.origin } });

  // if (isLoading) return LoadingPage;

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

  // login && !user && login()
  
  const handleUpdateRefeicao = (refeicaoAtualizada: MealType) => {
    const refeicoesAtualizadas = refeicoes.map(r => {
      if (r.id === refeicaoAtualizada.id) {
        const alimentosAtualizados = refeicaoAtualizada.alimentos.map(alimento => ({
          ...alimento,
          caloriasTotais: alimento.calorias * (alimento.quantidade / 100),
          carboidratosTotais: alimento.carboidratos * (alimento.quantidade / 100),
          proteinasTotais: alimento.proteinas * (alimento.quantidade / 100),
          gordurasTotais: alimento.gorduras * (alimento.quantidade / 100),
        }));
        return { ...refeicaoAtualizada, alimentos: alimentosAtualizados };
      }
      return r;
    });
    setRefeicoes(refeicoesAtualizadas);
  };

  const handleRemoveRefeicao = (id: number) => {
    setRefeicoes(refeicoes.filter(r => r.id !== id));
  };

  const caloriasTotais = refeicoes.reduce((total, refeicao) => {
    return total + refeicao.alimentos.reduce((subtotal, alimento) => subtotal + (alimento.calorias * (alimento.quantidade / 100)), 0);
  }, 0);

  const carboidratosTotais = refeicoes.reduce((total, refeicao) => {
    return total + refeicao.alimentos.reduce((subtotal, alimento) => subtotal + (alimento.carboidratos * (alimento.quantidade / 100)), 0);
  }, 0);

  const proteinasTotais = refeicoes.reduce((total, refeicao) => {
    return total + refeicao.alimentos.reduce((subtotal, alimento) => subtotal + (alimento.proteinas * (alimento.quantidade / 100)), 0);
  }, 0);

  const gordurasTotais = refeicoes.reduce((total, refeicao) => {
    return total + refeicao.alimentos.reduce((subtotal, alimento) => subtotal + (alimento.gorduras * (alimento.quantidade / 100)), 0);
  }, 0);

  // return isAuthenticated ? 
  return (
    <div className="bg-slate-50 font-sans">
      <div className="container mx-auto max-w-4xl p-4 md:p-8">

        <div className="flex justify-between items-center mb-4 no-print">
          {/* <Button onClick={logout} variant="destructive" className="font-bold">Desconectar</Button> */}
          <div className='flex' style={{ gap: 16 }}>
            <GenerateDietModal 
              setRefeicoes={setRefeicoes} 
              targetCalories={targetCalories}
              setTargetCalories={setTargetCalories}
            />
            <Button onClick={() => window.print()} variant="outline" className="font-bold">Imprimir Dieta</Button>
          </div>
        </div>

        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-800">
            diet<span className="text-green-500">AI</span>
          </h1>
          <p className="text-slate-500 mt-3 text-lg">Sua calculadora de dieta pessoal e inteligente</p>
        </header>

        <div className="w-1/2 bg-white p-[.5rem] mb-[1rem] rounded-2xl shadow-lg m-auto mb-8 border rounded-lg border-slate-200 no-print" style={{ paddingInline: 24 }}>
          <h2 className="text-2xl text-center font-bold text-slate-800 mb-4">Adicionar Nova Refeição</h2>
          <form onSubmit={handleAddRefeicao}>
            <div className="flex flex-col items-end sm:flex-row" style={{ gap: 16, paddingBottom: 16 }}>
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
                style={{ paddingInline: 24, paddingBlock: 8 }}
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
          <footer className="mt-12 p-6 bg-slate-800 rounded-2xl shadow-xl text-center">
            <h2 className="text-4xl font-extrabold">
              <span className="text-green-400">{Math.round(caloriasTotais)}</span> kcal
            </h2>
            <p className="text-slate-400 mt-1">Total de Calorias Consumidas</p>
            <div className="mt-4">
              <Dashboard
                totalCarboidratos={carboidratosTotais}
                totalProteinas={proteinasTotais}
                totalGorduras={gordurasTotais}
              />
            </div>
          </footer>
        )}

      </div>
    </div>
  )
  //  : LoadingPage;
}

export default App;