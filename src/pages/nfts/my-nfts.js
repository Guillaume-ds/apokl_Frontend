import { useEffect, useState, useContext } from 'react'
import Layout from '../../hocs/Layout';
import { useRouter } from 'next/router'
import AuthenticationContext from '../../../context/AuthenticationContext';

import GetNftsBackend from '../../components/NFT/getNftsBackend';
import OwnedNfts from '../../components/NFT/ownedNfts';
import { Grid } from '@mui/material';


export default function MyAssets() {
  const {creator} = useContext(AuthenticationContext)
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  const router = useRouter()


  
  function listNFT(nft) {
    router.push(`/nfts/resell-nft?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`)
  }

  return (
    <Layout>
      <Grid container sx={{mt:5,py:2}}> 
        <p>Created NFTs</p>
        <Grid container 
        justifyContent="space-around"
				direction='row'  
        sx={{px:{xs:1,sm:4,xl:6}, mt:10}}				
				 >
        <GetNftsBackend creatorName={creator.name}/>
        </Grid>
        <p>Owned NFTs</p>
        <Grid container   
        sx={{px:{xs:1,sm:4,xl:6}, mt:10}}				
				 >       

        <OwnedNfts />
        </Grid>
        </Grid>
    </Layout>
  )
}
