import { Game } from "../game/game.model";

export class LoadGameForm {
    static type = "[Game Form] Load";
    constructor(public payload: { game: Game }) {}
}

export class LoadDefaultGameForm {
    static type = "[Game Form] Load Default";
}