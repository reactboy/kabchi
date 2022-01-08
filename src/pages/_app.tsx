import { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/provider"
import { extendTheme } from "@chakra-ui/react"

const colors = {

}

const fonts = {

}

const theme = extendTheme({ colors, fonts })

const Kabchi = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default Kabchi
