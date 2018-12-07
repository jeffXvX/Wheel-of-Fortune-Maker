import { Puzzle } from "./puzzle.model";

export class AddPuzzles {
    static type = "[Puzzles] Add Puzzles";
    constructor(public catId: number, public numPuzzles: number) {}    
}

export class DeletePuzzle {
    static type = "[Puzzles] Delete Puzzle";
    constructor(public catId: number, public puzzle: Puzzle) {}    
}

export class SetPuzzleAnswerLine {
    static type = "[Puzzles] Set Answer Line";
    constructor(
        public catId: number,
        public puzzle: Puzzle, 
        public line: number, 
        public answer: string) {}    
}