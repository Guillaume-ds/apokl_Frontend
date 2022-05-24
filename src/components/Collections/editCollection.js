import React, {useState,useContext} from "react";
import axios from 'axios';
import { getCookie } from 'cookies-next';

import withAuth from '../../hocs/WithAuth';
import AuthenticationContext from '../../../context/AuthenticationContext';

import SelectCreatedNfts from "../NFT/selectCreatedNfts";

import FormStyles from "../../styles/Form.module.scss";

import { Grid, Snackbar } from "@mui/material";
import Alert from '@mui/material/Alert';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';



const EditCollection = ({collection}) => {
	const {user,accessToken} = useContext(AuthenticationContext);
	
	const [collectionNftsIds, setCollectionNftsIds] = useState(collection.nfts_array.map(Number)); 
	const [picture, setPicture] = useState(null);  	
	const [msg,setMsg] = useState({content:"",open:false,severity:"error",color:"red"});

	const handleClose = e => {
		setMsg({...msg, content:'',open:false,severity:"error"})
	}

	const onPictureChange = e => setPicture(e.target.files[0]);
	const changePicture = async() => {
		const csrftoken = getCookie('csrftoken');		
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Content-Type': 'multipart/form-data',
				'Authorization': 'Bearer ' + accessToken,
				'X-CSRFToken': csrftoken
			}
		}
		const formData = new FormData();
		formData.append('picture', picture);
		formData.append('slug', collection.slug)

		const { data } = await axios.put('http://localhost:8000/api/creators/update-collection', formData, config)
	}

	const changeNfts = async() => {
		const csrftoken = getCookie('csrftoken');		
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + accessToken,
				'X-CSRFToken': csrftoken
			}
		}
		
		const body = {
		'nfts_array': collectionNftsIds,
		'slug': collection.slug}

		try{
			const  data  = await axios.put('http://localhost:8000/api/creators/update-collection', body, config)			
			setMsg({...msg, content:'Collection updated',open:true,severity:"success", color:"#fafafa"})
		}catch{
			setMsg({...msg, content:'Error : please refresh the page',open:true,severity:"error", color:"#fafafa"})
		}
		
	}

	
		return(
			<>
			<Snackbar
			anchorOrigin = {{ vertical: 'bottom', horizontal:'center' }}			
			open = {msg.open}
			onClose = {handleClose}
			autoHideDuration={6000}
			key = {'bottom_center'}>
				<Alert severity={msg.severity} style={{color:msg.color, background:"#004491"}} >{msg.content}</Alert>
			</Snackbar>
			<Grid container sx={{my:2}} >
				<div className={FormStyles.formCard}>
					<h2 className={FormStyles.formCardTitle}>Change the main Picture</h2>
					<div className={FormStyles.formCardContent}>
						<form onSubmit={changePicture} >
							<Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={{ xs: 2, md: 3 }} sx={{pt:5,pb:4}}>
								<Grid item >
									<FormControl sx={{width: 300 }} justifyContent="center">

									{ !picture? 
										<Grid item container direction="column" justifyContent="center" alignItems="center" >  
											<Button component="label" >
											<CloudUploadIcon fontSize='small' sx={{mx:1}} style={{color:"rgb(0, 50, 150)"}}/>Upload Image
												<input
													hidden
													accept="image/*"
													id="post-image"
													onChange={onPictureChange}
													name="image"
													type="file"
													/>
											</Button>
										</Grid>
										:
										<Grid item container direction="column" justifyContent="center" alignItems="center" >
											<LibraryAddCheckIcon sx={{ width:'100%' }} style={{color:"#004491"}}/>
										</Grid>
									}
									</FormControl>
								</Grid>
								<Grid item align="center"  >
									<button type='submit' className={FormStyles.formButton}>Change picture</button>
								</Grid>
							</Grid>
						</form>
					</div>
				</div>
			</Grid>
			<Grid container sx={{my:2}}>
				<div className={FormStyles.formCard}>
				<h2 className={FormStyles.formCardTitle}>Update the NFT giving access to the collection</h2>
				<div className={FormStyles.formCardContent}>						
							<button onClick={()=>changeNfts()} className={FormStyles.formButton}>Update NFTs</button>				
					<SelectCreatedNfts setCollectionNftsIds={setCollectionNftsIds} collectionNftsIds={collectionNftsIds}/>
					</div>
				</div>
			</Grid>
			</>
			)};

export default withAuth(EditCollection);



