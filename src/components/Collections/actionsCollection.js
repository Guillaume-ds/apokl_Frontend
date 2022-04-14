import React, {useState} from "react";

import Collectionstyles from '../../styles/Collection.module.scss';
import withAuth from '../../hocs/withAuth';

import { ethers } from 'ethers'
import Web3Modal from 'web3modal'

import {marketplaceAddress} from '../../../config'
import NFTMarketplace  from '../../../artifacts/contracts/NFTMarket.sol/NFTMarketplace.json'


import { Grid } from "@mui/material";



const ActionsCollection = ({collection}) => {	
	const [nftOwners, setNftOwners] = useState([])
	const collectionNftIds = collection.nfts

	async function getOwners(nftIds) {
    const web3Modal = new Web3Modal({
      network: 'mainnet',
      cacheProvider: true,
    })
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
		const listOwner = []
		for(const element of nftIds){
			const data = await contract.fetchMarketItem(element)
			console.log(data.owner)
			listOwner.push(data.owner)
			
		}
		setNftOwners(listOwner)
		console.log(nftOwners)
  }


	return(
		<div className={Collectionstyles.description}>
			<h3>Actions</h3>
			<button onClick={()=>getOwners(collectionNftIds)}>click me</button>
			<div>{collectionNftIds.map((nftId)=><p>{nftId}</p>)}</div>
			<div>{nftOwners.map((owner)=><p>{owner}</p>)}</div>
			<p>{nftOwners.length}</p>
		</div>
		)
}

export default withAuth(ActionsCollection);
