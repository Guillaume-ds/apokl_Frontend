import React, {useEffect, useState} from "react";
import axios from "axios";
import { useRouter } from 'next/router';

import CardCreator from "./cardCreator"

import { Grid } from "@mui/material";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';


const CarouselCreators = ({tags,name}) => {
	const router = useRouter();
  const [creators, setCreators] = useState([])
	const [carouselIndex,setCarouselIndex] = useState(0);
	const [refreshToken,setRefreshToken] = useState(0);
 
	const fetchCreators = async() => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		const body = {
			"tags":tags,
			"name":name
		}

		const creatorsReceived = await axios.post("http://localhost:8000/api/creators/search-creators", body, config )
		setCreators(creatorsReceived.data.results)
		}

		useEffect(()=>{
			fetchCreators();
		},[tags,name,refreshToken])

		if(creators.length>0){
			return (		
				<Grid container 
				direction='row' 
				justifyContent='space-around' 
				alignItems='center' 
					columnSpacing={{ xs:0, sm: 1, md:4}}
					sx={{px:{xs:0,md:3}}}>	
					<Grid item xs={1} style={{textAlign: "right"}}>
						{carouselIndex>0?
							<ArrowCircleLeftIcon onClick={()=>setCarouselIndex(carouselIndex-1)} style={{color:"#004691", fontSize:{xs:"small",md:'large'}}} />
							:
							<ArrowCircleLeftIcon style={{color:"#96aac8"}} />
						}	
					</Grid>

					<Grid item 
						sm={3} 
						sx={{ display: { xs: 'none', md: 'block' } }} 
						style={{textAlign: "center"}} >			
							<CardCreator creator={creators[carouselIndex]} />
					</Grid>	

					<Grid item 
						xs={10} 
						md={4}  
						style={{textAlign: "center"}}>				
							<CardCreator creator={creators[carouselIndex+1]} />
					</Grid>	

					<Grid item 
						sm={3} 
						sx={{ display: { xs: 'none', md: 'block' } }} 
						style={{textAlign: "center"}}>				
							<CardCreator creator={creators[carouselIndex+2]} />	
					</Grid>	

					<Grid item xs={1} style={{textAlign: "left"}}>			
						{carouselIndex<creators.length-3?
							<ArrowCircleRightIcon onClick={()=>setCarouselIndex(carouselIndex+1)} style={{color:"#004691", fontSize:{xs:"small",md:'large'}}} />:
							<ArrowCircleRightIcon style={{color:"#96aac8"}} />
						}
					</Grid>									
				</Grid>
			)}else{
				return (		
					<Grid container
						sx={{height:'60vh', p:7}}>
							There are no creators corresponding
					</Grid>)
			}
		}

export default CarouselCreators;