import React, { useState, useEffect } from 'react';
import axios from "axios";

import CardCreator from "./cardCreator";


const Artist = ({name=""}) => {
	const [artist, setArtist] = useState({});

	function getArtist(){
		if(name && name!=''){
			axios.get(`http://127.0.0.1:8000/api/profiles/get-specific-creator/${name}`)
			.then(res => {
				console.log(res, "here")
				setArtist(res.data);				
			})
		}		
					
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