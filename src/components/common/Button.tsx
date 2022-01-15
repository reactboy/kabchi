import { FC } from 'react'
import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react'
import { LoginIcon } from '@heroicons/react/outline'

type Props = ButtonProps

export const Button: FC<Props> = (props) => {
  return <ChakraButton colorScheme="kbpurple" {...props} />
}

export const GuestSignInButton: FC<Props> = (props) => {
  return (
    <Button leftIcon={<LoginIcon width="24px" height="24px" />} {...props}>
      Sign in as a guest
    </Button>
  )
}

export const GoogleSignInButton: FC<Props> = (props) => {
  const IMAGE = {
    light: {
      normal: '/assets/google/signin-light.png',
      focus: '/assets/google/signin-light-focus.png',
      pressed: '/assets/google/signin-light-pressed.png',
      disabled: '/assets/google/signin-light-disabled.png',
    },
    dark: {
      normal: '/assets/google/signin-dark.png',
      focus: '/assets/google/signin-dark-focus.png',
      pressed: '/assets/google/signin-dark-pressed.png',
      disabled: '/assets/google/signin-dark-disabled.png',
    },
  }
  const DIMENSION = {
    width: 382,
    height: 92,
  }
  const RATIO = 0.5
  //   TODO(eastasian) switch mode based on color mode
  const mode = 'light'
  return (
    <ChakraButton
      width={DIMENSION['width'] * RATIO}
      height={DIMENSION['height'] * RATIO}
      bgImg={IMAGE[mode]['normal']}
      bgPos="center"
      bgSize="contain"
      transition="background-image ease .2s"
      _hover={{
        bgImg: IMAGE[mode]['focus'],
      }}
      _active={{
        bgImg: IMAGE[mode]['pressed'],
      }}
      _disabled={{
        bgImg: IMAGE[mode]['disabled'],
      }}
      {...props}
    />
  )
}
