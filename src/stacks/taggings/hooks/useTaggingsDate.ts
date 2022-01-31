import { useState } from 'react'

import {
  getDateText,
  getBeforeDateText,
  getAfterDateText,
  checkDateIsPast,
  checkDateIsToday,
} from 'utils/date'

export const useTaggingsDate = () => {
  const [selectedDate, setSelectedDate] = useState(
    getDateText({ format: 'YYYY-MM-DD' })
  )

  const isDateToday = checkDateIsToday(selectedDate)
  const isDatePast = checkDateIsPast(selectedDate)

  const toPreviousDate = () => {
    setSelectedDate(
      getBeforeDateText({ days: 1, format: 'YYYY-MM-DD', date: selectedDate })
    )
  }

  const toNextDate = () => {
    setSelectedDate(
      getAfterDateText({ days: 1, format: 'YYYY-MM-DD', date: selectedDate })
    )
  }

  const toTargetDate = (date: string) => {
    setSelectedDate(getDateText({ format: 'YYYY-MM-DD', date: new Date(date) }))
  }

  return {
    selectedDate,
    displayDate: getDateText({
      date: new Date(selectedDate),
      format: 'MM-DD',
    }),
    selectedMonth: getDateText({
      date: new Date(selectedDate),
      format: 'YYYY-MM',
    }),
    toPreviousDate,
    toNextDate,
    isDatePast,
    isDateToday,
    toTargetDate,
  }
}
