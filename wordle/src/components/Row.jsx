import Tile from './Tile'
import { WORD_LENGTH } from '../words'

// `statuses` is undefined for rows that are not yet submitted.
function Row({ letters = '', statuses }) {
  return (
    <div className="row">
      {Array.from({ length: WORD_LENGTH }, (_, i) => (
        <Tile key={i} letter={letters[i] || ''} status={statuses?.[i]} />
      ))}
    </div>
  )
}

export default Row
