import {useState} from "react";

import withAuth from '../../../hocs/withAuth';

import { Grid } from "@mui/material";
import CreateEventCollection from "./createEventCollection";
import CreatePostCollection from "./createPostCollection";
import LiveRoom from "../../Actions/liveRoom";
import ButtonStyles from "../../../styles/Button.module.scss";


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
            case "Event":
                return <CreateEventCollection collection={collection} />
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

        <Grid container direction="row" justifyContent="center" >

            <Grid item width="120px" height="20px">
            <div className={action === "Post" ? ButtonStyles.divButtonActive : ButtonStyles.divButton} 
                onClick={()=>changeAction("Post")}>Post</div>
            </Grid>

            <Grid item width="120px" height="20px">
            <div className={action === "Event" ? ButtonStyles.divButtonActive : ButtonStyles.divButton} 
                onClick={()=>changeAction("Event")}>Event</div>
            </Grid>

            <Grid item width="120px" height="20px">
            <div className={action === "Live" ? ButtonStyles.divButtonActive : ButtonStyles.divButton} 
                onClick={()=>changeAction("Live")}>Live</div>
            </Grid>

        </Grid>

        <DisplayAction />
        
        </div>
    )

}

export default withAuth(CreatorActions);