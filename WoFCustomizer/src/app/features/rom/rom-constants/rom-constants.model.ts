export interface RomConstants {
    // rom version checksum
    md5: string;
    
    // rom requirements
    puzzlesRequired: number;
    maxPuzzleCharacters: number;
    numberOfCategories: number;
  
    // puzzle
    puzzlesStartAddress: number;
    puzzlesUnusedSpaceValue: number;
  
    // puzzle pointers
    puzzlePointersStartAddress: number;
    puzzlePointerBytesSize: number;
  
    // category pointers
    ramAddressOffset: number;
    categoryPointersStartAddress: number;
    categoryPointerAddressSize: number;
  
    // num puzzles in categories
    numberOfCategoryAnswersAddresses: number[];
  
    // category names
    categoryNamesStartAddress: number;
    categoryNameCharacterLength: number;
    categoryUnusedSpaceValue: number;
  
    // category name lengths
    categoryNameLengthsStartAddress: number;
    
    // title screen
    titleScrollingTextStartAddress: number;   
    titleScrollingTextLength: number;
    titleScrollingTextWhiteSpaceChar: string;

    // intro screen
    introTextStartAddress: number;
    introTextLength: number;
    introTextWhiteSpaceChar: string;
    introTextLine1EndCharacters: number[];
    introTextLine2EndCharacters: number[];

}

export interface RomCalculatedConstants {
    puzzlesEndAddress: number;
    puzzlePointersEndAddress: number;
    categoryPointersEndAddress: number;
    categoryNamesEndAddress: number;
    categoryNameLengthsEndAddress: number;
    titleScrollingTextEndAddress: number;
    introTextEndAddress: number;
}

export interface AllRomConstants extends RomConstants, RomCalculatedConstants {}

