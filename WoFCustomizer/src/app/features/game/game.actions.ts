import { Game } from "./game.model";

export class SetGameName {
    static type = "[Game] Set Name";
    constructor(public payload: {name: string} ) {}    
}

export class SetGame {
    static type = "[Game] Set Game";
    constructor(public payload: Game) {}    
}

export class ResetGame {
    static type = "[Game] Reset Game";
}
