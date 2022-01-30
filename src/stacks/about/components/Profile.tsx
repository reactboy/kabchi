import { VFC } from 'react'
import {
  Image,
  Stack,
  Avatar,
  Text,
  StackProps,
  Box,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'

export type Social = {
  kind: 'twitter' | 'github'
  link: string
}

type ProfileProps = {
  name: string
  organization: string
  avatar: string
  socials?: Social[]
} & StackProps

const ICON = {
  github: {
    light: '/assets/images/socials/github-light.png',
    dark: '/assets/images/socials/github-dark.png',
  },
}

export const Profile: VFC<ProfileProps> = (props) => {
  const { name, organization, avatar, socials, ...restProps } = props

  const { colorMode } = useColorMode()
  const nameColor = useColorModeValue('kbviolet.600', 'kbviolet.100')

  return (
    <Stack spacing=".5" align="center" {...restProps}>
      <Avatar size="2xl" name={name} src={avatar} />
      <Stack align="center" spacing={0}>
        <Text fontWeight="bold" fontSize="4xl" color={nameColor}>
          {name}
        </Text>
        <Text lineHeight={1} color="kbpurple.600">
          {organization}
        </Text>
      </Stack>
      {socials && (
        <Box mt="4">
          {socials?.map((social) => {
            return (
              <a target="_blank" href={social.link} key={social.link}>
                <Image
                  cursor="pointer"
                  h="8"
                  src={ICON[social.kind][colorMode]}
                  transition="opacity ease .4s"
                  _hover={{
                    opacity: 0.6,
                  }}
                />
              </a>
            )
          })}
        </Box>
      )}
    </Stack>
  )
}
