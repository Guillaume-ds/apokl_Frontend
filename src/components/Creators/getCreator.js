import React, {useEffect, useState} from "react";
import axios from "axios";
import { useRouter } from 'next/router';

import CardCreator from "./cardCreator";

import { Grid } from "@mui/material";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';


const getCreator = ({tags,creatorName,keywords}) => {
	const router = useRouter();
  const [creators, setCreators] = useState([])
  const [nextBackendUrl,setNextBackendUrl]=useState(null)
  const [previousBackendUrl,setPreviousBackendUrl]=useState(null)
	const searchURL = "http://localhost:8000/api/profiles/search-creators"

	useEffect(()=>{
		fetchCreators(searchURL);
	},[tags,creatorName,keywords])

	const fetchCreators = async(url) => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		const body = {
			"tags":tags,
			"name":creatorName,
			"keywords":keywords
		}

		const collectionsReceived = await axios.post(url, body, config )
		setCreators(collectionsReceived.data.results)
		setNextBackendUrl(collectionsReceived.data.next)
    setPreviousBackendUrl(collectionsReceived.data.previous)
	}


	const ElementToLoad = () =>{
    try{
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
    }catch{
      return(null)
    }
    
  }

	return (		
		<Grid container 
			direction='row' 
			justifyContent='space-around' 
			alignItems='center' 
			sx={{py:2,px:4}}
			 >				
			{creators.length>0?
			creators.map((creator,i) => (
				<Grid item xs={12} md={5} xl={4} sx={{py:4,px:2}} height="350px">
					<CardCreator creator={creator} key={i} />
				</Grid>				
			))
			:
		<Grid container
			sx={{height:'60vh', p:7}}>
				There are no collection corresponding
		</Grid>}	
		<ElementToLoad />				
		</Grid>
	)
}

export default getCreator;