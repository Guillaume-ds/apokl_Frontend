import React, {useContext,useState} from "react";
import { useRouter } from 'next/router';

import AuthenticationContext from "../../../context/AuthenticationContext";

import SmallCardCollection from "../Collections/smallCardCollection";
import ApoklButton from "../apoklButton";
import VariousStyles from '../../styles/Various.module.scss';
import PostStyles from '../../styles/Post.module.scss';
import ButtonStyles from "../../styles/Button.module.scss";
import { Grid } from "@mui/material";
import Artist from "../Creators/artist";



export default function CardRoom({room}) {
  const router = useRouter();
  const {user,accessToken} = useContext(AuthenticationContext)
  const [display,setDisplay] = useState("Collection")

  function changeDisplay(displayName){
    setDisplay(displayName)
}

  async function claimAccess(roomId){
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    }
    const body = {
        "roomId":roomId,
        "address":account
    }

    const res = await axios.post(`http://localhost:8000/api/rooms/claim-access`,body,config)
    setMsg({...msg, content:'Email sent, welcome to the event',open:true,severity:"success",color:"#fafafa"})
    setLoaded(true)
}


  return (
    <Grid 
        container 
        direction="row" 
        sx={{ my:7,px:5 }} 
        alignItems="center"
        justifyContent="space-around"
        height="40vh">
        
        <Grid item xs={12} sm={4} md={3} height="100%">             
            <Grid item height="90%">
                {
                    display!="Creator"?
                    <SmallCardCollection collection={room.collectionInfo} />
                    :
                    <Artist name={room.creatorInfo.name} />
                }
                
            </Grid>   

            <Grid item height="10%" justifyContent="space-around" alignItems="center">
                <Grid container direction="row" alignItems="center" height="100%" justifyContent="center" sx={{mt:1}}>

                    <Grid item sx={{width:{xs:"50%",md:"30%"}}}>
                    <div className={display === "Collection" ? ButtonStyles.divButtonActive : ButtonStyles.divButton} 
                        onClick={()=>changeDisplay("Collection")}>Collection</div>
                    </Grid>

                    <Grid item sx={{width:{xs:"50%",md:"30%"}}}>
                    <div className={display === "Creator" ? ButtonStyles.divButtonActive : ButtonStyles.divButton} 
                        onClick={()=>changeDisplay("Creator")}>Creator</div>
                    </Grid>

                </Grid>
            </Grid>          
        </Grid>
        

        <Grid item xs={12} sm={7} md={8} height="100%">
            <Grid item height="90%">
                <div className={PostStyles.inviteContainer}>
                    <h2>{room.title}</h2>
                    <Grid 
                        item      
                        className={VariousStyles.separator40}
                        sx={{mt:{xs:1,md:2},mb:{xs:2,md:4}, mr:"30%"}}>
                    </Grid>
                    <Grid item sx={{px:{sm:1,md:4}}}>
                        <p className={PostStyles.inviteContainerContent}>{room.content}</p>
                    </Grid>                    
                </div> 
            </Grid>  

            <Grid item height="10%" alignItems="center" sx={{mt:1}}>
                <ApoklButton text={"Claim access"} onClick={()=>claimAccess(room.id)}/>  
            </Grid>             
        </Grid>
    </Grid> 

  );
}