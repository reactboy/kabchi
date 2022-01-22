import { VFC } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'

type DescriptionBlockProps = BoxProps

export const DescriptionBlock: VFC<DescriptionBlockProps> = (props) => {
  return (
    <Box
      p="2"
      border="1px solid"
      borderColor="kbgray.900"
      borderRadius={18}
      {...props}
    />
  )
}
