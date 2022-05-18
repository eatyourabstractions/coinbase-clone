import React, { useEffect, useState }  from 'react'

//styling
import styled from 'styled-components'

// my components
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Main from '../components/Main'

// blockchain
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from 'ethers'



function Dashboard({address}) {
  const [sanityTokens, setSanityTokens] = useState([])
  const [twTokens, setTwTokens] = useState([])



  
  // fetch sanity tokens
  useEffect(() => {
    const getCoins = async () => {
      try {
        const coins = await fetch(
          'https://0trnmajp.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%20%3D%3D%27coins%27%5D%7B%0A%20%20name%2C%0A%20%20usdPrice%2C%0A%20%20contractAddress%2C%0A%20%20symbol%2C%0A%20%20logo%0A%7D'
        )
        const tempSanityTokens = await coins.json()
        setSanityTokens(tempSanityTokens.result)
      } catch (error) {
        console.error(error)
      }
    }

     getCoins()
  }, [])

  // fetch tw tokens
  useEffect(() => {
    const rpcUrl = "https://rinkeby.infura.io/v3/a7d9975493b743aab50882a308b39f9e";
    if (sanityTokens) {
      const sdk = new ThirdwebSDK(
        new ethers.Wallet(
          process.env.NEXT_PUBLIC_METAMASK_KEY,
          ethers.getDefaultProvider(rpcUrl),
        ),
      )
      
      const fetchedTwTokens = []
      sanityTokens.map(tokenItem => {
        const currentToken = sdk.getToken(tokenItem.contractAddress)
        fetchedTwTokens.push(currentToken)
        setTwTokens(fetchedTwTokens)
      })
    }
  }, [sanityTokens])
  return (
    <Wrapper>
        <Sidebar />
        <MainContainer>
            <Header 
                walletAddress={address} 
                connectWallet={() => {console.log('header/connectWallet called')}}
                sanityTokens={sanityTokens}
                twTokens={twTokens}
                />   
            <Main
                twTokens={twTokens}
                sanityTokens={sanityTokens}
                walletAddress={address}
                />
        </MainContainer>   
   </Wrapper>
   )
}

export default Dashboard

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #0a0b0d;
  color: white;
`

const MainContainer = styled.div`
  flex: 1;
`