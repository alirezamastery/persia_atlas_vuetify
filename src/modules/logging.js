export const logger = (text, color = 'white') => {
  console.log(`%c${text}`, `color: ${color};`)
}

// export function logger() {
//   console.log(arguments)
//   let color = 'red'
//   let txt = ''
//   for (let i = 0; i < arguments.length - 1; i++) {
//     txt += JSON.stringify(arguments[i]) + ' '
//   }
//
//   console.log(`%c${txt}`, `color: ${color};`)
// }

export default logger