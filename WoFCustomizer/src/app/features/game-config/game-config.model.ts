import { Game } from "../game/game.model";
import { Category } from "../game/category/category.model";
import { Puzzles } from "../game/puzzles/puzzles.model";

export interface GameConfig {
    game: Game,
    categories: Category[],
    puzzles: Puzzles
}

export interface GameConfigForm {
    form: {
        model: GameConfig,
        dirty: false,
        status: "",
        errors: {}
    }
}
