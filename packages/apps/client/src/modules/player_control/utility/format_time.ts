const format = (_n: number, _pad: number) =>
  (~~_n).toString().padStart(_pad, '0')

function formatTime(_seconds: number): string {
  const parts = [
    format(_seconds / 60 / 60, 1),
    format((_seconds / 60) % 60, 1),
    format(_seconds % 60, 2),
  ]

  let time = ''

  if (parts[0] !== '0') time += `${parts[0]}:`
  time += `${parts[1]}:${parts[2]}`

  return time
}

export default formatTime
