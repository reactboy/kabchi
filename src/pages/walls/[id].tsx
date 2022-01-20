import { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
  Flex,
  HStack,
  Heading,
  Text,
  Box,
  useDisclosure,
} from '@chakra-ui/react'

import { AppLayout } from 'components/layout'
import { Button } from 'components/common'
import { WIDTH } from 'styles'
import { useAuthRequired } from 'utils/hooks'

import { TaggingList, stubTaggings, ControlModal } from 'stacks/taggings'
import { useWallByIdQuery } from 'stacks/walls'

const stubDate = '01-11'

const WallDetail: NextPage = () => {
  useAuthRequired()
  const router = useRouter()
  const { data: wall, isLoading: isLoadingWall } = useWallByIdQuery()

  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure()

  const selectedDate = stubDate

  const onClickPrevious = () => {
    alert('previous')
  }
  const onClickNext = () => {
    alert('next')
  }
  const onClickAdd = () => {
    onCreateOpen()
  }
  const onClickOverview = () => {
    alert('overview')
  }

  return (
    <AppLayout>
      <Flex justify="space-between" align="flex-end">
        <Flex as={Heading} align="center">
          <Text
            as="span"
            color="kbpurple.900"
            cursor="pointer"
            fontSize={44}
            onClick={() => router.push('/dashboard')}
          >
            Walls
          </Text>
          <Text
            as="span"
            ml={2}
            fontSize={40}
            fontWeight="normal"
            _before={{ content: '">"', mr: 2 }}
          >
            {isLoadingWall ? 'loading...' : wall.title}
          </Text>
        </Flex>
        <Button onClick={onClickOverview}>overview</Button>
      </Flex>
      <Flex>
        <Text color="kbpurple.900" fontSize={28} fontWeight="bold">
          {selectedDate}
        </Text>
      </Flex>
      <Box maxW={WIDTH['content-base']} w="100%" mt={2} mx="auto">
        <TaggingList taggings={stubTaggings} />
      </Box>
      <Flex justify="space-between" mt={4}>
        <HStack align="flex-start" spacing={4}>
          <Text fontSize={40} cursor="pointer" onClick={onClickPrevious}>
            {'<'}
          </Text>
          <Text fontSize={40} cursor="pointer" onClick={onClickNext}>
            {'>'}
          </Text>
        </HStack>
        <Button onClick={onClickAdd}>Add</Button>
      </Flex>
      <ControlModal
        isOpen={isCreateOpen}
        onClose={onCreateClose}
        onSubmit={(e) => {
          e.preventDefault()
          onCreateClose()
        }}
      />
    </AppLayout>
  )
}

export default WallDetail
