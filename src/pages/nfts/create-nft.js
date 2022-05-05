import { useState, useContext } from 'react'
import { useRouter } from 'next/router';
import axios from "axios";

import Layout from '../../hocs/Layout';
import AuthenticationContext from "../../../context/AuthenticationContext"; 
import WithAuth from '../../hocs/WithAuth';
import ActivateAccount from '../../components/Creators/activate.js';

import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import Web3Modal from 'web3modal'

import {marketplaceAddress} from '../../../config'
import NFTMarketplace  from '../../../artifacts/contracts/NFTMarket.sol/NFTMarketplace.json'

import CardNft from '../../components/NFT/cardNft';
import FormStyles from "../../styles/Form.module.scss"

import { Grid, Snackbar,ListItemText } from "@mui/material";
import Alert from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import Slider from '@mui/material/Slider';
import Tooltip from '@mui/material/Tooltip';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';  


const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight:'35%',
      width: 'fit',
      overflow:'auto'
    },
  },
};

const listTags = [
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

const CreateItem = () => {
  const {accessToken,creator} = useContext(AuthenticationContext)
	const [fileUrl, setFileUrl] = useState(null)
  const [nbNft,setNbNft] = useState(1)
  const [tags, setTags] = useState([])
	const [formInput, updateFormInput] = useState({ price: '', title: '', description: '', creator:'', royalties:0 })
  const [msg,setMsg] = useState({content:"",open:false,severity:"error",color:"red"})
  const [creationFail,setCreationFail] = useState(false)
	const router = useRouter()

  const handleClose = e => {
    setMsg({...msg, content:'',open:false,severity:"error"})
  }
  const handleTagsChange = (event) => {
		const {
			target: { value },
		} = event;
		setTags(
			typeof value === 'string' ? value.split(',') : value,
		);
	};

	async function onChange(e) {
		/* upload image to IPFS */
		const file = e.target.files[0]
		try {
			const added = await client.add(
				file,
				{
					progress: (prog) => console.log(`received: ${prog}`)
				}
			)
			const url = `https://ipfs.infura.io/ipfs/${added.path}`
			setFileUrl(url)
		} catch (error) {
		}  
	}

	async function uploadToIPFS() {
    
    const { title, description, price, creator } = formInput
    if (!title || !description || !price || !fileUrl || !creator) return
    /* first, upload metadata to IPFS */
    const data = JSON.stringify({
      title, description, creator, image: fileUrl
    })
    try {
      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      /* after metadata is uploaded to IPFS, return the URL to use it in the transaction */
      return url
    } catch (error) {
    } 
  }

  async function listNftBackend(tokenId){
    const config = {
			headers: {
				'Content-Type': 'application/json',
        'Authorization' : `Bearer ${accessToken}`
			}
		}
		const body = {
      "creator":creator.name,
      "tokenId":tokenId,
      "title":formInput.title,
      "content":formInput.description,
      "royalties":formInput.royalties,
      "tags":tags,
      "rarity":nbNft
      
  }
  console.log(body)
    axios.post("http://localhost:8000/nfts/", body, config )
  }

	async function listNFTForSale() {
    try{
    const url = await uploadToIPFS()
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    /* create the NFT */
    const price = ethers.utils.parseUnits(formInput.price, 'ether')
    const royalties = formInput.royalties
    let contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()
    const transaction = await contract.createToken(url, price, royalties, { value: listingPrice })
    const receipt = await transaction.wait()
    let tokenId = receipt['events'][0]['args']['tokenId']['_hex']
    tokenId = parseInt(tokenId,16)
    return tokenId
    }catch{
      setMsg({...msg, content:'Error occured while creating the NFT on blockchain',open:true,severity:"error", color:"#fafafa"})
      return 0
    }
  }

  async function startSale() {
    let i = 0;
    setCreationFail(false)
    while(i<nbNft){
      let tk  = await listNFTForSale();
      if(tk===0){
        setMsg({...msg, content:'Error occured',open:true,severity:"success", color:"#fafafa"})
        await setCreationFail(true)
        break
      }
      await listNftBackend(tk)
      i++
    }
    if(creationFail){
      setMsg({...msg, content:'Error occured',open:true,severity:"error", color:"#fafafa"})
    }else{
      setMsg({...msg, content:'NFT successfully created',open:true,severity:"success", color:"#fafafa"})
    }        
  }

  if(!creator){
    return(
      <div>
        Please activate your creator account 
        <ActivateAccount />
      </div>
    )
  }

	return (
		<Layout>
      <Snackbar
			anchorOrigin = {{ vertical: 'bottom', horizontal:'center' }}			
			open = {msg.open}
			onClose = {handleClose}
			autoHideDuration={6000}
			key = {'bottom_center'}>
				<Alert severity={msg.severity} style={{color:msg.color, background:"#004491"}} >{msg.content}</Alert>
			</Snackbar>      
      <Grid container direction={{xs:'column', md:'row'}} justifyContent='space-around' sx={{my:{md:10},pt:7}} >
        <Grid item xs={12} md={6} >
        <Grid container sx={{ justifyContent: 'center' }}>
        <div className={FormStyles.formCard}>
          <h1 className={FormStyles.formCardTitle}>Create a new NFT</h1>
          <div className={FormStyles.formCardContent}>
            <FormControl sx={{width: '80%', mt:'2%'}}> 
              <TextField
                margin="dense"
                variant="outlined"
                required
                id="title"
                label="NFT Title"
                name="title"
                onChange={e => updateFormInput({ ...formInput, title: e.target.value, creator: creator.name })}/>                      
            </FormControl>
            <FormControl sx={{width: '80%', mt:'2%'}} >   
              <TextField
                margin="dense"
                variant="outlined"
                required
                id="Description"
                label="Description"
                name="Description"
                onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
                multiline
                rows={4}/>     
            </FormControl> 
            <FormControl sx={{width: '80%', mt:'2%'}}>
							<InputLabel id="demo-multiple-chip-label" >Tags</InputLabel>
							<Select
								labelId="demo-multiple-chip-label"
								id="demo-multiple-chip"
								multiple
                autoWidth
								direction="column"
								sx={{ background:'white', borderRadius:2 }}
								value={tags}
								className={FormStyles.multiSelect}
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
 
                 
                  <Grid container justifyContent="space-around" sx={{width: '80%'}}> 
                    <Grid item xs={12} md={5} sx={{mt:{xs:3,md:2}}}>  
                    <FormControl >
                    <InputLabel >Price</InputLabel>
                      <OutlinedInput
                      label="NFT Title"
                        required
                        type="number"
                        id="Price"
                        name="Price"
                        onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
                      />  
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={5} sx={{mt:{xs:3,md:2}}}> 
                    <FormControl  >
                      <InputLabel >Number of NFT</InputLabel>
                      <OutlinedInput
                        required
                        type="number"
                        id="Number"
                        name="Number"
                        label="Number"
                        onChange={e => setNbNft(e.target.value)}
                      />   
                      </FormControl>
                    </Grid>
                  </Grid>             
                 
                <Tooltip title="How much you will earn from each transaction" placement="top" arrow>
                  <Typography variant="caption" display="inline" sx={{mt:3, mb:-1}} textAlign="left">
                    Royalties : <HelpOutlineIcon fontSize='small'  />
                  </Typography>
                </Tooltip>
                <Slider
                  sx={{width: '80%', mt: 1}}
                  aria-label="Royalties"
                  defaultValue={0}
                  onChange={e => updateFormInput({ ...formInput, royalties: e.target.value })}
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={0}
                  max={50}
                />
                { !fileUrl?
                <Grid item container direction="column" justifyContent="center" alignItems="center" sx={{my:'4vh'}}>  
                  <Button component="label" >
                   <CloudUploadIcon fontSize='small' sx={{mx:1}} style={{color:"rgb(0, 50, 150)"}}/>Upload Image
                    <input
                      hidden
                      accept="image/*"
                      id="post-image"
                      onChange={onChange}
                      name="image"
                      type="file"
                      />
                  </Button>
                </Grid>
                :
								<LibraryAddCheckIcon sx={{ width:'100%', my:4 }} style={{color:"#004491"}}/>
							}
                
                <button className={FormStyles.formButton} variant="contained" onClick={startSale} >
                  Create NFT
                </button>
          </div>
        </div>
        </Grid>
        </Grid>
        <Grid item md={6} sx={{ mt:{xs:10, md:0} }}>
          <Grid container sx={{ justifyContent: 'center', width:'100%'}}>
              <CardNft 
                creatorInfo={creator} 
                title={formInput.title} 
                image={fileUrl} 
                description={formInput.description} 
                price={formInput.price} 
                royalties={formInput.royalties} />

        </Grid>
        </Grid>
      </Grid>
      
		</Layout>
  )
}

export default WithAuth(CreateItem);