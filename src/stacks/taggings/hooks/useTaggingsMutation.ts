import { useMutation, useQueryClient } from 'react-query'

import { CREATE_TAGGING, UPDATE_TAGGING, DELETE_TAGGING } from 'queries'
import { useGraphQLClient } from 'utils/hooks'

import { Tagging } from 'classes'

export const useTaggingsMutation = (wallId: string, selectedDate: string) => {
  const { graphQLClient } = useGraphQLClient()
  const queryClient = useQueryClient()

  const createTaggingMutation = useMutation(
    (data: { wallId: string; content: string }) =>
      graphQLClient.request(CREATE_TAGGING, data),
    {
      onSuccess: (res) => {
        const key = ['taggings', wallId]
        const resTagging = res.insert_taggings_one
        const previouseTaggings = queryClient.getQueryData<Tagging[]>(key)
        queryClient.setQueryData(key, [
          ...previouseTaggings,
          new Tagging(resTagging),
        ])
      },
    }
  )

  const updateTaggingMutation = useMutation(
    (data: { taggingId: string; content: string }) =>
      graphQLClient.request(UPDATE_TAGGING, data),
    {
      onSuccess: (res) => {
        const key = ['taggings', wallId]
        const resTagging = res.update_taggings_by_pk
        const previouseTaggings = queryClient.getQueryData<Tagging[]>(key)
        queryClient.setQueryData(
          key,
          previouseTaggings.map((tagging) => {
            if (tagging.id === resTagging.id) return new Tagging(resTagging)
            return tagging
          })
        )
      },
    }
  )

  const deleteTaggingMutation = useMutation(
    (data: { taggingId: string }) =>
      graphQLClient.request(DELETE_TAGGING, data),
    {
      onSuccess: (res) => {
        const key = ['taggings', wallId]
        const resTagging = res.delete_taggings_by_pk
        const previouseTaggings = queryClient.getQueryData<Tagging[]>(key)
        queryClient.setQueryData(
          key,
          previouseTaggings.filter((tagging) => tagging.id !== resTagging.id)
        )
      },
    }
  )

  return {
    createTaggingMutation,
    updateTaggingMutation,
    deleteTaggingMutation,
  }
}
