import React, { useState } from "react";

import Layout from '../../hocs/Layout';
import GetNftsBackend from "../../components/NFT/getNftsBackend";
import Creatorstyles from '../../styles/Creator.module.scss';
import FormStyles from "../../styles/Form.module.scss";

import { Grid, Typography,ListItemText } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight:'35%',
      width: 'fit',
      overflow:'auto'
    },
  },
};

const listTags = [
  'Artist',
	'Music',	
	'Drawing',
  'Painting',
  'Singing',
  'Gaming',
	'Sports',
	'Social',
  'Food',
];

export default function Nfts() {
  const [tags, setTags] = useState([])
	const [nfts, setNfts] = useState([])
	const [creator, setCreator] = useState('')
	const [keywords, setKeywords] = useState('')
  const [loadingState, setLoadingState] = useState('not-loaded')

  const handleTagsChange = (event) => {
		const {
			target: { value },
		} = event;
		setTags(
			typeof value === 'string' ? value.split(',') : value,
		);
	};

  



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

					<Typography vairant="h3">NFT Collections</Typography>

					<Grid container sx={{mt:4, mb:3}} justifyContent='space-around' alignItems='center'>

						<FormControl sx={{width:{ xs: '80%', md: '25%'}}}>
							<InputLabel id="demo-multiple-chip-label" >Tags</InputLabel>
							<Select
								labelId="demo-multiple-chip-label"
								id="demo-multiple-chip"
								multiple
                autoWidth
								direction="column"
								sx={{ background:'white', borderRadius:2 }}
								value={tags}
								className={FormStyles.multiSelect}
								onChange={handleTagsChange}
								input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
								renderValue={(selected) => (
									<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
										{selected.map((value) => (
											<Chip key={value} label={value} />
										))}
									</Box>
								)}
								MenuProps={MenuProps}
							>
								
								{listTags.map((tag) => (
									<MenuItem key={tag} value={tag}>
										<Checkbox checked={tags.indexOf(tag) > -1}/>
										<ListItemText primary={tag} />
									</MenuItem>
								))}
								
							</Select>
						</FormControl>

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
				<button className={FormStyles.formButton}  onClick={()=>getCollections()}>Search</button>
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




