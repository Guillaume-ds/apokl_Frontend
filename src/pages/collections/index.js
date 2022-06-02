import React, {useState} from "react";

import GetCollection from "../../components/Collections/getCollections";

import Creatorstyles from '../../styles/Creator.module.scss';

import SelectTags from "../../components/Actions/selectTags";

import { Grid, Typography } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Layout from '../../hocs/Layout';


const Collections = () => {

	const [tags, setTags] = useState([])
	const [nfts, setNfts] = useState([])
	const [creator, setCreator] = useState('')
	const [keywords, setKeywords] = useState('')
 
    return (
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

					<Typography vairant="h3">NFT Collections</Typography>

					<Grid container sx={{mt:4, mb:3}} justifyContent='space-around' alignItems='center'>

						<Grid item sx={{width:{ xs: '80%', md: '25%' }}}>
							<SelectTags tags={tags} setTags={setTags} />
						</Grid>

						<FormControl sx={{width:{ xs: '80%', md: '25%' }}}> 
						<TextField
							margin="dense"
							variant="outlined"
							sx={{ background:'white', borderRadius:2 }}
							id="creator"
							label="Collection creator"
							name="creator"
							onChange={e => setCreator( e.target.value )}/>                      
					</FormControl>

					<FormControl sx={{width:{ xs: '80%', md: '25%' }}}>   
						<TextField
							margin="dense"
							variant="outlined"
							sx={{ background:'white', borderRadius:2 }}
							id="Keywords"
							label="Keywords"
							name="Keywords"
							onChange={e => setKeywords( e.target.value)}/>     
					</FormControl>  
				</Grid>
			</Grid>
			<GetCollection tags={tags} nfts={nfts} creator={creator} keywords={keywords} ids={[]} />
			</Layout>
    )
}

export default Collections;