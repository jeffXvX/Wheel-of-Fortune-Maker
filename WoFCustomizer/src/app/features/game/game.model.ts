export interface Game {
    id: number;
    name: string;
    scrollingText: string;
    introText: string[];
    categoryIds: number[];
}

export function copyGame(game:Game) {
    return { 
        name: game.name, 
        id: game.id,
        scrollingText: game.scrollingText,
        introText: game.introText,
        categoryIds: [...game.categoryIds] 
    };
}

export const puzzlesRequired = 1001;
export const maxCharacters = 30130;

