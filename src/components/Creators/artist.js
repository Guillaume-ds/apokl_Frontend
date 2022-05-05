import React, { useState, useEffect } from 'react';
import axios from "axios";

import AuthenticationContext from '../../../context/AuthenticationContext'

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

	function getArtist(){
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		const body = {
			"tags":[],
			"name":name
		}
		axios.post(`http://127.0.0.1:8000/api/creators/search-creators`,body,config)
			.then(res => {
				setArtist(res.data.results[0]);
				
			})
			.catch(err => {});		
	}

	useEffect(() => {
		getArtist()			
	}, [name]);


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
					<p className={CreatorStyles.numberCollections}>{artist.collections?artist.collections.length:"0"} collections</p>
				</Grid>
			<Grid>
				<a href={artist.instagramUrl}>					
						<InstagramIcon/> 
				</a>
				<a href={artist.youtubeUrl}>							
						<YouTubeIcon/> 
				</a>
				<a href={artist.twitterUrl}>						
						<TwitterIcon/> 
				</a>				
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