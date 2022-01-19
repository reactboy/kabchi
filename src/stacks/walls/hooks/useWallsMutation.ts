import { useMutation, useQueryClient } from 'react-query'

import { useGraphQLClient } from 'utils/hooks'
import { CREATE_WALL, UPDATE_WALL, DELETE_WALL } from 'queries'
import { Wall } from 'classes'

export const useWallsMutation = () => {
  const { graphQLClient } = useGraphQLClient()
  const queryClient = useQueryClient()

  const createWallMutation = useMutation(
    (data: { title: string; description: string }) =>
      graphQLClient.request(CREATE_WALL, data),
    {
      onSuccess: (res) => {
        const key = 'walls'
        const previouseWalls = queryClient.getQueryData<Wall[]>(key)
        queryClient.setQueryData(key, [
          ...previouseWalls,
          new Wall(res.insert_walls_one),
        ])
      },
    }
  )

  const updateWallMutation = useMutation(
    (data: { wallId: string; title: string; description: string }) =>
      // TODO(eastasian) set updated_at
      graphQLClient.request(UPDATE_WALL, { ...data }),
    {
      onSuccess: (res) => {
        const key = 'walls'
        const resWall = res.update_walls_by_pk
        const previouseWalls = queryClient.getQueryData<Wall[]>(key)
        const updatedWalls = previouseWalls.map((wall) => {
          if (resWall.id === wall.id) return new Wall(resWall)
          return wall
        })
        queryClient.setQueryData(key, updatedWalls)
      },
    }
  )

  const deleteWallMutation = useMutation(
    (data: { wallId: string }) =>
      // TODO(eastasian) set updated_at
      graphQLClient.request(DELETE_WALL, { ...data, deleted: true }),
    {
      onSuccess: (res) => {
        const key = 'walls'
        const resWall = res.update_walls_by_pk
        const previouseWalls = queryClient.getQueryData<Wall[]>(key)
        const updatedWalls = previouseWalls.filter(
          (wall) => wall.id !== resWall.id
        )
        queryClient.setQueryData(key, updatedWalls)
      },
    }
  )

  return {
    createWallMutation,
    updateWallMutation,
    deleteWallMutation,
  }
}
