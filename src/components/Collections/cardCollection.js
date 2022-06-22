import React from "react";
import { useRouter } from 'next/router';
import Collectionstyles from '../../styles/Collection.module.scss';
import AccountIcon from '@material-ui/icons/AccountCircle';
import Image from 'next/image';
import Link from "next/link";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Grid from "@mui/material/Grid";

export default function CardNft({collection}) {
  const router = useRouter();


  

  if(collection){
    if(collection.picture){
      var styling = {
        backgroundImage: `url('${collection.picture}')`,
        backgroundPosition:'center',
        backgroundRepeat: 'no-repeat',
        } 
      }else{  
      } 
  return (
      <div className={Collectionstyles.collectionCard}>
        <div className={Collectionstyles.collectionCardHeader} style={styling} >
          <div className={Collectionstyles.collectionCardOverlay} >
            <h1 className={Collectionstyles.collectionCardTitle}>{collection.name}</h1>		
            <Grid container direction="row" sx={{ml:0}} alignItems='center'>
              {
                collection.creator.picture?
                <Image src={collection.creator.picture} width={40} height={40} className={Collectionstyles.collectionCreatorPicture}/> 
                :
                <AccountIcon fontSize='large' onClick={()=>router.push(`http://localhost:3000/creators/${collection.creator}`)}/>
              }
              
              <Grid item direction="column" sx={{ml:1}}>
                <p className={Collectionstyles.collectionCardUserInfo} >Created by</p>
                <p>{collection.creator.name}</p>
              </Grid>
            </Grid>									
          </div>
        </div>	
        <div className={Collectionstyles.collectionCardBody}>
          <Grid className={Collectionstyles.collectionInfo} 
            container 
            direction='row' 
            justifyContent='space-between' 
            alignItems='center'
            sx={{my:1}} 
            >
            <div>{collection.tags.map(tag =>(<span className={Collectionstyles.collectionTag}>{tag}</span>))}</div>
            <div>{collection.nfts_array.length} NFTs</div> 
          </Grid>
          <div className={Collectionstyles.collectionCardDescription}>{collection.description} </div>	 
          
        </div>
        <span className={Collectionstyles.collectionCardArrow}>   
            <Link href={`http://localhost:3000/collections/${collection.creator.name}/${collection.slug}`}>    
              <ArrowCircleRightIcon fontSize='large' className={Collectionstyles.collectionCardLinkIcon}/>
            </Link>     
          </span>
      </div>
  );}else{
    return null
  }
}