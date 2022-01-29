import { FC } from 'react'
import {
  ModalBody,
  Text,
  UseDisclosureReturn,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react'

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
} from 'components/common'

type ConfirmModalProps = {
  text: string
  onConfirm: () => void
  isOpen: UseDisclosureReturn['isOpen']
  onClose: UseDisclosureReturn['onClose']
}

export const ConfirmModal: FC<ConfirmModalProps> = (props) => {
  const { isOpen, onClose, onConfirm, text } = props
  const textColor = useColorModeValue('kbpurple.900', 'kbpurple.100')

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Text
            fontSize={20}
            fontWeight="semibold"
            whiteSpace="pre-wrap"
            color={textColor}
          >
            {text}
          </Text>
        </ModalBody>
        <ModalFooter as={HStack}>
          <Button onClick={onClose}>close</Button>
          <Button onClick={onConfirm}>confirm</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
