import { Puzzle } from "./puzzle.model";

export interface Puzzles { 
    [columnId: number]: Puzzle[] 
};