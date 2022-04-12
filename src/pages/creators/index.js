import React, {useState} from "react";
import axios from "axios";
import Image from "next/image";
import Creatorstyles from '../../styles/Creator.module.scss';
import Formstyles from '../../styles/Form.module.scss';
import Collectionstyles from '../../styles/Collection.module.scss';

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
import AccountIcon from '@material-ui/icons/AccountCircle'


export const getServerSideProps = async () => {
  return {
    props: {
      backend: process.env.BACKEND_URL,
    },
  };
};


const MenuProps = {
  PaperProps: {
    style: {
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


const Artists = ({backend}) => {

	const [tags, setTags] = useState([])
	const [name, setName] = useState('')
	const [keywords, setKeywords] = useState('')
  const [artists, setArtists] = useState([])

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
			"name":name,
			"keywords":keywords
	}

		const artistRecieved = await axios.post(`${backend}/api/creators/search-creator`, body, config )
		setArtists(artistRecieved.data)
		console.log(artistRecieved.data)
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

					<Typography vairant="h3">Creators</Typography>

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
							onChange={e => setName( e.target.value )}/>                      
					</FormControl>

					<FormControl sx={{width:{ xs: '80%', md: '25%' }}}>   
						<TextField
							margin="dense"
							variant="outlined"
							sx={{ background:'white', borderRadius:2 }}
							id="Keywords"
							label="Keywords"
							name="Keywords"
							onChange={e => setKeywords( e.target.value )}/>     
					</FormControl>  
				</Grid>
				<button className={Formstyles.formButton}  onClick={()=>getCollections()}>Search</button>
			</Grid>
			<Grid container direction='row' justifyContent='space-around' alignItems='center' sx={{p:7}} rowSpacing={10} columnSpacing={{ sm: 2, md: 6 }}>				
				{artists?
				artists.map((artist,i) => (
					<Grid item md={5} lg={4} xl={3} sx={{width:'100%'}} >
						<div className={Creatorstyles.creatorCard}>
							<div className={Creatorstyles.creatorCardHeader}>
								<div className={Creatorstyles.creatorCardOverlay}>											
								</div>
							</div>
							<div className={Creatorstyles.creatorCardImagePlaceholder}>
								{artist.picture?
											<Image className={Creatorstyles.creatorCardImage} src={artist.picture} width='100px' height='100px'/> :
											<AccountIcon fontSize="large" style={{ color: "white" }}/>}	
							</div>	
							<p className={Collectionstyles.description}>{artist.description}</p>
								tt 
						</div>
					</Grid>				
				)):null}				
			</Grid>
			</Layout>
    )
}

export default Artists;