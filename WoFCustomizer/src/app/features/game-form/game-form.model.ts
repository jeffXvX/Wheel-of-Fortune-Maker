import { Game } from "../game/game.model";

export interface GameFormModel {
    dirty: false,
    status: "",
    errors: {},
    model: Game,
}