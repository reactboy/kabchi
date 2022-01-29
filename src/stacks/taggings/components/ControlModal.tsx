import { VFC } from 'react'
import {
  UseDisclosureReturn,
  FormControl,
  FormLabel,
  Textarea,
  HStack,
} from '@chakra-ui/react'
import { Formik } from 'formik'

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Button,
} from 'components/common'
import { selectTaggingInput, TaggingInput } from 'redux/feature'

type ControlModalProps = {
  isOpen: UseDisclosureReturn['isOpen']
  onClose: UseDisclosureReturn['onClose']
  onSubmit: (values: TaggingInput) => void
  submitText?: string
}

const validate = (values) => {
  const errors: { content?: string } = {}
  if (!values.content) errors.content = 'Required'
  return errors
}

export const ControlModal: VFC<ControlModalProps> = (props) => {
  const { isOpen, onClose, onSubmit, submitText = 'submit' } = props
  const taggingInput = selectTaggingInput()

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <Formik
        initialValues={{ ...taggingInput }}
        onSubmit={onSubmit}
        validate={validate}
      >
        {(formik) => (
          <ModalContent as="form" onSubmit={formik.handleSubmit}>
            <ModalBody>
              <FormControl>
                <FormLabel fontSize={14} fontWeight="bold" color="kbpurple.900">
                  Comment
                </FormLabel>
                <Textarea
                  name="content"
                  variant="filled"
                  placeholder="what you done?"
                  onChange={formik.handleChange}
                  value={formik.values.content}
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
