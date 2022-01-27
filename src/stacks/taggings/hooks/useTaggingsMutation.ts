import { useMutation, useQueryClient } from 'react-query'

import { CREATE_TAGGING, UPDATE_TAGGING, DELETE_TAGGING } from 'queries'
import { useGraphQLClient, useToast } from 'utils/hooks'

import { Tagging } from 'classes'

export const useTaggingsMutation = (wallId: string, selectedDate: string) => {
  const { graphQLClient } = useGraphQLClient()
  const queryClient = useQueryClient()
  const { showErrorToast, showSuccessToast, showInfoToast } = useToast()

  const queryDataKey = ['taggings', wallId, selectedDate]
  const createTaggingMutation = useMutation(
    (data: { wallId: string; content: string }) =>
      graphQLClient.request(CREATE_TAGGING, data),
    {
      onSuccess: (res) => {
        const resTagging = res.insert_taggings_one
        const previouseTaggings =
          queryClient.getQueryData<Tagging[]>(queryDataKey)
        queryClient.setQueryData(queryDataKey, [
          ...previouseTaggings,
          new Tagging(resTagging),
        ])
        showSuccessToast({ title: 'created!' })
      },
      onError: () => {
        showErrorToast({ title: 'something went wrong...' })
      },
      onMutate: () => {
        showInfoToast({ title: 'creating...' })
      },
    }
  )

  const updateTaggingMutation = useMutation(
    (data: { taggingId: string; content: string }) =>
      graphQLClient.request(UPDATE_TAGGING, data),
    {
      onSuccess: (res) => {
        const resTagging = res.update_taggings_by_pk
        const previouseTaggings =
          queryClient.getQueryData<Tagging[]>(queryDataKey)
        queryClient.setQueryData(
          queryDataKey,
          previouseTaggings.map((tagging) => {
            if (tagging.id === resTagging.id) return new Tagging(resTagging)
            return tagging
          })
        )
        showSuccessToast({ title: 'updated!' })
      },
      onError: () => {
        showErrorToast({ title: 'something went wrong...' })
      },
      onMutate: () => {
        showInfoToast({ title: 'updating...' })
      },
    }
  )

  const deleteTaggingMutation = useMutation(
    (data: { taggingId: string }) =>
      graphQLClient.request(DELETE_TAGGING, data),
    {
      onSuccess: (res) => {
        const resTagging = res.delete_taggings_by_pk
        const previouseTaggings =
          queryClient.getQueryData<Tagging[]>(queryDataKey)
        queryClient.setQueryData(
          queryDataKey,
          previouseTaggings.filter((tagging) => tagging.id !== resTagging.id)
        )
        showSuccessToast({ title: 'deleted!' })
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
    createTaggingMutation,
    updateTaggingMutation,
    deleteTaggingMutation,
  }
}
