export interface CharacterPair {
  batak: string;
  latin: string;
}

export interface BatakCharacterProps {
  char: string;
  matchedLatin?: string;
  onDrop: (batak: string, latin: string) => void;
  disabled: boolean;
}

export interface LatinCharacterProps {
  char: string;
  isMatched: boolean;
  disabled: boolean;
}

export const initialPairs: CharacterPair[] = [
  { batak: "ᯂ", latin: "ha" },
  { batak: "ᯔ", latin: "ma" },
  { batak: "ᯉ", latin: "na" },
  { batak: "ᯒ", latin: "ra" },
  { batak: "ᯖ", latin: "ta" },
  { batak: "ᯘ", latin: "sa" },
  { batak: "ᯑ", latin: "da" },
  { batak: "ᯎ", latin: "ga" },
  { batak: "ᯐ", latin: "ja" },
  { batak: "ᯅ", latin: "ba" },
  { batak: "ᯞ", latin: "la" },
  { batak: "ᯇ", latin: "pa" },
  { batak: "ᯤ", latin: "i" },
  { batak: "ᯥ", latin: "u" },
];

export const GAME_DURATION = 120;
export const TIME_PENALTY = 5;