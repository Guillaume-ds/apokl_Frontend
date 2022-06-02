import React, {useEffect, useState} from "react";
import axios from "axios";
import { useRouter } from 'next/router';

import CardCollection from "./cardCollection";
import CollectionStyles from '../../styles/Collection.module.scss';

import { Grid } from "@mui/material";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';


const CarouselCollections = ({tags=null,nfts=null,creator=null,keywords=null,ids=null}) => {
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
			"creator":creator,
			"tags":tags,
			"nfts":nfts
		}

		const collectionsReceived = await axios.post("http://localhost:8000/api/creators/search-collections", body, config )
		setCollections(collectionsReceived.data.results)
		
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
					columnSpacing={{ xs:0, sm: 1, md:4}}
					sx={{px:{xs:0,md:3}}}>	
					<Grid item style={{textAlign: "right"}}>
						{carouselIndex>0?
							<ArrowCircleLeftIcon onClick={()=>setCarouselIndex(carouselIndex-1)} style={{color:"#004691", fontSize:{xs:"small",md:'large'}}} />
							:
							<ArrowCircleLeftIcon style={{color:"#96aac8"}} />
						}	
					</Grid>
					<Grid item 
						key={carouselIndex} 
						sm={3} 
						sx={{ display: { xs: 'none', md: 'block' } }} 
						style={{textAlign: "center"}} 
						className={CollectionStyles.carouselCollection}
					>			
						<CardCollection  collection={collections[carouselIndex]} />
					</Grid>	
					<Grid item 
						key={carouselIndex+3} 						
						xs={10} 
						md={4} 
						style={{textAlign: "center"}}
						className={CollectionStyles.carouselCollectionMain}
					>				
						<CardCollection collection={collections[carouselIndex+1]} />
					</Grid>		
					<Grid item 
						key={carouselIndex+6} 
						sm={3} 
						sx={{ display: { xs: 'none', md: 'block' } }} 
						style={{textAlign: "center"}} 
						className={CollectionStyles.carouselCollection}
					>				
						<CardCollection collection={collections[carouselIndex+2]} />	
					</Grid>	
					<Grid item style={{textAlign: "left"}}>			
						{carouselIndex<collections.length-3?
							<ArrowCircleRightIcon onClick={()=>setCarouselIndex(carouselIndex+1)} style={{color:"#004691", fontSize:{xs:"small",md:'large'}}} />:
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