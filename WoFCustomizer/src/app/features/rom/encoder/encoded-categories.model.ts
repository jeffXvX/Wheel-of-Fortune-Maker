import { EncodedPuzzles } from "./encoded-puzzles.model";
  
export interface EncodedCategory {
  category: Uint8Array;
  address: number;
  puzzles: EncodedPuzzles;
}

export type EncodedCategories = EncodedCategory[];