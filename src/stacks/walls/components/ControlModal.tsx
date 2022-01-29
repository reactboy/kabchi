import { VFC } from 'react'
import {
  UseDisclosureReturn,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  HStack,
  VStack,
} from '@chakra-ui/react'
import { Formik } from 'formik'

import {
  Modal,
  ModalFooter,
  ModalContent,
  ModalOverlay,
  ModalBody,
  Button,
} from 'components/common'

import { selectWallInput, WallInput } from 'redux/feature'

type ControlModalProps = {
  isOpen: UseDisclosureReturn['isOpen']
  onClose: UseDisclosureReturn['onClose']
  onSubmit: (values: WallInput) => Promise<void>
  submitText?: string
}

const validate = (values) => {
  const errors: { title?: string; description?: string } = {}

  if (!values.title) errors.title = 'Required'
  if (!values.description) errors.description = 'Required'

  return errors
}

export const ControlModal: VFC<ControlModalProps> = (props) => {
  const { isOpen, onClose, onSubmit, submitText = 'submit' } = props
  const wallInput = selectWallInput()

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <Formik
        initialValues={{ ...wallInput }}
        onSubmit={onSubmit}
        validate={validate}
      >
        {(formik) => (
          <ModalContent as="form" onSubmit={formik.handleSubmit}>
            <ModalBody as={VStack}>
              <FormControl>
                <FormLabel fontSize={14} color="kbpurple.900" fontWeight="bold">
                  Title
                </FormLabel>
                <Input
                  variant="filled"
                  placeholder="describe your goal in short."
                  name="title"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize={14} color="kbpurple.900" fontWeight="bold">
                  Description
                </FormLabel>
                <Textarea
                  variant="filled"
                  placeholder="brief description of goal."
                  name="description"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter as={HStack}>
              <Button onClick={onClose}>close</Button>
              <Button disabled={!formik.dirty || !formik.isValid} type="submit">
                {submitText}
              </Button>
            </ModalFooter>
          </ModalContent>
        )}
      </Formik>
    </Modal>
  )
}
