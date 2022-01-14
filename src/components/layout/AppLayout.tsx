import { FC } from 'react'
import { VStack, Flex, Box, StackProps } from '@chakra-ui/react'

import { WIDTH } from 'styles'

type Props = StackProps

export const AppLayout: FC<Props> = (props) => {
  const { children, maxW = WIDTH['pc-base'], ...restProps } = props

  return (
    <VStack h="100vh" px={2} py={0} {...restProps} maxW={maxW}>
      <Box w="100%">header</Box>
      <Flex flex="1" w="100%">
        {children}
      </Flex>
      <Box w="100%">footer</Box>
    </VStack>
  )
}
