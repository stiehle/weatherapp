export function convertTime(timeAMPM: string) {
  const date = new Date(`08/17/2024 ${timeAMPM}`);
  const formattedTime = date.toLocaleTimeString("en-US", { hour12: false, minute: "2-digit", hour: "2-digit" });

  return formattedTime;
}
