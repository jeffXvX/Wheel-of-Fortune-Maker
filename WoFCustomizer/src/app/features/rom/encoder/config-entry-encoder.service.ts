import { Injectable } from '@angular/core';
import { Category } from '../../game/category/category.model';
import { Puzzles } from '../../game/puzzles/puzzles.model';
import { EncodedCategories } from './encoded-categories.model';
import { Puzzle } from '../../game/puzzle/puzzle.model';
import { EncodedPuzzle } from './encoded-puzzles.model';
import { catNameEncodeTable } from './category-name-tables.model';
import { combineUint8Arrays } from '../typed-array-helpers/combine-arrays.fn';
import { catNameLengthEncodeTable } from './category-name-length-tables.model';

@Injectable()
export class ConfigEntryEncoderService {

  constructor() { }

  /**
   * Create a data structure from the categories and puzzles
   * containing the encoded text and the address offsets.
   */
  encodeGame(categories: Category[], puzzles: Puzzles): EncodedCategories {
    // for now just hardcode the starting address
    // might not be needed anymore?
    let address = 0x89CE;

    return categories.map(category=>{
      const catAddress = address;
      console.log('catAddress: ',catAddress.toString(16));
      const encodedCategory = this.encodeCategoryName(category.name);
      const encodedPuzzles = this.encodePuzzles(puzzles[category.id], address);
      address = encodedPuzzles.nextAddress;

      return {
        ...encodedCategory,
        address: catAddress,
        puzzles: encodedPuzzles.puzzles
      }
    });
  }

  /**
   * Encode the puzzle solutions by setting the high bit 
   * on the last character of each line and also setting
   * the high bit on the second to last character of the
   * last line with values.
   * 
   * Also generate the addess of each puzzle.
   */
  encodePuzzles(puzzles: Puzzle[], initialAddress: number): {
    puzzles: EncodedPuzzle[],
    nextAddress: number 
  } {
    let address = initialAddress;

    const encodedPuzzles = puzzles.map(puzzle=>{
      let lines = [
        this.convertStringToCharacterCodes(puzzle.line1),
        this.convertStringToCharacterCodes(puzzle.line2),
        this.convertStringToCharacterCodes(puzzle.line3),
        this.convertStringToCharacterCodes(puzzle.line4)
      ];

      lines = this.setLastHighBits(lines);
      lines = this.setSecondToLastHighBitOnLastLine(lines);

      const encodedPuzzle = {
        puzzle: lines.reduce((puzzle: Uint8Array, line: Uint8Array)=>{
            return combineUint8Arrays(puzzle,line);
          }, new Uint8Array()),
        address: address
      }

      address = this.generateNextAddress(address, lines);
      return encodedPuzzle;
    });

    return { 
      puzzles: encodedPuzzles,
      nextAddress: address+1
    }
  }

  /**
   * Category names are not stored as plain AsCII or 
   * ASCII with high bits set in the rom so use the 
   * defined lookup table to convert the category 
   * names to the necessary encodings.
   * 
   * A category should always use 8 bytes with unused
   * space being set to 0x00.
   */
  encodeCategoryName(name: string): { 
    category: Uint8Array, 
    nameLength: number } {
    const categoryNameLength = 8;
    const categoryUnusedByte = 0x00;
    const category = new Uint8Array(categoryNameLength).fill(categoryUnusedByte);
    category.set(name.split('').map(char=>catNameEncodeTable[char]));
    return { 
      category: category, 
      nameLength: catNameLengthEncodeTable[name.length] 
    };
  }

  /**
   * Generate the address for the next puzzle based on 
   * the previous starting address and the puzzle solution.
   */
  generateNextAddress(startAddress: number, puzzle: Uint8Array[]) {
    return puzzle.reduce((length:number, line: Uint8Array)=>
      length + line.length,
      startAddress);
  }

  /**
   * Convert a string to an integer array representation
   */
  convertStringToCharacterCodes(str: string) {
    return new Uint8Array(str.split('').map(s=>s.charCodeAt(0)));
  }

  /**
   * Set the high bit of the last character of every line.
   */
  setLastHighBit(array: Uint8Array) {
    const newArray = new Uint8Array(array);
    if(newArray.length >0) {
      newArray[newArray.length-1] = newArray[newArray.length-1] | 0x80;
    }
    return newArray;
  }

  /**
   * Set the last high bit of each inner array of numbers.
   */
  setLastHighBits(arrays:Uint8Array[]) {
    const newArrays: Uint8Array[] = [];
    arrays.forEach(array=>{
      newArrays.push(this.setLastHighBit(array));
    });
    return newArrays;
  }

  /**
   * Set the high bit on the second to last character of the 
   * last line that has characters.
   * 
   * It is an error for the last line to have a single character
   * and for no line to have any characters.
   */
  setSecondToLastHighBitOnLastLine(lines: Uint8Array[]) {
    const newLines: Uint8Array[] = [...lines.map(line=>new Uint8Array(line))];

    for(let i=newLines.length-1; i >= 0; i--) {
      if(newLines[i].length > 1) {
        newLines[i][newLines[i].length-2] = newLines[i][newLines[i].length-2] | 0x80;
        break;
      }
      else if(newLines[i].length === 1) {
        console.error('Last line has only 1 character');
      }
      if(i === 0) {
        console.error('Puzzle has no solution');
      }
    }
    return newLines;
  }  
}
