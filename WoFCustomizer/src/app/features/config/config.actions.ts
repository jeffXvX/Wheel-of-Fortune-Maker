import { WoFConfig, GameConfig } from "./config.model";

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
    constructor(public payload: GameConfig) {}
}