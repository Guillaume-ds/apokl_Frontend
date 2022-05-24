import React, {useEffect, useState} from "react";
import axios from "axios";
import { useRouter } from 'next/router';

import CardCreator from "./cardCreator";

import { Grid } from "@mui/material";


const getCreator = ({tags,creator,keywords}) => {
	const router = useRouter();
  const [creators, setCreators] = useState([])
  const [nextBackendUrl,setNextBackendUrl]=useState(null)
  const [previousBackendUrl,setPreviousBackendUrl]=useState(null)
	const searchURL = "http://localhost:8000/api/creators/search-creators"

	useEffect(()=>{
		fetchCreators(searchURL);
	},[tags,creator,keywords])

	const fetchCreators = async(url) => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		const body = {
			"tags":tags,
			"name":creator,
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
              {nextBackendUrl?
                <ArrowCircleLeftIcon onClick={()=>fetchCollections(nextBackendUrl)} fontSize='large' style={{color:"#004691"}} />
                :
                <ArrowCircleLeftIcon style={{color:"#96aac8"}} fontSize='large'/>
              }
              {previousBackendUrl?
                <ArrowCircleRightIcon onClick={()=>fetchCollections(previousBackendUrl)} fontSize='large' style={{color:"#004691"}} />:
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
			sx={{p:7}} 
			rowSpacing={10} 
			columnSpacing={{ sm: 2, md: 6 }}>				
			{creators.length>0?
			creators.map((creator,i) => (
				<Grid item xs={12} md={5} xl={4}>
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