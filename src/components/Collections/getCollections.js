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

		const collectionsReceived = await axios.post("http://localhost:8000/api/creators/search-collection", body, config )
		setCollections(collectionsReceived.data)
		console.log(collectionsReceived.data)
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
				{collections?
				collections.map((collection,i) => (
					<CardCollection collection={collection} key={i} />				
				)):null}					
			</Grid>
    )
}

export default getCollections;