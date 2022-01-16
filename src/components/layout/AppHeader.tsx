import { VFC } from 'react'
import { useRouter } from 'next/router'
import { Flex } from '@chakra-ui/react'

import { Logo } from 'components/common'

type Props = {
  logoSize?: number
}

export const AppHeader: VFC<Props> = (props) => {
  const { logoSize = 0.5 } = props
  const router = useRouter()
  return (
    <Flex w="100%">
      <Logo
        ratio={logoSize}
        cursor="pointer"
        onClick={() => router.push('/')}
      />
    </Flex>
  )
}
