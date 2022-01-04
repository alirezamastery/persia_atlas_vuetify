export function debounce(func, delay) {
  let timeout
  return (...args) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    const context = this //important, without context the input url to apiCall will be undefined
    timeout = setTimeout(() => {
      func.apply(context, args)
    }, delay)
  }
}