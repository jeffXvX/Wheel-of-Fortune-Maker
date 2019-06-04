import { Puzzles } from './../game/puzzles/puzzles.model';

export class LoadPuzzlesForm {
    static type = "[Puzzles Form] Load";
    constructor(public payload: { puzzles: Puzzles}) {}
}

export class LoadDefaultPuzzlesForm {
    static type = "[Puzzles Form] Load Default";
}