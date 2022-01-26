import { VFC } from 'react'
import { VStack, Text } from '@chakra-ui/react'

import { Button } from '.'

type ErrorPlaceholderProps = {
  text?: string
  onClick?: () => void
  buttonText?: string
}

export const ErrorPlaceholder: VFC<ErrorPlaceholderProps> = (props) => {
  const {
    text = 'something went wrong...',
    onClick,
    buttonText = 'retry',
  } = props

  return (
    <VStack align="flex-start">
      <Text fontSize="3xl">{text}</Text>
      {onClick && <Button onClick={onClick}>{buttonText}</Button>}
    </VStack>
  )
}
