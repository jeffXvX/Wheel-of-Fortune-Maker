import { RomConstants } from "../rom-constants/rom-constants.model";

/**
 * These values are for the initial USA release of WoF. 
 */
export const USANoRev: RomConstants = {
    md5: "700eae7a34c5adb877a7052882ca8086",
    puzzlesRequired: 1001,
    maxPuzzleCharacters: 30130,
    numberOfCategories: 9,
    ramAddressOffset: 0x8010,
    puzzlesStartAddress: 0x109DE,
    puzzlesUnusedSpaceValue: 0xFF,
    puzzlePointersStartAddress: 0x101FC,
    puzzlePointerBytesSize: 2,
    categoryPointersStartAddress: 0x101E8,
    categoryPointerAddressSize: 2,
    numberOfCategoryAnswersAddresses: [
        0x100DD, 0x100E9, 0x100F5, 0x10101, 0x1010D, 0x10119, 0x10125, 0x10131
    ],
    categoryNamesStartAddress: 0x1483,
    categoryNameCharacterLength: 8,
    categoryUnusedSpaceValue:  0x00,
    categoryNameLengthsStartAddress: 0x1FAF,

    titleScrollingTextStartAddress: 0x0462,   
    titleScrollingTextLength: 72,
    titleScrollingTextWhiteSpaceChar: ',',

    introTextStartAddress: 0x0D47,
    introTextLength: 113,
    introTextWhiteSpaceChar: ',',

 
}

