import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import CardNft from './cardNft'
import { ownedNFTs } from './functionNFT'
import ApoklButton from '../apoklButton'
import { Grid } from '@mui/material'

import ButtonStyles from '../../styles/Button.module.scss';


export default function OwnedNfts() {
  const [nfts, setNfts] = useState([])
  const [loading, setLoading] = useState('not-loaded')
  const router = useRouter()

  useEffect(() => {
    loadOwnedNfts()
  }, [])

  async function loadOwnedNfts(){
    const nfts = await ownedNFTs();
    setNfts(nfts)
    setLoading('loaded') 
  }

    
  function listNFT(nft) {
    router.push(`/nfts/resell-nft?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`)
  }
  if 
  (loading === 'loaded' && !nfts.length) return (<h1 className="py-10 px-20 text-3xl">No NFTs owned</h1>)
  return (
    <Grid container 
            direction={"row"} 
            justifyContent="space-around" 
            rowSpacing={12}
            columnSpacing={{ sm: 4, md: 10 }}>
          {
            nfts.map((nft, i) => (
              <Grid item xs={12} md={6} lg={4} key={i} >
                <CardNft nft={nft} />
                <Grid container justifyContent="center">
                  <Grid item width="120px"onClick={()=>listNFT(nft)}> 
                    <ApoklButton text={"Resell NFT"}  />  
                  </Grid>
                </Grid>                           
              </Grid>
            ))
          }
    </Grid>
  )
}