import React, {useState,useContext} from "react";
import axios from "axios";

import AuthenticationContext from '../../../../context/AuthenticationContext';
import withAuth from '../../../hocs/withAuth';

import PostStyles from "../../../styles/Post.module.scss";
import ButtonStyles from "../../../styles/Button.module.scss";

import { Grid, Snackbar } from "@mui/material";
import Alert from '@mui/material/Alert';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';



const PostComment = ({collection,access,post,setLoaded}) => {	
	const {accessToken,creator} = useContext(AuthenticationContext)
	const [msg,setMsg] = useState({content:"",open:false,severity:"error",color:"red"})
	const [content, updateContent] = useState('') 	

	const handleClose = e => {
		setMsg({...msg, content:'',open:false,severity:"success"})
	  }

	const submitCreateComment = async e =>{
		e.preventDefault();
		const cre = await createComment(e);
	}

	const createComment = async e => {
		if(content===undefined || content==="" ){
			setMsg({...msg, content:'Please write some content',open:true,severity:"error"})
		}else{
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
	}

	return(

		<Grid container sx={{mt:5,mb:7}} justifyContent='space-between' alignItems="center" direction="row">

			<Snackbar
				anchorOrigin = {{ vertical: 'bottom', horizontal:'center' }}			
				open = {msg.open}
				onClose = {handleClose}
				autoHideDuration={6000}
				key = {'bottom_center'}>
					<Alert severity={msg.severity} style={{color:msg.color, background:"#004491"}} >{msg.content}</Alert>
			</Snackbar> 
		
		<FormControl sx={{mt: 1, width:'80%'}} > 
			<form onSubmit={submitCreateComment} >
				<TextField
				margin="dense"
				variant="standard"
				fullWidth
				id="content"
				label=". Comment"
				name="content"
				onChange={e => updateContent(e.target.value)}
				rows={2}
				className={PostStyles.commentField}
				/>   
			</form>   
		</FormControl > 
		<SendIcon className={ButtonStyles.buttonIcon} onClick={createComment} sx={{mt: 2, pr:{xs:2,sm:5,md:10,lg:15} }}/>      
      </Grid>				

		)
}

export default withAuth(PostComment);
