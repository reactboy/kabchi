import { FC } from 'react'
import Head from 'next/head'
import {
  VStack,
  Flex,
  StackProps,
  FlexProps,
  Stack,
  Skeleton,
} from '@chakra-ui/react'

import { AppHeader, AppNavigation } from 'components/layout'
import { WIDTH } from 'styles'
import { DEFAULT } from 'utils/constants'
import { selectAuthLoading } from 'redux/feature'

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

const AppLayoutSkeleton = () => {
  return (
    <VStack spacing={4}>
      <Skeleton w="100%" h={12} />
      <VStack w="100%">
        <Skeleton w="100%" h={8} />
        <Skeleton w="100%" h={8} />
        <Skeleton w="100%" h={8} />
      </VStack>
    </VStack>
  )
}

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

  const isAuthLoading = selectAuthLoading()

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
        minH="100vh"
        pt={4}
        px={2}
        pb={32}
        mx="auto"
        {...restProps}
        maxW={maxW}
      >
        <AppHeader {...header} />
        <Flex direction="column" flex="1" w="100%" {...innerOptions}>
          {isAuthLoading ? <AppLayoutSkeleton /> : children}
        </Flex>
        <Flex position="fixed" bottom="0" left="0" w="100%" justify="center">
          <AppNavigation />
        </Flex>
      </VStack>
    </>
  )
}
