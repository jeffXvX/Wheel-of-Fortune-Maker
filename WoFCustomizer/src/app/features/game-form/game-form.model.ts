import { Game } from "../game/game.model";

export interface GameForm {
    dirty: false,
    status: "",
    errors: {},
    model: Game,
}