import React, {useState} from "react";

import Creatorstyles from '../../styles/Creator.module.scss';
import Formstyles from '../../styles/Form.module.scss';
import Collectionstyles from '../../styles/Collection.module.scss';
import SelectTags from "../../components/Actions/selectTags";

import GetCreator from "../../components/Creators/getCreator";

import { Grid, Typography } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Layout from '../../hocs/Layout';


export const getServerSideProps = async () => {
  return {
    props: {
      backend: process.env.BACKEND_URL,
    },
  };
};




const Creators = () => {

	const [tags, setTags] = useState([])
	const [name, setName] = useState('')
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

					<Typography vairant="h3">Creators</Typography>

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
			<GetCreator  tags={tags} creator={name}keywords={keywords}/>
			</Layout>
    )
}

export default Creators;