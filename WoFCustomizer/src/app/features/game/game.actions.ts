import { Game } from "./game.model";

export class SetGameName {
    static type = "[Game] Set Name";
    constructor(public payload: {name: string} ) {}    
}

export class SetGame {
    static type = "[Game] Set Game";
    constructor(public payload: Game) {}    
}

export class ResetGame {
    static type = "[Game] Reset Game";
}

export class SetIntroText {
    static type = "[Game] Set Intro Text";
    constructor(public payload: { text: string[] }) {}    
}

export class SetScrollingText {
    static type = "[Game] Set Scrolling Text";
    constructor(public payload: { text: string }) {}        
}
