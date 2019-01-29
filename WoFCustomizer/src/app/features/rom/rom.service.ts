import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { ConfigState } from '../config/config.state';
import { Category } from '../game/category/category.model';
import { Puzzles } from '../game/puzzles/puzzles.model';
import { catNameEncodeTable, catNameDecodeTable } from './category-name-tables.model';
import { Puzzle } from '../game/puzzle/puzzle.model';
import { combineLatest, Subject } from 'rxjs';
import { SetRomContents } from './rom.actions';
import { RomState } from './rom.state';
import { catNameLengthDecodeTable } from './category-name-length-tables.model';
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
      console.log('Solutions:\n',Array.from(contents.slice(solutionsStart,solutionsEnd)).map(num=>String.fromCharCode(num)));
      console.log('All new puzzles:\n',Array.from(allPuzzles).map(num=>String.fromCharCode(num)));
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
    const solutionPointersStart = 0x101FC;
    const solutionPointersEnd = solutionPointersStart + 2000;

    if(!environment.production) {
      const solutionPointers = contents.slice(solutionPointersStart,solutionPointersEnd);
      console.log('solution pointers:',Array.from(solutionPointers).map(num=>num.toString(16)));
    }

    const addresses = encodedCategories.reduce((addresses: number[], category, idx)=>{
      addresses.push(...category.puzzles.reduce((addresses: number[], puzzle)=>{
        addresses.push(...this.addressToBytes(puzzle.address));
        return addresses;
      },[]));
      return addresses;
    },[]);
    addresses.push(...new Array((solutionPointersEnd-solutionPointersStart) - addresses.length).fill(0x00));
    contents.set(addresses,solutionPointersStart);

    if(!environment.production) {
      const solutionPointers = contents.slice(solutionPointersStart,solutionPointersEnd);
      console.log('solution pointers after changing:',Array.from(solutionPointers).map(num=>num.toString(16)));
    }
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

  /**
   * Replace the category pointers to the first puzzle pointers 
   * representing the first puzzle for a particular category.
   * @param contents The rom file contents
   * @param encodedCategories The encoded config entry 
   */
  replaceCategoryPointers(
    contents: Uint8Array,
    encodedCategories: EncodedCategories) {
      let RamAddressOffset = 0x8010; // 32784
      let categoryPointersStart = 0x101E8;
      const categoryPointers = contents.slice(categoryPointersStart,categoryPointersStart + 18);
      console.log('category pointers:', Array.from(categoryPointers).map(num=>num.toString(16)));
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

  /**
   * Replace the entries that list how many puzzles are in a particular
   * category. 
   * @param contents The rom file contents
   * @param encodedCategories The encoded config entry 
   */
  replaceNumberOfPuzzlesInCategories(
    contents: Uint8Array,
    encodedCategories: EncodedCategories) {
    let numOfCategoryAnswersAddresses = [0x100DD, 0x100E9, 0x100F5, 0x10101, 0x1010D, 0x10119, 0x10125, 0x10131];

    let nca = [];
    numOfCategoryAnswersAddresses.forEach(address=>{
      if(!environment.production){
        console.log('grabbing address ',address,' to ',contents.slice(address,address+1));
      }
      nca.push(contents.slice(address,address+1));
    });

    const sizes = encodedCategories.reduce((sizes:number[], category)=>{
      sizes.push(category.puzzles.length);
      return sizes;
    },[]);

    if(!environment.production){
      console.log('num category answers:',nca.map(num=>num.toString(10)));
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
    let categoryNamesStart = 0x1483;
    let categoryNameLength = 8;
    let numberOfCategories = 9;
    let categoryUnusedByte = 0x00;
  
    let categoryNames = contents.slice(categoryNamesStart,categoryNamesStart + (categoryNameLength * numberOfCategories));

    console.log('category names:',Array.from(categoryNames).map(num=>catNameDecodeTable[num]));
    
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

  /**
   * Replace the category name lengths with the new lengths.
   * @param contents The rom file contents
   * @param encodedCategories The encoded config entry 
   */
  replaceCategoryNameLengths(
    contents: Uint8Array,
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
      this.replacePuzzlePointers(contents, encodedCategories);
      this.replaceCategoryPointers(contents, encodedCategories);
      this.replaceNumberOfPuzzlesInCategories(contents, encodedCategories);
      this.replaceCategoryNames(contents, encodedCategories);
      this.replaceCategoryNameLengths(contents, encodedCategories);
    
      this.writeBlob();
    });
  }

  writeBlob() {
    this.store.selectOnce(RomState.contents).subscribe(rom=>{
      let romBlob = new Blob([rom], {type: 'application/octet-stream'});
      if (this.romFile !== null) {
        window.URL.revokeObjectURL(this.romFile);
      }
      this.romFile = window.URL.createObjectURL(romBlob);
      this.sanitizedRomFileSubject.next(this.sanitizer.bypassSecurityTrustUrl(this.romFile));
    }); 
  }  

}

