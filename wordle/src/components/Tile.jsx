function Tile({ letter, status }) {
  const classes = ['tile']
  if (status) classes.push(status)
  else if (letter) classes.push('filled')

  return <div className={classes.join(' ')}>{letter}</div>
}

export default Tile
