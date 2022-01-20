import { NextPage } from 'next'
import { Heading, Flex, Box, useDisclosure } from '@chakra-ui/react'

import { Button } from 'components/common'
import { AppLayout } from 'components/layout'
import { WIDTH } from 'styles'
import { useAuthRequired } from 'utils/hooks'
import { store } from 'redux/app'
import { selectWallInput, resetWallInput } from 'redux/feature'

import {
  WallList,
  ConfirmModal,
  ControlModal,
  useWallsMutation,
} from 'stacks/walls'

const Dashboard: NextPage = () => {
  useAuthRequired()
  const { createWallMutation, updateWallMutation, deleteWallMutation } =
    useWallsMutation()
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure()
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure()
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure()

  const { id: wallId, title, description } = selectWallInput()

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
        <Button onClick={onCreateOpen}>Create Wall</Button>
      </Flex>
      <Box maxW={WIDTH['content-base']} w="100%" mt={4} mx="auto">
        <WallList onDelete={onDeleteOpen} onEdit={onEditOpen} />
      </Box>
      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => {
          store.dispatch(resetWallInput())
          onDeleteClose()
        }}
        onConfirm={() => {
          deleteWallMutation.mutate({ wallId })
          store.dispatch(resetWallInput())
          onDeleteClose()
        }}
        text={`Are you sure you want to delete?`}
      />
      <ControlModal
        isOpen={isCreateOpen}
        onClose={() => {
          store.dispatch(resetWallInput())
          onCreateClose()
        }}
        onSubmit={(e) => {
          e.preventDefault()
          createWallMutation.mutate({ title, description })
          store.dispatch(resetWallInput())
          onCreateClose()
        }}
        submitText="create"
      />
      <ControlModal
        isOpen={isEditOpen}
        onClose={() => {
          store.dispatch(resetWallInput())
          onEditClose()
        }}
        onSubmit={async (e) => {
          e.preventDefault()
          updateWallMutation.mutate({ wallId, title, description })
          store.dispatch(resetWallInput())
          onEditClose()
        }}
        submitText="update"
      />
    </AppLayout>
  )
}

export default Dashboard
