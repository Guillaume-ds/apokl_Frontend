import React, {useState,useContext,useEffect} from "react";
import axios from "axios";

import AuthenticationContext from '../../../../context/AuthenticationContext';
import withAuth from '../../../hocs/withAuth';

import FormStyles from "../../../styles/Form.module.scss";
import PostStyles from "../../../styles/Post.module.scss";


import { Grid, Snackbar } from "@mui/material";
import Alert from '@mui/material/Alert';
import {TailSpin as Loader} from 'react-loader-spinner';
import InputLabel from '@mui/material/InputLabel';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';




const CreatePostCollection = ({collection}) => {	
	const { accessToken,creator} = useContext(AuthenticationContext)
	const [formInput, updateFormInput] = useState({ title: '', content: ''}) 
	const [picture, setPicture] = useState("");
	const onPictureChange = e => setPicture(e.target.files[0]);
	const [picture2, setPicture2] = useState("");
	const onPicture2Change = e => setPicture2(e.target.files[0]);
  const [msg,setMsg] = useState({content:"",open:false,severity:"error",color:"#fafafa"})
	

  const handleClose = e => {
    setMsg({...msg, content:'',open:false,severity:"error"})
  }

	const createPost = async e => {				
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + accessToken
			}
		}
    const body = {
      "title":formInput['title'],
      "content":formInput['content'],
      "creator":creator.id,
      "collection":collection.id
    }
		const formData = new FormData();     
		formData.append('title', formInput['title']);
    formData.append('content', formInput['content']); 
		formData.append('creator', creator.id);
		formData.append('collection',collection.id);
    if(picture){
      formData.append('picture', picture);
    }
    if(picture2){
      formData.append('picture', picture2);
    }
		
		const URL = `http://localhost:8000/posts/`;
    try{
      const post = await axios.post(URL, body, config)   
      if(post.status===201){
        setMsg({...msg, content:'Post created',open:true,severity:"success"})
      }else{
        setMsg({...msg, content:'Error occured',open:false,severity:"error"})
      }

    }catch{
      setMsg({...msg, content:'Error occured',open:false,severity:"error"})
    }
	}

	return(
      <Grid 
        container
        justifyContent="center">
          <Snackbar
          anchorOrigin = {{ vertical: 'bottom', horizontal:'center' }}			
          open = {msg.open}
          onClose = {handleClose}
          autoHideDuration={6000}
          key = {'bottom_center'}>
            <Alert severity={msg.severity} style={{color:msg.color, background:"#004491"}} >{msg.content}</Alert>
          </Snackbar>
          <Grid item width={{xs:"100%",md:"70%"}}>
        <div className={PostStyles.post}>
          <h1 className={FormStyles.formCardTitle}>Create a new post</h1>
          <div className={FormStyles.formCardContent}>
              <FormControl  sx={{mt:4, width:'80%'}}> 
                <TextField
                  margin="dense"
                  variant="outlined"
                  required
                  fullWidth
                  id="title"
                  label="Post title"
                  name="title"
                  onChange={e => updateFormInput({ ...formInput, title: e.target.value })}/>                      
              </FormControl>
              <FormControl sx={{mt: 1, width:'80%'}} >   
                <TextField
                  margin="dense"
                  variant="outlined"
                  required
                  fullWidth
                  id="content"
                  label="content"
                  name="content"
                  value={formInput.content}
                  onChange={e => updateFormInput({ ...formInput, content: e.target.value })}
                  multiline
                  rows={4}/>     
              </FormControl>  
              <Grid sx={{mt: 1, width:'80%'}} container direction="row" justifyContent="space-around" alignItems="center">
                
                <FormControl sx={{ width:'45%'}}>
  
                { !picture? 
                  <Button
                    variant="contained"
                    component="label">
                    Upload Image
                    <input
                      hidden
                      accept="image/*"
                      id="post-image"
                      onChange={onPictureChange}
                      name="image"
                      type="file"
                      />
                  </Button>:
                  <LibraryAddCheckIcon sx={{ width:'100%'}} style={{color:"#004491"}}/>
                }
                </FormControl> 
                <FormControl sx={{ width:'45%'}}>
  
                { !picture2? 
                  <Button
                    variant="contained"
                    component="label">
                    Upload Image
                    <input
                      hidden
                      accept="image/*"
                      id="post-image"
                      onChange={onPicture2Change}
                      name="image"
                      type="file"
                      />
                  </Button>:
                  <LibraryAddCheckIcon sx={{ width:'100%'}} style={{color:"#004491"}}/>
                }
                </FormControl> 
              </Grid>
              <Grid item sx={{my:5}}>
                <button className={FormStyles.formButton} onClick={createPost}>
                  Create Post
                </button>
              </Grid>
            </div>
          </div>
          </Grid>    
      </Grid>
		)
}

export default withAuth(CreatePostCollection);
