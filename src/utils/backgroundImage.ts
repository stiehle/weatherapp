import { getConditionImagePath } from "./conditions";

export function getWeatherBackgroundImage(conditionCode: number, isDay: number) {
  let day = false;

  if (isDay === 1) {
    day = true;
  }

  const conditionImagePath = getConditionImagePath(conditionCode, !day);

  return conditionImagePath;
}
