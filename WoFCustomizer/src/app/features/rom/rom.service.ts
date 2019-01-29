import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { ConfigState } from '../config/config.state';
import { Category } from '../game/category/category.model';
import { Puzzles } from '../game/puzzles/puzzles.model';
import { catNameEncodeTable, catNameDecodeTable } from './encoder/category-name-tables.model';
import { Puzzle } from '../game/puzzle/puzzle.model';
import { combineLatest, Subject } from 'rxjs';
import { SetRomContents } from './rom.actions';
import { RomState } from './rom.state';
import { catNameLengthDecodeTable } from './encoder/category-name-length-tables.model';
import { EncodedCategories, EncodedCategory } from './encoder/encoded-categories.model';
import { ConfigEntryEncoderService } from './encoder/config-entry-encoder.service';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { EncodedPuzzle } from './encoder/encoded-puzzles.model';
import { combineUint8Arrays } from './typed-array-helpers/combine-arrays.fn';
import { maxCharacters } from '../game/game.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class RomService {
  sanitizedRomFileSubject = new Subject<SafeUrl>();
  romFile: string;

  constructor(
    private store: Store, 
    private encoder: ConfigEntryEncoderService, 
    private sanitizer: DomSanitizer) { }

  /**
   * Read the given file into the store so that 
   * it can later be modified and written back out.
   * @param file The file to read.
   */
  readRom(file: File) {
    const reader = new FileReader();
    reader.onloadend = pe => {
      const RomFileBuffer = reader.result as ArrayBuffer;
      const contents = this.convertArrayBufferToArray(RomFileBuffer);
      console.log("file contents:\n",contents);
      this.store.dispatch(new SetRomContents({ contents: contents }));
    };
    const text = reader.readAsArrayBuffer(file);
  }

  /**
   * Convert the type of the file contents into an 
   * editable array.
   * @param buffer The buffer to convert to an array.
   */
  convertArrayBufferToArray(buffer: ArrayBuffer) {
    //const array = new Array<number>(buffer.byteLength);
    const array = new Uint8Array(buffer.byteLength);
    const dataView = new DataView(buffer);
    for(let i=0;i<array.length;i++) {
      array[i] = dataView.getUint8(i);
    }
    return array;
  }

  /**
   * Replace the puzzle solutions text in the rom
   * with the solutions specified by a config entry.
   * @param contents The rom file contents
   * @param encodedCategories The encoded config entry 
   */
  replacePuzzleSolutions(
    contents: Uint8Array, 
    encodedCategories: EncodedCategories) {
    const solutionsStart = 0x109DE;
    const solutionsEnd = 0x109DE + maxCharacters;
    const unusedPuzzleSpace = 0xFF;
    const unfilledPuzzlesArray = new Uint8Array(maxCharacters).fill(unusedPuzzleSpace);

    let allPuzzles = encodedCategories.reduce(
      (puzzles: Uint8Array, category: EncodedCategory)=>combineUint8Arrays(category.puzzles.reduce(
        (puzzles: Uint8Array, puzzle: EncodedPuzzle)=>combineUint8Arrays(puzzles, puzzle.puzzle),
        new Uint8Array()),puzzles),
      new Uint8Array());

    allPuzzles = combineUint8Arrays(allPuzzles, unfilledPuzzlesArray.slice(allPuzzles.length,unfilledPuzzlesArray.length));
     
    if(!environment.production) {    
      console.log('Puzzles:\n',Array.from(contents.slice(solutionsStart,solutionsEnd)).map(num=>String.fromCharCode(num)));
      console.log('New puzzles:\n',Array.from(allPuzzles).map(num=>String.fromCharCode(num)));
    }

    contents.set(allPuzzles,solutionsStart);
  }

  /**
   * Replace the pointers to the first characters of each puzzle.
   * @param contents The rom file contents
   * @param encodedCategories The encoded config entry 
   */
  replacePuzzlePointers(
    contents: Uint8Array,
    encodedCategories: EncodedCategories) {
    const puzzlePointersStart = 0x101FC;
    const puzzlePointersEnd = puzzlePointersStart + 2000;

    if(!environment.production) {
      const solutionPointers = contents.slice(puzzlePointersStart,puzzlePointersEnd);
      console.log('Puzzle pointers:',Array.from(solutionPointers).map(num=>num.toString(16)));
    }

    let lastCategoryPointer = puzzlePointersStart;
    const categoryPointers = new Array<number>(9);
    const addresses = encodedCategories.reduce((addresses: number[], category, i)=>{
      categoryPointers[i] = lastCategoryPointer;
      addresses.push(...category.puzzles.reduce((addresses: number[], puzzle)=>{
        addresses.push(...this.addressToBytes(puzzle.address));
        lastCategoryPointer += 2; // each pointer takes up 2 bytes so move ahead 2 bytes to the next puzzle
        return addresses;
      },[]));
      return addresses;
    },[]);
    addresses.push(...new Array((puzzlePointersEnd-puzzlePointersStart) - addresses.length).fill(0x00));
    contents.set(addresses,puzzlePointersStart);

    if(!environment.production) {
      const solutionPointers = contents.slice(puzzlePointersStart,puzzlePointersEnd);
      console.log('New puzzle pointers:',Array.from(solutionPointers).map(num=>num.toString(16)));
    }

    return categoryPointers;
  }

  /**
   * Replace the category pointers to the first puzzle pointers 
   * representing the first puzzle for a particular category.
   * @param contents The rom file contents
   * @param encodedCategories The encoded config entry 
   */
  replaceCategoryPointers(
    contents: Uint8Array,
    encodedCategories: EncodedCategories,
    categoryPointers: number[]) {
      const RamAddressOffset = 0x8010; // 32784
      const solutionPointersStart = 0x101FC;
      const categoryPointersStart = 0x101E8;
      const categoryPointersEnd = categoryPointersStart + 18;
      
      if(!environment.production){
        console.log('Passed category pointers: ', categoryPointers.map(num=>(num - RamAddressOffset).toString(16)));
        let romCategoryPointers = Array.from(contents.slice(categoryPointersStart,categoryPointersEnd)).map(num=>num.toString(16));
        console.log('Rom Category Pointers:', romCategoryPointers);
      }

      const fixedPointers = categoryPointers.reduce((pointers: number[], pointer)=>{
        pointers.push(...this.addressToBytes(pointer - RamAddressOffset));
        return pointers;
      },[]);
      
      /*
      const catPointers = encodedCategories.reduce((catPointers: Uint8Array, category, i)=>{
        console.log('cat add math: ',category.address.toString(16),' + ', RamAddressOffset.toString(16), ' = ',(category.address + RamAddressOffset).toString(16));
        catPointers.set(this.addressToBytes(category.address + RamAddressOffset), i * 2);
        return catPointers;
      },new Uint8Array(categoryPointersEnd-categoryPointersStart));
      */

      contents.set(fixedPointers,categoryPointersStart);

      if(!environment.production) {
        let romCategoryPointers = Array.from(contents.slice(categoryPointersStart,categoryPointersEnd)).map(num=>num.toString(16));
        console.log('New Category Pointers:', romCategoryPointers);
      }
  }

  /**
   * Replace the entries that list how many puzzles are in a particular
   * category. 
   * @param contents The rom file contents
   * @param encodedCategories The encoded config entry 
   */
  replaceNumberOfPuzzlesInCategories(
    contents: Uint8Array,
    encodedCategories: EncodedCategories) {
    const numOfCategoryAnswersAddresses = [0x100DD, 0x100E9, 0x100F5, 0x10101, 0x1010D, 0x10119, 0x10125, 0x10131];

    if(!environment.production){
      let nca = [];
      numOfCategoryAnswersAddresses.forEach(address=>{
        console.log('grabbing address ',address,' to ',contents.slice(address,address+1));
        nca.push(contents.slice(address,address+1));
      });
      console.log('num category answers:',nca.map(num=>num.toString(10)));
    }

    const sizes = encodedCategories.reduce((sizes:number[], category)=>{
      sizes.push(category.puzzles.length);
      return sizes;
    },[]);

    if(!environment.production){
      console.log('calculated sizes:\n',sizes);
    }

    numOfCategoryAnswersAddresses.forEach((addr,idx)=>{
      contents[addr] = sizes[idx];
      if(!environment.production){
        console.log('setting address ',addr,' to ',contents.slice(addr,addr+1));
      }
    })
  }

  /**
   * Replace the category names with the config entry category names. 
   * @param contents The rom file contents
   * @param encodedCategories The encoded config entry 
   */
  replaceCategoryNames(
    contents: Uint8Array,
    encodedCategories: EncodedCategories) {
    const categoryNamesStart = 0x1483;
    const categoryNameLength = 8;
    const numberOfCategories = 9;
    const categoryUnusedByte = 0x00;
    const categoryNamesEnd = categoryNamesStart + (categoryNameLength * numberOfCategories);

    if(!environment.production){
      let categoryNames = contents.slice(categoryNamesStart,categoryNamesEnd);
      console.log('category names:',Array.from(categoryNames).map(num=>catNameDecodeTable[num]));
    }

    const categoryData = new Uint8Array(categoryNamesEnd-categoryNamesStart).fill(categoryUnusedByte);
    const encodedCategoryData = encodedCategories.reduce((categoryData: Uint8Array,category)=>{
      if(!environment.production){ console.log('category name:',category.category); }
      return combineUint8Arrays(categoryData,category.category);
    }, new Uint8Array());

    categoryData.set(encodedCategoryData);

    contents.set(categoryData,categoryNamesStart);

    if(!environment.production){
      let categoryNames = contents.slice(categoryNamesStart,categoryNamesEnd);
      console.log('changed category names:',Array.from(categoryNames).map(num=>catNameDecodeTable[num]));
    }
  }

  /**
   * Replace the category name lengths with the new lengths.
   * @param contents The rom file contents
   * @param encodedCategories The encoded config entry 
   */
  replaceCategoryNameLengths(
    contents: Uint8Array,
    encodedCategories: EncodedCategories) {
    const categoryNameLengthsStart = 0x1FAF;
    const categoryNameLengthsEnd = categoryNameLengthsStart + 9;

    if(!environment.production) {
      let categoryNameLengths = contents.slice(categoryNameLengthsStart,categoryNameLengthsEnd);
      console.log('category name lengths:',categoryNameLengths.map(num=>catNameLengthDecodeTable[num]));
    }

    const nameLengths = encodedCategories.reduce((lengths:Uint8Array,category, i)=>{
      lengths[i] = category.nameLength;
      console.log('building lengths:\n',lengths);
      return lengths;
    },new Uint8Array(categoryNameLengthsEnd- categoryNameLengthsStart));
    
    contents.set(nameLengths,categoryNameLengthsStart);

    if(!environment.production) {
      let categoryNameLengths = contents.slice(categoryNameLengthsStart,categoryNameLengthsEnd);
      console.log('new category name lengths:',categoryNameLengths.map(num=>catNameLengthDecodeTable[num]));
    }
  }

  /**
   * Replace a previously read in rom file's contents
   * with the data represented by a particular loaded config.
   * @param id The id of the config to replace the roms contents with.
   */
  writeRom(id: number) {
    combineLatest(
      this.store.selectOnce(RomState.contents),
      this.store.selectOnce(ConfigState.config))
    .subscribe(([contents, config])=>{
      console.log('Store data for Rom Writing:\n', config, contents);
      const game = config.games[id].game;
      const categories = config.games[id].categories;
      const puzzles = config.games[id].puzzles;
      const encodedCategories = this.encoder.encodeGame(categories, puzzles);

      this.replacePuzzleSolutions(contents, encodedCategories);
      const categoryPointers = this.replacePuzzlePointers(contents, encodedCategories);
      this.replaceCategoryPointers(contents, encodedCategories, categoryPointers);
      this.replaceNumberOfPuzzlesInCategories(contents, encodedCategories);
      this.replaceCategoryNames(contents, encodedCategories);
      this.replaceCategoryNameLengths(contents, encodedCategories);
      this.writeBlob(contents);
    });
  }

  /**
   * Write a byte array to a blob and push the result out 
   * through the subject to listeners.
   */
  writeBlob(contents: Uint8Array) {
    let romBlob = new Blob([contents], {type: 'application/octet-stream'});
    if (this.romFile !== null) {
      window.URL.revokeObjectURL(this.romFile);
    }
    this.romFile = window.URL.createObjectURL(romBlob);
    this.sanitizedRomFileSubject.next(this.sanitizer.bypassSecurityTrustUrl(this.romFile));
  }  

  /**
   * Return an array of 2 bytes represening a 16 bit
   * pointer from a single 16 bit value.
   * NES uses opposite endianness so swap the bytes.
   * @param address The 16 bit input value
   */
  addressToBytes(address:number) {
    const highByte = address & 0x00FF;
    const lowByte = (address & 0xFF00) >> 8;
    return [highByte, lowByte]; 
  }


}

