import Grid from "@mui/material/Grid";
import { useRouter } from 'next/router';

import ApoklButton from "../apoklButton";
import Artist from "../Creators/artist";

import HomeStyles from '../../styles/Home.module.scss';


const PresentationComponent = ({creatorName=null}) => {
  const router = useRouter();
    return(
        <Grid container
              className={HomeStyles.welcomeContainer}
              id="accueil"   
              direction="row" 
              justifyContent="space-evenly" 
              alignItems="center" 
              sx={{ px:{xs:0,md:2,lg:4}, py:{xs:2,md:3,lg:5}}}
              >        


            <Grid 
              item 
              xs={11}
              sm={10}
              md={4} 
              sx={{my:1}}
              height="35vh"
              >             

              <Artist name={creatorName}/>
           
            </Grid>  

            <Grid 
              container 
              display={{xs:"none",md:"inline"}}
              md={3.5} 
              sx={{my:1}}
              justifyContent="center"
              textAlign="center">             

              <h1>Welcome back {creatorName}</h1>
              <p>Access your dashboard to see the latest exclusivites</p>
              <Grid container justifyContent="center">
                <Grid item width="120px" onClick={()=>router.push(`/my-dashboard`)}> 
                  <ApoklButton text={"Dashboard"}  />  
                </Grid>
              </Grid>              
            </Grid>           
        </Grid>
    )
}
 
export default PresentationComponent;