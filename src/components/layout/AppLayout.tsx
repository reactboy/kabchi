import { FC } from 'react'
import Head from 'next/head'
import { VStack, Flex, StackProps, FlexProps } from '@chakra-ui/react'

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
  header?: {
    logoSize?: number
  }
} & StackProps

export const AppLayout: FC<Props> = (props) => {
  const {
    children,
    title,
    description = DEFAULT['descriptoin'],
    maxW = WIDTH['app-base'],
    innerOptions = {},
    header = {},
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
      <VStack
        h="100vh"
        pt={4}
        px={2}
        pb={0}
        mx="auto"
        {...restProps}
        maxW={maxW}
      >
        <AppHeader {...header} />
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
