import { VFC } from 'react'
import { Link, LinkProps, Box, useColorModeValue } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@heroicons/react/outline'

type Props = LinkProps

export const Anchor: VFC<Props> = (props) => {
  const textColor = useColorModeValue('blue.600', 'blue.200')
  return (
    <Link
      display="inline-flex"
      alignItems="center"
      color={textColor}
      isExternal
      {...props}
    >
      {props.children}
      <Box as={ExternalLinkIcon} display="inline" w="4" h="4" />
    </Link>
  )
}
