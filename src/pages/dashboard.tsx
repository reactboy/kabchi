import { NextPage } from 'next'
import { Heading, Flex, Box, Stack, Text } from '@chakra-ui/react'
import { TrashIcon, PencilIcon } from '@heroicons/react/solid'

import { Button } from 'components/common'
import { AppLayout } from 'components/layout'
import { WIDTH } from 'styles'

const Dashboard: NextPage = () => {
  return (
    <AppLayout>
      <Flex justify="space-between" align="flex-end">
        <Heading fontSize={44}>
          Walls
          <Box
            w="100%"
            h={1.5}
            bgColor="kbpurple.900"
            borderRadius="10px"
            transform="translateY(-80%)"
          />
        </Heading>
        <Button>Create Wall</Button>
      </Flex>
      <Box maxX={WIDTH['content-base']} mt={4}>
        <Stack>
          {[null, null, null, null, null, null].map((_val, i) => {
            return (
              <Flex
                key={i}
                justify="space-between"
                align="center"
                bgColor="kbwhite"
                border="1px solid"
                borderColor="kbgray.400"
                borderLeft="8px solid"
                borderLeftColor="kbpurple.900"
                borderRightRadius="4px"
                minH={16}
                pl={2}
                pr={3}
                transition="border-radius ease .4s"
                cursor="pointer"
                _hover={{
                  borderRadius: '20px',
                }}
                onClick={() => alert('list item')}
              >
                <Text fontSize={20} fontWeight="bold">
                  タイトル
                </Text>
                <Stack direction="row">
                  <PencilIcon
                    width="25px"
                    height="25px"
                    onClick={(e) => {
                      e.stopPropagation()
                      alert('pencil')
                    }}
                  />
                  <TrashIcon
                    width="25px"
                    height="25px"
                    onClick={(e) => {
                      e.stopPropagation()
                      alert('trash')
                    }}
                  />
                </Stack>
              </Flex>
            )
          })}
        </Stack>
      </Box>
    </AppLayout>
  )
}

export default Dashboard
