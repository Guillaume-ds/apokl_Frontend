import React from "react";
import { useRouter } from 'next/router';
import Collectionstyles from '../../styles/Collection.module.scss'
import AccountIcon from '@material-ui/icons/AccountCircle'
import Image from 'next/image'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Grid from "@mui/material/Grid";

export default function CardNft({collection}) {
  const router = useRouter();

  if(collection.picture){
    var styling = {
      backgroundImage: `url('${collection.picture}')`,
      objectFit: 'scale-down',
      backgroundPosition:'center'
      } 
    }else{  
    } 

  return (
    <Grid item md={5} lg={4} sx={{width:'100%'}} >
      <div className={Collectionstyles.collectionCard}>
        <div className={Collectionstyles.collectionCardHeader} >
          <div className={Collectionstyles.collectionCardOverlay} style={styling}>
            <h1 className={Collectionstyles.collectionCardTitle}>{collection.name}</h1>											
          </div>
        </div>	
        <div className={Collectionstyles.collectionCardBody}>
          <Grid className={Collectionstyles.collectionInfo} container direction='row' justifyContent='space-between' alignItems='center' sx={{mt:-3}}>
            <div>{collection.tags.map(tag =>(<p className={Collectionstyles.collectionTag}>{tag}</p>))}</div>
            <p>{collection.nfts.length} NFTs</p> 
          </Grid>
          <p className={Collectionstyles.collectionCardDescription}>{collection.description} </p>	 
          <Grid container direction="row" sx={{ml:0}} alignItems='center' justifyContent="space-between">
            <Grid item>
            <Grid container direction="row" sx={{ml:0}} alignItems='center'>
              <AccountIcon fontSize='large' onClick={()=>router.push(`http://localhost:3000/creators/${collection.creator}`)}/>
              <Grid item direction="column" sx={{ml:1}}>
                <p className={Collectionstyles.collectionCardUserInfo} >Created by</p>
                <p>{collection.creator}</p>
              </Grid>
            </Grid>
            </Grid>              
              <ArrowCircleRightIcon style={{color:'rgb(0, 28, 128)'}} fontSize='large' onClick={()=>router.push(`http://localhost:3000/collections/${collection.creator}/${collection.slug}`)}/>
          </Grid>
        </div>
      </div>
    </Grid>
  );
}