export function convertDate(dateString: string) {
  const date = new Date(parseInt(dateString));
  const localTime = date.toLocaleString(navigator.language, {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
  const utcTime =
    String(date.getUTCHours()) + ":" + String(date.getUTCMinutes());
  return { local: localTime, utc: utcTime };
}
