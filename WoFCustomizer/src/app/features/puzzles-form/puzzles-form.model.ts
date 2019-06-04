import { Puzzle } from "../game/puzzle/puzzle.model";

export interface PuzzlesFormModel {
    [catId:number]: {
        dirty: false,
        status: "",
        errors: {},
        model: { 
            puzzles: Puzzle[],
        },
    }
}

export const defaultPuzzlesFormModel = (): PuzzlesFormModel => ({});