import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/provider'
import { Provider as ReduxProvider } from 'react-redux'

import { store } from 'redux/app'
import { theme } from 'utils/chakra'
import { useAuthChanged } from 'utils/hooks'

const Kabchi = ({ Component, pageProps }: AppProps) => {
  useAuthChanged()

  return (
    <ChakraProvider theme={theme}>
      <ReduxProvider store={store}>
        <Component {...pageProps} />
      </ReduxProvider>
    </ChakraProvider>
  )
}

export default Kabchi
