import { FormEventHandler, VFC } from 'react'
import {
  UseDisclosureReturn,
  FormControl,
  FormLabel,
  Textarea,
  HStack,
} from '@chakra-ui/react'

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
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
        <ModalBody>
          <FormControl>
            <FormLabel fontSize={14} fontWeight="bold" color="kbpurple.900">
              Comment
            </FormLabel>
            <Textarea placeholder="what you done?" />
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
