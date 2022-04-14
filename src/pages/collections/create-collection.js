import React, {useState, useContext} from "react";
import axios from "axios";
import { getCookie } from 'cookies-next';
import Layout from '../../hocs/Layout';
import { useRouter } from 'next/router';

import AuthenticationContext from '../../../context/AuthenticationContext';
import withAuth from "../../hocs/WithAuth";
import CreatedNfts from "../../components/NFT/createdNfts";

import FormStyles from "../../styles/Form.module.scss";

import Grid from "@mui/material/Grid";
import {TailSpin as Loader} from 'react-loader-spinner';
import InputLabel from '@mui/material/InputLabel';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const tags = [
	'Music',
	'Artist',
	'Drawing',
	'Singing'
];


const CreateCollection = () => {
    const {user} = useContext(AuthenticationContext)
		const router = useRouter();
    const [formInput, updateFormInput] = useState({ name: '', description: '', nfts:[] })
    const [picture, setPicture] = useState(null);
		const [collectionTags, setCollectionTags] = useState([]);
		const [collectionNftsIds, setCollectionNftsIds] = useState([]);

		const handleTagsChange = (event) => {
			const {
				target: { value },
			} = event;
			setCollectionTags(
				typeof value === 'string' ? value.split(',') : value,
			);
		};

    const onPictureChange = e => setPicture(e.target.files[0]);

    const handleSubmit = async e => {
			e.preventDefault();

			const getRefreshToken = getCookie("refresh");
			const config1 = {
				headers: {
					'Content-Type': 'application/json'
				}
			}
			const body1 = {
				"refresh":getRefreshToken
			}
			
			const {data:access} = await axios.post('http://localhost:8000/api/token/refresh/', body1, config1)
			const accessToken = access.access
			
			const config2 = {
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
      axios
        .post(URL, formData, config2)
        .then((res) => {
          console.log(res)
					router.push(`http://localhost:3000/collections/${res.data.creator}/${res.data.slug}`)
        })
        .catch((err) =>{ 
          console.log(err);})
			}


    
    return(
    <Layout>
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
                  >
                    {tag}
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
              <LibraryAddCheckIcon sx={{ width:'100%'}} style={{color:"#004491"}}/>
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

export default withAuth(CreateCollection);