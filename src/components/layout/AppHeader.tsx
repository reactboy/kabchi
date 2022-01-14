import { VFC } from 'react'
import { Flex } from '@chakra-ui/react'

import { Logo } from 'components/common'

export const AppHeader: VFC = () => {
  return (
    <Flex w="100%">
      <Logo />
    </Flex>
  )
}
