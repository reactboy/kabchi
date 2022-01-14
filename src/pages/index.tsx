import Head from 'next/head'
import { Heading } from '@chakra-ui/react'

import { AppLayout } from 'components/layout'

const Home = () => {
  return (
    <>
      <Head>
        <title>kabchi</title>
        <meta name="description" content="kabchi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        <Heading as="h1" color="kbpurple.900">
          kabchi
        </Heading>
      </AppLayout>
    </>
  )
}

export default Home
