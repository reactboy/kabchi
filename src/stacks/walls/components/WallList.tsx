import { MouseEvent, VFC } from 'react'
import { useRouter } from 'next/router'
import {
  StackProps,
  Stack,
  Text,
  Flex,
  Box,
  Skeleton,
  SkeletonText,
  SkeletonProps,
} from '@chakra-ui/react'
import { PencilIcon, TrashIcon } from '@heroicons/react/solid'

import { Wall } from 'classes'
import { store } from 'redux/app'
import { setWallInput } from 'redux/feature'
import { Button } from 'components/common'

import { useWallsQuery } from '..'

type WallListItemProps = {
  wall: Wall
  onEdit: () => void
  onDelete: () => void
}

const WallListItem: VFC<WallListItemProps> = (props) => {
  const { wall, onEdit, onDelete } = props
  const router = useRouter()

  const onClickItemHandler = (id: Wall['id']) => () => {
    router.push(`/walls/${id}`)
  }
  const onClickIconHandler =
    (cb: () => void) =>
    (e: MouseEvent<HTMLDivElement> & MouseEvent<SVGSVGElement>) => {
      e.preventDefault()
      e.stopPropagation()
      cb()
    }

  return (
    <Flex
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
      onClick={onClickItemHandler(wall.id)}
    >
      <Text fontSize={20} fontWeight="bold">
        {wall.title}
      </Text>
      <Stack direction="row" align="center">
        <Box
          as={PencilIcon}
          w="24px"
          h="24px"
          transition="opacity ease .2s"
          _hover={{
            opacity: 0.6,
          }}
          onClick={onClickIconHandler(() => {
            store.dispatch(setWallInput(wall.getFormInput()))
            onEdit()
          })}
        />
        <Box
          as={TrashIcon}
          w="20px"
          h="20px"
          transition="color ease .2s"
          _hover={{
            color: 'red.400',
          }}
          onClick={onClickIconHandler(() => {
            store.dispatch(setWallInput({ id: wall.id }))
            onDelete()
          })}
        />
      </Stack>
    </Flex>
  )
}

const WallListItemSkeleton: VFC<SkeletonProps> = (props) => {
  return <Skeleton h="56px" {...props} />
}

export const WallListSkeleton: VFC<StackProps> = (props) => {
  return (
    <Stack {...props}>
      <WallListItemSkeleton />
      <WallListItemSkeleton w="95%" />
      <WallListItemSkeleton w="90%" />
    </Stack>
  )
}

type EmptyWallProps = {
  onCreate: () => void
} & StackProps

const EmptyWall: VFC<EmptyWallProps> = (props) => {
  const { onCreate, ...stackProps } = props
  return (
    <Stack direction="column" spacing={4} {...stackProps}>
      <Box>
        <Text fontSize={24} fontWeight="bold" color="kbviolet.700">
          You don't have Wall yet...
          <br />
          Let's create one!
        </Text>
      </Box>
      <Box>
        <Button onClick={onCreate}>Create Wall</Button>
      </Box>
    </Stack>
  )
}

//TODO(eastasian) consider separating responsibilities of WallList
type WallListProps = {
  onDelete: () => void
  onEdit: () => void
  onCreate: () => void
}

export const WallList: VFC<WallListProps> = (props) => {
  const { onDelete, onEdit, onCreate } = props
  const { data: walls, isLoading, isIdle } = useWallsQuery()

  if (isLoading || isIdle) return <WallListSkeleton />

  return (
    <Stack>
      {walls.length ? (
        walls.map((wall, i) => {
          return (
            <WallListItem
              key={i}
              wall={wall}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          )
        })
      ) : (
        <EmptyWall
          onCreate={onCreate}
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -100%)"
        />
      )}
    </Stack>
  )
}
