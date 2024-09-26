// https://www.joshwcomeau.com/snippets/javascript/debounce/
export function debounce(callback, wait) {
  let timeoutId = null;

  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
}

// export function debounce(callback, wait) {
//   let timeoutId = null;

//   return (...args) => {
//     window.clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => {
//       callback.apply(this, args);
//     }, wait);
//   };
// }
