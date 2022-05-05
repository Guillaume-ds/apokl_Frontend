import React, {useEffect, useState} from "react";
import axios from "axios";
import { useRouter } from 'next/router';

import CardCollection from "./cardCollection";

import { Grid } from "@mui/material";


const getCollections = ({tags,nfts,creator,keywords}) => {
	const router = useRouter();
  const [collections, setCollections] = useState([])
 
	const fetchCollections = async() => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		const body = {
			"tags":tags,
			"nfts":nfts,
			"creator":creator,
			"keywords":keywords
		}

		const collectionsReceived = await axios.post("http://localhost:8000/api/creators/search-collections", body, config )
		setCollections(collectionsReceived.data.results)
	}

	useEffect(()=>{
		fetchCollections();
	},[tags,nfts,creator,keywords])

	return (		
		<Grid container 
			direction='row' 
			justifyContent='space-around' 
			alignItems='center' 
			sx={{p:7}} 
			rowSpacing={10} 
			columnSpacing={{ sm: 2, md: 6 }}>				
			{collections.length>0?
			collections.map((collection,i) => (
				<Grid item xs={12} md={5} xl={4}>
					<CardCollection collection={collection} key={i} />
				</Grid>				
			))
			:
		<Grid container
			sx={{height:'60vh', p:7}}>
				There are no collection corresponding
		</Grid>}					
		</Grid>
	)
}

export default getCollections;