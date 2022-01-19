import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Stack, UnorderedList, ListItem } from '@chakra-ui/react'

import { AppLayout } from 'components/layout'
import {
  GuestSignInButton,
  GoogleSignInButton,
  Button,
} from 'components/common'
import { WIDTH } from 'styles'
import { useSignin } from 'utils/hooks'
import { selectUid } from 'redux/feature'

const Top: NextPage = () => {
  const router = useRouter()
  const uid = selectUid()
  const { signinAnnonymously, signinWithGoogle } = useSignin()

  return (
    <AppLayout maxW={WIDTH['app-wide']} header={{ logoSize: 0.75 }}>
      <Stack direction="row">
        <Stack>
          <p>slowly but surely</p>
          <p>achieve your goal</p>
          <p>with kabchi</p>
        </Stack>
        <Stack>
          <UnorderedList>
            <ListItem>
              <p>目標をリストで管理</p>
            </ListItem>
            <ListItem>
              <p>日々の積み重ねを記録</p>
            </ListItem>
            <ListItem>
              <p>毎日の振り返りをサポート</p>
            </ListItem>
          </UnorderedList>
          <Stack direction="row">
            {uid ? (
              <Button onClick={() => router.push('/dashboard')}>
                go to dashboard
              </Button>
            ) : (
              <>
                <GoogleSignInButton onClick={signinWithGoogle} />
                <GuestSignInButton onClick={signinAnnonymously} />
              </>
            )}
          </Stack>
        </Stack>
      </Stack>
    </AppLayout>
  )
}

export default Top
