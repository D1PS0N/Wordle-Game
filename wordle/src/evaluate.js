import { WORD_LENGTH } from './words'

// Returns an array of 'correct' | 'present' | 'absent' for each letter.
// Two passes so repeated letters are handled like the real game:
// greens are claimed first, then yellows consume the remaining letters.
export function evaluateGuess(guess, solution) {
  const result = Array(WORD_LENGTH).fill('absent')
  const remaining = {}

  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guess[i] === solution[i]) {
      result[i] = 'correct'
    } else {
      remaining[solution[i]] = (remaining[solution[i]] || 0) + 1
    }
  }

  for (let i = 0; i < WORD_LENGTH; i++) {
    if (result[i] === 'correct') continue
    if (remaining[guess[i]] > 0) {
      result[i] = 'present'
      remaining[guess[i]]--
    }
  }

  return result
}

const RANK = { absent: 1, present: 2, correct: 3 }

// Best known status for every letter guessed so far (for the keyboard).
export function getLetterStatuses(pastGuesses, solution) {
  const statuses = {}
  pastGuesses.forEach((guess) => {
    evaluateGuess(guess, solution).forEach((status, i) => {
      const letter = guess[i]
      if (!statuses[letter] || RANK[status] > RANK[statuses[letter]]) {
        statuses[letter] = status
      }
    })
  })
  return statuses
}
