import React from "react";
import { useRouter } from 'next/router';

import cardNftStyles from '../../styles/Nft.module.scss';
import { Grid } from "@mui/material";
import AccountIcon from '@material-ui/icons/AccountCircle';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';


export default function CardNft({creator,name,image,description,price,royalties, id}) {
  const router = useRouter();

  return (
    <div className={cardNftStyles.nftCard}>
      <div className={cardNftStyles.nftCardHeader}>
        <img className={cardNftStyles.nftCardHeaderImg} src={image} alt="Nft Image" />
      </div>
      <div className={cardNftStyles.nftCardBody}>
        <p className={cardNftStyles.nftCardName}>
          {name}
        </p>
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
              <p className={cardNftStyles.userName}>{royalties}</p>
            </Grid>          
          </Grid>
        </div>
        <div className={cardNftStyles.nftCardUser}>
          <Grid container direction="row" sx={{mt:5}} alignItems='center' justifyContent="space-between">
            <Grid item>
              <Grid container direction="row" sx={{ml:0}} alignItems='center'>
                <AccountIcon fontSize='large' style={{color:'#000111'}} onClick={()=>router.push(`http://localhost:3000/creators/${creator}`)}/>
                <Grid item direction="column" sx={{ml:1}}>
                  <p className={cardNftStyles.userInfo} ><small>Created by</small></p>
                  <p className={cardNftStyles.userName}>{creator}</p>
                </Grid>
              </Grid>
            </Grid>              
              <ArrowCircleRightIcon style={{color:'rgb(0, 28, 128)'}} fontSize='large' onClick={()=>router.push(`http://localhost:3000/nfts/${id}`)}/>
          </Grid>
        </div>
      </div>
    </div>
  );
}