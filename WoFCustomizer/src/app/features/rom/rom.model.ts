export interface Rom {
    contents: Uint8Array;
}

export const defaultRom = ():Rom => ({ contents: new Uint8Array() });