import React, {useContext, useEffect, useState} from "react";
import Layout from '../../hocs/Layout';
import WithAuth from '../../hocs/WithAuth';
import AuthenticationContext from '../../../context/AuthenticationContext'

import Web3Modal from "web3modal";
import { ethers } from 'ethers'

import Artist from '../../components/Account/artist';
import styles from '../../styles/Creator.module.scss';
import { Grid, Container } from "@mui/material";
import { Typography } from "@mui/material";
import {useRouter} from "next/router";
import axios from "axios";



const AccountPage = () => {
	const router = useRouter()
	const {user,accessToken} = useContext(AuthenticationContext)
	const [rooms, setRooms] = useState([])
	const [add, setAdd] = useState("")
	const [refreshToken,setRefreshToken] = useState(0)

	useEffect(()=>{
		getRooms()
	},[refreshToken])

	async function getRooms(){
		var acc = web3.currentProvider.selectedAddress;
		const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
		const account = accounts[0];	
		setAdd(account)
		console.log(accounts)

		const res = await axios.get(`http://localhost:8000/api/rooms/get-room/${account}`)
		console.log(res)
		setRooms(res.data.results)
	}

	async function claimAccess(roomId){
		const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
		const account = accounts[0];
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + accessToken
			}
		}
		const body = {
			"roomId":roomId,
			"address":account
		}

		const res = await axios.post(`http://localhost:8000/api/rooms/claim-access`,body,config)
		getRooms()
	}

	return(
		<Layout>
			<Grid
			container 
			className={styles.accueil} 
			sx={{ py:5 }} 
			direction="column"
			alignItems="center"
			justifyContent="center">
				<Artist name={user.username} />
			</Grid>
			<div>
				<p>{add}</p>
				{rooms.map(room=>(
					<Grid 
						container 
						direction="row" 
						sx={{ py:2,px:5 }} 
						alignItems="center"
						justifyContent="center">

						<Grid item xs={12} sm={7} >
								<h2>{room.title}</h2>
								<p>{room.content}</p>
						</Grid>
						
						<Grid item xs={12} sm={3}>
								<button onClick={()=>claimAccess(room.id)}>Click me </button>
						</Grid>

					</Grid>					
				))}
			</div>
		</Layout>
	)

}

export default WithAuth(AccountPage);