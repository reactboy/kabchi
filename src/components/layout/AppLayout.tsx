import { FC } from 'react'
import Head from 'next/head'
import { VStack, Flex, Box, StackProps } from '@chakra-ui/react'

import { AppHeader } from 'components/layout'
import { WIDTH } from 'styles'
import { DEFAULT } from 'utils/constants'

type Props = {
  title?: string
  description?: string
} & StackProps

export const AppLayout: FC<Props> = (props) => {
  const {
    children,
    title,
    description = DEFAULT['descriptoin'],
    maxW = WIDTH['pc-base'],
    ...restProps
  } = props

  return (
    <>
      <Head>
        <title>
          {title ? `${title} | ${DEFAULT['title']}` : DEFAULT['title']}
        </title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VStack h="100vh" px={2} py={0} {...restProps} maxW={maxW}>
        <AppHeader />
        <Flex direction="column" flex="1" w="100%">
          {children}
        </Flex>
        <Box w="100%">footer</Box>
      </VStack>
    </>
  )
}
