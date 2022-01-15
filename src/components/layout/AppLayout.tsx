import { FC } from 'react'
import Head from 'next/head'
import { VStack, Flex, Box, StackProps, FlexProps } from '@chakra-ui/react'

import { AppHeader, AppNavigation } from 'components/layout'
import { WIDTH } from 'styles'
import { DEFAULT } from 'utils/constants'

const FAVICON = {
  light: '/favicon-light.ico',
  dark: '/favicon-dark.ico',
}

type Props = {
  title?: string
  description?: string
  innerOptions?: FlexProps
} & StackProps

export const AppLayout: FC<Props> = (props) => {
  const {
    children,
    title,
    description = DEFAULT['descriptoin'],
    maxW = WIDTH['pc-base'],
    innerOptions = {},
    ...restProps
  } = props

  return (
    <>
      <Head>
        <title>
          {title ? `${title} | ${DEFAULT['title']}` : DEFAULT['title']}
        </title>
        <meta name="description" content={description} />
        //TODO(eastasian) be able to change favicon by color mode
        <link rel="icon" href={FAVICON['light']} />
      </Head>
      <VStack h="100vh" px={2} py={0} {...restProps} maxW={maxW}>
        <AppHeader />
        <Flex direction="column" flex="1" w="100%" {...innerOptions}>
          {children}
        </Flex>
      </VStack>
      <Flex position="fixed" bottom="0" left="0" w="100%" justify="center">
        <AppNavigation />
      </Flex>
    </>
  )
}
