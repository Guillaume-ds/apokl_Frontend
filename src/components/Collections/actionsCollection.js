import React, {useState} from "react";

import Collectionstyles from '../../styles/Collection.module.scss';
import withAuth from '../../hocs/withAuth';

import { ethers } from 'ethers'
import Web3Modal from 'web3modal'

import {marketplaceAddress} from '../../../config'
import NFTMarketplace  from '../../../artifacts/contracts/NFTMarket.sol/NFTMarketplace.json'

import Box from '@mui/material/Box';
import { Grid } from "@mui/material";
import Drawer from '@mui/material/Drawer';


const ActionsCollection = ({collection}) => {	
	const [toggle, setToggle] = useState(false)
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
			console.log(element)
			const data = await contract.fetchMarketItem(element)
			console.log(data.owner)
			listOwner.push(data.owner)
		}
		setNftOwners(listOwner)
		console.log(nftOwners)
  }

	const toggleDrawer = (value) => (event) => {
  	if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {return}
  	setToggle(value)}
  


	return(
		<div className={Collectionstyles.description}>
			<h3>Actions</h3>
			
			<button onClick={toggleDrawer(true)}>open me</button>

				<Drawer
            anchor={'top'}
            open={toggle}
            onClose={toggleDrawer(!toggle)}
          >
						<Grid container justifyContent='center' sx={{py:5}} alignItems='center'>
            	<button onClick={()=>getOwners(collectionNftIds)} className={Collectionstyles.button}>Create a new event</button>
						</Grid>
      </Drawer>
		</div>
		)
}

export default withAuth(ActionsCollection);
