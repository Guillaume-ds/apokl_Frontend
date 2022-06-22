import Grid from "@mui/material/Grid";

import ApoklButton from "../apoklButton";
import GetNftsBlockchain from "../NFT/getNftsBlockchain";
import GetNftsBackend from "../NFT/getNftsBackend";

import HomeStyles from '../../styles/Home.module.scss';
import VariousStyles from '../../styles/Various.module.scss';


const PresentationComponent = () => {
    return(
        <Grid container
              className={HomeStyles.welcomeContainer} 
              id="accueil"   
              direction="row" 
              justifyContent="space-evenly" 
              alignItems="center" 
              height="100vh"
              sx={{ px:{xs:0,md:2,lg:4}}}>

            <Grid 
              item 
              md={5} 
              sx={{ml:{xs:1,sm:2,md:3,lg:4},mt:{xs:1,md:0},pr:{xs:0,sm:2,md:3,lg:4}}}>
                
                <Grid container direction="column">
                  <Grid item sx={{px:{xs:1,sm:2,md:3,lg:4}}} textAlign="justify">
                  <h1>
                    Exclusivity by NFT
                  </h1>
                  <h3>
                    Exploit the full potential of the NFT on a single plateform.
                  </h3>
                  <h3>
                    Join unique communities, interact with creators and get access to exclusive events.
                  </h3>
                  </Grid>

                  <Grid item sx={{my:5, px:"20%"}}>
                    <hr className={VariousStyles.smallSeparatorGradient}></hr>
                  </Grid>


                  <Grid container justifyContent="center">
                    <Grid item width="120px"> 
                      <ApoklButton onClick={()=>router.push(`/account/login`)} text={"Join us"}  />  
                    </Grid>
                  </Grid>              
   
                </Grid>

            </Grid>


            <Grid 
              item 
              md={6} 
              sx={{ml:{xs:1,sm:2,md:3,lg:4},
                pr:{xs:0,sm:2,md:3,lg:4},
                mt:{xs:1,md:0},
                mb:{xs:5,md:0}}}>

              <GetNftsBackend 
                id={[1]} 
                buyable={false}
                unique={true}
                />

            </Grid>
         
        </Grid>
    )
}
 
export default PresentationComponent;