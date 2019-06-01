import { Puzzles } from './../game/puzzles/puzzles.model';

export class LoadPuzzles {
    static type = "[Puzzles Form] Load Puzzles";

    constructor(public payload: { puzzles: Puzzles}) {}
}