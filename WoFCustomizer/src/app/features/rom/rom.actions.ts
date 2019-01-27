export class SetRomContents {
    static type = "[Rom] Set Contents";
    constructor(public payload: {contents: number[]} ) {}    
}

export class ClearRomContents {
    static type = "[Rom] Clear Contents";
}
