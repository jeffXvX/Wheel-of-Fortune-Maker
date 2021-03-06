import { WoFConfig } from "./config.model";
import { GameConfig } from '../game-config/game-config.model';


export class CreateConfig {
    static readonly type = '[Config] Create Config';
}

export class SetConfig {
    static readonly type = '[Config] Set Config';
    constructor(public payload: WoFConfig) {}
}

export class SelectGameConfig {
    static readonly type = '[Config] Select Game Config';
    constructor(public payload: { id: number}) {}
}

export class AddGameConfig {
    static readonly type = '[Config] Add Game Config';
    constructor(public payload: GameConfig) {}
}

export class DeleteGameConfig {
    static readonly type = '[Config] Delete Game Config';
    constructor(public payload: { id: number}) {}
}

export class SetGameConfig {
    static readonly type = '[Config] Set Game Config';
    constructor(public payload: { gameConfig: GameConfig }) {}
}