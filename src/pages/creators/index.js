import React, {useState} from "react";

import Creatorstyles from '../../styles/Creator.module.scss';

import SelectTags from "../../components/Actions/selectTags";
import GetCreator from "../../components/Creators/getCreator";

import { Grid } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Layout from '../../hocs/Layout';


const Creators = () => {

	const [tags, setTags] = useState([])
	const [creatorName, setCreator] = useState(null)
	const [keywords, setKeywords] = useState(null)
	
	function handleNameChange(e){
		e.preventDefault();
		if(e.target.value!=''){
			setName( e.target.value )
		}else if(e.target.value===''){
			setName( null )
		}
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

						<h1>Creators</h1>

					<Grid container sx={{mt:4, mb:3}} justifyContent='space-around' alignItems='center'>

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
				<GetCreator  tags={tags} creatorName={creatorName} keywords={keywords}/>
			</Layout>
    )
}

export default Creators;