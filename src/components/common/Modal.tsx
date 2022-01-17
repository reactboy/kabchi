import { FC } from 'react'
import {
  Modal as ChakraModal,
  ModalOverlay as ChakraModalOverlay,
  ModalContent as ChakraModalContent,
  ModalHeader as ChakraModalHeader,
  ModalFooter as ChakraModalFooter,
  ModalBody as ChakraModalBody,
  ModalCloseButton as ChakraModalCloseButton,
  ModalProps,
  ModalOverlayProps,
  ModalContentProps,
  ModalHeaderProps,
  ModalFooterProps,
  ModalBodyProps,
  CloseButtonProps,
} from '@chakra-ui/react'

export const Modal: FC<ModalProps> = (props) => {
  return <ChakraModal {...props} />
}

export const ModalOverlay: FC<ModalOverlayProps> = (props) => {
  return <ChakraModalOverlay {...props} />
}

export const ModalContent: FC<ModalContentProps> = (props) => {
  return <ChakraModalContent {...props} />
}

export const ModalHeader: FC<ModalHeaderProps> = (props) => {
  return <ChakraModalHeader {...props} />
}

export const ModalFooter: FC<ModalFooterProps> = (props) => {
  return <ChakraModalFooter {...props} />
}

export const ModalBody: FC<ModalBodyProps> = (props) => {
  return <ChakraModalBody {...props} />
}

export const ModalCloseButton: FC<CloseButtonProps> = (props) => {
  return <ChakraModalCloseButton {...props} />
}
