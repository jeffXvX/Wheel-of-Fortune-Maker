import { Game } from "./game.model";

export const defaultGame = (): Game => ({ 
    name: 'NewGame',
    categoryIds: [0,1,2,3,4,5,6,7,8]
});
