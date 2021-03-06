import { gql } from 'graphql-request'

export const GET_TAGGINGS = gql`
  query GetTaggings($wallId: uuid!, $start: timestamptz!, $end: timestamptz!) {
    taggings(
      order_by: { created_at: asc }
      where: {
        wall_id: { _eq: $wallId }
        created_at: { _gte: $start, _lte: $end }
      }
    ) {
      id
      wall_id
      content
      created_at
      updated_at
    }
  }
`

export const GET_TAGGINGS_MONTH_COUNT = gql`
  query GetTaggingsMonthCount(
    $wallId: uuid!
    $start: timestamptz!
    $end: timestamptz!
  ) {
    taggings(
      order_by: { created_at: asc }
      where: {
        wall_id: { _eq: $wallId }
        created_at: { _gte: $start, _lte: $end }
      }
    ) {
      id
      wall_id
      created_at
    }
  }
`

export const CREATE_TAGGING = gql`
  mutation CreateTagging($wallId: uuid!, $content: String!) {
    insert_taggings_one(object: { wall_id: $wallId, content: $content }) {
      id
      wall_id
      content
      created_at
      updated_at
    }
  }
`

export const UPDATE_TAGGING = gql`
  mutation Update_Tagging(
    $taggingId: uuid!
    $content: String!
    $updatedAt: timestamptz!
  ) {
    update_taggings_by_pk(
      pk_columns: { id: $taggingId }
      _set: { content: $content, updated_at: $updatedAt }
    ) {
      id
      wall_id
      content
      created_at
      updated_at
    }
  }
`

export const DELETE_TAGGING = gql`
  mutation MyMutation($taggingId: uuid!) {
    delete_taggings_by_pk(id: $taggingId) {
      id
      wall_id
      content
      created_at
      updated_at
    }
  }
`
