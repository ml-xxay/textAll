export const dateFormat = (date: Date | number | string, type: string = 'yyyy-MM-dd hh:mm:ss') => {
  if (!date) {
    return date
  }
  date =
    typeof date === 'string'
      ? date.indexOf('-')
        ? new Date(date)
        : new Date(Number(date))
      : new Date(date)
  const y = date.getFullYear()
  const M = date.getMonth() + 1
  const d = date.getDate()
  const h = date.getHours()
  const m = date.getMinutes()
  const s = date.getSeconds()
  const w = date.getDay()

  const yy = 'yyyy'
  const MM = 'MM'
  const dd = 'dd'
  const hh = 'hh'
  const mm = 'mm'
  const ss = 'ss'
  const ww = 'ww'
  return type
    .replace(yy, `${y}`)
    .replace(MM, `${scale(M)}`)
    .replace(dd, `${scale(d)}`)
    .replace(hh, `${scale(h)}`)
    .replace(mm, `${scale(m)}`)
    .replace(ss, `${scale(s)}`)
    .replace(ww, `${scale(w)}`)
}

const scale = (n: number | string) => {
  return Number(n) > 9 ? `${n}` : `0${n}`
}
