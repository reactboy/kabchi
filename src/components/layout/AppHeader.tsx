import { VFC } from 'react'
import { useRouter } from 'next/router'
import { Flex, useColorModeValue } from '@chakra-ui/react'

import { Logo, ColorModeButton } from 'components/common'
import { selectUid } from 'redux/feature'

type Props = {
  logoSize?: number
}

export const AppHeader: VFC<Props> = (props) => {
  const { logoSize = 0.5 } = props
  const router = useRouter()
  const uid = selectUid()
  const path = uid ? '/dashboard' : '/'

  const headerBgColor = useColorModeValue('kbBgLight', 'kbBgDark')

  return (
    <Flex
      w="100%"
      justify="space-between"
      align="center"
      bgColor={headerBgColor}
      position="sticky"
      top="0"
    >
      <Logo
        ratio={logoSize}
        cursor="pointer"
        onClick={() => router.push(path)}
      />
      <ColorModeButton />
    </Flex>
  )
}
