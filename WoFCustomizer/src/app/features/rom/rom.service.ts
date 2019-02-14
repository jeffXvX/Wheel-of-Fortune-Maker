import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Md5 } from 'ts-md5/dist/md5';
import { ConfigState } from '../config/config.state';
import { combineLatest, Subject } from 'rxjs';
import { catNameDecodeTable } from './encoder/category-name-tables.model';
import { SetRomContents } from './rom.actions';
import { RomState } from './rom.state';
import { catNameLengthDecodeTable } from './encoder/category-name-length-tables.model';
import { EncodedCategories, EncodedCategory } from './encoder/encoded-categories.model';
import { ConfigEntryEncoderService } from './encoder/config-entry-encoder.service';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { EncodedPuzzle } from './encoder/encoded-puzzles.model';
import { combineUint8Arrays } from './typed-array-helpers/combine-arrays.fn';
import { environment } from 'src/environments/environment';
import { RomConstantsState } from './rom-constants/rom-constants.state';
import { AllRomConstants } from './rom-constants/rom-constants.model';
import { ErrorHandlingService } from '../error-handling/error-handling.service';
import { AppErrorCode, AppErrorStatus, AppError, AppErrorMessages } from '../error-handling/error/error.model';
import { RomConstantsService } from './rom-constants/rom-constants.service';

@Injectable()
export class RomService {
  sanitizedRomFileSubject = new Subject<SafeUrl>();
  romFile: string;

  constructor(
    private store: Store, 
    private encoder: ConfigEntryEncoderService,
    private errorService: ErrorHandlingService,
    private romConstantsService: RomConstantsService,
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

      this.verifyChecksum(contents);

      if(!environment.production){
        console.log("file contents:\n",contents);
      }
      
      this.store.dispatch(new SetRomContents({ contents: contents }));
    };
    const text = reader.readAsArrayBuffer(file);
  }

  verifyChecksum(contents: Uint8Array) {
    this.store.selectOnce(RomConstantsState.md5).subscribe(md5=>{
      const checksummer = new Md5();
      checksummer.appendByteArray(contents);
      const hash = checksummer.end();

      if(!environment.production){
        console.log('Rom md5 hash: ', hash);
        console.log('Supported md5 hash: ', md5);
      }

      const checksumPassed = md5 === hash;

      if(!checksumPassed) {

        const checksumError: AppError = {
          code: AppErrorCode.ROM_VERSION,
          message: AppErrorMessages.ROM_VERSION,
          status: AppErrorStatus.UNREAD
        };

        this.errorService.newError(checksumError, true);
      }
      if(!environment.production){
        console.log('checksumPassed?: ',checksumPassed);
      }
    });
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
    encodedCategories: EncodedCategories,
    romConstants: AllRomConstants) {

    const unfilledPuzzlesArray = new Uint8Array(romConstants.maxPuzzleCharacters)
      .fill(romConstants.puzzlesUnusedSpaceValue);

    let allPuzzles = encodedCategories.reduce(
      (puzzles: Uint8Array, category: EncodedCategory)=>combineUint8Arrays(puzzles, category.puzzles.reduce(
        (puzzles: Uint8Array, puzzle: EncodedPuzzle)=>
        {
          //console.log('Puzzle: ',Array.from(puzzle.puzzle).map(num=>String.fromCharCode(num)));
          return combineUint8Arrays(puzzles, puzzle.puzzle)
        },
        new Uint8Array())),
      new Uint8Array());

    allPuzzles = combineUint8Arrays(allPuzzles, unfilledPuzzlesArray.slice(allPuzzles.length,unfilledPuzzlesArray.length));
     
    if(!environment.production) {    
      console.log('Puzzles:\n', Array
        .from(contents.slice(romConstants.puzzlesStartAddress,romConstants.puzzlesEndAddress))
        .map(num=>String.fromCharCode(num)));
      console.log('New puzzles:\n',Array.from(allPuzzles).map(num=>String.fromCharCode(num)));
    }

    contents.set(allPuzzles,romConstants.puzzlesStartAddress);
  }

  /**
   * Replace the pointers to the first characters of each puzzle.
   * @param contents The rom file contents
   * @param encodedCategories The encoded config entry 
   */
  replacePuzzlePointers(
    contents: Uint8Array,
    encodedCategories: EncodedCategories,
    romConstants: AllRomConstants) {

    if(!environment.production) {

      const solutionPointers = contents.slice(
        romConstants.puzzlePointersStartAddress,
        romConstants.puzzlePointersEndAddress);

      console.log('Puzzle pointers:',Array
        .from(solutionPointers)
        .map(num=>num.toString(16)));
    }

    let lastCategoryPointer = romConstants.puzzlePointersStartAddress;
    const categoryPointers = new Array<number>(romConstants.numberOfCategories);
    const addresses = encodedCategories.reduce((addresses: number[], category, i)=>{
      categoryPointers[i] = lastCategoryPointer;
      addresses.push(...category.puzzles.reduce((addresses: number[], puzzle)=>{
        addresses.push(...this.addressToBytes(puzzle.address));
        lastCategoryPointer += romConstants.categoryPointerAddressSize;
        return addresses;
      },[]));
      return addresses;
    },[]);
    addresses.push(...new Array((romConstants.puzzlePointersEndAddress - romConstants.puzzlePointersStartAddress) - addresses.length).fill(0x00));
    contents.set(addresses,romConstants.puzzlePointersStartAddress);

    if(!environment.production) {
      const solutionPointers = contents.slice(romConstants.puzzlePointersStartAddress,romConstants.puzzlePointersEndAddress);
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
    categoryPointers: number[],
    romConstants: AllRomConstants) {

      if(!environment.production){
        console.log('Passed category pointers: ', categoryPointers.map(num=>(num - romConstants.ramAddressOffset).toString(16)));
        let romCategoryPointers = Array
          .from(contents.slice(romConstants.categoryPointersStartAddress, romConstants.categoryPointersEndAddress))
          .map(num=>num.toString(16));
        console.log('Rom Category Pointers:', romCategoryPointers);
      }

      const fixedPointers = categoryPointers.reduce((pointers: number[], pointer)=>{
        pointers.push(...this.addressToBytes(pointer - romConstants.ramAddressOffset));
        return pointers;
      },[]);
      
      contents.set(fixedPointers,romConstants.categoryPointersStartAddress);

      if(!environment.production) {
        let romCategoryPointers = Array
          .from(contents.slice(romConstants.categoryPointersStartAddress, romConstants.categoryPointersEndAddress))
          .map(num=>num.toString(16));
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
    encodedCategories: EncodedCategories,
    romConstants: AllRomConstants) {

    if(!environment.production){
      let nca = [];
      romConstants.numberOfCategoryAnswersAddresses.forEach(address=>{
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

    romConstants.numberOfCategoryAnswersAddresses.forEach((addr,idx)=>{
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
    encodedCategories: EncodedCategories,
    romConstants: AllRomConstants) {

    if(!environment.production){
      let categoryNames = contents.slice(romConstants.categoryNamesStartAddress,romConstants.categoryNamesEndAddress);
      console.log('category names:',Array.from(categoryNames).map(num=>catNameDecodeTable[num]));
    }

    const categoryData = new Uint8Array(romConstants.categoryNamesEndAddress-romConstants.categoryNamesStartAddress).fill(romConstants.categoryUnusedSpaceValue);
    const encodedCategoryData = encodedCategories.reduce((categoryData: Uint8Array,category)=>{
      if(!environment.production){ console.log('category name:',category.category); }
      return combineUint8Arrays(categoryData,category.category);
    }, new Uint8Array());

    categoryData.set(encodedCategoryData);

    contents.set(categoryData,romConstants.categoryNamesStartAddress);

    if(!environment.production){
      let categoryNames = contents.slice(romConstants.categoryNamesStartAddress,romConstants.categoryNamesEndAddress);
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
    encodedCategories: EncodedCategories,
    romConstants: AllRomConstants) {
   
    if(!environment.production) {
      let categoryNameLengths = contents.slice(romConstants.categoryNameLengthsStartAddress, romConstants.categoryNameLengthsEndAddress);
      console.log('category name lengths:',categoryNameLengths.map(num=>catNameLengthDecodeTable[num]));
    }

    const nameLengths = encodedCategories.reduce((lengths:Uint8Array,category, i)=>{
      lengths[i] = category.nameLength;
      console.log('building lengths:\n',lengths);
      return lengths;
    },new Uint8Array(romConstants.categoryNameLengthsEndAddress - romConstants.categoryNameLengthsStartAddress));
    
    contents.set(nameLengths,romConstants.categoryNameLengthsStartAddress);

    if(!environment.production) {
      let categoryNameLengths = contents.slice(romConstants.categoryNameLengthsStartAddress,romConstants.categoryNameLengthsEndAddress);
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
      this.store.selectOnce(ConfigState.config),
      this.store.selectOnce(RomConstantsState.allConstants))
    .subscribe(([contents, config, costants])=>{
      console.log('Store data for Rom Writing:\n', config, contents);
      const game = config.games[id].game;
      const categories = config.games[id].categories;
      const puzzles = config.games[id].puzzles;
      const encodedCategories = this.encoder.encodeGame(categories, puzzles);
      
      console.log('encoded game:\n',encodedCategories);

      this.replacePuzzleSolutions(contents, encodedCategories, costants);
      const categoryPointers = this.replacePuzzlePointers(contents, encodedCategories, costants);
      this.replaceCategoryPointers(contents, encodedCategories, categoryPointers, costants);
      this.replaceNumberOfPuzzlesInCategories(contents, encodedCategories, costants);
      this.replaceCategoryNames(contents, encodedCategories, costants);
      this.replaceCategoryNameLengths(contents, encodedCategories, costants);
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

