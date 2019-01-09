import { WoFConfig } from "./config.model";
import { defaultGame } from "../game/default-game.model";
import { defaultCategories } from "../game/categories/default_categories.model";
import { defaultPuzzles } from "../game/puzzles/default_puzzles.model";

export const defaultWoFConfig = (): WoFConfig => ({
    games: [{
      game: defaultGame(0),
      categories: defaultCategories(),
      puzzles: defaultPuzzles(),
    }],
    //selectedGameIndex: 0,
  });
  