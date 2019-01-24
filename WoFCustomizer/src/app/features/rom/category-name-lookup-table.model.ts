/**
 * This table is used to translate a category name
 * from ASCII into the format the WoF rom uses.
 * 
 * It is hard coded both for somplicity and because
 * it should never change assuming used against the 
 * same rom or another one that uses the same encoding.
 */
export const catNameLookupTable = {
    " " : 0xD4,
    "'" : 0xD5,
    "-" : 0xD7,
    "A" : 0xE5,
    "B" : 0xE6,
    "C" : 0xE7,
    "D" : 0xE8,
    "E" : 0xE9,
    "F" : 0xEA,
    "G" : 0xEB,
    "H" : 0xEC,
    "I" : 0xED,
    "J" : 0xEE,
    "K" : 0xEF,
    "L" : 0xF0,
    "M" : 0xF1,
    "N" : 0xF2,
    "O" : 0xF3,
    "P" : 0xF4,
    "Q" : 0xF5,
    "R" : 0xF6,
    "S" : 0xF7,
    "T" : 0xF8,
    "U" : 0xF9,
    "V" : 0xFA,
    "W" : 0xFB,
    "X" : 0xFC,
    "Y" : 0xFD,
    "Z" : 0xFE,
  }
