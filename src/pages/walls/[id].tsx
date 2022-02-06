import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import {
  Flex,
  HStack,
  Heading,
  Text,
  Box,
  useDisclosure,
  Center,
  useColorModeValue,
} from '@chakra-ui/react'
import { DatabaseIcon } from '@heroicons/react/outline'

import { AppLayout } from 'components/layout'
import { Button } from 'components/common'
import { WIDTH } from 'styles'
import { store } from 'redux/app'
import { selectTaggingInput } from 'redux/feature'
import { useAuthRequired } from 'utils/hooks'
import { resetTaggingInput } from 'redux/feature'
import { getDateText } from 'utils/date'

import {
  TaggingList,
  ControlModal,
  ConfirmModal,
  useTaggingsMutation,
  useTaggingsDate,
  OverviewPanel,
} from 'stacks/taggings'
import { useWallByIdQuery } from 'stacks/walls'

const WallDetail: NextPage = () => {
  useAuthRequired()
  const router = useRouter()
  const {
    selectedDate,
    displayDate,
    toPreviousDate,
    toNextDate,
    isDateToday,
    selectedMonth,
    toTargetDate,
  } = useTaggingsDate()
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

  const [isOverviewShow, setOverviewShow] = useState<boolean>(false)

  const { id: taggingId } = selectTaggingInput()

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

  const onClickOverview = () => {
    setOverviewShow(!isOverviewShow)
  }

  const dateControlBgColor = useColorModeValue('kbwhite', 'kbblack')
  const dateControlBorder = useColorModeValue('kbgray.100', 'transparent')
  const dateControlDisabledColor = useColorModeValue(
    'kbpurple.400',
    'kbviolet.600'
  )
  const dateControlTextColor = useColorModeValue('kbpurple.900', 'kbpurple.500')

  const headerBgColor = useColorModeValue('kbBgLight', 'kbBgDark')

  return (
    <AppLayout>
      <Box position="sticky" top="40px" bgColor={headerBgColor}>
        <Flex justify="space-between" align="center">
          <Flex
            as={Heading}
            align={['flex-start', 'center']}
            flexDir={['column', 'row']}
          >
            <Text
              as="span"
              color="kbpurple.900"
              cursor="pointer"
              fontSize={[36, 44]}
              onClick={() => router.push('/dashboard')}
            >
              Walls
            </Text>
            <Text
              as="span"
              ml={2}
              fontSize={[36, 40]}
              fontWeight="normal"
              _before={{ content: '">"', mr: 2 }}
            >
              {isIdleWall || isLoadingWall ? 'loading...' : wall?.title}
            </Text>
          </Flex>
          <button onClick={onClickOverview}>
            <Box as={DatabaseIcon} w="32px" h="32px" />
          </button>
        </Flex>
        {isOverviewShow && (
          <OverviewPanel
            wallId={router.query.id as string}
            month={selectedMonth}
            toTargetDate={toTargetDate}
          />
        )}
        <Flex>
          <Text color="kbpurple.900" fontSize={28} fontWeight="bold">
            {displayDate}
          </Text>
        </Flex>
      </Box>
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
          px={[2, 0]}
        >
          <HStack
            align="flex-start"
            spacing={4}
            bgColor={dateControlBgColor}
            borderRadius="20"
            border="solid 1px"
            borderColor={dateControlBorder}
            px="2"
          >
            <Text
              as="button"
              fontSize={40}
              cursor="pointer"
              onClick={onClickPrevious}
              lineHeight="1"
            >
              {'<'}
            </Text>
            <Text
              as="button"
              fontSize={40}
              cursor="pointer"
              lineHeight="1"
              disabled={isDateToday}
              onClick={onClickNext}
              _disabled={{
                color: dateControlDisabledColor,
              }}
            >
              {'>'}
            </Text>
          </HStack>
          {!isDateToday && (
            <Box
              py="2"
              px="4"
              borderRadius="20"
              cursor="pointer"
              bgColor={dateControlBgColor}
              border="solid 1px"
              borderColor={dateControlBorder}
              fontWeight="bold"
              color={dateControlTextColor}
              onClick={() =>
                toTargetDate(getDateText({ format: 'YYYY-MM-DD' }))
              }
            >
              jump to Today
            </Box>
          )}
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
        onSubmit={(values) => {
          const { content } = values
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
        onSubmit={(values) => {
          const { id: taggingId, content } = values
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
