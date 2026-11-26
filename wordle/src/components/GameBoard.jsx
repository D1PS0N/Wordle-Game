import Row from './Row'
import { evaluateGuess } from '../evaluate'
import { MAX_GUESSES } from '../words'

function GameBoard({ pastGuesses, currentGuess, solutionWord }) {
  return (
    <div className="game-board">
      {Array.from({ length: MAX_GUESSES }, (_, i) => {
        if (i < pastGuesses.length) {
          const guess = pastGuesses[i]
          return (
            <Row
              key={i}
              letters={guess}
              statuses={evaluateGuess(guess, solutionWord)}
            />
          )
        }
        if (i === pastGuesses.length) {
          return <Row key={i} letters={currentGuess} />
        }
        return <Row key={i} />
      })}
    </div>
  )
}

export default GameBoard
