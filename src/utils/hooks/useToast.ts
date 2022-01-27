import {
  useToast as useChakraToast,
  UseToastOptions,
  ToastId,
} from '@chakra-ui/react'

const DEFAULT_OPTIONS: Partial<UseToastOptions> = {
  isClosable: false,
  position: 'top',
  duration: 1500,
}

export const useToast = () => {
  const toast = useChakraToast()

  const showToast = (options: UseToastOptions = {}) => {
    return toast({
      ...options,
    })
  }

  const showSuccessToast = (options: UseToastOptions = {}) => {
    return toast({
      ...DEFAULT_OPTIONS,
      ...options,
      status: 'success',
    })
  }

  const showErrorToast = (options: UseToastOptions = {}) => {
    return toast({
      ...DEFAULT_OPTIONS,
      ...options,
      status: 'error',
    })
  }

  const showInfoToast = (options: UseToastOptions = {}) => {
    return toast({
      ...DEFAULT_OPTIONS,
      ...options,
      status: 'info',
    })
  }

  const closeToast = (id?: ToastId) => {
    if (id) toast.close(id)
    toast.closeAll()
  }

  return {
    showToast,
    showSuccessToast,
    showErrorToast,
    showInfoToast,
    closeToast,
  }
}
