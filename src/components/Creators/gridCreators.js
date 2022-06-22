import React, {useEffect, useState} from "react";
import axios from "axios";
import { useRouter } from 'next/router';

import CardCreator from "./cardCreator"

import { Grid } from "@mui/material";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';


const GridCreators = ({tags,id}) => {
	const router = useRouter();
  const [creators, setCreators] = useState([])
	const [refreshToken,setRefreshToken] = useState(0);
 
	const fetchCreators = async() => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		const body = {
			"tags":tags,
			"id":id
		}

		const creatorsReceived = await axios.post("http://localhost:8000/api/profiles/search-creators", body, config )
		setCreators(creatorsReceived.data.results)
		console.log(creators)
		}

		useEffect(()=>{
			fetchCreators();
		},[tags,id,refreshToken])

		if(creators.length>0){
			return (		
				<Grid container 
					justifyContent="space-around"
					rowSpacing={8}
					sx={{px:{xs:0,md:0}}}>	

					{
						creators.map((creator,index)=>(
							<Grid item 
								xs={10} 
								md={5}  
								style={{textAlign: "center"}}
								height="60vh">				
									<CardCreator creator={creators[index]}  />
							</Grid>	
							
						))
					}
	
					</Grid>	

								
			)}else{
				return (		
					<Grid container
						sx={{height:'60vh', p:7}}>
							There are no creators corresponding
					</Grid>)
			}
		}

export default GridCreators;