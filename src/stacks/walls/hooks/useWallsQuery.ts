import { useQuery } from 'react-query'

import { GET_USER_WALLS } from 'queries'
import { useGraphQLClient } from 'utils/hooks'
import { selectUid } from 'redux/feature'
import { Wall } from 'classes'

export const useWallsQuery = () => {
  const uid = selectUid()
  const { graphQLClient } = useGraphQLClient()

  return useQuery<Wall[]>(
    'walls',
    async () => {
      const { walls } = await graphQLClient.request(GET_USER_WALLS, { uid })
      return walls.map((wall) => new Wall(wall))
    },
    {
      staleTime: 10000,
    }
  )
}
