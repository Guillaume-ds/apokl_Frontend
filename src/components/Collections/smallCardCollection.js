import { Collections } from "@material-ui/icons";
import React from "react";
import CollectionStyles from '../../styles/Collection.module.scss';
import { Grid } from "@mui/material";

const SmallCardCollection = ({collection}) => {
    if(collection){
        if(collection.picture){
          var styling = {
            backgroundImage: `url('${collection.picture}')`,
            backgroundPosition:'center',
            backgroundRepeat: 'no-repeat',
            } 
          }else{  
          } }
    return(
        <Grid container alignItems="center" className={CollectionStyles.smallCollectionCard} style={styling} >
            <h3 className={CollectionStyles.smallCollectionCardTitle}>{collection.name}</h3>
        </Grid>
    )
}

export default SmallCardCollection;