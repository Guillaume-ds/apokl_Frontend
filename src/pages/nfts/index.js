import React, { useEffect, useState } from "react";
import axios from "axios";

import CardNft from "../../components/NFT/cardNft";

import { ethers } from 'ethers'
import Web3Modal from "web3modal"

import Layout from '../../hocs/Layout';

import {marketplaceAddress} from '../../../config'
import NFTMarketplace  from '../../../artifacts/contracts/NFTMarket.sol/NFTMarketplace.json'

import { Grid, Container } from "@mui/material";
import FormStyles from "../../styles/Form.module.scss"

export default function Nfts() {
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [])
  async function loadNFTs() {
    /* create a generic provider and query for unsold market items */
    const provider = new ethers.providers.JsonRpcProvider()
    const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, provider)
    const data = await contract.fetchMarketItems()

    /*
    *  map over items returned from smart contract and format 
    *  them as well as fetch their token metadata
    */
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await contract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        creatorRoyaltiesRate : i.creatorRoyaltiesRate.toString(),
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
  async function buyNft(nft) {
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)

    /* user will be prompted to pay the asking proces to complete the transaction */
    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')   
    const transaction = await contract.createMarketSale(nft.tokenId, {
      value: price
    })
    await transaction.wait()
    loadNFTs()
  }
  async function setAlert(msg){
    alert(msg)
  }

  if (loadingState === 'loaded' && !nfts.length) {
    return (
    <Layout>
      <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>
    </Layout>)
  } else { 
    return(
    <Layout>
      <Container sx={{mt:10}}>      
      <Grid container 
        justifyContent="space-between"
				direction='row'  
				rowSpacing={10} 
        paddingTop={10}
				columnSpacing={{ sm: 2, md: 6 }} >
          {
            nfts.map((nft, i) => (
            <Grid item xs={12} md={4}>
              <CardNft key={i} 
                creator={nft.creator} 
                image={nft.image} 
                name={nft.name} 
                description={nft.description}
                price={nft.price}
                royalties={nft.creatorRoyaltiesRate}
                id={nft.id}
                />
                <Grid container direction="column" sx={{mt:2}} alignItems='center'>
                  <button className={FormStyles.formButton} onClick={() => buyNft(nft)}>Buy</button>
                </Grid>
              </Grid>
            ))
          }
    </Grid>  
    </Container>
    </Layout>
  )}
}

