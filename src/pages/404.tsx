import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Text, VStack } from '@chakra-ui/react'

import { Button } from 'components/common'
import { AppLayout } from 'components/layout'
import { selectUid } from 'redux/feature'

const Custom404: NextPage = () => {
  const router = useRouter()
  const uid = selectUid()

  return (
    <AppLayout>
      <VStack align="flex-start">
        <Text fontSize="3xl">Page not found...</Text>
        <Button
          onClick={() => {
            uid ? router.push('/dashboard') : router.push('/')
          }}
        >
          top
        </Button>
      </VStack>
    </AppLayout>
  )
}

export default Custom404
