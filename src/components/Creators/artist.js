import React, { useState, useEffect } from 'react';
import axios from "axios";

import CardCreator from "./cardCreator";

import Image from 'next/image';
import Link from 'next/link';

import CreatorStyles from '../../styles/Creator.module.scss';
import Activate from './activate';

import User from '../../assets/images/user.png';

import Grid from "@mui/material/Grid";



const Artist = ({name}) => {
	const [artist, setArtist] = useState({});

	function getArtist(){
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		const body = {
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
		<CardCreator creator={artist} />
	)}else{
		return (
			<CardCreator creator={null} />)}
}

export default Artist;