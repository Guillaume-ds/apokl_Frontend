import React, {useState,useContext} from "react";
import axios from "axios";

import AuthenticationContext from '../../../context/AuthenticationContext';
import withAuth from '../../hocs/withAuth';

import { ethers } from 'ethers'
import Web3Modal from 'web3modal'

import {marketplaceAddress} from '../../../config'
import NFTMarketplace  from '../../../artifacts/contracts/NFTMarket.sol/NFTMarketplace.json';

import Collectionstyles from '../../styles/Collection.module.scss';
import FormStyles from "../../styles/Form.module.scss";

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import { Grid, Snackbar } from "@mui/material";
import Alert from '@mui/material/Alert';
import {TailSpin as Loader} from 'react-loader-spinner';
import InputLabel from '@mui/material/InputLabel';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';




const CreatePostCollection = ({collection}) => {	
	const {user, accessToken} = useContext(AuthenticationContext)
	const collectionNftIds = collection.nfts
	const [formInput, updateFormInput] = useState({ title: '', content: ''}) 
	const [picture, setPicture] = useState("");
	const onPictureChange = e => setPicture(e.target.files[0]);
	const [picture2, setPicture2] = useState("");
	const onPicture2Change = e => setPicture2(e.target.files[0]);
	

	const createPost = async e => {
		e.preventDefault();
		
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + accessToken,
				'Content-Type': 'multipart/form-data'
			}
		}

		const formData = new FormData();     
		formData.append('title', formInput['title']);
    formData.append('content', formInput['content']); 
		formData.append('creator', user.id);
		formData.append('collection',collection.id);
		formData.append('picture', picture);
		formData.append('picture2', picture2);
    console.log(formData);
		
		const URL = `http://localhost:8000/api/rooms/collection/create-post`;
		axios
			.post(URL, formData, config)
			.then((res) => {
				console.log(res)
				router.push(`http://localhost:3000/collections/${res.data.creator}/${res.data.slug}`)
			})
			.catch((err) =>{ 
				console.log(err);})
	}




	return(
		<div>
			<div className={Collectionstyles.description}>
				<h3>Posts</h3>
				<Grid container sx={{mt:10}} justifyContent='center' >
        <div className={FormStyles.formCard}>
        <h1 className={FormStyles.formCardTitle}>Create a new collection </h1>
        <div className={FormStyles.formCardContent}>
            <FormControl  sx={{mt: 4, width:'80%'}}> 
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
			</div>
		</div>
		)
}

export default withAuth(CreatePostCollection);