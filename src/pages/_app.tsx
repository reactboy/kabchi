import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/provider";

import { theme } from "utils/chakra";

const Kabchi = ({ Component, pageProps }: AppProps) => {
    return (
        <ChakraProvider theme={theme}>
            <Component {...pageProps} />
        </ChakraProvider>
    );
};

export default Kabchi;
