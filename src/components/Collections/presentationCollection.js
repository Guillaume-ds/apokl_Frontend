import Collectionstyles from '../../styles/Collection.module.scss';
import Artist from "../Creators/artist"
import { Grid } from "@mui/material"


const CollectionPresentation = ({collection}) => {
    return(
    <Grid 
        container 
        direction={{sx:"column", md:"row"}}
        justifyContent="space-around"
        alignItems="center"
        sx={{mt:15}}>
        <Grid item xs={7} md={4}>
            <Artist name={collection.creator.name} />
        </Grid>	
        <Grid item xs={9} md={7}>
        <div className={Collectionstyles.description}>
            <h3>More about this collection</h3>
            <p>{collection.description}</p>				
        </div>
        </Grid>					
    </Grid>
    )
    
}

export default CollectionPresentation;