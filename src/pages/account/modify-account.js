import React, { useState, useEffect } from 'react';
import {useRouter} from 'next/router';
import axios from 'axios';
import { getCookie } from 'cookies-next';

import Layout from '../../hocs/Layout';
import withAuth from '../../hocs/WithAuth';

import FormStyles from "../../styles/Form.module.scss";

import { Container, Grid } from '@mui/material';
import { Router } from '@material-ui/icons';

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


const ModifyProfile = ({user}) => {

const tags = [
	'Music',
	'Artist',
	'Drawing',
	'Singing'
];
	const [myTags, setTags] = useState([]);

	useEffect(() => {
		axios.get(`http://127.0.0.1:8000/api/creators/${user}`)
			.then(res => {
				setTags(res.data.results[0]['tags']);
			})
			.catch(err => {});
			
	},[]);

  const router = useRouter()  
  const [picture, setPicture] = useState(null);

  const onTagsChange = e => setTags(e.target.value);
  const onPictureChange = e => setPicture(e.target.files[0]);

  const [loading, setLoading] = useState(false);

	const changeTags = async() => {
		const getRefreshToken = getCookie("refresh");
		const config1 = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		const body1 = {
			"refresh":getRefreshToken
		}		
		const {data:access} = await axios.post('http://localhost:8000/api/token/refresh/', body1, config1)
		const accessToken = access.access
		
		const config2 = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + accessToken
			}
		}
		const body2 = {
			"tags":myTags}
			const { data } = await axios.put('http://localhost:8000/api/creators/activate', body2, config2)
			Router.push('/account/')	
	}
	const changePicture = async() => {
		const getRefreshToken = getCookie("refresh");
		const csrftoken = getCookie('csrftoken');
		const config1 = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		const body1 = {
			"refresh":getRefreshToken
		}		
		const {data:access} = await axios.post('http://localhost:8000/api/token/refresh/', body1, config1)
		const accessToken = access.access
		
		const config2 = {
			headers: {
				'Content-Type': 'application/json',
				'Content-Type': 'multipart/form-data',
				'Authorization': 'Bearer ' + accessToken,
				'X-CSRFToken':csrftoken
			}
		}

		const formData = new FormData();
		formData.append('picture', picture);

		const { data } = await axios.put('http://localhost:8000/api/creators/activate', formData, config2)
		Router.push('/account/')	
	}

	return (
    <Layout>
      <Container sx={{mt:10}}>
					<h1 className={FormStyles.formCardTitle}>Modify your profile</h1>
					<div className={FormStyles.formCardContent}>
						<form onSubmit={changeTags}>
							<Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={{ xs: 2, md: 3 }}>
							<Grid item >
							<FormControl sx={{width: 300 }}>
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
									)}>

									{tags.map((tag) => (
										<MenuItem
											key={tag}
											value={tag}
										>
											{tag}
										</MenuItem>
									))}
								</Select>
							</FormControl>
							</Grid>
							<Grid item align="center">
							<button type='submit' className={FormStyles.formButton}>Modify tags</button>
							</Grid>
							</Grid>
						</form>
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
			</Container>     
		</Layout>
	);
}

export default withAuth(ModifyProfile);
