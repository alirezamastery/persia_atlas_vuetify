export const logger = (text, color = 'white') => {
  console.log(`%c${text}`, `color: ${color};`)
}

export default logger