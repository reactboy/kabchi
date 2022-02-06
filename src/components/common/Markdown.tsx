import { VFC, ComponentProps } from 'react'
import {
  Heading,
  Text,
  Link,
  UnorderedList,
  OrderedList,
  ListItem,
  Stack,
  Box,
} from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import { ExternalLinkIcon } from '@heroicons/react/outline'

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
          a: ({ node, ...props }) => (
            <Link
              display="inline-flex"
              alignItems="center"
              isExternal
              {...props}
            >
              {props.children}
              <Box
                as={ExternalLinkIcon}
                display="inline"
                width="4"
                height="4"
              />
            </Link>
          ),
          ul: ({ node, ...props }) => <UnorderedList pl={4} {...props} />,
          ol: ({ node, ...props }) => <OrderedList pl={4} {...props} />,
          li: ({ node, ...props }) => <ListItem {...props} />,
          ...(props.components || {}),
        }}
      />
    </Stack>
  )
}
