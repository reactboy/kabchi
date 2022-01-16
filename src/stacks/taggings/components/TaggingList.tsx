import { MouseEvent } from 'react'
import { Stack, Box, Text, Flex } from '@chakra-ui/react'
import { PencilIcon, TrashIcon } from '@heroicons/react/solid'

const TaggingListItem = () => {
  const onClickIconHandler =
    (cb: () => void) =>
    (e: MouseEvent<HTMLDivElement> & MouseEvent<SVGSVGElement>) => {
      e.preventDefault()
      e.stopPropagation()
      cb()
    }

  return (
    <Stack w="100%" py={1} borderBottom="2px solid" borderColor="kbgray.400">
      <Box>
        <Text fontSize={24}>I did awesome things today.</Text>
      </Box>
      <Flex justify="space-between">
        <Text color="kbpurple.400" fontWeight="bold">
          12:00
        </Text>
        <Stack direction="row">
          <Box
            as={PencilIcon}
            w="24px"
            h="24px"
            transition="opacity ease .2s"
            cursor="pointer"
            _hover={{
              opacity: 0.6,
            }}
            onClick={onClickIconHandler(() => {
              alert('edit')
            })}
          />
          <Box
            as={TrashIcon}
            w="20px"
            h="20px"
            transition="color ease .2s"
            cursor="pointer"
            _hover={{
              color: 'red.400',
            }}
            onClick={onClickIconHandler(() => {
              alert('delete')
            })}
          />
        </Stack>
      </Flex>
    </Stack>
  )
}

export const TaggingList = () => {
  return (
    <Stack w="100%">
      <TaggingListItem />
      <TaggingListItem />
      <TaggingListItem />
      <TaggingListItem />
    </Stack>
  )
}
