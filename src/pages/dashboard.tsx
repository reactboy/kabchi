import { NextPage } from 'next'
import { Heading, Flex, Box } from '@chakra-ui/react'

import { Button } from 'components/common'
import { AppLayout } from 'components/layout'
import { WIDTH } from 'styles'

import { WallList, stubWalls } from 'stacks/walls'

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
      <Box maxW={WIDTH['content-base']} w="100%" mt={4} mx="auto">
        <WallList walls={stubWalls} />
      </Box>
    </AppLayout>
  )
}

export default Dashboard
