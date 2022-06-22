import { useState,useContext } from 'react'
import Layout from '../hocs/Layout';
import WithAuth from "../hocs/WithAuth";
import AuthenticationContext from '../../context/AuthenticationContext';

import CarouselNFT from '../components/NFT/carouselNFT';
import CarouselCollection from '../components/Collections/carouselCollection';
import OwnedNFT from '../components/NFT/ownedNFTs';
import Artist from '../components/Creators/artist';
import GetNFTs from '../components/NFT/getNftsBackend';
import OwnedNfts from '../components/NFT/ownedNFTs';
import GetCollections from '../components/Collections/getCollections';


import VariousStyles from '../styles/Various.module.scss';
import ButtonStyles from '../styles/Button.module.scss';

import { Grid } from '@mui/material';


const CreatorDashboard = () => {
  const {creator} = useContext(AuthenticationContext)

  const [activeDisplay, setActiveDiplay] = useState('overview')  

  function changeActiveDisplay(str){
    setActiveDiplay(str)
  }

  const ButtonsSelectDisplay = () =>{
    return(
      <Grid container 
        md={4} 
        sx={{mt:{xs:4,sm:4,md:7},px:{xs:2,sm:4,md:7,lg:10}, pb:{xs:2,sm:1,md:8},pt:{xs:2,sm:1,md:5}}} 
        direction="column" 
        alignItems="center" className={ButtonStyles.divButtonCard}>
          
          <Grid item sx={{my:0}} textAlign="center">
            <h2>Personnal dashboard</h2>
          </Grid>
          
          <Grid item width="120px" >
            <div className={activeDisplay==="overview"?ButtonStyles.divButtonActive:ButtonStyles.divButton} 
              onClick={() => changeActiveDisplay("overview")}>Overview
            </div>
          </Grid>
          <Grid item width="120px" >
            <div className={activeDisplay==="created"?ButtonStyles.divButtonActive:ButtonStyles.divButton} 
              onClick={() => changeActiveDisplay("created")}>Created NFT
            </div>
          </Grid>
          <Grid item width="120px" >
          <div className={activeDisplay==="owned"?ButtonStyles.divButtonActive:ButtonStyles.divButton} 
            onClick={()=>changeActiveDisplay("owned")}>Owned NFT</div>
          </Grid>
          <Grid item width="120px">
          <div className={activeDisplay==="collections"?ButtonStyles.divButtonActive:ButtonStyles.divButton} 
            onClick={()=>changeActiveDisplay("collections")}>Collections</div>
          </Grid>

        </Grid> 
    )
  }

  const DisplayComponent = () => {
    switch(activeDisplay){
      case "overview":
        return(
          <Grid container direction="column" >
            <Grid item sx={{my:8}} minHeight="45vh">
            <CarouselNFT creatorName={creator.name} />
            </Grid>
            <Grid item sx={{my:8}}>
            <CarouselCollection creatorName={creator.name} />
            </Grid>
          </Grid>
        )
        break;
      case "created":
        return(
          <Grid container sx={{p:{xs:2,sm:4,md:6,lg:8}}}>
            <GetNFTs creatorName={creator.name} />
          </Grid>  
        )
        break;
      case "owned":
        return(
          <Grid container sx={{p:{xs:2,sm:4,md:6,lg:8}}}>
            <OwnedNFT/>
          </Grid>
        )
        break;
      case "collections":
        return(
          <Grid container sx={{p:{xs:2,sm:4,md:6,lg:8}}}>
            <GetCollections creatorName={creator.name} />
          </Grid>
        )
        break;
      
      default:
        return null
    }
  }
  

  return (
    <Layout>
      <Grid 
				container 
        sx={{mb:5}}
				id="accueil" 
				direction="row"
				alignItems="center"
				justifyContent="space-around">

        <Grid 
          item
          xs={11}
          md={7}
          sx={{mt:7, px:{xs:2,sm:4,md:10}}}
          height="50vh">
          <Artist name={creator.name}  />            
        </Grid>

        <ButtonsSelectDisplay />

			</Grid> 

      <Grid 
        item      
        className={VariousStyles.separatorGradient}
        sx={{mb:5,mt:0}}>
      </Grid>

      <DisplayComponent />
      
    </Layout>
  )
}

export default WithAuth(CreatorDashboard);