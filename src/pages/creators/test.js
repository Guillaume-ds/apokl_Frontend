import React, {useContext, useEffect, useState} from "react";
import Layout from '../../hocs/Layout';
import WithAuth from '../../hocs/WithAuth';
import AuthenticationContext from '../../../context/AuthenticationContext'

import Web3Modal from "web3modal";
import { ethers } from 'ethers'

import Artist from '../../components/Account/artist';
import CarouselCreators from '../../components/Creators/carouselCreators'
import CarouselCollections from '../../components/Collections/carouselCollection'
import styles from '../../styles/Creator.module.scss';
import { Grid, Container } from "@mui/material";
import { Typography } from "@mui/material";
import {useRouter} from "next/router";
import axios from "axios";



const CarouselCreatorsPage= () => {
	const router = useRouter()
	const {user} = useContext(AuthenticationContext)



	return(
		<Layout>
			<Grid
			container 
			className={styles.accueil} 
			sx={{ py:5, mb:5 }} 
			direction="column"
			alignItems="center"
			justifyContent="center">
				<Artist name={user?user.username:null} />
			</Grid>
			<div>
        <CarouselCreators tags={[]} name={""}  />
			</div>
		</Layout>
	)

}

export default CarouselCreatorsPage;