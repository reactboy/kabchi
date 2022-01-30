import dayjs from 'dayjs'

export type DateTextFormat = 'YYYY-MM-DD' | 'MM-DD' | 'HH:mm' | 'YYYY-MM'
type DateArg = Date | string
type BaseOptions = {
  date?: DateArg
  format: DateTextFormat
}

type ManupilationOptions = {
  days: number
}

const initDayjs = (date: DateArg) =>
  dayjs(typeof date === 'string' ? new Date(date) : date)

export const getDateText = ({ date = new Date(), format }: BaseOptions) => {
  const d = dayjs(date)
  return d.format(format)
}

export const getIsoString = (date: Date = new Date()) => {
  const d = dayjs(date)
  return d.toISOString()
}

export const getBeforeDateText = ({
  date = new Date(),
  format,
  days,
}: BaseOptions & ManupilationOptions) => {
  const d = initDayjs(date)
  return d.subtract(days, 'day').format(format)
}

export const getAfterDateText = ({
  date = new Date(),
  format,
  days,
}: BaseOptions & ManupilationOptions) => {
  const d = initDayjs(date)
  return d.add(days, 'day').format(format)
}

export const checkDateIsPast = (date: DateArg = new Date()) => {
  const now = dayjs()
  const d = initDayjs(date)
  return d.isBefore(now, 'date')
}

export const checkDateIsToday = (date: DateArg = new Date()) => {
  const now = dayjs()
  const d = initDayjs(date)
  return d.isSame(now, 'date')
}

export const isSameDate = (dates: DateArg[]) => {
  const d1 = initDayjs(dates[0])
  const d2 = initDayjs(dates[1])

  return d1.isSame(d2)
}

export const getDayRange = (date: DateArg) => {
  const d = initDayjs(date)
  return {
    start: d.startOf('date'),
    end: d.endOf('date'),
  }
}

export const getDayRangeIso = (date: Parameters<typeof getDayRange>[0]) => {
  const { start, end } = getDayRange(date)
  return {
    start: start.toISOString(),
    end: end.toISOString(),
  }
}
