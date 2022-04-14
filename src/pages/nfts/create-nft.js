import { useState, useContext } from 'react'
import { useRouter } from 'next/router'

import Layout from '../../hocs/Layout';
import AuthenticationContext from "../../../context/AuthenticationContext"; 
import withAuth from '../../hocs/WithAuth';

import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import Web3Modal from 'web3modal'

import {marketplaceAddress} from '../../../config'
import NFTMarketplace  from '../../../artifacts/contracts/NFTMarket.sol/NFTMarketplace.json'

import CardNft from '../../components/NFT/cardNft';
import FormStyles from "../../styles/Form.module.scss"

import Grid from "@mui/material/Grid";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import Slider from '@mui/material/Slider';
import Tooltip from '@mui/material/Tooltip';

import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';  


const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

const CreateItem = () => {
  const {user} = useContext(AuthenticationContext)
	const [fileUrl, setFileUrl] = useState(null)
  const [nbNft,setNbNft] = useState(1)
	const [formInput, updateFormInput] = useState({ price: '', name: '', description: '', slug:'', creator:'', royalties:0 })
	const router = useRouter()


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
			console.log('Error uploading file: ', error)
		}  
	}


	async function uploadToIPFS() {
    const { name, description, price, slug, creator } = formInput
    if (!name || !description || !price || !fileUrl || !slug || !creator) return
    /* first, upload metadata to IPFS */
    const data = JSON.stringify({
      name, description, slug, creator, image: fileUrl
    })
    try {
      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      /* after metadata is uploaded to IPFS, return the URL to use it in the transaction */
      return url
    } catch (error) {
    } 
  }

	async function listNFTForSale() {
    try{
    updateFormInput({ ...formInput, slug: user.username+formInput['name']+Date.now() })
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

  }catch{
  }}

  async function startSale() {
    let i = 0;
    while(i<nbNft){
      listNFTForSale();
      i++
    }
    if(i===nbNft){
    router.push('/nfts/')}
  }

	return (
		<Layout>      
      <Grid container direction='row'sx={{pt:7, alignContent: 'flex-start', justifyContent:'space-around'}} >
        <Grid item md={5} style={{height:'75vh'}}>
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
                onChange={e => updateFormInput({ ...formInput, name: e.target.value, creator: user.username })}/>                      
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
                 
                  <Grid container justifyContent="space-around" sx={{width: '80%',mt:'2%'}}> 
                    <Grid item xs={12} md={5}>  
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
                    <Grid item xs={12} md={5}> 
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
        <Grid item md={6} width='80%' sx={{ml:{md:2}, mt:{xs:5, md:0} }}>
          <CardNft 
            creator={user.username} 
            name={formInput.name} 
            image={fileUrl} 
            description={formInput.description} 
            price={formInput.price} 
            royalties={formInput.royalties} />
        </Grid>
      </Grid>
		</Layout>
  )
}

export default withAuth(CreateItem);