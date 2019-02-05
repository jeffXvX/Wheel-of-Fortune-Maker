import { RomConstants } from "./rom-constants.model";

export class SetRomConstants {
    static type = "[Rom] Set Constants";
    constructor(public payload: {constants: RomConstants} ) {}    
}

export class ClearRomConstants {
    static type = "[Rom] Clear Constants";
}
