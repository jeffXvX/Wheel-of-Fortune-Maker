import { Puzzle } from "../puzzle/puzzle.model";

export interface Category {
    id: number,
    name: string;
    puzzleIds: number[];
}