import { EncodedPuzzles } from "./encoded-puzzles.model";
  
export interface EncodedCategory {
  category: Uint8Array;
  nameLength: number;
  address: number;
  puzzles: EncodedPuzzles;
}

export type EncodedCategories = EncodedCategory[];