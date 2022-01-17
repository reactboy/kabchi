import { VFC, FormEventHandler } from 'react'
import {
  UseDisclosureReturn,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  HStack,
  VStack,
} from '@chakra-ui/react'

import {
  Modal,
  ModalFooter,
  ModalContent,
  ModalOverlay,
  ModalBody,
  Button,
} from 'components/common'

type ControlModalProps = {
  isOpen: UseDisclosureReturn['isOpen']
  onClose: UseDisclosureReturn['onClose']
  onSubmit: FormEventHandler
  submitText?: string
}

export const ControlModal: VFC<ControlModalProps> = (props) => {
  const { isOpen, onClose, onSubmit, submitText = 'submit' } = props
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={onSubmit}>
        <ModalBody as={VStack}>
          <FormControl>
            <FormLabel fontSize={14} color="kbpurple.900" fontWeight="bold">
              Title
            </FormLabel>
            <Input
              variant="filled"
              placeholder="describe your goal in short."
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize={14} color="kbpurple.900" fontWeight="bold">
              Description
            </FormLabel>
            <Textarea
              variant="filled"
              placeholder="brief description of goal."
            />
          </FormControl>
        </ModalBody>
        <ModalFooter as={HStack}>
          <Button onClick={onClose}>close</Button>
          <Button type="submit">{submitText}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
