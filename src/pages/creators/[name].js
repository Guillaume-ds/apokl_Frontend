import Artist from "../../components/Creators/artist"
import { useRouter } from 'next/router'
import Layout from "../../hocs/Layout"
import { Grid } from "@mui/material"

import VariousStyles from "../../styles/Various.module.scss"

import CarouselCollection from "../../components/Collections/carouselCollection";
import GetNFTsBackend from "../../components/NFT/getNFTsBackend";

const Creator = () => {
    const router = useRouter()
	const name = router.query.name

    return(
        <Layout>
            <Grid container direction="column" justifyContent="space-around">
                <Grid 
                    item
                    height="40vh"
                    sx={{mt:10,mx:{xs:"5%",sm:"10%",md:"25%",lg:"30%"},
                        width:{xs:"90%",sm:"80%",md:"50%",lg:"40%"}}}                    
                    >
                    <Artist name={name} />
                </Grid>
                <Grid 
                    item 
                    sx={{my:15}}
                    className={VariousStyles.separatorGradient}>
                </Grid>
                <Grid item
                    textAlign="center">
                    <h1> Collections created by {name} </h1>  
                    <CarouselCollection creator={name} />
                </Grid>
                <Grid 
                    item 
                    sx={{my:20, mx:"30%"}}
                    className={VariousStyles.separator40}
                    >
                </Grid>
                <Grid item 
                    sx={{ px:{xs:1, md:5, lg:10}}}
                    textAlign="center">
                    <h1> NFT created by {name} </h1>
                    <GetNFTsBackend creatorName={name}  />
                </Grid>
            </Grid>
        </Layout>
        
    )

}

export default Creator;