import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'

import { GET_USER_WALLS, GET_WALL } from 'queries'
import { useGraphQLClient } from 'utils/hooks'
import { selectUid } from 'redux/feature'
import { Wall } from 'classes'

export const useWallsQuery = () => {
  const uid = selectUid()
  const { graphQLClient } = useGraphQLClient()

  return useQuery<Wall[]>(
    ['walls', uid],
    async () => {
      const { walls } = await graphQLClient.request(GET_USER_WALLS, { uid })
      return walls.map((wall) => new Wall(wall))
    },
    {
      staleTime: 300000,
    }
  )
}

export const useWallByIdQuery = () => {
  const { graphQLClient } = useGraphQLClient()
  const { query } = useRouter()
  const { id: wallId } = query

  const wall = useQuery<Wall>(
    ['wall', wallId],
    async () => {
      const { walls_by_pk } = await graphQLClient.request(GET_WALL, { wallId })
      return new Wall(walls_by_pk)
    },
    {
      staleTime: 300000,
      enabled: false,
    }
  )

  useEffect(() => {
    if (wallId) wall.refetch()
  }, [wallId])

  return wall
}
