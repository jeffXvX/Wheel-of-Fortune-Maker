import { EncodedCategories } from "./encoded-categories.model";
import { EncodedIntro } from "./encoded-intro.model";

export interface EncodedGame {
    categories: EncodedCategories;
    intro: EncodedIntro;
}