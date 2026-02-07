import type { Request, Response } from "express";
import { runLLM } from "../services/llm.service";

export const getPortionRoute = async (req: Request, res: Response) => {
  try {
    const { foodName, portion } = req.query;

    const result = await runLLM(
      `Eu estou lhe utilizando para alimentar a minha aplicação com dados de refeições,
      com base no alimento ${foodName} quantos gramas tem uma porção de 1 ${portion}?
      Responda no formato json: { 'grams': '' }
    `)

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}