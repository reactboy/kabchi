import { useQuery } from 'react-query'

import { GET_TAGGINGS, GET_TAGGINGS_MONTH_COUNT } from 'queries'
import { useGraphQLClient } from 'utils/hooks'
import { Tagging } from 'classes'
import { getDayRangeIso, getMonthRangeIso } from 'utils/date'

export const useTaggingsQuery = (wallId: string, selectedDate: string) => {
  const { graphQLClient } = useGraphQLClient()

  return useQuery<Tagging[]>(
    ['taggings', wallId, selectedDate],
    async () => {
      const { start, end } = getDayRangeIso(selectedDate)
      const { taggings } = await graphQLClient.request(GET_TAGGINGS, {
        wallId,
        start,
        end,
      })
      return taggings.map((tagging) => new Tagging(tagging))
    },
    {
      staleTime: 300000,
    }
  )
}

export const useTaggingsMonthQuery = (
  wallId: string,
  selectedMonth: string
) => {
  const { graphQLClient } = useGraphQLClient()

  return useQuery<Tagging[]>(
    ['taggings', wallId, selectedMonth],
    async () => {
      const { start, end } = getMonthRangeIso(selectedMonth)
      const { taggings } = await graphQLClient.request(
        GET_TAGGINGS_MONTH_COUNT,
        {
          wallId,
          start,
          end,
        }
      )
      return taggings.map((tagging) => new Tagging(tagging))
    },
    {
      staleTime: 300000,
    }
  )
}
