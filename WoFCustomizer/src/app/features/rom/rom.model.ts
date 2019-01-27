export interface Rom {
    contents: number[];
}

export const defaultRom = ():Rom => ({ contents: [] });