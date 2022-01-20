import { useQuery } from 'react-query'

import { GET_TAGGINGS } from 'queries'
import { useGraphQLClient } from 'utils/hooks'
import { Tagging } from 'classes'

export const useTaggingsQuery = (wallId: string) => {
  const { graphQLClient } = useGraphQLClient()

  return useQuery(
    ['taggings', wallId],
    async () => {
      const { taggings } = await graphQLClient.request(GET_TAGGINGS, { wallId })
      return taggings.map((tagging) => new Tagging(tagging))
    },
    {
      staleTime: 300000,
    }
  )
}
