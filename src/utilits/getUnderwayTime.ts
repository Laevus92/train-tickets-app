export function getUnderwayTime(duration: number): string {
  let underwayTime = ''
  if (duration % 60) {
    underwayTime = `${Math.floor(duration / 60)} hours ${
      duration - Math.floor(duration / 60) * 60
    } minutes`
  } else {
    underwayTime = `${duration / 60} hours 00 minutes`
  }
  return underwayTime
}
