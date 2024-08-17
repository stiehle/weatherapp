export function convertTime(timeAMPM: string) {
  // console.log(timeAMPM);

  const date = new Date(`08/17/2024 ${timeAMPM}`);
  const formattedTime = date.toLocaleTimeString("en-US", { hour12: false });

  // console.log(formattedTime.substring(0, 5));

  return formattedTime.substring(0, 5);
}
