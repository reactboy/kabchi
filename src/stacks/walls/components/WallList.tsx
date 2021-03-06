import { MouseEvent, VFC } from 'react'
import { useRouter } from 'next/router'
import {
  StackProps,
  Stack,
  Text,
  Flex,
  Box,
  Skeleton,
  SkeletonProps,
  useColorModeValue,
} from '@chakra-ui/react'
import { PencilIcon, TrashIcon } from '@heroicons/react/solid'

import { Wall } from 'classes'
import { store } from 'redux/app'
import { setWallInput } from 'redux/feature'
import { Button, ErrorPlaceholder } from 'components/common'

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

  const bgColor = useColorModeValue('kbwhite', 'kbblack')
  const borderColor = useColorModeValue('kbgray.400', 'transparent')
  const borderHoverColor = useColorModeValue('blue.400', 'blue.200')

  return (
    <Flex
      justify="space-between"
      align="center"
      bgColor={bgColor}
      border="1px solid"
      borderColor={borderColor}
      borderLeft="8px solid"
      borderLeftColor="kbpurple.900"
      borderRightRadius="4px"
      minH={16}
      pl={2}
      pr={3}
      cursor="pointer"
      transition="border ease .4s"
      _hover={{
        borderColor: borderHoverColor,
        borderLeft: '12px solid',
        borderLeftColor: 'kbpurple.900',
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
  const textColor = useColorModeValue('kbviolet.700', 'kbviolet.100')
  return (
    <Stack direction="column" spacing={4} {...stackProps}>
      <Box>
        <Text fontSize={24} fontWeight="bold" color={textColor}>
          You don&apos;t have Wall yet...
          <br />
          Let&apos;s create one!
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
  const { data: walls, isLoading, isIdle, isError } = useWallsQuery()

  if (isLoading || isIdle) return <WallListSkeleton />
  if (isError) return <ErrorPlaceholder />

  return (
    <Stack>
      {walls?.length ? (
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
