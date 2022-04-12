import React, {useState} from "react";
import axios from "axios";
import { useRouter } from 'next/router';

import GetCollection from "../../components/Collections/getCollections";


import Creatorstyles from '../../styles/Creator.module.scss';
import Formstyles from '../../styles/Form.module.scss';

import { Grid, Typography,ListItemText } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Layout from '../../hocs/Layout';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';


const MenuProps = {
  PaperProps: {
    style: {
		width:70,
    },
  },
};

const listTags = [
	'Music',
	'Artist',
	'Drawing',
	'Singing',
	'Sport',
	'Design'
];


const Collections = () => {
	const router = useRouter();
	const [tags, setTags] = useState([])
	const [nfts, setNfts] = useState([])
	const [creator, setCreator] = useState('')
	const [keywords, setKeywords] = useState('')
  const [collections, setCollections] = useState([])
	const [renderCollection, setRenderCollection] = useState(false)

	const handleTagsChange = (event) => {
		const {
			target: { value },
		} = event;
		setTags(
			typeof value === 'string' ? value.split(',') : value,
		);
	};
 
	const getCollections = async() => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		const body = {
				"tags":tags,
				"nfts":[],
				"creator":creator,
				"keywords":keywords
		}

		const collectionsReceived = await axios.post("http://localhost:8000/api/creators/search-collection", body, config )
		setCollections(collectionsReceived.data)
		console.log(collectionsReceived.data)
	}



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

						<FormControl sx={{width:{ xs: '80%', md: '25%'}}}>
							<InputLabel id="demo-multiple-chip-label" >Tags</InputLabel>
							<Select
								labelId="demo-multiple-chip-label"
								id="demo-multiple-chip"
								multiple
								direction="column"
								sx={{ background:'white', borderRadius:2 }}
								value={tags}
								className={Formstyles.multiSelect}
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
				<button className={Formstyles.formButton}  onClick={()=>getCollections()}>Search</button>
			</Grid>
			<GetCollection tags={tags} nfts={nfts} creator={creator} keywords={keywords} />
			</Layout>
    )
}

export default Collections;