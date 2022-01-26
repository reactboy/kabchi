import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/provider'
import { Provider as ReduxProvider } from 'react-redux'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { store } from 'redux/app'
import { theme } from 'utils/chakra'
import { useAuthChanged } from 'utils/hooks'

const queryClient = new QueryClient()

const Kabchi = ({ Component, pageProps }: AppProps) => {
  useAuthChanged()

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <ReduxProvider store={store}>
          <Component {...pageProps} />
          {process.env.NEXT_PUBLIC_ENVIRONMENT === 'dev' && (
            <ReactQueryDevtools />
          )}
        </ReduxProvider>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default Kabchi
