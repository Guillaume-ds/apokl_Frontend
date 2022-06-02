import React, {useContext} from "react";
import Layout from '../hocs/Layout';

import AuthenticationContext from "../../context/AuthenticationContext"; 

import PresentationComponent from "../components/Home/presentationComponent";

import CarouselCollections from "../components/Collections/carouselCollection";
import CarouselCreators from '../components/Creators/carouselCreators'

import Grid from "@mui/material/Grid";

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


      <Grid container direction="column" sx={{mt:15,px:{xs:1,sm:2,md:4}}}  justifyContent="center">

        <Grid item textAlign={'center'} style={{backgroundColor:"#f8f8ff"}}>
          <h1>Exclusive collections</h1>
          <p>Get access to exclusive events and chatrooms through the NFT collections.</p>
        </Grid>
        <Grid item  sx={{py:4}} style={{backgroundColor:"#f8f8ff"}}>
          <CarouselCollections tags={[]}/>
        </Grid>

      </Grid>
      
      <Grid container direction="column" sx={{mt:15,px:{xs:1,sm:2,md:4}}} >
        <Grid item textAlign={'center'} style={{backgroundColor:"#f8f8ff"}}>
          <h1>Apokl creators</h1>
        </Grid>
        <Grid item sx={{py:4}} style={{backgroundColor:"#f8f8ff"}}>
          <CarouselCreators name={''} tags={[]}/>
        </Grid>
      </Grid>     

    </Layout>
  )
}
