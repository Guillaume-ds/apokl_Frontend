import React, {useState,useContext,useEffect} from "react";
import axios from "axios";

import AuthenticationContext from '../../../context/AuthenticationContext';
import withAuth from '../../hocs/withAuth';

import { ethers } from 'ethers'
import Web3Modal from 'web3modal'

import {marketplaceAddress} from '../../../config'
import NFTMarketplace  from '../../../artifacts/contracts/NFTMarket.sol/NFTMarketplace.json';

import FormStyles from "../../styles/Form.module.scss";
import PostStyles from "../../styles/Post.module.scss";

import { Grid, Snackbar } from "@mui/material";
import Alert from '@mui/material/Alert';
import {TailSpin as Loader} from 'react-loader-spinner';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';


const CreateRoomCollection = ({collection}) => {	
	const {user, accessToken,creator} = useContext(AuthenticationContext)
	const [toggle, setToggle] = useState(false)
	const [loading, setLoading] = useState(false)
	const [msg,setMsg] = useState({content:"",open:false,severity:"error",color:"red"})
	const [collectionNftIds,setCollectionNftIds] = useState([])
	const [formInput, updateFormInput] = useState({ title: '', content: ''}) 
	const [picture, setPicture] = useState("");
	const onPictureChange = e => setPicture(e.target.files[0]);
	const [picture2, setPicture2] = useState("");
	const onPicture2Change = e => setPicture2(e.target.files[0]);

	const handleClose = e => {
    setMsg({...msg, content:'',open:false,severity:"success"})
  }
	useEffect(()=>{
		if(collection){
			setCollectionNftIds(collection.nfts_array)
		}
		
	},[collection])

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
			listOwner.push(data.owner.toLowerCase())
		}
		return listOwner;
		
  }


	const createRoom = async e =>{
		e.preventDefault();
		setLoading(true)
		if(formInput['title']==="" || formInput['content']===""){
			setMsg({...msg, content:'Please add title and content',open:true,severity:"error"})
		}else{
			
				var getNftOwners = await getOwners(collectionNftIds)
				const config = {
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + accessToken
					}
				}

				const data = {
					"title":formInput['title'],
					"content":formInput['content'],
					"collection":collection.id,
					"creator":creator.id,
					"addresses":getNftOwners,
					"users":[]
				}
		
				const URL = `http://localhost:8000/rooms/`;
				const res = await axios.post(URL,data,config)
				setLoading(false)
				setMsg({...msg, content:'Room successfully created',open:true,severity:"success",color:"#fafafa"})

		}
	}

	return(
		<div>

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
        justifyContent="space-around">
					<Grid item width={{xs:"100%",md:"70%"}}>
					<div className={PostStyles.post}>
						<h1 className={FormStyles.formCardTitle}>Create a new room for an exclusive event</h1>
						<div className={FormStyles.formCardContent}>
							<FormControl  sx={{mt: 4, width:'80%'}}> 
								<TextField
									margin="dense"
									variant="outlined"
									required
									fullWidth
									id="title"
									label="Post title"
									name="title"
									onChange={e => updateFormInput({ ...formInput, title: e.target.value })}/>                      
							</FormControl>
							<FormControl sx={{mt: 1, width:'80%'}} >   
								<TextField
									margin="dense"
									variant="outlined"
									required
									fullWidth
									id="content"
									label="content"
									name="content"
									onChange={e => updateFormInput({ ...formInput, content: e.target.value })}
									multiline
									rows={4}/>     
							</FormControl>  
							
							<Grid item sx={{my:5}}>
								{loading?
								<Loader color="#004491"/>
								:
								<button className={FormStyles.formButton} onClick={createRoom}>
									Create Room
								</button>
								}              
							</Grid>
						</div>
					</div>
				</Grid>
			</Grid>
		</div>
		)
}

export default withAuth(CreateRoomCollection);
