import {useState} from "react";

import withAuth from '../../hocs/withAuth';

import { Grid } from "@mui/material";
import CreateRoomCollection from "./createRoomCollection";
import CreatePostCollection from "./createPostCollection";
import LiveRoom from "../Actions/liveRoom";
import ButtonStyles from "../../styles/Button.module.scss";


const CreatorActions = ({collection}) => {
    const [action, setAction] = useState("Post")

    function changeAction(actionName){
        setAction(actionName)
    }

    const DisplayAction = () => {
        switch(action){
            case "Post":
                return <CreatePostCollection collection={collection} />
                break;
            case "Room":
                return <CreateRoomCollection collection={collection} />
                break;
            case "Live":
                return <LiveRoom />
                break;
            default:
                return <CreatePostCollection collection={collection} />
                break;
        }
    }


    return(
        <div>

        <Grid container direction="row" justifyContent="center" sx={{mt:10}}>

            <Grid item width="120px">
            <div className={action === "Post" ? ButtonStyles.divButtonActive : ButtonStyles.divButton} 
                onClick={()=>changeAction("Post")}>Post</div>
            </Grid>

            <Grid item width="120px">
            <div className={action === "Room" ? ButtonStyles.divButtonActive : ButtonStyles.divButton} 
                onClick={()=>changeAction("Room")}>Room</div>
            </Grid>

            <Grid item width="120px">
            <div className={action === "Live" ? ButtonStyles.divButtonActive : ButtonStyles.divButton} 
                onClick={()=>changeAction("Live")}>Live</div>
            </Grid>

        </Grid>

        <DisplayAction />
        
        </div>
    )

}

export default withAuth(CreatorActions);