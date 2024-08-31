const LOCAL_STORAGE_KEY = "citiesList";
// [576216, 2618724, 623685, 386789, 267097, 604442, 9000293, 9000433]

export function getLocalStorage() {
  const storage: number[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[576216, 2618724, 623685]");
  if (storage.length === 0) {
    return [576216, 2618724, 623685, 386789, 267097, 604442, 9000293, 9000433];
  }
  return storage;
}

export function setLocalStorage(citiesList: number[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(citiesList));
}
