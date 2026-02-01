import{ Request, Response } from "express";

export const getPortionRoute = (req: Request, res: Response) => {
  res.json({ value: "Calculadora-dieta" });
}