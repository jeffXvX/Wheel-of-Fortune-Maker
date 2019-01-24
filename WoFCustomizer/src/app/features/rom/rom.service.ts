import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { ConfigState } from '../config/config.state';
import { Category } from '../game/category/category.model';
import { Puzzles } from '../game/puzzles/puzzles.model';
import { catNameLookupTable } from './category-name-lookup-table.model';
import { Puzzle } from '../game/puzzle/puzzle.model';

@Injectable()
export class RomService {

  constructor(private store: Store) { }

  readRom(file: File) {
    const reader = new FileReader();
    reader.onloadend = pe => {
      const RamAddressOffset = 0x8010;

      // solutions
      let solutionsStart = 0x109DE;
      let solutionsEnd = 0x14619; //83480 is last charact, slice is exclusive on end index
      const puzzles = reader.result.slice(solutionsStart,solutionsEnd) as ArrayBuffer;
      let dv = new DataView(puzzles);

      let pa = [];
      for(let i = 0; i < solutionsEnd - solutionsStart; i++) {
        pa.push(dv.getUint8(i));
      }
      console.log('puzzle solutions:',String.fromCharCode(...pa));

      // solution addresses
      let solutionPointersStart = 0x101FC;
      let sa = [];
      const sapuzzles = reader.result.slice(solutionPointersStart,solutionPointersStart + 2002) as ArrayBuffer;
      let sadv = new DataView(sapuzzles);
      for(let i = 0; i <= 2000; i+=2) {
        sa.push(sadv.getUint16(i));
      }
      console.log('solution pointers:',sa.map(num=>num.toString(16)));

      //category pointers?  not sure what these are yet...
      let categoryPointersStart = 0x101E8;
      let cp = [];
      const cpPointers = reader.result.slice(categoryPointersStart,categoryPointersStart + 18) as ArrayBuffer;
      let cpdv = new DataView(cpPointers);
      for(let i = 0; i <= 16; i+=2) {
        cp.push(cpdv.getUint16(i));
      }
      console.log('category start pointers:',cp.map(num=>num.toString(16)));

      // number of solutions in category
      let numOfCategoryAnswersAddresses = [0x100DD, 0x100E9, 0x100F5, 0x10101, 0x1010D, 0x10119, 0x10125, 0x10131];
      let nca = [];
      numOfCategoryAnswersAddresses.forEach(address=>{
        let ncadv = new DataView(reader.result.slice(address,address+1) as ArrayBuffer);
        nca.push(ncadv.getUint8(0));
      });
      console.log('num category answers:',nca.map(num=>num.toString(10)));

      let categoryNamesStart = 0x1483;
      let categoryNameLength = 8;
      let categoryUnusedByte = 0x00;

      let categoryNameLengthStart = 0x1FAF;
      // 0x0C is 2 letter category name length, add 4 for each additional letter, max 7
      let categoryNameLength2 = 0x0C;
      let categoryNameLength3 = 0x10;
      let categoryNameLength4 = 0x14;
      let categoryNameLength5 = 0x18;
      let categoryNameLength6 = 0x1C;
      let categoryNameLength7 = 0x20;






      
      //console.log('rom:', reader.result.slice(68061,83480));
    };
    const text = reader.readAsArrayBuffer(file);
  }


  writeRom(id: number) {
    this.store.selectOnce(ConfigState.config).subscribe(config=>{
      const game = config.games[id].game;
      const categories = config.games[id].categories;
      const puzzles = config.games[id].puzzles;
      const encodedPuzzles = this.encodeSolutions(categories, puzzles);
      console.log(encodedPuzzles);
    });
  }

  /**
   * Create a data structure from the categories and puzzles
   * containing the encoded text and the address offsets.
   */
  encodeSolutions(categories: Category[], puzzles: Puzzles) {
    // for now just hardcode the starting address
    // might not be needed anymore?
    let address = 0x89CE;

    return categories.map(category=>({
        category: this.encodeCategoryName(category.name),
        address: address,
        puzzles: this.encodePuzzles(puzzles[category.id]) 
      }));
  }

  /**
   * Encode the puzzle solutions by setting the high bit 
   * on the last character of each line and also setting
   * the high bit on the second to last character of the
   * last line with values.
   * 
   * Also generate the addess of each puzzle.
   */
  encodePuzzles(puzzles: Puzzle[]) {
    let address = 0x89CE;

    return puzzles.map(puzzle=>{
      let lines = [
        this.convertStringToCharacterCodes(puzzle.line1),
        this.convertStringToCharacterCodes(puzzle.line2),
        this.convertStringToCharacterCodes(puzzle.line3),
        this.convertStringToCharacterCodes(puzzle.line4)
      ];

      lines = this.setLastHighBits(lines);
      lines = this.setSecondToLastHighBitOnLastLine(lines);

      const encodedPuzzle = {
        puzzle: lines.reduce((puzzle: number[], line: number[])=>{
            puzzle.push(...line)
            return puzzle;
          },[]),
        address: address
      }

      address = this.generateNextAddress(address, lines);

      return encodedPuzzle;
    })
  }

  /**
   * Category names are not stored as plain AsCII or 
   * ASCII with high bits set in the rom so use the 
   * defined lookup table to convert the category 
   * names to the necessary encodings.
   */
  encodeCategoryName(name: string) {
    return name.split('').map(char=>catNameLookupTable[char]);
  }

  /**
   * Generate the address for the next puzzle based on 
   * the previous starting address and the puzzle solution.
   */
  generateNextAddress(startAddress: number, puzzle: number[][]) {
    return puzzle.reduce((length:number, line: number[])=>
      length + line.length,
      startAddress);
  }

  /**
   * Convert a string to an integer array representation
   */
  convertStringToCharacterCodes(str: string) {
    return str.split('').map(s=>s.charCodeAt(0));
  }

  /**
   * Set the high bit of the last character of every line.
   */
  setLastHighBit(array: number[]) {
    const newArray = [...array];
    if(newArray.length >0) {
      newArray[newArray.length-1] = newArray[newArray.length-1] | 0x80;
    }
    return newArray;
  }

  /**
   * Set the last high bit of each inner array of numbers.
   */
  setLastHighBits(arrays: number[][]) {
    const newArrays: number[][] = [];
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
  setSecondToLastHighBitOnLastLine(lines: number[][]) {
    let lastLine: number[];

    const newLines: number[][] = [...lines.map(line=>[...line])];

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
