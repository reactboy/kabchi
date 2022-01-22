import { VFC } from 'react'
import { Image, Stack, Avatar, Text, StackProps, Box } from '@chakra-ui/react'

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

  return (
    <Stack spacing=".5" align="center" {...restProps}>
      <Avatar size="2xl" name={name} src={avatar} />
      <Stack align="center" spacing={0}>
        <Text fontWeight="bold" fontSize="4xl" color="kbviolet.600">
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
              <a target="_blank" href={social.link}>
                <Image
                  cursor="pointer"
                  h="8"
                  //TODO(eastasian) swith on color mode change.
                  src={ICON[social.kind]['light']}
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
