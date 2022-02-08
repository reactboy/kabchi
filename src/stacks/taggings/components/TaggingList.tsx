import { MouseEvent, VFC } from 'react'
import {
  Skeleton,
  SkeletonProps,
  Center,
  Stack,
  StackProps,
  Box,
  Text,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react'
import { PencilIcon, TrashIcon } from '@heroicons/react/solid'

import { Tagging } from 'classes'
import { setTaggingInput } from 'redux/feature'
import { store } from 'redux/app'
import { Button, ErrorPlaceholder, MarkdownView } from 'components/common'

import { useTaggingsQuery } from '..'

type TaggingListItemProps = {
  tagging: Tagging
  onDelete: () => void
  onEdit: () => void
  isEditable: boolean
}

const TaggingListItem: VFC<TaggingListItemProps> = (props) => {
  const { tagging, onDelete, onEdit, isEditable } = props

  const borderColor = useColorModeValue('kbgray.400', 'kbpurple.900')
  const dateColor = useColorModeValue('kbpurple.400', 'kbpurple.600')

  return (
    <Stack
      as="li"
      w="100%"
      py={1}
      borderBottom="2px solid"
      borderColor={borderColor}
      spacing={1}
    >
      <Box>
        <MarkdownView children={tagging.content} />
      </Box>
      <Flex justify="space-between" align="flex-end">
        <Text color={dateColor} fontWeight="bold" fontSize={12}>
          {tagging.getCreatedAt('HH:mm')}
        </Text>
        <Stack minH="24px" direction="row" align="center">
          {isEditable && (
            <button
              onClick={() => {
                store.dispatch(setTaggingInput(tagging.getFormInput()))
                onEdit()
              }}
            >
              <Box
                as={PencilIcon}
                w="24px"
                h="24px"
                transition="opacity ease .2s"
                cursor="pointer"
                _hover={{
                  opacity: 0.6,
                }}
              />
            </button>
          )}
          <button
            onClick={() => {
              store.dispatch(setTaggingInput(tagging.getFormInput()))
              onDelete()
            }}
          >
            <Box
              as={TrashIcon}
              w="20px"
              h="20px"
              transition="color ease .2s"
              cursor="pointer"
              _hover={{
                color: 'red.400',
              }}
            />
          </button>
        </Stack>
      </Flex>
    </Stack>
  )
}

const TaggingListItemSkeleton: VFC<SkeletonProps> = (props) => {
  return <Skeleton h="48px" {...props} />
}

const TaggingListSkeleton: VFC<StackProps> = (props) => {
  return (
    <Stack {...props}>
      <TaggingListItemSkeleton />
      <TaggingListItemSkeleton w="95%" />
      <TaggingListItemSkeleton w="90%" />
    </Stack>
  )
}

type EmptyTaggingProps = {
  onCreate: () => void
  isDateToday: boolean
} & StackProps

const EmptyTagging: VFC<EmptyTaggingProps> = (props) => {
  const { onCreate, isDateToday, ...stackProps } = props
  const textColor = useColorModeValue('kbviolet.700', 'kbviolet.100')
  const emptyDisplayText = isDateToday
    ? "Let's record what you done today!"
    : 'no record for this day...'
  return (
    <Stack direction="column" spacing={4} {...stackProps}>
      <Box>
        <Text fontSize={24} fontWeight="bold" color={textColor}>
          {emptyDisplayText}
        </Text>
      </Box>
      <Box>{isDateToday && <Button onClick={onCreate}>Add</Button>}</Box>
    </Stack>
  )
}

type TaggingListProps = {
  wallId: string
  onEdit: () => void
  onDelete: () => void
  onCreate: () => void
  isDateToday: boolean
  selectedDate: string
}

export const TaggingList: VFC<TaggingListProps> = (props) => {
  const { wallId, onDelete, onCreate, onEdit, isDateToday, selectedDate } =
    props
  const {
    data: taggings,
    isLoading,
    isError,
  } = useTaggingsQuery(wallId, selectedDate)

  if (isLoading) return <TaggingListSkeleton />
  if (isError) return <ErrorPlaceholder />

  return (
    <Stack as="ul" w="100%">
      {taggings?.length ? (
        taggings.map((tagging, i) => (
          <TaggingListItem
            key={i}
            tagging={tagging}
            onDelete={onDelete}
            onEdit={onEdit}
            isEditable={isDateToday}
          />
        ))
      ) : (
        <Center mt="20">
          <EmptyTagging onCreate={onCreate} isDateToday={isDateToday} />
        </Center>
      )}
    </Stack>
  )
}
