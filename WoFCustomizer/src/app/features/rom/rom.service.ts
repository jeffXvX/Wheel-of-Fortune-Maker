import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { ConfigState } from '../config/config.state';
import { Category } from '../game/category/category.model';
import { Puzzles } from '../game/puzzles/puzzles.model';
import { catNameEncodeTable, catNameDecodeTable } from './category-name-tables.model';
import { Puzzle } from '../game/puzzle/puzzle.model';
import { combineLatest } from 'rxjs';
import { SetRomContents } from './rom.actions';
import { RomState } from './rom.state';
import { catNameLengthDecodeTable } from './category-name-length-tables.model';


@Injectable()
export class RomService {

  constructor(private store: Store) { }

  readRom(file: File) {
    const reader = new FileReader();
    reader.onloadend = pe => {

      const RomFileBuffer = reader.result as ArrayBuffer;

      const contents = this.convertArrayBufferToArray(RomFileBuffer);
      console.log("file contents:\n",contents);
      this.store.dispatch(new SetRomContents({ contents: contents }));


      /*
      



      */
    };
    const text = reader.readAsArrayBuffer(file);
  }

  convertArrayBufferToArray(buffer: ArrayBuffer) {
    const array = new Array<number>(buffer.byteLength);
    const dataView = new DataView(buffer);
    for(let i=0;i<array.length;i++) {
      array[i] = dataView.getUint8(i);
    }
    return array;
  }

  replacePuzzleSolutions(
    contents: number[], 
    encodedCategories: EncodedCategories) {
    const solutionsStart = 0x109DE;
    const solutionsEnd = 0x14618; 
    
    contents.slice(solutionsStart,solutionsEnd)

    console.log('Solutions:\n',contents.slice(solutionsStart,solutionsEnd).map(num=>String.fromCharCode(num)));

    //console.log('puzzle solutions:',String.fromCharCode(...pa));
    //const puzzles = reader.result.slice(solutionsStart,solutionsEnd) as ArrayBuffer;      
    
    //let dv = new DataView(puzzles);
    
    //let pa = [];
    /*
    for(let i = solutionsStart; i < solutionsEnd - solutionsStart; i++) {
      pa.push(dv.getUint8(i));
    }
    console.log('puzzle solutions:',String.fromCharCode(...pa));
    */

  }

  replacePuzzleAddresses(
    contents: number[],
    encodedCategories: EncodedCategories) {
    let solutionPointersStart = 0x101FC;
    const solutionPointers = contents.slice(solutionPointersStart,solutionPointersStart + 2000);
    console.log('solution pointers:',solutionPointers.map(num=>num.toString(16)));

    /*
      // solution addresses
      let solutionPointersStart = 0x101FC;
      let sa = [];
      const sapuzzles = reader.result.slice(solutionPointersStart,solutionPointersStart + 2002) as ArrayBuffer;
      let sadv = new DataView(sapuzzles);
      for(let i = 0; i <= 2000; i+=2) {
        sa.push(sadv.getUint16(i));
      }
      console.log('solution pointers:',sa.map(num=>num.toString(16)));
    */
  }

  replaceCategoryPointers(
    contents: number[],
    encodedCategories: EncodedCategories) {
      let RamAddressOffset = 0x8010; // 32784
      let categoryPointersStart = 0x101E8;
      const categoryPointers = contents.slice(categoryPointersStart,categoryPointersStart + 18);
      console.log('category pointers:',categoryPointers.map(num=>num.toString(16)));
      /*
      //category pointers?  not sure what these are yet...
      let categoryPointersStart = 0x101E8;
      let cp = [];
      const cpPointers = reader.result.slice(categoryPointersStart,categoryPointersStart + 18) as ArrayBuffer;
      let cpdv = new DataView(cpPointers);
      for(let i = 0; i <= 16; i+=2) {
        cp.push(cpdv.getUint16(i));
      }
      console.log('category start pointers:',cp.map(num=>num.toString(16)));

      //offset because the pointer is pointing to the address in ram, not in the rom.  Need to stop forgetting that...
      let fpdv = new DataView(reader.result.slice(33260 + RamAddressOffset,33262 + RamAddressOffset) as ArrayBuffer);

      */
  }

  replaceNumberOfPuzzlesInCategories(
    contents: number[],
    encodedCategories: EncodedCategories) {
    let numOfCategoryAnswersAddresses = [0x100DD, 0x100E9, 0x100F5, 0x10101, 0x1010D, 0x10119, 0x10125, 0x10131];

    let nca = [];
    numOfCategoryAnswersAddresses.forEach(address=>{
      nca.push(contents.slice(address,address+1));
    });

    console.log('num category answers:',nca.map(num=>num.toString(10)));
    /*
    // number of solutions in category
    let numOfCategoryAnswersAddresses = [0x100DD, 0x100E9, 0x100F5, 0x10101, 0x1010D, 0x10119, 0x10125, 0x10131];
    let nca = [];
    numOfCategoryAnswersAddresses.forEach(address=>{
      let ncadv = new DataView(reader.result.slice(address,address+1) as ArrayBuffer);
      nca.push(ncadv.getUint8(0));
    });
    console.log('num category answers:',nca.map(num=>num.toString(10)));
    */
  }

  replaceCategoryNames(
    contents: number[],
    encodedCategories: EncodedCategories) {
    let categoryNamesStart = 0x1483;
    let categoryNameLength = 8;
    let numberOfCategories = 9;
    let categoryUnusedByte = 0x00;
  
    let categoryNames = contents.slice(categoryNamesStart,categoryNamesStart + (categoryNameLength * numberOfCategories));

    console.log('category names:',categoryNames.map(num=>catNameDecodeTable[num]));
    
    /*
    // category names, not working yet...
    let cnDV = new DataView(reader.result.slice(categoryNamesStart,(categoryNamesStart * categoryNameLength * 9) + 1) as ArrayBuffer);
    let cnArr = [];
    for(let i=0; i < (categoryNameLength * 9); i++) {
      cnArr.push(cnDV.getUint8(i));
    }
    // num.toString(16) 
    console.log('category names:',cnArr.map(num=>catNameDecodeTable[num]));
    */
  }

  replaceCategoryNameLengths(
    contents: number[],
    encodedCategories: EncodedCategories) {
    let categoryNameLengthStart = 0x1FAF;
    let categoryNameLengthEnd = categoryNameLengthStart + 9;
    const categoryNameLengths = contents.slice(categoryNameLengthStart,categoryNameLengthEnd);
    let cnlArr = [];
    for(let i=0; i < 9; i++) {
      cnlArr.push(categoryNameLengths[i]);
    }
    console.log('category name lengths:',categoryNameLengths.map(num=>catNameLengthDecodeTable[num]));

    //console.log('rom:', reader.result.slice(68061,83480));

  }


  writeRom(id: number) {
    combineLatest(
      this.store.selectOnce(RomState.contents),
      this.store.selectOnce(ConfigState.config))
    .subscribe(([contents, config])=>{
      console.log('Store data for Rom Writing:\n', config, contents);
      const game = config.games[id].game;
      const categories = config.games[id].categories;
      const puzzles = config.games[id].puzzles;

      const encodedCategories = this.encodeGame(categories, puzzles);

      this.replacePuzzleSolutions(contents, encodedCategories);
      this.replacePuzzleAddresses(contents, encodedCategories);
      this.replaceCategoryPointers(contents, encodedCategories);
      this.replaceNumberOfPuzzlesInCategories(contents, encodedCategories);
      this.replaceCategoryNames(contents, encodedCategories);
      this.replaceCategoryNameLengths(contents, encodedCategories);
      
    });
  }

  

  /**
   * Create a data structure from the categories and puzzles
   * containing the encoded text and the address offsets.
   */
  encodeGame(categories: Category[], puzzles: Puzzles): EncodedCategories {
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
  encodePuzzles(puzzles: Puzzle[]): EncodedPuzzle[] {
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
  encodeCategoryName(name: string): number[] {
    return name.split('').map(char=>catNameEncodeTable[char]);
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


export interface EncodedPuzzle {
  puzzle: number[];
  address: number;
}

export interface EncodedCategory {
  category: number[];
  address: number;
  puzzles: EncodedPuzzle[];
}

export type EncodedCategories = EncodedCategory[];