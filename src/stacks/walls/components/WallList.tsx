import { MouseEvent, VFC } from 'react'
import { useRouter } from 'next/router'
import { Stack, Text, Flex, Box } from '@chakra-ui/react'
import { PencilIcon, TrashIcon } from '@heroicons/react/solid'

import { Wall } from 'classes'
import { store } from 'redux/app'
import { setWallInput } from 'redux/feature'

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

type WallListProps = {
  onDelete: () => void
  onEdit: () => void
}

export const WallList: VFC<WallListProps> = (props) => {
  const { onDelete, onEdit } = props
  const { data: walls, isLoading } = useWallsQuery()

  if (isLoading) return <>loading</>

  return (
    <Stack>
      {walls.map((wall, i) => {
        return (
          <WallListItem
            key={i}
            wall={wall}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        )
      })}
    </Stack>
  )
}

export const stubWalls = [...Array(5)].map(
  (_val, i) =>
    new Wall({
      id: `${i}`,
      title: `${i} タイトル`,
      description: `${i} ディスクリプション`,
    })
)

export const stubWall = new Wall({
  id: '01',
  title: 'タイトル',
  description: 'ディスクリプション',
})
