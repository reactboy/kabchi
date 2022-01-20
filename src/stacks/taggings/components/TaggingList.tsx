import { MouseEvent, VFC } from 'react'
import { Stack, Box, Text, Flex } from '@chakra-ui/react'
import { PencilIcon, TrashIcon } from '@heroicons/react/solid'

import { Tagging } from 'classes'
import { setTaggingInput } from 'redux/feature'
import { store } from 'redux/app'

import { useTaggingsQuery } from '..'

type TaggingListItemProps = {
  tagging: Tagging
  onDelete: () => void
  onEdit: () => void
}

const TaggingListItem: VFC<TaggingListItemProps> = (props) => {
  const { tagging, onDelete, onEdit } = props
  const onClickIconHandler =
    (cb: () => void) =>
    (e: MouseEvent<HTMLDivElement> & MouseEvent<SVGSVGElement>) => {
      e.preventDefault()
      e.stopPropagation()
      cb()
    }

  return (
    <Stack
      w="100%"
      py={1}
      borderBottom="2px solid"
      borderColor="kbgray.400"
      spacing={1}
    >
      <Box>
        <Text fontSize={24} whiteSpace="pre-wrap">
          {tagging.content}
        </Text>
      </Box>
      <Flex justify="space-between">
        <Text color="kbpurple.400" fontWeight="bold">
          {tagging.createdAt}
        </Text>
        <Stack direction="row" align="center">
          <Box
            as={PencilIcon}
            w="24px"
            h="24px"
            transition="opacity ease .2s"
            cursor="pointer"
            _hover={{
              opacity: 0.6,
            }}
            onClick={onClickIconHandler(() => {
              store.dispatch(setTaggingInput(tagging.getFormInput()))
              onEdit()
            })}
          />
          <Box
            as={TrashIcon}
            w="20px"
            h="20px"
            transition="color ease .2s"
            cursor="pointer"
            _hover={{
              color: 'red.400',
            }}
            onClick={onClickIconHandler(() => {
              store.dispatch(setTaggingInput(tagging.getFormInput()))
              onDelete()
            })}
          />
        </Stack>
      </Flex>
    </Stack>
  )
}

type TaggingListProps = {
  wallId: string
  onEdit: () => void
  onDelete: () => void
}

export const TaggingList: VFC<TaggingListProps> = (props) => {
  const { wallId, onDelete, onEdit } = props
  const { data: taggings, isLoading } = useTaggingsQuery(wallId)

  if (isLoading) return <>loading...</>

  return (
    <Stack w="100%">
      {taggings?.map((tagging, i) => (
        <TaggingListItem
          key={i}
          tagging={tagging}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </Stack>
  )
}

export const stubTaggings = [...Array(5)].map(
  (_val, i) =>
    new Tagging({ id: `${i}`, content: `${i} コンテンツ`, createdAt: '12:00' })
)

export const stubTagging = new Tagging({
  id: `01`,
  content: `コンテンツ`,
  createdAt: '12:00',
})
