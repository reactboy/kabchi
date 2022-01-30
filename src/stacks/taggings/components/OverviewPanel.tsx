import { VFC } from 'react'
import { Box } from '@chakra-ui/react'

const TrackMark = () => {
  return <Box>track mark</Box>
}

export const OverviewPanel: VFC = () => {
  return (
    <Box>
      Overview
      <Box>
        <TrackMark />
        <TrackMark />
        <TrackMark />
        <TrackMark />
      </Box>
    </Box>
  )
}
