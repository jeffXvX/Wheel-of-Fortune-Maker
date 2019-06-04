import { GameConfig } from '../game-config/game-config.model';

export interface WoFConfig {
    games: GameConfig[],
    version: string,
    //selectedGameIndex: number,
    //selectedGame: number,
    //lastId: number,
}