import { useEffect } from 'react'
import Cookie from 'universal-cookie'
import { GraphQLClient } from 'graphql-request'

const cookie = new Cookie()

export const useGraphQLClient = () => {
  const endpoint = process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT
  const graphQLClient = new GraphQLClient(endpoint)

  useEffect(() => {
    graphQLClient.setHeaders({
      Authorization: `Bearer ${cookie.get('token')}`,
    })
  }, [cookie.get('token')])

  return {
    graphQLClient,
  }
}
