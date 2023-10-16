export function getArrivalTime(
  departureTime: string,
  duration: number,
): string {
  let arrivalTime = ''
  const departureTimeInMinutes =
    departureTime
      .split(':')
      .map((el) => Number.parseInt(el, 10))
      .map((el, index) => (index === 0 ? el * 60 : el))
      .reduce((acc, el) => acc + el, 0) + duration
  if (duration % 60) {
    if (departureTimeInMinutes % 60) {
      arrivalTime = `${Math.floor(departureTimeInMinutes / 60)
        .toString()
        .padStart(2, '0')}:${(
        departureTimeInMinutes -
        Math.floor(departureTimeInMinutes / 60) * 60
      )
        .toString()
        .padStart(2, '0')}`
    } else {
      arrivalTime = `${departureTimeInMinutes / 60}:00`
    }
  } else {
    const durationInHours = duration / 60
    arrivalTime = departureTime
      .split(':')
      .map((el, index) =>
        index === 0
          ? (Number.parseInt(el, 10) + durationInHours)
              .toString()
              .padStart(2, '0')
          : el,
      )
      .join(':')
  }
  return arrivalTime
}
