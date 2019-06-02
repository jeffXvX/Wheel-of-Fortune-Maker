import { Puzzles } from './../game/puzzles/puzzles.model';

export class LoadPuzzlesForm {
    static type = "[Puzzles Form] Load Puzzles";

    constructor(public payload: { puzzles: Puzzles}) {}
}