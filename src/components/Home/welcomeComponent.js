import Grid from "@mui/material/Grid";

import ApoklButton from "../apoklButton";
import GetNftsBlockchain from "../NFT/getNftsBlockchain";

import HomeStyles from '../../styles/Home.module.scss';


const PresentationComponent = () => {
    return(
        <Grid container
              className={HomeStyles.accueil} 
              id="accueil"   
              direction="row" 
              justifyContent="space-evenly" 
              alignItems="center" 
              sx={{ px:{xs:0,md:2,lg:4}}}>
            <Grid 
              item 
              md={6} 
              sx={{ml:{xs:0,md:2},pr:{xs:1,md:4}}}>
              <h1 >
                Exclusivity by NFT
              </h1>
              <h3>
                Exploit the full potential of the NFT on a single plateform.
              </h3>
              <h3>
                Join unique communities, interact with creators and get access to exclusive events.
              </h3>
              <div onClick={()=>router.push(`http://localhost:3000/account/login`)}>
              <ApoklButton text={"Join us"}  />
              </div>
              
            </Grid>


            <Grid 
              item 
              md={5} 
              sx={{ml:{md:2},pr:{md:4}}}>

              <Grid container 
                justifyContent="space-around"
                direction='row'  
                sx={{px:6}}
                rowSpacing={10} 
                paddingTop={10}
                columnSpacing={{ sm: 2, md: 4 }} > 

                <Grid item md={12}>

                  <GetNftsBlockchain 
                  id={2} 
                  buyable={false}
                  creatorInfo={{"name": "guillaume"}}/>

                </Grid>
              </Grid>
            </Grid>           
        </Grid>
    )
}
 
export default PresentationComponent;