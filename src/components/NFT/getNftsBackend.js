import React, {useState, useEffect} from "react";
import axios from "axios";

import Apokl from '../../assets/images/logo.png';

import CardNft from './cardNft';
import GetNFT from './getNftsBlockchain';
import { Grid } from "@mui/material";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

export default function GetNFTs({tags,creatorName,price,buyable,id}) {
	const [backendNfts, setBackendNfts] = useState([])
  const [nextBackendUrl,setNextBackendUrl]=useState(null)
  const [previousBackendUrl,setPreviousBackendUrl]=useState(null)
  const [loadingState, setLoadingState] = useState('not-loaded')
  const searchURL = "http://localhost:8000/api/nfts/search-nfts"

  useEffect(() => {
    getNftBackend(searchURL)
  }, [tags,creatorName,price,buyable,id])
  

	async function getNftBackend(url){
    scroll(0,0)
    const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		const body = {
      "creator":creatorName,
      "priceMax":price,
      "tags":tags,
      "id":id
  }
  
    const res = await axios.post(url, body, config )
    console.log(res)
    
    setNextBackendUrl(res.data.next)
    setPreviousBackendUrl(res.data.previous)
     
    /* Now check if tokenId in ids, prevent from accessing all nft with unexisting id*/
    /* Because it is supposed to be true, it should'nt take long*/ 
    if(id !== undefined){
      const len = res.data.results.length
      for(let i=0; i<len ;i++){
        if(id.includes(res.data.results[i].tokenId)){
          setBackendNfts([...backendNfts,res.data.results[i]])
        }
      }
    }else{
      setBackendNfts(res.data.results)
    }
  }


  if(backendNfts === []){
    return(
    <CardNft creator="Guillaume" title="Apokl NFT" image={Apokl} description="This is an exemple" price="1" royalties="0" />
    )
  }else{
  return (
  <Grid container 
        direction={"column"}>
    <Grid item>
      <Grid container 
            direction={"row"} 
            justifyContent="space-around" 
            rowSpacing={12}
            columnSpacing={{ sm: 4, md: 2 }}>
        {backendNfts.map((nft)=>(        
            <GetNFT id={nft.tokenId} 
                    creatorInfo={nft.creator} 
                    buyable={buyable}/>        
        ))}
      </Grid>
    </Grid>
    <Grid item 
          sx={{mt:15}} 
          textAlign={'center'}>
      <h1>Load more</h1>
      <Grid container 
            direction={"row"} 
            justifyContent="space-around">
        {nextBackendUrl?
          <ArrowCircleLeftIcon onClick={()=>getNftBackend(nextBackendUrl)} fontSize='large' style={{color:"#004691"}} />
          :
          <ArrowCircleLeftIcon style={{color:"#96aac8"}} fontSize='large'/>
        }
        {previousBackendUrl?
          <ArrowCircleRightIcon onClick={()=>getNftBackend(previousBackendUrl)} fontSize='large' style={{color:"#004691"}} />:
          <ArrowCircleRightIcon style={{color:"#96aac8"}} fontSize='large'/>
        }
      </Grid>
    </Grid>
	</Grid>		
  );}
}
