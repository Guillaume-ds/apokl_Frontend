import React, {useContext, useEffect, useState} from "react";
import Layout from '../../hocs/Layout';
import WithAuth from '../../hocs/WithAuth';
import AuthenticationContext from '../../../context/AuthenticationContext';
import Alert from '@mui/material/Alert';

import FormStyles from "../../styles/Form.module.scss";

import Web3Modal from "web3modal";
import { ethers } from 'ethers'

import Artist from '../../components/Creators/artist';
import styles from '../../styles/Creator.module.scss';
import { Grid, Snackbar } from "@mui/material";
import { Typography } from "@mui/material";
import {useRouter} from "next/router";
import axios from "axios";




const AccountPage = () => {
	const router = useRouter()
	const {user,accessToken} = useContext(AuthenticationContext)
	const [rooms, setRooms] = useState([])
	const [add, setAdd] = useState("")
	const [refreshToken,setRefreshToken] = useState(null)
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
		setMsg({...msg, content:'Email sent, welcome to the event',open:true,severity:"success",color:"#fafafa"})
		setLoaded(true)
	}

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
				<Artist name={user.username} />
			</Grid>
			<div>
				{rooms.map(room=>(
					<Grid 
						container 
						direction="row" 
						sx={{ py:2,px:5 }} 
						alignItems="center"
						justifyContent="center">

						<Grid item xs={12} sm={7} sx={{ pl:10}}>
								<h2>{room.title}</h2>
								<p>{room.content}</p>
						</Grid>
						
						<Grid item xs={12} sm={3}>
								<button className={FormStyles.formButton} onClick={()=>claimAccess(room.id)}>Claim access </button>
						</Grid>
					</Grid>					
				))}
			</div>
		</Layout>
	)

}

export default WithAuth(AccountPage);