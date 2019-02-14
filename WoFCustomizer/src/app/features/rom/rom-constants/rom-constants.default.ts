import { RomConstants } from "./rom-constants.model";

export const defaultRomConstants = (): RomConstants=>  ({
    md5: '',
    puzzlesRequired: 0,
    maxPuzzleCharacters: 0,
    numberOfCategories: 0,
    puzzlesStartAddress: 0,
    puzzlesUnusedSpaceValue: 0,
    puzzlePointersStartAddress: 0,
    puzzlePointerBytesSize: 0,
    ramAddressOffset: 0,
    categoryPointersStartAddress: 0,
    categoryPointerAddressSize: 0,
    numberOfCategoryAnswersAddresses: [],
    categoryNamesStartAddress: 0,
    categoryNameCharacterLength: 0,
    categoryUnusedSpaceValue: 0,
    categoryNameLengthsStartAddress: 0,  
});