import { Portion } from "../entities/portion";
import { sqlDataSource } from "../repositories/dataSource";
import { PortionRepository } from "../repositories/portion.repository";

interface PortionData {
  name: string;
  food_table: string;
  grams: number;
}

export const savePortion = async (data: PortionData) => {
  try {
    const portionRepository = new PortionRepository().build();
    
    const newPortion = portionRepository.create({
      name: data.name,
      food_table: data.food_table,
      grams: data.grams,
    });

    const savedPortion = await portionRepository.save(newPortion);
    return savedPortion;
  } catch (error) {
    console.error("Error saving portion to database:", error);
    throw new Error("Could not save portion data.");
  }
};
