import React, {useEffect, useState} from "react";
import { useRouter } from 'next/router'
import axios from "axios";

import Layout from '../../../hocs/Layout';
import Artist from '../../../components/Creators/artist';
import styles from '../../../styles/Creator.module.scss';
import { Grid } from "@mui/material";

import GetCollections from "../../../components/Collections/getCollections";

import { ethers } from 'ethers'
import Web3Modal from "web3modal"

import {marketplaceAddress} from '../../../../config'
import NFTMarketplace  from '../../../../artifacts/contracts/NFTMarket.sol/NFTMarketplace.json'

const Creator = () => {
	const router = useRouter()
	const { creatorName } = router.query
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
				<Artist name={creatorName} /> 
			</Grid> 
			<GetCollections creator={creatorName} tags={[]} ids={[]} nfts={[]} keywords={''}/>			         
		</Layout>	
	)
}

export default Creator;

