import React, { useState, useEffect } from 'react';
import axios from "axios";


import Image from 'next/image';
import Link from 'next/link';

import CreatorStyles from '../../styles/Creator.module.scss';
import Activate from './activate';

import User from '../../assets/images/user.png';

import Grid from "@mui/material/Grid";
import { Button } from '@mui/material';

import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';


const Artist = ({name}) => {
	const [artist, setArtist] = useState({});
	const [collections,setCollection] = useState({});
	const [collectionsCount,setCollectionCount] = useState(0);

	useEffect(() => {
		axios.get(`http://127.0.0.1:8000/api/creators/${name}`)
			.then(res => {
				setArtist(res.data.results[0]);
			})
			.catch(err => {});
			
	}, [name]);

	useEffect(() => {
		axios.get(`http://127.0.0.1:8000/api/creators/${name}/collections`)
			.then(res => {
				setCollection(res.data.results);
				setCollectionCount(res.data.count)
			})
			.catch(err => {});
			
	}, [artist]);

	if(artist !== undefined){
	return (
		<Grid item 
			className={CreatorStyles.card} 
			sx={{ pt:5,width:{xs:1/2,md:1/4} }} 
			direction="column" 
			>
			<Image src={artist.picture?artist.picture:User} alt="Person" height="80px" width="80px"  sx={{m:2}}/>
			<p className={CreatorStyles.cardName}>{name}</p>
				<Grid container className={CreatorStyles.cardCollections} direction="row" >
					<p className={CreatorStyles.numberCollections}>{collectionsCount} collections</p>
				</Grid>
			<Grid>
			<Button onClick={() => router.push('/account/')}>							
					<InstagramIcon/> 
				</Button>
				<Button onClick={() => router.push('/account/')}>							
					<TwitterIcon/> 
				</Button>
				<Button onClick={() => router.push('/account/')}>							
					<YouTubeIcon/> 
				</Button>
				
			</Grid>
		</Grid>
	)}else{
		return (
			<Grid item className={CreatorStyles.card} sx={{ width: 1/4, pt:5 }} direction="column" >
			<Image src={User} alt="Person" height="80px" width="80px"  sx={{m:2}}/>
			<p className={CreatorStyles.cardName}>No artist with this name</p>
				<Grid container className={CreatorStyles.cardCollections} direction="row" >
					<p className={CreatorStyles.numberCollections}>No collections yet !</p>
				</Grid>
			<Grid>
				<Activate/>				
			</Grid>
		</Grid>)}
}

export default Artist;