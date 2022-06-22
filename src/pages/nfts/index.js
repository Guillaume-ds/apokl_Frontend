import React, { useState } from "react";

import Layout from '../../hocs/Layout';
import GetNftsBackend from "../../components/NFT/getNftsBackend";
import SelectTags from "../../components/Actions/selectTags";
import Creatorstyles from '../../styles/Creator.module.scss';


import { Grid } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';



export default function Nfts() {
  const [tags, setTags] = useState([])
	const [nfts, setNfts] = useState([])
	const [creator, setCreator] = useState(null)
	const [keywords, setKeywords] = useState(null)
  const [loadingState, setLoadingState] = useState('not-loaded')

  

  if (loadingState === 'loaded' && !nfts.length) {
    return (
    <Layout>
      <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>
    </Layout>)
  } else { 
    return(
    <Layout>
			<Grid 
				container 
				className={Creatorstyles.accueil} 
				id="accueil" 
				sx={{ py:5 }} 
				color="white"
				direction="column"
				alignItems="center"
				justifyContent="center">

					<h1>NFT Marketplace</h1>

					<Grid container sx={{mt:4, mb:3}} justifyContent='space-around' >
						
						<Grid item sx={{width:{ xs: '80%', md: '20%' }}}>
							<SelectTags tags={tags} setTags={setTags} />
						</Grid>

						
						<FormControl sx={{width:{ xs: '80%', md: '70%' }}}> 
							<TextField
								margin="dense"
								variant="outlined"
								sx={{ background:'white', borderRadius:2, my:{xs:2,md:0} }}
								id="creator"
								label="Creator"
								name="creator"
								onChange={e => setCreator( e.target.value )}/>                      
						</FormControl>
 
				</Grid>
			</Grid> 
      <Grid container 
        justifyContent="space-around"
				direction='row'  
        sx={{px:{xs:1,sm:4,xl:6}, mt:10}}				
				 >  
      <GetNftsBackend tags={tags} creatorName={creator} price={1000} buyable={true}/> 
      </Grid>	
    </Layout>
  )}
}




