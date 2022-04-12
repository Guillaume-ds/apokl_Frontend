import React, {useState, useEffect} from "react";
import axios from "axios";

import Apokl from '../../assets/images/logo.jpg';
import { ethers } from 'ethers'
import CardNft from './cardNft';

import {marketplaceAddress} from '../../../config'
import NFTMarketplace  from '../../../artifacts/contracts/NFTMarket.sol/NFTMarketplace.json'

export default function GetNFT({id}) {
  const [nft, setNft] = useState({})
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
        creator: meta.data.creator,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
        slug: meta.data.slug}
      setNft(item)
    }catch{
      let item = {
        price:0,
        tokenId: 0,
        seller: 0,
        owner: 0,
        image: Apokl,
        name: 'no item',
        description: 'no description',
        slug: 'no slug'
      }
      setNft(item)
    }
   

      
	}
  if(nft === []){
    return(<div>Ca marche pas </div>)
  }else{
  return (
    <CardNft creator={nft.creator} name={nft.name} image={nft.image} description={nft.description} prix={nft.prix} />
  );}
}