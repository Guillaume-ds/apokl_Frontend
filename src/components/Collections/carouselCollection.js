import React, {useEffect, useState} from "react";
import axios from "axios";
import { useRouter } from 'next/router';

import CardCollection from "./cardCollection";

import { Grid } from "@mui/material";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';


const CarouselCollections = ({tags,nfts,creator,keywords,ids}) => {
	const router = useRouter();
  const [collections, setCollections] = useState([])
	const [carouselIndex,setCarouselIndex] = useState(0)

 
	const fetchCollections = async() => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		const body = {
			"ids":ids,
			"tags":tags,
			"nfts":nfts,
			"creator":creator,
			"keywords":keywords
		}

		const collectionsReceived = await axios.post("http://localhost:8000/api/creators/search-collections", body, config )
		setCollections(collectionsReceived.data)
		console.log(collectionsReceived.data)
		}

		useEffect(()=>{
			fetchCollections();
		},[tags,nfts,creator,keywords])

		if(collections.length>0){
			return (		
				<Grid container 
					direction='row' 
					justifyContent='space-around' 
					alignItems='center' 
					columnSpacing={{ sm: 2, md:4}}>	
					<Grid item xs={1} style={{textAlign: "right"}}>
						{carouselIndex>0?
							<ArrowCircleLeftIcon onClick={()=>setCarouselIndex(carouselIndex-1)} fontSize='large' style={{color:"#004691"}} />
							:
							<ArrowCircleLeftIcon style={{color:"#96aac8"}} />
						}	
					</Grid>
					<Grid item sm={3} sx={{ display: { xs: 'none', sm: 'block' } }} style={{textAlign: "center"}} >			
						<CardCollection collection={collections[carouselIndex]} />
					</Grid>	
					<Grid item xs={10} sm={4} style={{textAlign: "center"}}>				
						<CardCollection collection={collections[carouselIndex+1]} />
					</Grid>		
					<Grid item sm={3} sx={{ display: { xs: 'none', sm: 'block' } }} style={{textAlign: "center"}}>				
						<CardCollection collection={collections[carouselIndex+2]} />	
					</Grid>	
					<Grid item xs={1} style={{textAlign: "left"}}>			
						{carouselIndex<collections.length-3?
							<ArrowCircleRightIcon onClick={()=>setCarouselIndex(carouselIndex+1)} fontSize='large' style={{color:"#004691"}} />:
							<ArrowCircleRightIcon style={{color:"#96aac8"}} />
						}
					</Grid>									
				</Grid>
			)}else{
				return (		
					<Grid container
						sx={{height:'60vh', p:7}}>
							There are no collection corresponding
					</Grid>)
			}
		}

export default CarouselCollections;