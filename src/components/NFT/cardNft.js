import React from "react";
import { useRouter } from 'next/router';
import Image from "next/Image";

import cardNftStyles from '../../styles/Nft.module.scss';
import { Grid } from "@mui/material";
import AccountIcon from '@material-ui/icons/AccountCircle';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';


export default function CardNft({creatorInfo,title,image,description,price,royalties,id}) {
  const router = useRouter();
  const creatorPicture = () =>{
    try{
      if(creatorInfo.picture){
        return creatorInfo.picture
      }
    }catch{
      return null
    }
  }

  return (
    <div className={cardNftStyles.nftCard}>
      <div className={cardNftStyles.nftCardHeader} 
          style={{
            backgroundImage: `url(${image})`,
          }}>
          <p className={cardNftStyles.nftCardName}>{title}</p>
      </div>
      <div className={cardNftStyles.nftCardBody}>
        <div className={cardNftStyles.nftCardUser}>
            <Grid container direction="row" alignItems='center' justifyContent="space-between">
              <Grid item>
                <Grid container direction="row" sx={{ml:0}} alignItems='center'>
                  {
                  creatorPicture()?
                  <Image src={creatorPicture()} width={40} height={40} className={cardNftStyles.nftCreatorPicture}/> 
                  :
                  <AccountIcon fontSize='large' onClick={()=>router.push(`http://localhost:3000/creators/${creatorInfo.name}`)}/>
                  }              
                  <Grid item direction="column" sx={{ml:1}}>
                    <p className={cardNftStyles.userInfo} ><small>Created by</small></p>
                    <p className={cardNftStyles.userName}>{creatorInfo?creatorInfo.name:"anonymous"}</p>
                  </Grid>
                </Grid>
              </Grid>              
                <ArrowCircleRightIcon 
                  className={cardNftStyles.nftCardArrow}
                  style={{color:'rgb(0, 30, 90)'}}
                  fontSize='large' 
                  onClick={()=>router.push(`http://localhost:3000/nfts/${id}`)}/>
            </Grid>
          </div>
        
        <p className={cardNftStyles.nftCardInfo}>
          {description}
        </p>

        <div className={cardNftStyles.nftCardUser}>
          <Grid container direction="row" sx={{mt:1}} alignItems='center' justifyContent="space-between">
            <Grid item direction="column" sx={{ml:1}}>
              <p className={cardNftStyles.userInfo} ><small>Price</small></p>
              <p className={cardNftStyles.userName}>{price}</p>
            </Grid>   
            <Grid item direction="column" sx={{ml:1}}>
              <p className={cardNftStyles.userInfo} ><small>Creator Royalties</small></p>
              <p className={cardNftStyles.userName}>{royalties?royalties:"0"}</p>
              
            </Grid>          
          </Grid>
        </div>
        
      </div>
    </div>
  );
}