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

// !
// Note that this example is focused on vanilla JS. If you're using React,
// you'll want to wrap your handler in useMemo, so that it doesn't get re-generated on every render.
// Here's an example that debounces the capturing of the mouse's X coordinate:

// function App() {
//   const [mouseX, setMouseX] = React.useState(null);
//   const handleMouseMove = React.useMemo(
//     () => debounce((ev) => {
//       setMouseX(ev.clientX);
//     }, 250),
//     []
//   );
//   return (
//     <div onMouseMove={handleMouseMove}>
//       Mouse position: {mouseX}
//     </div>
//   );
// }
