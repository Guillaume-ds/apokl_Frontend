import React, {useState, useContext} from "react";
import axios from "axios";
import Layout from '../../hocs/Layout';
import { useRouter } from 'next/router';

import AuthenticationContext from '../../../context/AuthenticationContext';
import WithAuth from "../../hocs/WithAuth";
import CreatedNfts from "../../components/NFT/createdNfts";

import FormStyles from "../../styles/Form.module.scss";

import { Grid, Snackbar } from "@mui/material";
import Alert from '@mui/material/Alert';
import {TailSpin as Loader} from 'react-loader-spinner';
import InputLabel from '@mui/material/InputLabel';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight:'35%',
      width: 100,
      overflow:'auto'
    },
  },
};

const tags = [
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


const CreateCollection = () => {
    const {user, accessToken} = useContext(AuthenticationContext)
		const router = useRouter();
    const [formInput, updateFormInput] = useState({ name: '', description: '', nfts:[] })    
    const [picture, setPicture] = useState(null);
		const [collectionTags, setCollectionTags] = useState([]);
		const [collectionNftsIds, setCollectionNftsIds] = useState([]);
    const [msg,setMsg] = useState({content:"",open:false,severity:"error",color:"red"})

		const handleTagsChange = (event) => {
			const {
				target: { value },
			} = event;
			setCollectionTags(
				typeof value === 'string' ? value.split(',') : value,
			);
		};
    const handleClose = e => {
      setMsg({...msg, content:'',open:false,severity:"error"})
    }
    const onPictureChange = e => setPicture(e.target.files[0]);

    const handleSubmit = async e =>{
      e.preventDefault();
      console.log('je me lance')
      if(formInput['name']===''){
        setMsg({...msg, content:'Please enter a valid name',open:true,severity:"error"})
      }else if(formInput['description']===''){
        setMsg({...msg, content:'Please add a description',open:true,severity:"error"})
      }else if(collectionNftsIds.length===0){
        setMsg({...msg, content:'Please add nfts to the collection',open:true,severity:"error"})
      }else if(collectionTags.length===0){
        setMsg({...msg, content:'Please add tags to the collection',open:true,severity:"error"})
      }else if(picture===null){
        setMsg({...msg, content:'Please add a picture',open:true,severity:"error"})
      }else{
        createCollection(e)
      }
    }

    const createCollection = async e => {
			e.preventDefault();
			
			const config = {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'multipart/form-data'
				}
			}

      const formData = new FormData();      
      formData.append('creator', user.username);
      formData.append('slug', user.username+formInput['name']+Date.now());
      formData.append('name', formInput['name']);
      formData.append('description', formInput['description']);
      formData.append('tags', collectionTags);
      formData.append('nfts', collectionNftsIds);
      formData.append('picture', picture);

      const URL = 'http://127.0.0.1:8000/api/creators/create-collection';
      try{
        axios
        .post(URL, formData, config)
        .then((res) => {				
          setMsg({...msg, content:'Collection created',open:true,severity:"success",color:"#fafafa"})
          /*router.push(`http://localhost:3000/collections/${res.data.creator}/${res.data.slug}`)*/
        })
      }catch{
        setMsg({...msg, content:'Error',open:true,severity:"error"})
      }
			}

    
    return(
    <Layout>
      <Snackbar
			anchorOrigin = {{ vertical: 'bottom', horizontal:'center' }}			
			open = {msg.open}
			onClose = {handleClose}
			autoHideDuration={6000}
			key = {'bottom_center'}>
				<Alert severity={msg.severity} style={{color:msg.color, background:"#004491"}} >{msg.content}</Alert>
			</Snackbar>
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
                id="name"
                label="Collection Name"
                name="name"
                onChange={e => updateFormInput({ ...formInput, name: e.target.value })}/>                      
            </FormControl>
            <FormControl sx={{mt: 1, width:'80%'}} >   
              <TextField
                margin="dense"
                variant="outlined"
                required
                fullWidth
                id="Description"
                label="Description"
                name="Description"
                onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
                multiline
                rows={4}/>     
            </FormControl>  
            <Grid sx={{mt: 1, width:'80%'}} container direction="row" justifyContent="space-around" alignItems="center">
              <FormControl sx={{width:'45%'}}>
                <InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  
                  value={collectionTags}
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
                  
                {tags.map((tag) => (
                    <MenuItem
                      key={tag}
                      value={tag}
                      className={FormStyles.multiSelect} 
                    >
                      <Checkbox checked={collectionTags.indexOf(tag) > -1} />
                      <ListItemText primary={tag} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
                <Grid sx={{ width:'100%'}}>
                  <LibraryAddCheckIcon sx={{ width:'100%'}} style={{color:"#004491"}}/>
                </Grid>
              }
              </FormControl> 
            </Grid>
            <Grid item sx={{my:5}}>
              <button className={FormStyles.formButton} onClick={handleSubmit}>
                Create collection
              </button>
            </Grid>
          <CreatedNfts setCollectionNftsIds={setCollectionNftsIds} collectionNftsIds={collectionNftsIds}/>
          </div>
        </div>
      </Grid>
    </Layout>
  )}

export default WithAuth(CreateCollection);