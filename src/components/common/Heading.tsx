import { VFC } from 'react'
import {
  Heading as ChakraHeading,
  Box,
  BoxProps,
  HeadingProps,
} from '@chakra-ui/react'

type Props = {
  children: string
  line?: BoxProps
} & HeadingProps

export const Heading: VFC<Props> = (props) => {
  const { children, line = {}, ...restProps } = props

  return (
    <ChakraHeading fontSize={44} {...restProps}>
      {children}
      <Box
        w="100%"
        h={1.5}
        bgColor="kbpurple.900"
        borderRadius="10px"
        transform="translateY(-80%)"
        {...line}
      />
    </ChakraHeading>
  )
}
