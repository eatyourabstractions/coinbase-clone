import '../styles/globals.css'
import { ThirdwebProvider } from '@thirdweb-dev/react';


function MyApp({ Component, pageProps }) {
  const supportedChainIds = [4]
  
  return (
    <ThirdwebProvider desiredChainId={supportedChainIds}>
          <Component {...pageProps} />
    </ThirdwebProvider>
    )
}

export default MyApp
