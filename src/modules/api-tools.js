export function debounce_1(func, delay) {
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

export function debounce(fn, delay) {
  let timeoutID = null
  return function () {
    clearTimeout(timeoutID)
    const args = arguments
    const that = this
    timeoutID = setTimeout(function () {
      fn.apply(that, args)
    }, delay)
  }
}