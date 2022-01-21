import { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
  Flex,
  HStack,
  Heading,
  Text,
  Box,
  useDisclosure,
  Center,
} from '@chakra-ui/react'

import { AppLayout } from 'components/layout'
import { Button } from 'components/common'
import { WIDTH } from 'styles'
import { store } from 'redux/app'
import { selectTaggingInput } from 'redux/feature'
import { useAuthRequired } from 'utils/hooks'
import { resetTaggingInput } from 'redux/feature'

import {
  TaggingList,
  ControlModal,
  ConfirmModal,
  useTaggingsMutation,
  useTaggingsDate,
} from 'stacks/taggings'
import { useWallByIdQuery } from 'stacks/walls'

const WallDetail: NextPage = () => {
  useAuthRequired()
  const router = useRouter()
  const { selectedDate, displayDate, toPreviousDate, toNextDate, isDateToday } =
    useTaggingsDate()
  const {
    data: wall,
    isLoading: isLoadingWall,
    isIdle: isIdleWall,
  } = useWallByIdQuery()
  const {
    createTaggingMutation,
    updateTaggingMutation,
    deleteTaggingMutation,
  } = useTaggingsMutation(router.query.id as string, selectedDate)
  const { id: taggingId, content } = selectTaggingInput()

  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure()
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure()
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure()

  const onClickPrevious = () => {
    toPreviousDate()
  }
  const onClickNext = () => {
    toNextDate()
  }

  //   TODO(eastasian) implement overview
  //   const onClickOverview = () => {
  //     alert('overview')
  //   }

  return (
    <AppLayout position="relative">
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
            {isIdleWall || isLoadingWall ? 'loading...' : wall.title}
          </Text>
        </Flex>
        {/* TODO(eastasian) implement overview */}
        {/* <Button onClick={onClickOverview}>overview</Button> */}
      </Flex>
      <Flex>
        <Text color="kbpurple.900" fontSize={28} fontWeight="bold">
          {displayDate}
        </Text>
      </Flex>
      <Box maxW={WIDTH['content-base']} w="100%" mt={2} mx="auto">
        <TaggingList
          onCreate={onCreateOpen}
          onDelete={onDeleteOpen}
          onEdit={onEditOpen}
          wallId={router.query.id as string}
          isDateToday={isDateToday}
          selectedDate={selectedDate}
        />
      </Box>
      <Center position="fixed" bottom="20" left="0" w="100%">
        <Flex
          justify="space-between"
          align="center"
          mt={4}
          w="100%"
          maxW={WIDTH['content-base']}
        >
          <HStack align="flex-start" spacing={4}>
            <Text
              as="button"
              fontSize={40}
              cursor="pointer"
              onClick={onClickPrevious}
            >
              {'<'}
            </Text>
            <Text
              as="button"
              fontSize={40}
              cursor="pointer"
              disabled={isDateToday}
              onClick={onClickNext}
              _disabled={{
                color: 'kbpurple.400',
              }}
            >
              {'>'}
            </Text>
          </HStack>
          {isDateToday && <Button onClick={onCreateOpen}>Add</Button>}
        </Flex>
      </Center>
      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => {
          store.dispatch(resetTaggingInput())
          onDeleteClose()
        }}
        onConfirm={() => {
          deleteTaggingMutation.mutate({
            taggingId,
          })
          store.dispatch(resetTaggingInput())
          onDeleteClose()
        }}
        text="Are you sure you want to delete?"
      />
      <ControlModal
        isOpen={isCreateOpen}
        onClose={() => {
          store.dispatch(resetTaggingInput())
          onCreateClose()
        }}
        onSubmit={(e) => {
          e.preventDefault()
          createTaggingMutation.mutate({
            wallId: router.query.id as string,
            content,
          })
          store.dispatch(resetTaggingInput())
          onCreateClose()
        }}
      />
      <ControlModal
        isOpen={isEditOpen}
        onClose={() => {
          store.dispatch(resetTaggingInput())
          onEditClose()
        }}
        onSubmit={(e) => {
          e.preventDefault()
          updateTaggingMutation.mutate({
            taggingId,
            content,
          })
          store.dispatch(resetTaggingInput())
          onEditClose()
        }}
      />
    </AppLayout>
  )
}

export default WallDetail
