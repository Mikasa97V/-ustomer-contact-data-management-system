export function getDateAndTime(dateIso) {
    const localDate = new Date(dateIso).toLocaleDateString();
    const localTime = new Date(dateIso).toLocaleTimeString().slice(0, 5);

    return {date: localDate, time: localTime}
}
