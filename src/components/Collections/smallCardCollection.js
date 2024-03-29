import React from "react";
import { useRouter } from 'next/router'
import CollectionStyles from '../../styles/Collection.module.scss';
import { Grid } from "@mui/material";

const SmallCardCollection = ({collection,creatorName}) => {
    const router = useRouter();
    if(collection){
        if(collection.picture){
          var styling = {
            backgroundImage: `url('${collection.picture}')`,
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
            onClick={()=>router.push(`/collections/${creatorName}/${collection.slug}`)}>
            <h3 className={CollectionStyles.smallCollectionCardTitle}>{collection.name}</h3>
        </Grid>
    )
}

export default SmallCardCollection;