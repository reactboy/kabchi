import { VFC } from 'react'
import {
  Box,
  Flex,
  Tooltip,
  useColorModeValue,
  Skeleton,
  Text,
} from '@chakra-ui/react'

import { useTaggingsMonthQuery } from 'stacks/taggings'
import { isSameDate, getDateText } from 'utils/date'

type TrackStack = 'sm' | 'md' | 'lg'

const TRACK_RATIO = {
  outer: {
    sm: 1,
    md: 0.9,
    lg: 0.8,
  },
  inner: {
    sm: 0.3,
    md: 0.4,
    lg: 0.5,
  },
}

type TrackMarkProps = {
  count: number
}

const convertTracksCount = (count: number): TrackStack => {
  if (6 <= count) return 'lg'
  if (3 <= count) return 'md'
  if (1 <= count) return 'sm'
}

const TrackMark: VFC<TrackMarkProps> = (props) => {
  const { count } = props
  const stack = convertTracksCount(count)

  const baseD = 30
  const containerD = baseD * 1.1
  const outerD = `${baseD * TRACK_RATIO['outer'][stack]}px`
  const innerD = `${baseD * TRACK_RATIO['inner'][stack]}px`

  const outerColor = useColorModeValue('kbpurple.100', 'kbpurple.700')
  const innerColor = useColorModeValue('kbpurple.700', 'kbpurple.100')

  return (
    <Box
      borderRadius="50%"
      cursor="pointer"
      pos="relative"
      w={containerD}
      h={containerD}
    >
      <Box
        pos="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        w={outerD}
        h={outerD}
        bgColor={outerColor}
        borderRadius="40%"
        opacity="0.4"
      />
      <Box
        pos="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        w={innerD}
        h={innerD}
        bgColor={innerColor}
        borderRadius="30%"
      />
    </Box>
  )
}

type Track = {
  date: string
  count: number
}

type OverviewPanelProps = {
  month: string
  toTargetDate: (date: string) => void
  wallId: string
}

const initTrack = (date: string): Track => {
  return {
    date: getDateText({ date, format: 'YYYY-MM-DD' }),
    count: 1,
  }
}

export const OverviewPanel: VFC<OverviewPanelProps> = (props) => {
  const { month, toTargetDate, wallId } = props
  const {
    data: taggings,
    isLoading,
    isError,
  } = useTaggingsMonthQuery(wallId, month)

  if (isLoading) return <Skeleton minH="40px" />
  if (isError)
    return (
      <Flex align="center" minH="40px">
        something went wrong ...
      </Flex>
    )

  const tracks = taggings.reduce<Track[]>((acc, current) => {
    if (!acc.length) return [...acc, initTrack(current.createdAt)]

    const latestTrack = acc[acc.length - 1]
    const isSameDateTrack = isSameDate([latestTrack.date, current.createdAt])

    if (!isSameDateTrack) return [...acc, initTrack(current.createdAt)]

    latestTrack.count++
    return acc
  }, [])

  return (
    <Flex align="center" minH="40px" flexWrap="wrap">
      {tracks.length ? (
        tracks.map((track, i) => (
          <Tooltip
            label={track.date}
            borderRadius={20}
            bgColor="kbgray.400"
            color="kbviolet.700"
            fontWeight="bold"
            key={i}
          >
            <Box onClick={() => toTargetDate(track.date)}>
              <TrackMark count={track.count} />
            </Box>
          </Tooltip>
        ))
      ) : (
        <Text>no record for {month}..</Text>
      )}
    </Flex>
  )
}
