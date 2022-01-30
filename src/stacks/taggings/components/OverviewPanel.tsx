import { VFC } from 'react'
import { Box, Flex, Tooltip, useColorModeValue } from '@chakra-ui/react'

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

const stubTracks = [
  { date: '2022.01.23', count: 1 },
  { date: '2022.01.24', count: 3 },
  { date: '2022.01.25', count: 6 },
  { date: '2022.01.26', count: 3 },
  { date: '2022.01.28', count: 1 },
  { date: '2022.01.23', count: 1 },
  { date: '2022.01.24', count: 3 },
  { date: '2022.01.25', count: 6 },
  { date: '2022.01.26', count: 3 },
  { date: '2022.01.28', count: 1 },
  { date: '2022.01.23', count: 1 },
  { date: '2022.01.24', count: 3 },
  { date: '2022.01.25', count: 6 },
  { date: '2022.01.26', count: 3 },
  { date: '2022.01.28', count: 1 },
  { date: '2022.01.23', count: 1 },
  { date: '2022.01.24', count: 3 },
  { date: '2022.01.25', count: 6 },
  { date: '2022.01.26', count: 3 },
  { date: '2022.01.28', count: 1 },
  { date: '2022.01.23', count: 1 },
  { date: '2022.01.24', count: 3 },
  { date: '2022.01.25', count: 6 },
  { date: '2022.01.26', count: 3 },
  { date: '2022.01.28', count: 1 },
  { date: '2022.01.28', count: 1 },
  { date: '2022.01.23', count: 1 },
  { date: '2022.01.24', count: 3 },
  { date: '2022.01.25', count: 6 },
  { date: '2022.01.26', count: 3 },
  { date: '2022.01.28', count: 1 },
]

type OverviewPanelProps = {
  month: string
  toTargetDate: (date: string) => void
}

export const OverviewPanel: VFC<OverviewPanelProps> = (props) => {
  const { month, toTargetDate } = props
  const tracks = stubTracks

  console.log(month)

  return (
    <Flex align="center" minH="100px" flexWrap="wrap">
      {tracks.map((track, key) => (
        <Tooltip
          label={track.date}
          borderRadius={20}
          bgColor="kbgray.400"
          color="kbviolet.700"
          fontWeight="bold"
        >
          <Box onClick={() => toTargetDate(track.date)}>
            <TrackMark count={track.count} key={key} />
          </Box>
        </Tooltip>
      ))}
    </Flex>
  )
}
