import foodData from './foodStatistics.json';

// Interface que corresponde exatamente à estrutura de um item no seu JSON
export interface FoodStatistic {
  description: string;
  qtd_gram: string;
  kcal: number;
  protein: number;
  lipids: number;
  // Adicione outras propriedades do JSON que queira usar no futuro
  // Ex: cho: number; fiber: number; etc.
}

// Interface para o Alimento processado, que a aplicação usará
export interface Food {
  id: number;
  nome: string;
  calorias: number; // Calorias por 100g
  // Poderíamos adicionar mais campos aqui se quiséssemos exibi-los
}

// Interface para um Alimento adicionado a uma refeição
export interface FoodNaMeal extends Food {
  idUnico: number; // ID único para a chave da lista no React
  quantidade: number; // em gramas
  caloriasTotais: number;
}

// Interface para uma Refeição
export interface MealType {
  id: number;
  nome: string;
  alimentos: FoodNaMeal[];
}

// --- PROCESSAMENTO DO JSON ---

// Função que lê o JSON e o transforma em um formato útil para a aplicação
const processarDadosAlimentos = (): Food[] => {
  // Acessamos a chave "ibge" do JSON importado
  const alimentosDoJson: FoodStatistic[] = foodData.ibge;

  return alimentosDoJson.map((item, index) => ({
    id: index, // Usamos o índice como um ID único para cada alimento
    nome: item.description,
    calorias: item.kcal,
  }));
};

// Exportamos a lista de alimentos já processada e pronta para uso
export const tabelaFoods: Food[] = processarDadosAlimentos();