import React, {useState,useContext, useEffect} from "react";
import axios from 'axios';
import { getCookie } from 'cookies-next';

import withAuth from '../../hocs/WithAuth';
import AuthenticationContext from '../../../context/AuthenticationContext';

import CreatedNfts from "../NFT/createdNfts";

import FormStyles from "../../styles/Form.module.scss";

import { Container,Grid, Divider } from "@mui/material";
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';



const EditCollection = ({collection}) => {	
	const [collectionNftsIds, setCollectionNftsIds] = useState(collection.nfts.map(Number)); 
	const [picture, setPicture] = useState(null);  
	const {user,accessToken} = useContext(AuthenticationContext)

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

		const { data } = await axios.put('http://localhost:8000/api/creators/create-collection', formData, config)
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
		
		const formData = {
		'nfts': collectionNftsIds,
		'slug': collection.slug}

		const { data } = await axios.put('http://localhost:8000/api/creators/create-collection', formData, config)
	}

	
		return(
			<>
				<div className={FormStyles.formCard}>
					<h1 className={FormStyles.formCardTitle}>Change the main Picture</h1>
					<div className={FormStyles.formCardContent}>
						<form onSubmit={changePicture} >
							<Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={{ xs: 2, md: 3 }} sx={{pt:3}}>
								<Grid item >
									<FormControl sx={{width: 300 }}>

									{ !picture? 
										<Button
											variant="contained"
											component="label">
											Upload Image
											<input
												hidden
												accept="image/*"
												id="post-image"
												onChange={onPictureChange}
												name="image"
												type="file"
												/>
										</Button>:
										<LibraryAddCheckIcon />
									}
									</FormControl>
								</Grid>
								<Grid item align="center" >
									<button type='submit' className={FormStyles.formButton}>Change picture</button>
								</Grid>
							</Grid>
						</form>
						</div>
					</div>

					<div className={FormStyles.formCard}>
					<h1 className={FormStyles.formCardTitle}>Update the NFT giving acces to the collection</h1>
					<div className={FormStyles.formCardContent}>
							<Grid item align="center"  sx={{mt:2}}>
								<button onClick={()=>changeNfts()} className={FormStyles.formButton}>Update NFTs</button>
							</Grid>
						<CreatedNfts setCollectionNftsIds={setCollectionNftsIds} collectionNftsIds={collectionNftsIds}/>
						</div>
					</div>
				</>
			)};

export default withAuth(EditCollection);



