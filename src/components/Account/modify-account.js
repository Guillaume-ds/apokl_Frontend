import React, { useState, useEffect, useContext } from 'react';
import {useRouter} from 'next/router';
import axios from 'axios';
import { getCookie } from 'cookies-next';

import withAuth from '../../hocs/WithAuth';
import AuthenticationContext from '../../../context/AuthenticationContext';

import FormStyles from "../../styles/Form.module.scss";

import { Grid } from '@mui/material';

import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import {TailSpin as Loader} from 'react-loader-spinner';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight:'35%',
      width: 100,
      overflow:'auto'
    },
  },
};
const tags = [
	'Artist',
	'Music',	
	'Drawing',
	'Painting',
	'Singing',
	'Gaming',
	'Sports',
	'Social',
	'Food',
	];

const ModifyProfile = () => {
	const {accessToken,creator} = useContext(AuthenticationContext)
	const [myTags, setTags] = useState([]);
	const [urls,setUrls] = useState({"twitterUrl":"","instagramUrl":"","youtubeUrl":"","discordUrl":""})
  const [picture, setPicture] = useState(null);
	const [description, setDescription] = useState("");
	const [loaded, setLoaded] = useState(false)
	
  const onTagsChange = e => setTags(e.target.value);
  const onPictureChange = e => setPicture(e.target.files[0]);

	function creatorInfo (){
		try{
			if(creator.tags.length > 0){
				setTags(creator.tags)
			}
		}catch{}/*if creator.tags exists, then it gives the values to the state, otherwise it remains an empty array*/	
		try{
			setUrls({
				"twitterUrl":creator.twitterUrl,
				"instagramUrl":creator.instagramUrl,
				"youtubeUrl":creator.youtubeUrl,
				"discordUrl":creator.discordUrl
				})
		}catch{}	
		try{
			setDescription(
				creator.description
				)
		}catch{}
							
	}
	console.log(creator)
	
	useEffect(()=>{		
			creatorInfo()					
	},[creator.name])

	const changeInfo = async() => {		
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + accessToken
			}
		}
		const body = {
			"twitterUrl":urls.twitterUrl,
			"instagramUrl":urls.instagramUrl,
			"youtubeUrl":urls.youtubeUrl,
			"discordUrl":urls.discordUrl,
			"tags":myTags,
			"description":description
		}
			const { data } = await axios.put('http://localhost:8000/api/profiles/update-creator', body, config)
	}

	const changePicture = async() => {
		const csrftoken = getCookie('csrftoken');
		
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Content-Type': 'multipart/form-data',
				'Authorization': 'Bearer ' + accessToken,
				'X-CSRFToken':csrftoken
			}
		}

		const formData = new FormData();
		formData.append('picture', picture);

		const { data } = await axios.put('http://localhost:8000/api/profiles/update-creator', formData, config)	
	}

	return (
      <Grid container direction="row" justifyContent="center" sx={{ py:{xs:5,md:5}, px:{xs:2,md:20}}}>
				<div className={FormStyles.formCard}>
					<h1 className={FormStyles.formCardTitle}>Modify your profile</h1>
					<div className={FormStyles.formCardContent}>
								
						<form onSubmit={changePicture} >
							<Grid container direction="column" justifyContent="space-around" alignItems="center" spacing={{ xs: 2, md: 3 }} sx={{pt:3, width: '100%'}}>
								<Grid item >
									<FormControl sx={{width:{md:500,lg:700}}}>

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
										<Grid item container direction="column" justifyContent="center" alignItems="center" sx={{my:'2vh'}}>
											<LibraryAddCheckIcon />
										</Grid>
										
									}
									</FormControl>
								</Grid>
								<Grid item align="center" >
									<button type='submit' className={FormStyles.formButton}>Change picture</button>
								</Grid>
							</Grid>
						</form>

						<form onSubmit={changeInfo} className={FormStyles.formCardItem}>
							<Grid container direction="column" justifyContent="space-around" alignItems="center" spacing={{ xs: 2, md: 1 }} sx={{pt:3, width: '80%'}}>
							<Grid item >
								<FormControl sx={{width:{md:500,lg:700}}} >
									<InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
									<Select
										labelId="demo-multiple-chip-label"
										id="demo-multiple-chip"
										multiple										
										value={myTags}
										onChange={onTagsChange}
										input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
										renderValue={(selected) => (
											<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
												{selected.map((value) => (
													<Chip key={value} label={value} />
												))}
											</Box>
										)}
										MenuProps={MenuProps} >
										{tags.map((tag) => (
                    <MenuItem
                      key={tag}
                      value={tag}
                      className={FormStyles.multiSelect} 
                    >
                      <Checkbox checked={myTags.indexOf(tag) > -1} />
                      <ListItemText primary={tag} />
                    </MenuItem>
                  ))}
									</Select>
								</FormControl>
								</Grid>
								<Grid item >
								<FormControl sx={{width:{md:500,lg:700}}}>
									<TextField
										margin="dense"
										variant="outlined"
										fullWidth
										multiline										
										rows={4}
										id="Description"
										label="Description"	
										value={description}																		
										onChange={e => setDescription(e.target.value)}/> 
									</FormControl>
								</Grid>
								<Grid item >
								<FormControl sx={{width:{md:500,lg:700}}}>
									<TextField
										margin="dense"
										variant="outlined"
										fullWidth
										id="Youtube account"
										label="Youtube account"
										value={urls.youtubeUrl===""?"Youtube account":urls.youtubeUrl}									
										onChange={e => setUrls({ ...urls, youtubeUrl: e.target.value })}/> 
									</FormControl>
								</Grid>
								<Grid item >
									<FormControl sx={{width:{md:500,lg:700}}}>
									<TextField
										margin="dense"
										variant="outlined"
										fullWidth
										id="Twitter account"
										label="Twitter account"
										value={urls.twitterUrl===""?"Twitter account":urls.twitterUrl}
										name="Twitter account"										
										onChange={e => setUrls({ ...urls, twitterUrl: e.target.value })}/> 
									</FormControl>
								</Grid>
								<Grid item >
									<FormControl sx={{width:{md:500,lg:700}}}>
									<TextField
										margin="dense"
										variant="outlined"
										fullWidth
										id="Instagram account"
										label="Instagram account"
										value={urls.instagramUrl===""?"Instagram account":urls.instagramUrl}									
										onChange={e => setUrls({ ...urls, instagramUrl: e.target.value })}/> 
									</FormControl>
								</Grid>
								<Grid item >
									<FormControl sx={{width:{md:500,lg:700}}} >
									<TextField
										margin="dense"
										variant="outlined"
										fullWidth
										id="Discord account"
										label="Discord account"
										value={urls.discordUrl===""?"Discord account":urls.discordUrl}
										name="Discord account"										
										onChange={e => setUrls({ ...urls, discordUrl: e.target.value })}/> 
									</FormControl>
								</Grid>
								<Grid item align="center" >
									<button type='submit' className={FormStyles.formButton}>Save changes</button>
								</Grid>
							</Grid>
						</form>
						
          </div>
				</div>
			</Grid>     
	);
}

export default withAuth(ModifyProfile);
