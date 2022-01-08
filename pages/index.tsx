import Head from 'next/head'
import { Heading, Box } from '@chakra-ui/react'

const Home = () => {
  return (
    <>
      <Head>
        <title>kabchi</title>
        <meta name="description" content="kabchi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Heading as="h1">kabchi</Heading>
      </Box>
    </>
  )
}

export default Home