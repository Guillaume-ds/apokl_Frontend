import React, { useState,useContext } from 'react';
import Layout from '../../hocs/Layout';
import axios from 'axios';
import { useRouter } from 'next/router';
import AuthenticationContext from '../../../context/AuthenticationContext'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import Web3Modal from 'web3modal'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

import {
  nftaddress, nftmarketaddress
} from '../../../config'

import NFT from '../../../artifacts/contracts/NFT.sol/NFT.json'
import NFTMarketplace  from '../../../artifacts/contracts/NFTMarket.sol/NFTMarketplace.json'
import Grid from "@mui/material/Grid";
import {TailSpin as Loader} from 'react-loader-spinner';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';

const CreationForm = () => {
  const router = useRouter();

  const {user} = useContext(AuthenticationContext)
  

  const [creator, setCreator] = useState('Anonymous Creator');
  const [title, setTitle] = useState('');
  const [photo_main, setPhoto_main] = useState(null);
  const [description, setDescription] = useState('');
  const [sale_type, setSale_type] = useState('Auction');
  const [blockchain, setBlockchain] = useState('');
  const [price, setPrice] = useState('');
  const [rarity, setRarity] = useState('');

  const onTitleChange = e => setTitle(e.target.value);
  const onFileChange = e => setPhoto_main(e.target.files[0]);
  const onDescriptionChange = e => setDescription(e.target.value);
  const onSaleChange = e => setSale_type(e.target.value);
  const onBlockchainChange = e => setBlockchain(e.target.value);
  const onPriceChange = e => setPrice(e.target.value);
  const onRarityChange = e => setRarity(e.target.value); 

  const [loading, setLoading] = useState(false);

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }


	const handleSubmit = async e => {
    const csrftoken = getCookie('csrftoken');
    e.preventDefault();
      const config = {
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data',
              'X-CSRFToken':csrftoken
          }
      };

      const slug = creator+title+Date.now()

      const formData = new FormData();
      formData.append('title', title);
      formData.append('slug', slug);
      formData.append('creator', 'Artiste Anonyme');
      formData.append('description', description);
      formData.append('sale_type', sale_type);
      formData.append('blockchain', blockchain);
      formData.append('price', price);
      formData.append('rarity', rarity);
      formData.append('photo_main', photo_main);

      const body = formData;
      const URL = 'http://localhost:8000/nfts/'
      axios
        .post(URL, formData, config)
        .then((res) => {
          router.push(`http://localhost:3000/nfts/${slug}`);
        })
        .catch((err) =>{ 
          console.log(err);
          setLoading(false)})};
  
  if(!user){return <Layout>You have to be logged in</Layout>}
	return (
    
    <Layout>
      <Grid container direction="column" justifyContent="center" alignItems="center">
        <form>
          <FormControl fullWidth sx={{ mt: 10 }}> 
              <TextField
              margin="dense"
              variant="outlined"
              required
              fullWidth
              id="title"
              label="Post Title"
              name="title"
              autoComplete="title"
              onChange={onTitleChange}/>                      
          </FormControl>

          <FormControl fullWidth sx={{ mt: 1 }} >   
            <TextField
              margin="dense"
              variant="outlined"
              required
              fullWidth
              id="description"
              label="description"
              name="description"
              autoComplete="description"
              onChange={onDescriptionChange}
              multiline
              rows={4}/>     
          </FormControl>
          <Grid container justifyContent="center" alignItems="center" direction='row'>
            <Grid item xs={5}>   
              <FormControl fullWidth sx={{ mt: 1}} >                   
                <InputLabel id="sale-select-label" >Sale type</InputLabel>
                <Select
                  labelId="sale-select-label"
                  id="sale-select"
                  label="sale_type"
                  onChange={onSaleChange}>
                  <MenuItem value={"Auction"}>Auction</MenuItem>
                  <MenuItem value={"Fixed price"}>Fixed price</MenuItem>
                </Select>
              </FormControl> 
            </Grid>  
            <Grid item xs={2}></Grid>
            <Grid item xs={5}>  
              <FormControl fullWidth sx={{ mt: 1}} > 
                <InputLabel id="blockchain-select-label" >Blockchain</InputLabel>
                <Select                 
                  labelId="blockchain-select-label"
                  id="blockchain"
                  label="blockchain"
                  onChange={onBlockchainChange}>
                  <MenuItem value={"Ethereum"}>Ethereum</MenuItem>
                  <MenuItem value={"Polygon"}>Polygon</MenuItem>
                </Select>
              </FormControl> 
            </Grid> 
          </Grid>
          <Grid container justifyContent="center" alignItems="center" direction='row'>
            <Grid item xs={5}>   
              <FormControl fullWidth sx={{ mt: 1}} >
                <InputLabel >Rarity</InputLabel>
                <OutlinedInput
                  type="number"
                  id="rarity"
                  name="rarity"
                  label="rarity"
                  onChange={onRarityChange}/>
              </FormControl>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={5}>   
              <FormControl fullWidth sx={{ mt: 1}} >
                <InputLabel >Price</InputLabel>
                <OutlinedInput
                  type="number"
                  onChange={onPriceChange}
                  id="price"
                  name="price"
                  label="price"
                />
              </FormControl> 
            </Grid>   
          </Grid> 
          <Grid item container direction="column" justifyContent="center" alignItems="center" sx={{mt:2}}>  
            <Button
              sx={{mt:2}}
              variant="outlined"
              component="label">
              Upload Image
              <input
              hidden
                accept="image/*"
                id="post-image"
                onChange={onFileChange}
                name="image"
                type="file"
                />
            </Button>
            <Button
              sx={{mt:2}}
              variant="outlined"
              component="label">
              Upload Image2
            </Button>
          </Grid>
          <Grid item sx={{my:2}} container direction="column" justifyContent="center" alignItems="center">           
            {loading ?                  
              <Loader
                  type="Oval"
                  color="#004491"
                  height={50}
                  width={50}/>
                      : 
              <Button type="submit" onClick={handleSubmit} variant="outlined" sx={{mt:2}}>Create</Button>
            }
          </Grid>
        </form>
      </Grid>  
      </Layout>
	);
}




export default function CreateItem() {
	const [fileUrl, setFileUrl] = useState(null)
	const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
	const router = useRouter()

	async function onChange(e) {
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

	async function createMarket() {
		const { name, description, price } = formInput
		if (!name || !description || !price || !fileUrl) return
		/* first, upload to IPFS */
		const data = JSON.stringify({
			name, description, image: fileUrl
		})
		try {
			const added = await client.add(data)
			const url = `https://ipfs.infura.io/ipfs/${added.path}`
			/* after file is uploaded to IPFS, pass the URL to save it on Polygon */
			createSale(url)
		} catch (error) {
			console.log('Error uploading file: ', error)
		}  
	}

	async function createSale(url) {
		const web3Modal = new Web3Modal()
		const connection = await web3Modal.connect()
		const provider = new ethers.providers.Web3Provider(connection)    
		const signer = provider.getSigner()

		/* next, create the item */
		let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
		let transaction = await contract.createToken(url)
		let tx = await transaction.wait()
		let event = tx.events[0]
		let value = event.args[2]
		let tokenId = value.toNumber()
		const price = ethers.utils.parseUnits(formInput.price, 'ether')

		/* then list the item for sale on the marketplace */
		contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
		let listingPrice = await contract.getListingPrice()
		listingPrice = listingPrice.toString()

		transaction = await contract.createMarketItem(nftaddress, tokenId, price, { value: listingPrice })
		await transaction.wait()
		router.push('/')
	}

	return (
    <Layout>
    <div>
      <div>
        <input 
          placeholder="Asset Name"
          onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
        />
        <textarea
          placeholder="Asset Description"
          
          onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
        />
        <input
          placeholder="Asset Price in Eth"
          onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
        />
        <input
          type="file"
          name="Asset"
          onChange={onChange}
        />
        {
          fileUrl && (
            <img width="350" src={fileUrl} />
          )
        }
        <button onClick={createMarket}>
          Create Digital Asset
        </button>
      </div>
    </div>
    </Layout>
  )

}
