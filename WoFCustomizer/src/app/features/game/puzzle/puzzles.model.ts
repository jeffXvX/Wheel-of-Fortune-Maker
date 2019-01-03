import { Puzzle } from "./puzzle.model";

export interface Puzzles { 
    [categoryId: number]: Puzzle[] 
};

export function copyPuzzles(puzzles: Puzzles): Puzzles {
    return Object.keys(puzzles).reduce((newPuzzles: Puzzles, cId)=>{
        newPuzzles[cId] = puzzles[cId].map((puzzle:Puzzle)=>({...puzzle}));
        return newPuzzles;
    },
    {});
}