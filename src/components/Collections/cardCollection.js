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

  if(collection.picture){
    var styling = {
      backgroundImage: `url('${collection.picture}')`,
      objectFit: 'scale-down',
      backgroundPosition:'center',
      backgroundRepeat: 'no-repeat',
      height: '100%',
      } 
    }else{  
    } 

  return (
    <Grid item sx={{width:'100%'}} >
      <div className={Collectionstyles.collectionCard}>
        <div className={Collectionstyles.collectionCardHeader} >
          <div className={Collectionstyles.collectionCardOverlay} style={styling}>
            <h1 className={Collectionstyles.collectionCardTitle}>{collection.name}</h1>											
          </div>
        </div>	
        <div className={Collectionstyles.collectionCardBody}>
          <Grid className={Collectionstyles.collectionInfo} container direction='row' justifyContent='space-between' alignItems='center' sx={{mt:-3}}>
            <div>{collection.tags.map(tag =>(<p className={Collectionstyles.collectionTag}>{tag}</p>))}</div>
            <p>{collection.nfts_array.length} NFTs</p> 
          </Grid>
          <p className={Collectionstyles.collectionCardDescription}>{collection.description} </p>	 
          <Grid container direction="row" sx={{ml:0}} alignItems='center' justifyContent="space-between">
            <Grid item>
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
            </Grid>     
            <Link href={`http://localhost:3000/collections/${collection.creator.name}/${collection.slug}`}>    
              <ArrowCircleRightIcon style={{color:'rgb(0, 28, 128)'}} fontSize='large'/>
            </Link>     
          </Grid>
        </div>
      </div>
    </Grid>
  );
}