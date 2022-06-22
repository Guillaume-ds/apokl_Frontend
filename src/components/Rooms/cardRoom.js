import React, {useContext,useState} from "react";
import { useRouter } from 'next/router';
import axios from "axios";

import AuthenticationContext from "../../../context/AuthenticationContext";

import SmallCardCollection from "../Collections/smallCardCollection";
import SmallCardCreator from "../Creators/smallCardCreator";
import ApoklButton from "../apoklButton";
import VariousStyles from '../../styles/Various.module.scss';
import PostStyles from '../../styles/Post.module.scss';
import ButtonStyles from "../../styles/Button.module.scss";
import { Grid } from "@mui/material";



export default function CardRoom({room}) {
  const router = useRouter();
  const {user,accessToken} = useContext(AuthenticationContext)
  const [display,setDisplay] = useState("Collection")
  const [accessClaimed,setAccessClaimed] = useState(false)
  const [msg,setMsg] = useState({content:"",open:false,severity:"error",color:"red"})

  const handleClose = e => {
    setMsg({...msg, content:'',open:false,severity:"error"})
  }

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
    setAccessClaimed(true)
    const res = await axios.post(`http://localhost:8000/api/events/claim-access`,body,config)
    setMsg({...msg, content:'Email sent, welcome to the event',open:true,severity:"success",color:"#fafafa"})
}


  return (
    <Grid 
        container 
        direction="row" 
        sx={{ px:{xs:1,sm:2,md:5} }} 
        alignItems="center"
        justifyContent="space-around"
        className={PostStyles.invitCard}>
        
        <Grid item xs={12} sm={4.5} md={3.5} height="40vh" >             
            <Grid item height="90%">
                {
                    display!="Creator"?
                    <SmallCardCollection collection={room.collectionInfo} creatorName={room.creatorInfo.name}/>
                    :
                    <SmallCardCreator creator={room.creatorInfo} />
                }
                
            </Grid>   

            <Grid item height="10%" justifyContent="space-around" alignItems="center">
                <Grid container direction="row" alignItems="center" height="100%" justifyContent="center" sx={{mt:{xs:0,md:2}}}>

                    <Grid item sx={{width:{xs:"50%",md:"40%",lg:"30%"}}}>
                    <div className={display === "Collection" ? ButtonStyles.divButtonActive : ButtonStyles.divButton} 
                        onClick={()=>changeDisplay("Collection")}>Collection</div>
                    </Grid>

                    <Grid item sx={{width:{xs:"50%",md:"40%",lg:"30%"}}}>
                    <div className={display === "Creator" ? ButtonStyles.divButtonActive : ButtonStyles.divButton} 
                        onClick={()=>changeDisplay("Creator")}>Creator</div>
                    </Grid>

                </Grid>
            </Grid>          
        </Grid>
        

        <Grid item xs={12} sm={7} md={8} height="40vh" sx={{mt:{xs:2,md:0}}}>
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

            {
                accessClaimed===false?
                <Grid item height="10%" sx={{mt:{xs:1,md:0}}} onClick={()=>claimAccess(room.id)}>
                    <Grid container justifyContent="center">
											<Grid item width="120px"> 
													<ApoklButton text={"Claim access"}  />  
												</Grid>
										</Grid>               
                </Grid>  
                :
                null
            }
                       
        </Grid>
    </Grid> 

  );
}