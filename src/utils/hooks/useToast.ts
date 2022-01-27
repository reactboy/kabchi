import { useToast as useChakraToast, UseToastOptions } from '@chakra-ui/react'

const DEFAULT_OPTIONS: Partial<UseToastOptions> = {
  isClosable: false,
  position: 'top',
  duration: 1500,
}

export const useToast = () => {
  const toast = useChakraToast()

  const showToast = (options: UseToastOptions = {}) => {
    toast({
      ...options,
    })
  }

  const showSuccessToast = (options: UseToastOptions = {}) => {
    toast({
      ...DEFAULT_OPTIONS,
      ...options,
      status: 'success',
    })
  }

  const showErrorToast = (options: UseToastOptions = {}) => {
    toast({
      ...DEFAULT_OPTIONS,
      ...options,
      status: 'error',
    })
  }

  return {
    showToast,
    showSuccessToast,
    showErrorToast,
  }
}
