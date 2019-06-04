import { Game } from "../game/game.model";

export interface GameFormModel {
    dirty: false,
    status: "",
    errors: {},
    model: Game,
}

export const defaultGameFormModel = ():GameFormModel => ({
    dirty: false,
    status: "",
    errors: {},
    model: {
        id: null,
        name: '',
        scrollingText: '',
        introText: ['','',''],
        categoryIds: []
    }
})