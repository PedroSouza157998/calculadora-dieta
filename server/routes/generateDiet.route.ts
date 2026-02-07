import type { Request, Response } from "express";
import { runLLM } from "../services/llm.service";
import foodStatistics from '../data/foodStatistics.json';

export const generateDietRoute = async (req: Request, res: Response) => {
  try {
    const { dietType, allergies, targetCalories } = req.body;

    const simplifiedFoodData = (foodStatistics.ibge as any[]).concat(foodStatistics.taco).map((food: any, index: number) => ({
      id: index,
      nome: food.description,
      calorias: food.kcal,
      carboidratos: food.cho,
      proteinas: food.protein,
      gorduras: food.lipids,
    }));
    
    const prompt = `Crie uma dieta de ${dietType} com aproximadamente ${targetCalories} calorias, dividida em 5 a 6 refeições (Café da Manhã, lanche (manhã), Almoço, lanche(tarde), Jantar, ceia).
    Utilize apenas os alimentos disponíveis na seguinte lista: ${simplifiedFoodData}.
    ${allergies ? `Não inclua os seguintes alimentos: ${allergies}.` : ''}
    Retorne a resposta em formato JSON, como um array de objetos, onde cada objeto representa uma refeição e deve ter o seguinte formato: {id: <id da refeicao>, nome: <nome da refeicao>, alimentos: [{id: <id do alimento>, nome: <nome do alimento>, quantidade: <quantidade em gramas>, calorias: <calorias>, carboidratos: <carboidratos>, proteinas: <proteinas>, gorduras: <gorduras>}]}.
    A resposta deve ser apenas o JSON, sem nenhum texto adicional.`;

    const result = await runLLM(prompt)

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}