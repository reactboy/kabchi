import { Box, BoxProps, useColorMode } from '@chakra-ui/react'
import { VFC } from 'react'

type LogoSet<T = string> = {
  text: T
  icon: T
}

type LogoImage = {
  light: LogoSet
  dark: LogoSet
}

const IMAGE: LogoImage = {
  light: {
    text: '/assets/logo/text-light.svg',
    icon: '/assets/logo/icon-light.svg',
  },
  dark: {
    text: '/assets/logo/text-dark.svg',
    icon: '/assets/logo/icon-dark.svg',
  },
}

const DIMENSION: LogoSet<{ width: number; height: number }> = {
  text: {
    width: 240,
    height: 72,
  },
  icon: {
    width: 67,
    height: 67,
  },
}

type LogoType = keyof LogoSet
type Props = {
  logoType?: LogoType
  ratio?: number
} & BoxProps

export const Logo: VFC<Props> = (props) => {
  const { logoType = 'text', ratio = 1, ...restProps } = props
  const { colorMode } = useColorMode()

  const src = IMAGE[colorMode][logoType]
  //NOTE(eastasian) appending 'px' to avoid confliction with chakra sizing system.
  const width = DIMENSION[logoType]['width'] * ratio + 'px'
  const height = DIMENSION[logoType]['height'] * ratio + 'px'

  return (
    <Box
      w={width}
      height={height}
      bgImg={src}
      bgRepeat="no-repeat"
      bgSize="contain"
      bgPosition="center"
      {...restProps}
    />
  )
}
