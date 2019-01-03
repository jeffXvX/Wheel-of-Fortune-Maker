export interface Game {
    name: string;
    categoryIds: number[];
}

export function copyGame(game:Game) {
    return { name: game.name, categoryIds: [...game.categoryIds] };
}

export const puzzlesRequired = 1001;