export class SetRomContents {
    static type = "[Rom] Set Contents";
    constructor(public payload: {contents: Uint8Array} ) {}    
}

export class ClearRomContents {
    static type = "[Rom] Clear Contents";
}
