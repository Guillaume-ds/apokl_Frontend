import React, {useContext} from "react";
import Layout from '../hocs/Layout';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'

import AuthenticationContext from "../../context/AuthenticationContext"; 

import ApoklButton from "../components/apoklButton";
import PresentationComponent from "../components/Home/presentationComponent";

import CarouselCollections from "../components/Collections/carouselCollection";
import CarouselCreators from '../components/Creators/carouselCreators'

import Grid from "@mui/material/Grid";

import influenceur_nft from '../assets/images/influenceur_nft.jpg';
import entreprise_nft from '../assets/images/entreprise_nft.png';
import client_nft from '../assets/images/client_nft.jpg';

import VariousStyles from '../styles/Various.module.scss';


export default function Home() {

  return (
    <Layout
			title='Apokl | NFT social place'
			content='New NFT social market place with exclusive access'>
      
      <PresentationComponent  />
           
      <Grid 
        item      
        className={VariousStyles.separatorGradient}>
      </Grid>


      <Grid container direction="column" sx={{mt:15,mx:2}} style={{backgroundColor:"#f8f8ff"}}>

        <Grid item textAlign={'center'}  sx={{py:4}}>
          <h1>Apokl collections</h1>
        </Grid>
        <Grid item  sx={{py:4}}>
          <CarouselCollections tags={[]}/>
        </Grid>
      </Grid>
      
      <Grid container direction="column" sx={{mt:15,mx:2}} style={{backgroundColor:"#f8f8ff"}}>
        <Grid item textAlign={'center'} sx={{py:4}}>
          <h1>Apokl creators</h1>
        </Grid>
        <Grid item sx={{py:4}}>
          <CarouselCreators name={''} tags={[]}/>
        </Grid>
      </Grid>     

    </Layout>
  )
}
