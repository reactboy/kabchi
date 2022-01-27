import { useMutation, useQueryClient } from 'react-query'

import { useGraphQLClient, useToast } from 'utils/hooks'
import { selectUid } from 'redux/feature'
import { CREATE_WALL, UPDATE_WALL, DELETE_WALL } from 'queries'
import { Wall } from 'classes'

export const useWallsMutation = () => {
  const { graphQLClient } = useGraphQLClient()
  const queryClient = useQueryClient()
  const { showErrorToast, showSuccessToast, showInfoToast } = useToast()
  const uid = selectUid()

  const createWallMutation = useMutation(
    (data: { title: string; description: string }) =>
      graphQLClient.request(CREATE_WALL, data),
    {
      onSuccess: (res) => {
        const key = ['walls', uid]
        const previouseWalls = queryClient.getQueryData<Wall[]>(key)
        queryClient.setQueryData(key, [
          ...previouseWalls,
          new Wall(res.insert_walls_one),
        ])
        showSuccessToast({ title: 'wall created!' })
      },
      onError: () => {
        showErrorToast({ title: 'something went wrong...' })
      },
      onMutate: () => {
        showInfoToast({ title: 'creating...' })
      },
    }
  )

  const updateWallMutation = useMutation(
    (data: { wallId: string; title: string; description: string }) =>
      // TODO(eastasian) set updated_at
      graphQLClient.request(UPDATE_WALL, { ...data }),
    {
      onSuccess: (res) => {
        const key = ['walls', uid]
        const resWall = res.update_walls_by_pk
        const previouseWalls = queryClient.getQueryData<Wall[]>(key)
        const updatedWalls = previouseWalls.map((wall) => {
          if (resWall.id === wall.id) return new Wall(resWall)
          return wall
        })
        queryClient.setQueryData(key, updatedWalls)
        showSuccessToast({ title: 'wall updated!' })
      },
      onError: () => {
        showErrorToast({ title: 'something went wrong...' })
      },
      onMutate: () => {
        showInfoToast({ title: 'updating...' })
      },
    }
  )

  const deleteWallMutation = useMutation(
    (data: { wallId: string }) =>
      // TODO(eastasian) set updated_at
      graphQLClient.request(DELETE_WALL, { ...data, deleted: true }),
    {
      onSuccess: (res) => {
        const key = ['walls', uid]
        const resWall = res.update_walls_by_pk
        const previouseWalls = queryClient.getQueryData<Wall[]>(key)
        const updatedWalls = previouseWalls.filter(
          (wall) => wall.id !== resWall.id
        )
        queryClient.setQueryData(key, updatedWalls)
        showSuccessToast({ title: 'wall deleted!' })
      },
      onError: () => {
        showErrorToast({ title: 'something went wrong...' })
      },
      onMutate: () => {
        showInfoToast({ title: 'deleting...' })
      },
    }
  )

  return {
    createWallMutation,
    updateWallMutation,
    deleteWallMutation,
  }
}
