import React, {useState, useContext} from "react";
import axios from "axios";
import Layout from '../../hocs/Layout';

import AuthenticationContext from '../../../context/AuthenticationContext';
import WithAuth from "../../hocs/WithAuth";
import SelectCreatedNfts from "../../components/NFT/selectCreatedNfts";
import SelectTags from "../../components/Actions/selectTags";

import FormStyles from "../../styles/Form.module.scss";

import { Grid, Snackbar } from "@mui/material";
import Alert from '@mui/material/Alert';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';





const CreateCollection = () => {
    const {accessToken, creator} = useContext(AuthenticationContext)
    const [formInput, updateFormInput] = useState({ name: '', description: '', nfts:[] })    
    const [picture, setPicture] = useState(null);
		const [tags, setTags] = useState([]);
		const [collectionNftsIds, setCollectionNftsIds] = useState([]);
    const [msg,setMsg] = useState({content:"",open:false,severity:"error",color:"red"})


    const handleClose = e => {
      setMsg({...msg, content:'',open:false,severity:"error"})
    }
    const onPictureChange = e => setPicture(e.target.files[0]);

    const handleSubmit = async e =>{
      e.preventDefault();
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
      const slug = creator.name+formInput['name']+Date.now()
			
			const config = {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + accessToken,
				}
			}

      const body = {
        'creator' : creator.name,
        'slug':slug,
        'name': formInput['name'],
        'tags':collectionTags,
        'nfts_array':collectionNftsIds
      }
      

      const config2 = {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'multipart/form-data'
				}
			}

      const formData = new FormData();  
      formData.append('picture', picture);
      formData.append('slug',slug);

      const URL_create = 'http://127.0.0.1:8000/collections/';
      const URL_picture = 'http://127.0.0.1:8000/api/creators/update-collection';
      try{
        const cre = await axios.post(URL_create,body,config)
        const pic = await axios.put(URL_picture,formData,config2)
			
        setMsg({...msg, content:'Collection created',open:true,severity:"success",color:"#fafafa"})

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
            <SelectTags tags={tags} setTags={setTags}/>
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
          <SelectCreatedNfts setCollectionNftsIds={setCollectionNftsIds} collectionNftsIds={collectionNftsIds} creator={creator.name}/>
          </div>
        </div>
      </Grid>
    </Layout>
  )}

export default WithAuth(CreateCollection);