import { Puzzle } from "../puzzle/puzzle.model";

export interface Category {
    name: string;
    puzzles: Puzzle[];
}