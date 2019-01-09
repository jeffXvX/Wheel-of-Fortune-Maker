export interface Game {
    id: number;
    name: string;
    categoryIds: number[];
}

export function copyGame(game:Game) {
    return { 
        name: game.name, 
        id: game.id, 
        categoryIds: [...game.categoryIds] 
    };
}

export const puzzlesRequired = 1001;