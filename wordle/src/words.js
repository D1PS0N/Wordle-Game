// Pool of possible hidden solution words (all 5 letters, uppercase).
export const WORDS = [
  'APPLE', 'BRAVE', 'CRANE', 'DREAM', 'EAGLE', 'FLAME', 'GRAPE', 'HOUSE',
  'IMAGE', 'JOKER', 'KNIFE', 'LEMON', 'MANGO', 'NIGHT', 'OCEAN', 'PLANT',
  'QUEEN', 'RIVER', 'STONE', 'TIGER', 'UNITY', 'VIVID', 'WATER', 'YOUTH',
  'ZEBRA', 'BEACH', 'CLOUD', 'DANCE', 'EARTH', 'FIELD', 'GHOST', 'HEART',
  'LIGHT', 'MUSIC', 'NURSE', 'ORBIT', 'PIANO', 'QUIET', 'ROBOT', 'SMILE',
  'TRAIN', 'WORLD', 'SPARK', 'BLAZE', 'CHAIR', 'DRIFT', 'FLOUR', 'GLASS',
]

export const WORD_LENGTH = 5
export const MAX_GUESSES = 5

export function pickRandomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)]
}
