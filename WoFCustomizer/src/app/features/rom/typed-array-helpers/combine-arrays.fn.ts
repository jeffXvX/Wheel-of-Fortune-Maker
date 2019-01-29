export type TypedArray = Uint8Array | Uint16Array | Uint32Array | Int8Array | Int16Array | Int32Array;

export function combineTypedArrays<T extends TypedArray>(type: new(length: number)=>T, source1: T, source2: T): T {    
    let newArray = new type(source1.length + source2.length);
    newArray.set(source1);
    newArray.set(source2, source1.length);
    return newArray;
}

export const combineUint8Arrays = (source1: Uint8Array, source2: Uint8Array)=> combineTypedArrays(Uint8Array, source1, source2);
