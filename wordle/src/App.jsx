import { useState, useEffect, useCallback, useMemo } from 'react'
import GameBoard from './components/GameBoard'
import Keyboard from './components/Keyboard'
import { getLetterStatuses } from './evaluate'
import { pickRandomWord, WORD_LENGTH, MAX_GUESSES } from './words'
import './App.css'

function App() {
  const [solutionWord, setSolutionWord] = useState(pickRandomWord)
  const [currentGuess, setCurrentGuess] = useState('')
  const [pastGuesses, setPastGuesses] = useState([])
  const [gameStatus, setGameStatus] = useState('IN_PROGRESS') // IN_PROGRESS | WON | LOST
  const [message, setMessage] = useState('')

  const letterStatuses = useMemo(
    () => getLetterStatuses(pastGuesses, solutionWord),
    [pastGuesses, solutionWord],
  )

  // Handles both physical and on-screen keys. `key` is 'ENTER', 'BACKSPACE' or a letter.
  const handleKey = useCallback(
    (key) => {
      if (gameStatus !== 'IN_PROGRESS') return

      if (key === 'BACKSPACE') {
        setCurrentGuess((g) => g.slice(0, -1))
        setMessage('')
        return
      }

      if (key === 'ENTER') {
        if (currentGuess.length < WORD_LENGTH) {
          setMessage('Not enough letters')
          return
        }
        const updated = [...pastGuesses, currentGuess]
        setPastGuesses(updated)
        setCurrentGuess('')
        setMessage('')

        if (currentGuess === solutionWord) {
          setGameStatus('WON')
        } else if (updated.length >= MAX_GUESSES) {
          setGameStatus('LOST')
        }
        return
      }

      if (/^[A-Z]$/.test(key)) {
        setCurrentGuess((g) => (g.length < WORD_LENGTH ? g + key : g))
        setMessage('')
      }
    },
    [gameStatus, currentGuess, pastGuesses, solutionWord],
  )

  // Physical keyboard listener; re-registered when handleKey changes and cleaned up.
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      let key = e.key.toUpperCase()
      if (key === 'ENTER') {
        e.preventDefault()
        handleKey('ENTER')
      } else if (key === 'BACKSPACE') {
        handleKey('BACKSPACE')
      } else if (key.length === 1) {
        handleKey(key)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [handleKey])

  const restart = () => {
    setSolutionWord(pickRandomWord())
    setCurrentGuess('')
    setPastGuesses([])
    setGameStatus('IN_PROGRESS')
    setMessage('')
  }

  return (
    <div className="container">
      <h1>Wordle</h1>
      <p className="message">{message || '\u00A0'}</p>

      <GameBoard
        pastGuesses={pastGuesses}
        currentGuess={currentGuess}
        solutionWord={solutionWord}
      />

      {gameStatus === 'WON' && (
        <div className="banner win">
          🎉 You got it in {pastGuesses.length}{' '}
          {pastGuesses.length === 1 ? 'guess' : 'guesses'}!
          <button className="restart" onClick={restart}>Play again</button>
        </div>
      )}

      <Keyboard
        onKey={handleKey}
        letterStatuses={letterStatuses}
        disabled={gameStatus !== 'IN_PROGRESS'}
      />
      <button className="restart-button" onClick={restart}>Restart</button>

      {gameStatus === 'LOST' && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Game Over</h2>
            <p>The word was</p>
            <p className="solution">{solutionWord}</p>
            <button className="restart" onClick={restart}>Try again</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
