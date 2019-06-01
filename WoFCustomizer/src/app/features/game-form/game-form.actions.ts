import { Game } from "../game/game.model";

export class LoadGameForm {
    static type = "[Game Form] Load Game";
    constructor(public payload: { game: Game }) {}
}