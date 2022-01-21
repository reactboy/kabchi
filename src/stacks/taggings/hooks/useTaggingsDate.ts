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

  return {
    selectedDate,
    displayDate: getDateText({
      date: new Date(selectedDate),
      format: 'MM-DD',
    }),
    toPreviousDate,
    toNextDate,
    isDatePast,
    isDateToday,
  }
}
