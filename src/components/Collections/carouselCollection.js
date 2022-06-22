import React, {useEffect, useState} from "react";
import axios from "axios";
import { useRouter } from 'next/router';

import CardCollection from "./cardCollection";
import CollectionStyles from '../../styles/Collection.module.scss';

import { Grid } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const CarouselCollections = ({tags=null,nfts=null,creatorName=null,keywords=null,ids=null}) => {
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
			"creator":creatorName,
			"tags":tags,
			"nfts":nfts
		}

		const collectionsReceived = await axios.post("http://localhost:8000/api/collections/search-collections", body, config )
		setCollections(collectionsReceived.data.results)
		console.log(collectionsReceived)
		}

		useEffect(()=>{
			fetchCollections();
		},[tags,nfts,creatorName,keywords])

		if(collections.length>0){
			return (		
				<Grid container 
					direction='row' 
					justifyContent='space-around' 
					alignItems='center' 
					columnSpacing={{ xs:0, sm: 0, md:2}}
					sx={{px:{xs:0,md:0}}}>	
					<Grid container 
						xs={1} 
						lg={2}
						justifyContent="center"
						alignItems="center">
						{carouselIndex>0?
							<ArrowBackIosNewIcon 
								onClick={()=>setCarouselIndex(carouselIndex-1)} 
								className={CollectionStyles.carouselArrowActive} />
							:
							<ArrowBackIosNewIcon className={CollectionStyles.carouselArrow} />
						}	
					</Grid>

					<Grid container 
						key={carouselIndex+3} 						
						xs={10}
						md={9}
						lg={8}
						className={CollectionStyles.carouselCollectionMain}
						justifyContent='center' 
						height={{xs:"60vh",md:"70vh"}}
					>		
						<CardCollection collection={collections[carouselIndex]} />					
					</Grid>	
	
					<Grid 
						container 
						xs={1} 
						lg={2}
						justifyContent="center"
						alignItems="center">			
						{carouselIndex<collections.length-1?
							<ArrowForwardIosIcon 
								onClick={()=>setCarouselIndex(carouselIndex+1)} 
								className={CollectionStyles.carouselArrowActive} />
							:
							<ArrowForwardIosIcon className={CollectionStyles.carouselArrow} />
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