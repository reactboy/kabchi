import { VFC } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'

type DescriptionBlockProps = BoxProps

export const DescriptionBlock: VFC<DescriptionBlockProps> = (props) => {
  return <Box p="2" {...props} />
}
