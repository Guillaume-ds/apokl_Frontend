import React, {useState, useEffect} from "react";
import Link from "next/link";


import Apokl from '../../assets/images/logo.png';
import FormStyles from "../../styles/Form.module.scss"

import CardNft from './cardNft';
import GetNFT from './getNftsBlockchain';
import {getNftBackend} from './functionNFT';

import { Grid } from "@mui/material";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

export default function GetNFTs({tags,creatorName=null,price,buyable,id,unique,creatorInfo=null,setCreatorInfo=null }) {
	const [backendNfts, setBackendNfts] = useState([])
  const [nextBackendUrl,setNextBackendUrl]=useState(null)
  const [previousBackendUrl,setPreviousBackendUrl]=useState(null)
  const [loadingState, setLoadingState] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [passedCreatorInfo, setPassedCreatorInfo] = useState(false)
  const searchURL = "http://localhost:8000/api/nfts/search-nfts"

  useEffect(() => {
    fetchNft(searchURL)
  }, [tags,creatorName,price,buyable,id])

  useEffect(()=>{
    if(!loadingState && backendNfts.length > 0 && !passedCreatorInfo){
      passCreatorInfo()     
    }})

	async function fetchNft(url){
    setLoadingState(true)
    scroll(0,0)
    const res = await getNftBackend(url,creatorName,price,tags,id) 
    
    setNextBackendUrl(res.nextBackendUrl)
    setPreviousBackendUrl(res.previousBackendUrl)
     
    setBackendNfts(res.nfts)
    setLoaded(true)
    setLoadingState(false)
  }

  const passCreatorInfo = () =>{
    try{
      setCreatorInfo(backendNfts[0].creatorInfo)
      setPassedCreatorInfo(true)
    }catch{
      setPassedCreatorInfo(true)
      console.log("failure")
    }    
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
                <ArrowCircleLeftIcon onClick={()=>fetchNft(previousBackendUrl)} fontSize='large' style={{color:"#004691"}} />
                :
                <ArrowCircleLeftIcon style={{color:"#96aac8"}} fontSize='large'/>
              }
              {nextBackendUrl?
                <ArrowCircleRightIcon onClick={()=>fetchNft(nextBackendUrl)} fontSize='large' style={{color:"#004691"}} />:
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
  

  if(backendNfts.length === 0 && loaded){
    return(
      <Grid container direction="row" justifyContent="center" sx={{height:'70vh', pt:10}}>
      <div className={FormStyles.formCard}>
      <h1 className={FormStyles.formCardTitle}>No NFT available yet</h1>
        <div className={FormStyles.formCardContent}>
          <div className={FormStyles.formCardItem}>	
            <Link href='/nfts/create-nft'>
              <button className={FormStyles.formButton} >Create NFT</button>
            </Link>
          </div>              
        </div>
      </div>
    </Grid>
    )
  }else if(backendNfts.length > 0 && loaded){
  return (
  <Grid container 
        direction={"column"}>
    <Grid item>
      <Grid container 
            direction={"row"} 
            justifyContent="space-around" 
            rowSpacing={12}
            columnSpacing={{ sm: 4, md: 10 }}>
        {backendNfts.map((nft)=>(  
            <GetNFT id={nft.tokenId} 
                    creatorInfo={nft.creatorInfo} 
                    buyable={buyable}
                    unique={unique}/>   
        ))}
      </Grid>
    </Grid>
    <ElementToLoad />
	</Grid>		
  );}else{
    return(
      <Grid minHeight="10vh">

      </Grid>
    )
  }
}
