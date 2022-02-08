import { VFC, ComponentProps } from 'react'
import {
  Heading,
  Text,
  UnorderedList,
  OrderedList,
  ListItem,
  Stack,
} from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'

import { Anchor } from 'components/common'

type Props = ComponentProps<typeof ReactMarkdown>

export const MarkdownView: VFC<Props> = (props) => {
  return (
    <Stack>
      <ReactMarkdown
        {...props}
        components={{
          h1: ({ node, ...props }) => (
            <Heading as="h2" size="3xl" isTruncated {...props} />
          ),
          h2: ({ node, ...props }) => (
            <Heading as="h2" size="2xl" isTruncated {...props} />
          ),
          h3: ({ node, ...props }) => <Heading as="h3" size="lg" {...props} />,
          h4: ({ node, ...props }) => <Heading as="h4" size="md" {...props} />,
          h5: ({ node, ...props }) => <Heading as="h5" size="sm" {...props} />,
          h6: ({ node, ...props }) => <Heading as="h6" size="xs" {...props} />,
          p: ({ node, ...props }) => <Text {...props} whiteSpace="pre-wrap" />,
          a: ({ node, ...props }) => <Anchor {...props} />,
          ul: ({ children }) => (
            <UnorderedList pl={4}>{children}</UnorderedList>
          ),
          ol: ({ children }) => <OrderedList pl={4}>{children}</OrderedList>,
          li: ({ children }) => <ListItem>{children}</ListItem>,
          ...(props.components || {}),
        }}
      />
    </Stack>
  )
}
