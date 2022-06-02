import React, {useContext, useEffect, useState} from "react";
import Layout from '../hocs/Layout';
import WithAuth from '../hocs/WithAuth';
import AuthenticationContext from "../../context/AuthenticationContext"; 
import Alert from '@mui/material/Alert';

import FormStyles from "../styles/Form.module.scss";

import Web3Modal from "web3modal";
import { ethers } from 'ethers'

import Artist from '../components/Creators/artist';
import CardRoom from '../components/Rooms/cardRoom';
import styles from '../styles/Creator.module.scss';
import { Grid, Snackbar } from "@mui/material";
import { Typography } from "@mui/material";
import {useRouter} from "next/router";
import axios from "axios";




const AccountPage = () => {
	const router = useRouter()
	const {user,accessToken} = useContext(AuthenticationContext)
	const [rooms, setRooms] = useState([])
	const [add, setAdd] = useState("")
	const [msg,setMsg] = useState({content:"",open:false,severity:"error",color:"red"})
	const [loaded, setLoaded] = useState(false)

	const handleClose = e => {
		setMsg({...msg, content:'',open:false,severity:"error"})
	  }

	useEffect(()=>{
		if(!loaded && accessToken){
			getRooms()
		}	
	})

	async function getRooms(){
		var acc = web3.currentProvider.selectedAddress;
		const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
		const account = accounts[0];	
		setAdd(account)
		console.log(accounts)

		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + accessToken
			}
		}

		const body = {
			'address' : [account],
			'collectionId':"None"
		}

		const res = await axios.post(`http://localhost:8000/api/rooms/get-rooms`,body,config)
		console.log(res)
		setRooms(res.data.results)
		setLoaded(true)
	}

	

	console.log(rooms)
	return(
		<Layout>
			<Snackbar
				anchorOrigin = {{ vertical: 'bottom', horizontal:'center' }}			
				open = {msg.open}
				onClose = {handleClose}
				autoHideDuration={6000}
				key = {'bottom_center'}>
					<Alert severity={msg.severity} style={{color:msg.color, background:"#004491"}} >{msg.content}</Alert>
			</Snackbar>
			<Grid
				container 
				className={styles.accueil} 
				sx={{ py:5 }} 
				direction="column"
				alignItems="center"
				justifyContent="center">
					<Grid item width={{xs:"90%",md:"50%",xl:"40%"}}>
						<Artist name={user.username} />
					</Grid>
			</Grid>
			<Grid
				container 
				sx={{ py:5 }} 
				direction="column"
				alignItems="center"
				justifyContent="center">
					<Grid item sx={{py:5}}>
					<h3>Claim access to exclusive event and receive the invitation by email</h3>
					</Grid>
					
					{rooms.map(room=>(
						<CardRoom room={room} />				
					))}

			</Grid>
		</Layout>
	)

}

export default WithAuth(AccountPage);