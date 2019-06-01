import { GameConfig } from "../game/games/games.state";

export interface WoFConfig {
    games: GameConfig[],
    version: string,
    //selectedGameIndex: number,
    //selectedGame: number,
    //lastId: number,
}