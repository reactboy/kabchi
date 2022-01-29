import { FC, VFC } from 'react'
import {
  Box,
  Button as ChakraButton,
  ButtonProps,
  useColorMode,
} from '@chakra-ui/react'
import { LoginIcon } from '@heroicons/react/outline'
import { SunIcon, MoonIcon } from '@heroicons/react/solid'

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

export const GoogleSignInButton: FC<Props> = (props) => {
  const { colorMode: mode } = useColorMode()
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

export const ColorModeButton: VFC<Props> = (props) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const size = '28px'
  return (
    <Button {...props} onClick={toggleColorMode} p="0">
      {colorMode === 'light' ? (
        <Box as={MoonIcon} w={size} h={size} />
      ) : (
        <Box as={SunIcon} w={size} h={size} />
      )}
    </Button>
  )
}
