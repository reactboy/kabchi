import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/provider'

import { theme } from 'utils/chakra'
import { useAuthChanged } from 'utils/hooks'

const Kabchi = ({ Component, pageProps }: AppProps) => {
  useAuthChanged()
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default Kabchi
