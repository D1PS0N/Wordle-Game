const ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
]

function Keyboard({ onKey, letterStatuses, disabled }) {
  return (
    <div className="keyboard">
      {ROWS.map((row, r) => (
        <div className="keyboard-row" key={r}>
          {row.map((key) => {
            const wide = key === 'ENTER' || key === 'BACKSPACE'
            const classes = ['key']
            if (wide) classes.push('wide')
            if (letterStatuses[key]) classes.push(letterStatuses[key])
            return (
              <button
                key={key}
                className={classes.join(' ')}
                disabled={disabled}
                onClick={(e) => {
                  e.currentTarget.blur() // keep physical Enter from re-clicking
                  onKey(key)
                }}
              >
                {key === 'BACKSPACE' ? '⌫' : key}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default Keyboard
