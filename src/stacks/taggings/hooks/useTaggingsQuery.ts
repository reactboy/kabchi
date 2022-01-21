import { useQuery } from 'react-query'

import { GET_TAGGINGS } from 'queries'
import { useGraphQLClient } from 'utils/hooks'
import { Tagging } from 'classes'
import { getDayRangeIso } from 'utils/date'

export const useTaggingsQuery = (wallId: string, selectedDate: string) => {
  const { graphQLClient } = useGraphQLClient()

  return useQuery(
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
