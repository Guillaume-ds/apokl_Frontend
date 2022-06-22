import React from "react";
import { useRouter } from 'next/router'
import CollectionStyles from '../../styles/Collection.module.scss';
import { Grid } from "@mui/material";

const SmallCardCreator = ({creator}) => {
    const router = useRouter();
    if(creator){
        if(creator.picture){
          var styling = {
            backgroundImage: `url('${creator.picture}')`,
            backgroundPosition:'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize:"cover",
            } 
          }else{  
          } }
    return(
        <Grid container 
            alignItems="center" 
            className={CollectionStyles.smallCollectionCard} 
            style={styling} 
            sx={{pt:"45%"}}
            onClick={()=>router.push(`/creators/${creator.name}`)}>
            <h3 className={CollectionStyles.smallCollectionCardTitle}>{creator.name}</h3>
        </Grid>
    )
}

export default SmallCardCreator;