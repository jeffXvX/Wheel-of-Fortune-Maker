import { Game } from "./game.model";

export const defaultGame = (id: number): Game => ({ 
    id: id,
    name: 'Default Game',
    categoryIds: [0,1,2,3,4,5,6,7,8],
    scrollingText: '',
    introText: new Array(3).fill(''),
});
