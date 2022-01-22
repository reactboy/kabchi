import { useRouter } from 'next/router'
import {
  Flex,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { MenuAlt3Icon } from '@heroicons/react/solid'

import { Logo } from 'components/common'
import { WIDTH } from 'styles'
import { useSignout } from 'utils/hooks'

export const AppNavigation = () => {
  const { signout } = useSignout()
  const router = useRouter()
  return (
    <Flex
      w="100%"
      maxW={WIDTH['navigation-base']}
      justify="center"
      bgColor="kbwhite"
      border="1px solid"
      borderColor="kbgray.100"
      borderBottom="none"
      borderTopRadius={['none', 'none', '100px']}
      transition="border-radius ease .2s"
      pt={[2, 4]}
      px={2}
      pb={2}
    >
      <Flex
        w="100%"
        maxW={[WIDTH['content-sp'], WIDTH['content-base']]}
        transition="max-width ease .2s"
        justify="space-between"
        align="center"
      >
        <Logo
          onClick={() => router.push('/')}
          ratio={0.75}
          logoType="icon"
          cursor="pointer"
        />
        <Box w="40px" h="40px" cursor="pointer">
          <Menu>
            <MenuButton as="button">
              <MenuAlt3Icon width="40px" height="40px" />
            </MenuButton>
            <MenuList py={0}>
              <MenuItem onClick={() => router.push('/dashboard')}>
                Dashboard
              </MenuItem>
              <MenuItem onClick={() => router.push('/about')}>
                About kabchi
              </MenuItem>
              <MenuItem
                color="red.400"
                _hover={{ bgColor: 'red.50' }}
                onClick={signout}
              >
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Flex>
  )
}
