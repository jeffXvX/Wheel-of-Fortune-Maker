import { WoFConfig } from "./config.model";
import { defaultGame } from "../game/default-game.model";
import { defaultCategories } from "../game/categories/default_categories.model";
import { defaultPuzzles } from "../game/puzzles/default_puzzles.model";
import { environment } from "src/environments/environment";

export const defaultWoFConfig = (): WoFConfig => ({
    version: environment.version,
    games: [{
      game: defaultGame(0),
      categories: defaultCategories(),
      puzzles: defaultPuzzles(),
    }],
    //selectedGameIndex: 0,
  });
  