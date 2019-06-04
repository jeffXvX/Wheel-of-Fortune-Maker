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
import { EncodedIntro } from './encoder/encoded-intro.model';
import { EncodedGame } from './encoder/encoded-game.model';

/**
 * This service reads in an existing rom and combines it with 
 * the chosen game's state to create the new custom rom with the
 * changes as specfied by the game data.
 */
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
    const buffer = reader.readAsArrayBuffer(file);
  }

  /**
   * Verify the md5 signature compared to known good values
   * for a rom to be written to.
   * @param contents The bytes to calculate the md5 of.
   */
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
   * Replace the text scrolling at the bottom of the screen 
   * with the text specified in the game.
   */
  replaceTitleScreenScrollingText(
    contents: Uint8Array,
    encodedIntro: EncodedIntro,
    romConstants: AllRomConstants) {

      if(!environment.production) {
        let scollBytes = contents.slice(
          romConstants.titleScrollingTextStartAddress, 
          romConstants.titleScrollingTextEndAddress);
        
        console.log(
          'Scroll Text:', 
          String.fromCharCode(...Array.from(scollBytes)));
      }
      
      contents.set(
        encodedIntro.scrollingText, 
        romConstants.titleScrollingTextStartAddress);
      

      if(!environment.production) {
        let scollBytes = contents.slice(
          romConstants.titleScrollingTextStartAddress, 
          romConstants.titleScrollingTextEndAddress);
        console.log(
          'Replaced Scroll Text:', 
          String.fromCharCode(...Array.from(scollBytes)));
      }
  }

  /**
   * Replace the lines of text in the middle of the initial
   * startup screen with the text specified by the game.
   */
  replaceTitleScreenIntroText(
    contents: Uint8Array,
    encodedIntro: EncodedIntro,
    romConstants: AllRomConstants) {
      if(!environment.production) {
        let introBytes = contents.slice(
          romConstants.introTextStartAddress, 
          romConstants.introTextEndAddress);
        console.log(
          'Intro Text:', 
          String.fromCharCode(...Array.from(introBytes)));
      }

      contents.set(
        encodedIntro.introText, 
        romConstants.introTextStartAddress);
      

      if(!environment.production) {
        let introBytes = contents.slice(
          romConstants.introTextStartAddress, 
          romConstants.introTextEndAddress);
        console.log(
          'New Intro Text:', 
          String.fromCharCode(...Array.from(introBytes)));
      }
  
  }


  addCustomGameSizeCode(
    contents: Uint8Array,
    encodedGame: EncodedGame,
    romConstants: AllRomConstants
  ) {

    const numberOfPuzzles = encodedGame.categories.reduce(
      (totalPuzzles,cat)=>totalPuzzles + cat.puzzles.length
      ,0);

    /*
     * ; Here we make sure that the puzzle markers have been initialized.  If $07FE
     * ; and $07FF are equal to $5A5A, then initialization has already happened.
     * ; Otherwise, we initialize the markers, and write $5A5A to that location.
     *     LDA $07FE
     *     CMP #$5A
     *     BNE initialize
     *     LDA $07FF
     *     CMP #$5A
     *     BNE initialize
     *     JMP check
     * initialize:
     *     LDX #$00
     *     LDA #$FF
     * initloop:
     *     STA $0780,X
     *     INX
     *     CPX #$7E
     *     BNE initloop
     *     LDA #$5A
     *     STA $07FE
     *     STA $07FF
     * 
     * ; This is the original game code that checks if all the puzzles have been used
     * ; and resets them if they have.
     * check:
     *     LDX #$2F ; This needs to be the number of puzzles / 8 - 1.
     * checkloop:
     *     LDA $0780,X
     *     CMP #$FF
     *     BNE end
     *     DEX
     *     BPL checkloop
     *     LDA #$00
     *     INX
     * resetloop:
     *     STA $0780,X
     *     INX
     *     CPX #$30 ; number of puzzles / 8
     *     BNE resetloop
     * end:
     *     JMP $807C ; jump back to where this code ended originally
     */
    const puzzlesSizeFix = [
      0xad, 0xfe, 0x07, 0xc9, 0x5a, 
      0xd0, 0x0a, 0xad, 0xff, 0x07, 
      0xc9, 0x5a, 0xd0, 0x03, 0x4c, 
      0x25, 0xf0, 0xa2, 0x00, 0xa9, 
      0xff, 0x9d, 0x80, 0x07, 0xe8, 
      0xe0, 0x7e, 0xd0, 0xf8, 0xa9, 
      0x5a, 0x8d, 0xfe, 0x07, 0x8d, 
      0xff, 0x07, 0xa2, (numberOfPuzzles / 8) - 1, 
      0xbd, 0x80, 0x07, 0xc9, 0xff, 
      0xd0, 0x0e, 0xca, 0x10, 0xf6, 
      0xa9, 0x00, 0xe8, 0x9d, 0x80, 
      0x07, 0xe8, 0xe0, (numberOfPuzzles / 8), 
      0xd0, 0xf8, 0x4c, 0x7c, 0x80
    ];

    if(!environment.production) {
      let bytes = contents.slice(
        0x17010, 
        0x17010 + puzzlesSizeFix.length);
      
      console.log(
        'Location for Custom Game Code:', 
        Array.from(bytes));
    }

    contents.set(puzzlesSizeFix,0x17010);

    if(!environment.production) {
      let bytes = contents.slice(
        0x17010, 
        0x17010 + puzzlesSizeFix.length);
      
      console.log(
        'Replaced Custom Game Code:', 
        Array.from(bytes));
    }

    /*
     * At the location in our ROM 0x10075, 
     * the game begins a series of commands 
     * to check if the puzzles have been used 
     * and reset them if they have so the patch 
     * will ignore all of that code and instead 
     * have an instruction to jump to the location 
     * where the new code can be found
     */
    if(!environment.production) {
      let bytes = contents.slice(
        0x010075, 
        0x010078);
      
      console.log(
        'Original jump instructions:', 
        Array.from(bytes));
    }

    const replacementCode = [0x4c, 0x00, 0xf0];
    contents.set(replacementCode,0x010075);

    if(!environment.production) {
      let bytes = contents.slice(
        0x010075, 
        0x010078);
      
      console.log(
        'Replaced jump instructions:', 
        Array.from(bytes));
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
    .subscribe(([contents, config, constants])=>{
      console.log('Store data for Rom Writing:\n', config, contents);
      const game = config.games[id].game;
      const categories = config.games[id].categories;
      const puzzles = config.games[id].puzzles;
      const encodedGame = this.encoder.encodeGame(game, categories, puzzles, constants);
      
      const totalPuzzles = Object.keys(puzzles).reduce((totalPuzzles,catId)=>{
        return totalPuzzles + puzzles[catId].length;
      },0);

      console.log('totalPuzzles',totalPuzzles);

      console.log('encoded game:\n',encodedGame);

      this.replacePuzzleSolutions(contents, encodedGame.categories, constants);
      const categoryPointers = this.replacePuzzlePointers(contents, encodedGame.categories, constants);
      this.replaceCategoryPointers(contents, encodedGame.categories, categoryPointers, constants);
      this.replaceNumberOfPuzzlesInCategories(contents, encodedGame.categories, constants);
      this.replaceCategoryNames(contents, encodedGame.categories, constants);
      this.replaceCategoryNameLengths(contents, encodedGame.categories, constants);

      this.replaceTitleScreenScrollingText(contents, encodedGame.intro, constants);
      this.replaceTitleScreenIntroText(contents, encodedGame.intro, constants);

      this.addCustomGameSizeCode(contents, encodedGame, constants);

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

