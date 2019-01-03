import { Game } from "../game/game.model";
import { Category } from "../game/category/category.model";
import { Puzzles } from "../game/puzzle/puzzles.model";

export interface GameConfig {
    id: number,
    game: Game,
    categories: Category[],
    puzzles: Puzzles
}

export interface WoFConfig {
    games: GameConfig[],
    selectedGame: number,
    lastId: number,
}