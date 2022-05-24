import React, {useState,useContext} from "react";
import axios from "axios";

import AuthenticationContext from '../../../context/AuthenticationContext';
import withAuth from '../../hocs/withAuth';

import Collectionstyles from '../../styles/Collection.module.scss';
import FormStyles from "../../styles/Form.module.scss";
import ButtonStyles from "../../styles/Button.module.scss";



import { Grid, Snackbar } from "@mui/material";
import Alert from '@mui/material/Alert';
import {TailSpin as Loader} from 'react-loader-spinner';
import InputLabel from '@mui/material/InputLabel';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';



const PostComment = ({collection,access,post,setLoaded}) => {	
	const {accessToken,creator} = useContext(AuthenticationContext)
	
	const [content, updateContent] = useState({  content: ''}) 	

	const createComment = async e => {
		e.preventDefault();
		
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + accessToken
			}
		}

		const body = {
			"creator":creator.id,
			"content":content,
			"post":post,
			"access":String(access),
			"collection":collection
		}

		const URL = `http://localhost:8000/comments/`;
		const res = await axios.post(URL, body, config)
		setLoaded(false)
		updateContent('')
	}

	return(


		<Grid container sx={{mt:4}} justifyContent='space-around' alignItems="center" direction="row">
		<FormControl sx={{mt: 1, width:'90%'}} >   
			<TextField
			margin="dense"
			variant="outlined"
			required
			fullWidth
			id="content"
			label="content"
			name="content"
			onChange={e => updateContent(e.target.value)}
			multiline
			rows={2}
			/>     
		</FormControl>   
		<SendIcon className={ButtonStyles.buttonIcon} onClick={createComment}/>      
      </Grid>				

		)
}

export default withAuth(PostComment);
