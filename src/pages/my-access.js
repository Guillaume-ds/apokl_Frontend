import React, {useContext, useEffect, useState} from "react";
import Layout from '../hocs/Layout';
import WithAuth from '../hocs/WithAuth';
import AuthenticationContext from "../../context/AuthenticationContext"; 
import Alert from '@mui/material/Alert';



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

		const res = await axios.post(`http://localhost:8000/api/events/get-events`,body,config)
		setRooms(res.data.results)
		setLoaded(true)
	}

	const ListRooms =() => {
		if(!loaded){
			return(
				null
			)
		}
		else if(rooms.length<1 && loaded){
			return(
				<Grid sx={{py:5}} style={{color:"#0F0F4B"}} textAlign="center">
					<h2>You don't have access to exclusive rooms yes</h2>
				</Grid>
			)
		}else{
		return(
			<Grid
				container 
				direction="column"
				alignItems="center"
				justifyContent="center">	
					{rooms.map(room=>(
						<Grid item width="100%" sx={{my:{xs:10,md:7}}}>
							<CardRoom room={room} />
						</Grid>				
					))}

			</Grid>
		)}
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
					<Grid item width={{xs:"90%",md:"50%",xl:"40%"}} height="40vh">
						<Artist name={user.username} />
					</Grid>
			</Grid>

			<Grid sx={{py:5}} style={{color:"#0F0F4B"}} textAlign="center">
				<h2>Claim access to exclusive event and receive the invitation by email</h2>
			</Grid>

			<ListRooms/>
			
		</Layout>
	)

}

export default WithAuth(AccountPage);