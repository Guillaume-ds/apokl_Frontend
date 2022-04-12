import React, {useEffect, useState} from "react";
import { useRouter } from 'next/router'
import axios from "axios";

import Layout from '../../../hocs/Layout';
import Artist from '../../../components/artist';
import styles from '../../../styles/Creator.module.scss';
import { Grid } from "@mui/material";

import { ethers } from 'ethers'
import Web3Modal from "web3modal"

import {marketplaceAddress} from '../../../../config'
import NFTMarketplace  from '../../../../artifacts/contracts/NFTMarket.sol/NFTMarketplace.json'

const Creator = ({collections}) => {
	const router = useRouter()
	const { name } = router.query

	if(collections.count === 0){
		return (
			<Layout>
				<Grid 
				container 
				className={styles.accueil} 
				id="accueil" 
				sx={{ py:10 }} 
				direction="column"
				alignItems="center"
				justifyContent="center">
				<Artist name={name} />
				</Grid>
				<div>
					<p>Impossible de trouver une collection de ce nom</p>                     
				</div>			         
			</Layout>	
		)
	}else{	
		return (
			<Layout>
				<Artist name={name} />  
				<div>
					<p>{name}</p>  
					<p>{collections.count}</p>
					<p>{collections.results.map(collection => <p key={collection.id}>{collection.name}</p>)}</p>					   
				</div>			         
			</Layout>	
		)}
}

export default Creator;

export async function getServerSideProps({ query: {name} }){
	try {
		const {data} = await axios.get(`http://127.0.0.1:8000/api/creators/${name}/collections`)
		console.log(data)
    return {
			props : {
				collections : data
			}
    }
	} catch {
		return {
			props : {
				collections : {count:0}
			}
    }
	}
}