import { gql } from 'graphql-request'

export const GET_USER_WALLS = gql`
  query GetUserWalls($uid: String) {
    walls(where: { uid: { _eq: $uid }, deleted: { _eq: false } }) {
      uid
      id
      title
      description
      created_at
      updated_at
      deleted
    }
  }
`

export const GET_WALL = gql`
  query GetWall($wallId: uuid!) {
    walls_by_pk(id: $wallId) {
      uid
      id
      title
      description
      created_at
      updated_at
      deleted
    }
  }
`

export const CREATE_WALL = gql`
  mutation CreateWall($title: String!, $description: String!) {
    insert_walls_one(object: { title: $title, description: $description }) {
      uid
      id
      title
      description
      created_at
      updated_at
      deleted
    }
  }
`

export const UPDATE_WALL = gql`
  mutation UpdateWall(
    $wallId: uuid!
    $title: String!
    $description: String!
    $updatedAt: timestamptz!
  ) {
    update_walls_by_pk(
      pk_columns: { id: $wallId }
      _set: { title: $title, description: $description, updated_at: $updatedAt }
    ) {
      created_at
      deleted
      description
      id
      title
      uid
      updated_at
    }
  }
`

export const DELETE_WALL = gql`
  mutation UpdateWall(
    $wallId: uuid!
    $deleted: Boolean!
    $updatedAt: timestamptz!
  ) {
    update_walls_by_pk(
      pk_columns: { id: $wallId }
      _set: { deleted: $deleted, updated_at: $updatedAt }
    ) {
      created_at
      deleted
      description
      id
      title
      uid
      updated_at
    }
  }
`
