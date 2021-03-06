import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Box, Stack, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import { LinkIcon } from '@heroicons/react/solid'

import { AppLayout, AppLayoutSkeleton } from 'components/layout'
import { GuestSignInButton, GoogleSignInButton, Logo } from 'components/common'
import { WIDTH } from 'styles'
import { useSignin } from 'utils/hooks'
import { selectUid } from 'redux/feature'

const Top: NextPage = () => {
  const router = useRouter()
  const uid = selectUid()
  const { signinAnnonymously, signinWithGoogle } = useSignin()

  const catchPhraseColor = useColorModeValue('kbviolet.900', 'kbpurple.100')

  useEffect(() => {
    if (uid) router.push('/dashboard')
  }, [uid, router])

  return (
    <AppLayout
      maxW={WIDTH['app-wide']}
      header={{ logoSize: 0.75 }}
      innerOptions={{
        display: 'flex',
        flexDir: ['column-reverse', 'row'],
        pt: [4, 28],
      }}
    >
      {uid ? (
        <AppLayoutSkeleton />
      ) : (
        <>
          <Box
            bgRepeat="no-repeat"
            bgImage="/assets/images/top/hero.svg"
            bgPos="center"
            bgSize="contain"
            width="100%"
            maxH="400px"
            h={['300px', 'auto']}
            mt={[8, 0]}
          />
          <Stack width="100%" spacing="8">
            <Stack align={['center', 'flex-start']}>
              <Box
                as="p"
                fontWeight="bold"
                color={catchPhraseColor}
                fontSize={['3xl', '5xl']}
              >
                Manage your goals
              </Box>
              <Box
                as="p"
                fontWeight="bold"
                color={catchPhraseColor}
                fontSize={['3xl', '5xl']}
              >
                Record your progress
              </Box>
              <Box
                as="p"
                fontWeight="bold"
                color={catchPhraseColor}
                fontSize={['3xl', '5xl']}
              >
                Review your activities
              </Box>
              <Flex align="flex-end">
                <Text fontWeight="bold">with</Text>
                <Flex
                  align="center"
                  ml="2"
                  cursor="pointer"
                  onClick={() => router.push('/about')}
                >
                  <Logo ratio={0.4} />
                  <Box as={LinkIcon} w="5" h="5" />
                </Flex>
              </Flex>
            </Stack>
            <Stack direction="row" justify={['center', 'start']}>
              <GoogleSignInButton onClick={signinWithGoogle} />
              <GuestSignInButton onClick={signinAnnonymously} />
            </Stack>
          </Stack>
        </>
      )}
    </AppLayout>
  )
}

export default Top
