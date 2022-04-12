import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'
import Button from '@mui/material/Button';
import CardNft from './cardNft';
import { Grid,Container } from '@mui/material';

import FormStyles from '../../styles/Form.module.scss';

import {marketplaceAddress} from '../../../config'
import NFTMarketplace  from '../../../artifacts/contracts/NFTMarket.sol/NFTMarketplace.json'

export default function CreatedNfts({setCollectionNftsIds, collectionNftsIds}) {
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')

  const addNftId = (id) =>{
    setCollectionNftsIds([...collectionNftsIds,id])  
  }

  function removeId(arr, value) {
    var i = 0;
    while (i < arr.length) {
      if (arr[i] === value) {
        arr.splice(i, 1);
      } else {
        ++i;
      }
    }
    return arr;
  }
  const removeNftId = (id) => {
    setCollectionNftsIds(removeId(collectionNftsIds,id));
    setCollectionNftsIds([...collectionNftsIds]); /*Otherwise, it doesn't displays*/
}

  useEffect(() => {
    loadNFTs()
  }, [])
  async function loadNFTs() {
    const web3Modal = new Web3Modal({
      network: 'mainnet',
      cacheProvider: true,
    })
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
    const data = await contract.fetchItemsListed()

    const items = await Promise.all(data.map(async i => {
      const tokenUri = await contract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        creator: meta.data.creator,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
        slug: meta.data.slug
      }
      return item
    }))

    setNfts(items)
    setLoadingState('loaded') 
  }
  if (loadingState === 'loaded' && !nfts.length) return (<h1 className="py-10 px-20 text-3xl">No NFTs listed</h1>)
  return (
      <Container sx={{mt:10}}>
        <Grid container direction="row" style={{textAlign: "center",justifyContent:"space-evenly"}} columnSpacing={2} rowSpacing={4}>
          {
            nfts.map((nft, i) => (
              <Grid item md={4} >
                <CardNft key={i} 
                  creator={nft.creator} 
                  image={nft.image} 
                  name={nft.name} 
                  description={nft.description}
                  royalties={nft.royalties}
                  price={nft.price}
                  />  
                  {!collectionNftsIds.includes(nft.tokenId)?
                  <button className={FormStyles.formButton} variant="contained" alignItem='center' onClick={()=>addNftId(nft.tokenId)} >
                    Add this NFT
                  </button> :
                  <button className={FormStyles.formButtonRemove} variant="contained" color="error" alignItem='center' onClick={()=>removeNftId(nft.tokenId)}>
                    Remove this NFT
                  </button>}
              </Grid>
            ))
          }
        </Grid>      
      </Container>
  )
}