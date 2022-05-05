import React, {useState, useEffect,useContext} from "react";
import axios from "axios";

import Apokl from '../../assets/images/logo.png';
import CardNft from './cardNft';
import { Grid } from "@mui/material";
import FormStyles from '../../styles/Form.module.scss';
import AuthenticationContext from '../../../context/AuthenticationContext'

import { ethers } from 'ethers'
import Web3Modal from "web3modal"

import {marketplaceAddress} from '../../../config'
import NFTMarketplace  from '../../../artifacts/contracts/NFTMarket.sol/NFTMarketplace.json'
import { SignalCellularNull } from "@material-ui/icons";

export default function GetNFT({id,buyable,creatorInfo}) {
  const [nft, setNft] = useState({})
  const {user} = useContext(AuthenticationContext)
  const [loadingState, setLoadingState] = useState('not-loaded')

  useEffect(() => {
    loadNFT(id)    
  }, [id])
  
	async function loadNFT(nftid) {
    /* create a generic provider and query for unsold market items */
    const provider = new ethers.providers.JsonRpcProvider()
    const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, provider)
    try{const data = await contract.fetchMarketItem(nftid)
      const tokenUri = await contract.tokenURI(data.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(data.price.toString(), 'ether')
      let item = {
        price,
        tokenId: data.tokenId,
        seller: data.seller,
        owner: data.owner,
        royalties: data.royalties,
        creator: meta.data.creator,
        image: meta.data.image,
        title: meta.data.title,
        description: meta.data.description,
        slug: meta.data.slug,
        sold: data.sold}
      setNft(item)
    }catch{
      let item = {
        price:0,
        tokenId: 0,
        seller: 0,
        owner: 0,
        image: Apokl,
        title: 'no item',
        description: 'no description',
        slug: 'no slug'
      }
      setNft(item)
    }
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
    loadNFT(nft.tokenId)
  }

  
  if(buyable===true && !nft.sold){
    return(
      <Grid item>
        <CardNft creatorInfo={creatorInfo} 
          title={nft.title} 
          image={nft.image} 
          description={nft.description} 
          price={nft.price} 
          royalties={nft.royalties} 
          id = {nft.tokenId}/>
          {(user)?
            <Grid container direction="column" sx={{mt:2}} alignItems='center'>
              <button className={FormStyles.formButton} onClick={() => buyNft(nft)}>Buy</button>
            </Grid>
            :
            null
          }
      </Grid>
    )
  }else if(buyable===true && nft.sold){
      return null
  }else if(buyable===false){
    return (
      <Grid item >
        <CardNft 
          creatorInfo={creatorInfo} 
          title={nft.title} 
          image={nft.image} 
          description={nft.description} 
          price={nft.price} 
          royalties={nft.royalties} 
          id = {nft.tokenId}/>
          {(!nft.sold && user)?
            <Grid container direction="column" sx={{mt:2}} alignItems='center'>
              <button className={FormStyles.formButton} onClick={() => buyNft(nft)}>Buy</button>
            </Grid>
            :
            null
          }
      </Grid>
      )
  }else{
    return null
  }
  
  }
  


