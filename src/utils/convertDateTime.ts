export function convertDateTime(dateTime: string) {
  const date = new Date(dateTime);
  // const formattedDateTime = date.toLocaleTimeString("de-DE", { hour12: false, minute: "2-digit", hour: "2-digit" });
  const formattedDateTime = date.toLocaleDateString("de-DE", { hour12: false, minute: "2-digit", hour: "2-digit" });

  // console.log(formattedDateTime);

  return formattedDateTime;
}
