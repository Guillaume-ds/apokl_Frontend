import React, {useState, useEffect,useContext} from "react";

import CardNft from './cardNft';
import {buyNft , loadNFT} from './functionNFT';
import { Grid } from "@mui/material";
import FormStyles from '../../styles/Form.module.scss';
import AuthenticationContext from '../../../context/AuthenticationContext'


export default function GetNFT({id,buyable,creatorInfo,unique=false}) {
  const [nft, setNft] = useState({})
  const {user} = useContext(AuthenticationContext)

  useEffect(() => {
    fetchBlockchainNFT(id)
  }, [id])

  async function fetchBlockchainNFT(id){
    const res = await loadNFT(id);
    setNft(res);
  }
  
	  
  if(buyable===true && !nft.sold){
    return(
      <Grid item xs={12} md={6} lg={4}>
        <CardNft creatorInfo={creatorInfo} 
          nft={nft}/>
          {(user)?
            <Grid container direction="column" sx={{mt:2}} alignItems='center'>
              <button className={FormStyles.formButton} onClick={() => buyNft(nft)}>Buy</button>
            </Grid>
            :
            null
          }
      </Grid>
    )
  }else if(buyable===true && nft.sold){
      return null
  }else if(buyable===false && !unique){
    return (
      <Grid item xs={12} md={6} lg={4}>
        <CardNft 
          creatorInfo={creatorInfo} 
          nft={nft}/>
      </Grid>
      )
  }else if(unique){
    return (
      <Grid item xs={12}>
        <CardNft 
          creatorInfo={creatorInfo} 
          nft={nft}/>
          {(!nft.sold && user && buyable)?
            <Grid container direction="column" sx={{mt:2}} alignItems='center'>
              <button className={FormStyles.formButton} onClick={() => buyNft(nft)}>Buy</button>
            </Grid>
            :
            null
          }
      </Grid>
      )
  }else{
    return (
      <Grid item xs={12} md={6} lg={4}>
        <CardNft 
          creatorInfo={creatorInfo} 
          nft={nft}/>
          {(!nft.sold && user)?
            <Grid container direction="column" sx={{mt:2}} alignItems='center'>
              <button className={FormStyles.formButton} onClick={() => buyNft(nft)}>Buy</button>
            </Grid>
            :
            null
          }
      </Grid>
      )
  }
  
  }
  


