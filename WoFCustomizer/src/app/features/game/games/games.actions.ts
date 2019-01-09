import { Game } from "../game.model";

export class SetGameName {
    static type = "[Games] Set Game Name";
    constructor(public payload: {name: string} ) {}    
}

export class SetGame {
    static type = "[Games] Set Game";
    constructor(public payload: Game) {}    
}
