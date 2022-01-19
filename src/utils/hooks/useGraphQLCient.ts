import { useState, useEffect } from 'react'
import Cookie from 'universal-cookie'
import { GraphQLClient } from 'graphql-request'

const cookie = new Cookie()

export const useGraphQLClient = () => {
  const endpoint = process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT
  const [graphQLClient, setClient] = useState<GraphQLClient>(
    new GraphQLClient(endpoint)
  )

  useEffect(() => {
    graphQLClient.setHeaders({
      Authorization: `Bearer ${cookie.get('token')}`,
    })
    setClient(graphQLClient)
  }, [cookie.get('token')])

  return {
    graphQLClient,
  }
}
