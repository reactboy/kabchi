import { NextPage } from 'next'
import { Heading, Flex, Box, useDisclosure } from '@chakra-ui/react'

import { Button } from 'components/common'
import { AppLayout } from 'components/layout'
import { WIDTH } from 'styles'
import { useAuthRequired } from 'utils/hooks'

import { WallList, stubWalls, ConfirmModal, ControlModal } from 'stacks/walls'

const Dashboard: NextPage = () => {
  useAuthRequired()
  const {
    isOpen: isDeleteOpen,
    onOpen: _onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure()
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure()

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
        <WallList walls={stubWalls} />
      </Box>
      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        onConfirm={onDeleteClose}
        text={`Are you sure you want to delete?`}
      />
      <ControlModal
        isOpen={isCreateOpen}
        onClose={onCreateClose}
        onSubmit={(e) => {
          e.preventDefault()
          onCreateClose()
        }}
        submitText="create"
      />
    </AppLayout>
  )
}

export default Dashboard
