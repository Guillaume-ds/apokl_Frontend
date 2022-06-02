import React, {useEffect, useState} from "react";
import axios from "axios";
import { useRouter } from 'next/router';

import CardCollection from "./cardCollection";

import { Grid } from "@mui/material";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';


const getCollections = ({tags=null,nfts=null,creator=null,keywords=null,slug=null}) => {
	const router = useRouter();
  const [collections, setCollections] = useState([])
  const [nextBackendUrl,setNextBackendUrl]=useState(null)
  const [previousBackendUrl,setPreviousBackendUrl]=useState(null)
	const searchURL = "http://localhost:8000/api/creators/search-collections"

	useEffect(()=>{
		fetchCollections(searchURL);
	},[tags,nfts,creator,keywords])

	const fetchCollections = async(url) => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		const body = {
			"tags":tags,
			"nfts":nfts,
			"creator":creator,
			"keywords":keywords,
			"slug":slug
		}

		console.log(body)

		const collectionsReceived = await axios.post(url, body, config )
		console.log(collectionsReceived)
		setCollections(collectionsReceived.data.results)
		await setNextBackendUrl(collectionsReceived.data.next)
    	await setPreviousBackendUrl(collectionsReceived.data.previous)
		
	}
	console.log(nextBackendUrl,"next")
		console.log(previousBackendUrl,"previous")


	const ElementToLoad = () =>{
 
	if(nextBackendUrl || previousBackendUrl){
	return(
		<Grid item 
			sx={{mt:15}} 
			textAlign={'center'}>
		<h1>Load more</h1>
		<Grid container 
				direction={"row"} 
				justifyContent="space-around">
			{previousBackendUrl?
			<ArrowCircleLeftIcon onClick={()=>fetchCollections(previousBackendUrl)} fontSize='large' style={{color:"#004691"}} />
			:
			<ArrowCircleLeftIcon style={{color:"#96aac8"}} fontSize='large'/>
			}
			{nextBackendUrl?
			<ArrowCircleRightIcon onClick={()=>fetchCollections(nextBackendUrl)} fontSize='large' style={{color:"#004691"}} />:
			<ArrowCircleRightIcon style={{color:"#96aac8"}} fontSize='large'/>
			}
		</Grid>
		</Grid>
	)
	}else{
	return(null)
	}

    
  }

	useEffect(()=>{
		ElementToLoad();
	},[nextBackendUrl,previousBackendUrl])


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
					There are no collection correspondingss
			</Grid>}
			<Grid item xs={12}>
				<ElementToLoad />				
			</Grid>	
						
		</Grid>
	)
}

export default getCollections;