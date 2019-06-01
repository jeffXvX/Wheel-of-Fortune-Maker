import { GameConfig } from "./game-config.model";

export class LoadGameConfig {
    static readonly type = '[Game Config] Load Config';

    constructor(public payload: { config: GameConfig }) {}
}
