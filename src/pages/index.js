import React, {useContext} from "react";
import {useRouter} from "next/router";

import Layout from '../hocs/Layout';

import AuthenticationContext from "../../context/AuthenticationContext"; 

import PresentationComponent from "../components/Home/presentationComponent";
import WelcomeComponent from "../components/Home/welcomeComponent";
import CarouselsComponent from "../components/Home/carouselsComponent";


import Grid from "@mui/material/Grid";


export default function Home() {
  const {user,userLoaded} = useContext(AuthenticationContext)
  const router = useRouter()

  const FirstComponent =() => {
    if(user){
      return(
        <WelcomeComponent creatorName={user.username}/>
      )
    }else if(userLoaded){
      return(
        <PresentationComponent  />
      )
    }else{
      return(
        <Grid minHeight="50vh"></Grid>
      )
    }
  }

  return (
    <Layout
			title='Apokl | NFT social place'
			content='New NFT social market place with exclusive access'>
      
      <FirstComponent />
    
      <CarouselsComponent />

    </Layout>
  )
}
