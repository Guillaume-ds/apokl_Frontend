import React from "react";
import {useRouter} from "next/router";

import CarouselCollections from "../Collections/carouselCollection";
import CarouselCreators from '../Creators/carouselCreators';
import CarouselNFT from "../NFT/carouselNFT";
import GridCreators from "../Creators/gridCreators";

import ApoklButton from "../apoklButton";

import HomeStyles from '../../styles/Home.module.scss';

import Grid from "@mui/material/Grid";


const CarouselsComponent = () => {
    const router = useRouter();
    return(
        <div>
        <Grid container direction="column" sx={{mt:15,px:{xs:1,sm:2,md:4}}} justifyContent="center" >
        <div className={HomeStyles.carouselContainer}>
        <Grid item textAlign={'center'}>
          <h1 className={HomeStyles.carouselTitle}>
            Exclusive collections
          </h1>
          <p className={HomeStyles.carouselDescription}>
            Get access to exclusive events and chatrooms through the NFT collections.
          </p>
        </Grid>

        <Grid item  sx={{py:4}}>
          <CarouselCollections tags={[]}/>
        </Grid>

        <Grid container justifyContent="center">
          <Grid item width="100px" onClick={()=>router.push(`/collections/`)}> 
            <ApoklButton text={"See more"}  />  
          </Grid>
        </Grid> 
        </div>
      </Grid>

      
      <Grid container direction="column" sx={{mt:15,px:{xs:1,sm:2,md:4}}} >
      <div >
        <Grid item textAlign={'center'} >
          <h1 className={HomeStyles.homeTitle}>
            Apokl creators
          </h1>
          <p className={HomeStyles.carouselDescription}>
            Discover various content creators.
          </p>
        </Grid>

        <Grid item sx={{py:4}} >
          <GridCreators id={[]}/>
        </Grid>

        <Grid container justifyContent="center" >
          <Grid item width="100px" onClick={()=>router.push(`/creators/`)}> 
            <ApoklButton text={"See more"} />  
          </Grid>
        </Grid> 
        </div>
      </Grid>  

      <Grid container direction="column" sx={{mt:15,px:{xs:1,sm:2,md:4}}} >
      <div className={HomeStyles.carouselContainer}>
        <Grid item textAlign={'center'} >
          <h1 className={HomeStyles.homeTitle}>
            Apokl NFT
          </h1>
          <p className={HomeStyles.carouselDescription}>
            Unique NFTs That will give you access to the collections.
          </p>
        </Grid>

        <Grid item sx={{py:4}} >
        <CarouselNFT />
        </Grid>

        <Grid container justifyContent="center" >
          <Grid item width="100px" onClick={()=>router.push(`/creators/`)}> 
            <ApoklButton text={"See more"} />  
          </Grid>
        </Grid> 
        </div>
      </Grid> 

      
      </div>
    )
}

export default CarouselsComponent;