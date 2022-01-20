import { VFC, FormEventHandler, ChangeEvent } from 'react'
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

import { store } from 'redux/app'
import { setWallInput, selectWallInput } from 'redux/feature'

type ControlModalProps = {
  isOpen: UseDisclosureReturn['isOpen']
  onClose: UseDisclosureReturn['onClose']
  onSubmit: FormEventHandler
  submitText?: string
}

export const ControlModal: VFC<ControlModalProps> = (props) => {
  const { isOpen, onClose, onSubmit, submitText = 'submit' } = props
  const wallInput = selectWallInput()

  const onChangeHandler =
    (key: keyof typeof wallInput) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      store.dispatch(setWallInput({ ...wallInput, [key]: e.target.value }))
    }

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
              value={wallInput.title}
              onChange={onChangeHandler('title')}
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize={14} color="kbpurple.900" fontWeight="bold">
              Description
            </FormLabel>
            <Textarea
              variant="filled"
              placeholder="brief description of goal."
              value={wallInput.description}
              onChange={onChangeHandler('description')}
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
