import { Puzzle } from "../puzzle/puzzle.model";
import { Puzzles } from "./puzzles.model";

export class AddPuzzles {
    static type = "[Puzzles] Add Puzzles";
    constructor(public catId: number, public numPuzzles: number) {}    
}

export class DeletePuzzle {
    static type = "[Puzzles] Delete Puzzle";
    constructor(public catId: number, public puzzle: Puzzle) {}    
}

export class ResetPuzzles {
    static type = "[Puzzles] Reset Puzzles";
}

export class SetPuzzles {
    static type = "[Puzzles] Set Puzzles";
    constructor(public puzzles: Puzzles) {}    
}

export class SetPuzzleAnswerLine {
    static type = "[Puzzles] Set Answer Line";
    constructor(
        public catId: number,
        public puzzle: Puzzle, 
        public line: number, 
        public answer: string) {}    
}

export class SetPuzzleAnswer {
    static type = "[Puzzles] Set Answer";
    constructor(
        public catId: number,
        public puzzle: Puzzle, 
        public answer: string[]) {}    
}