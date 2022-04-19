import React, { useEffect, useState } from "react";
import axios from "axios";

import CardNft from "../../components/NFT/cardNft";
import Creatorstyles from '../../styles/Creator.module.scss';

import { ethers } from 'ethers'
import Web3Modal from "web3modal"

import Layout from '../../hocs/Layout';

import {marketplaceAddress} from '../../../config'
import NFTMarketplace  from '../../../artifacts/contracts/NFTMarket.sol/NFTMarketplace.json'

import FormStyles from "../../styles/Form.module.scss"

import { Grid,Container, Typography,ListItemText } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

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

export default function Nfts() {
  const [tags, setTags] = useState([])
	const [nfts, setNfts] = useState([])
	const [creator, setCreator] = useState('')
	const [keywords, setKeywords] = useState('')
  const [loadingState, setLoadingState] = useState('not-loaded')

  useEffect(() => {
    loadNFTs()
  }, [])

  const handleTagsChange = (event) => {
		const {
			target: { value },
		} = event;
		setTags(
			typeof value === 'string' ? value.split(',') : value,
		);
	};

  async function loadNFTs() {
    /* create a generic provider and query for unsold market items */
    const provider = new ethers.providers.JsonRpcProvider()
    const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, provider)
    const data = await contract.fetchMarketItems()

    /*
    *  map over items returned from smart contract and format 
    *  them as well as fetch their token metadata
    */
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await contract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        creatorRoyaltiesRate : i.creatorRoyaltiesRate.toString(),
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        creator: meta.data.creator,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
        slug: meta.data.slug
      }
      return item
    }))
    setNfts(items)
    setLoadingState('loaded') 
  }
  async function buyNft(nft) {
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)

    /* user will be prompted to pay the asking proces to complete the transaction */
    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')   
    const transaction = await contract.createMarketSale(nft.tokenId, {
      value: price
    })
    await transaction.wait()
    loadNFTs()
  }
  async function setAlert(msg){
    alert(msg)
  }

  if (loadingState === 'loaded' && !nfts.length) {
    return (
    <Layout>
      <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>
    </Layout>)
  } else { 
    return(
    <Layout>
      			<Grid 
				container 
				className={Creatorstyles.accueil} 
				id="accueil" 
				sx={{ py:5 }} 
				color="white"
				direction="column"
				alignItems="center"
				justifyContent="center">

					<Typography vairant="h3">NFT Collections</Typography>

					<Grid container sx={{mt:4, mb:3}} justifyContent='space-around' alignItems='center'>

						<FormControl sx={{width:{ xs: '80%', md: '25%'}}}>
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

						<FormControl sx={{width:{ xs: '80%', md: '25%' }}}> 
						<TextField
							margin="dense"
							variant="outlined"
							sx={{ background:'white', borderRadius:2 }}
							id="creator"
							label="Collection creator"
							name="creator"
							onChange={e => setCreator( e.target.value )}/>                      
					</FormControl>

					<FormControl sx={{width:{ xs: '80%', md: '25%' }}}>   
						<TextField
							margin="dense"
							variant="outlined"
							sx={{ background:'white', borderRadius:2 }}
							id="Keywords"
							label="Keywords"
							name="Keywords"
							onChange={e => setKeywords( e.target.value)}/>     
					</FormControl>  
				</Grid>
				<button className={FormStyles.formButton}  onClick={()=>getCollections()}>Search</button>
			</Grid>   
      <Grid container 
        justifyContent="space-between"
				direction='row'  
        sx={{px:6}}
				rowSpacing={10} 
        paddingTop={10}
				columnSpacing={{ sm: 2, md: 4 }} >
          {
            nfts.map((nft, i) => (
            <Grid item xs={12} md={4}>
              <CardNft key={i} 
                creator={nft.creator} 
                image={nft.image} 
                name={nft.name} 
                description={nft.description}
                price={nft.price}
                royalties={nft.creatorRoyaltiesRate}
                id={nft.id}
                />
                <Grid container direction="column" sx={{mt:2}} alignItems='center'>
                  <button className={FormStyles.formButton} onClick={() => buyNft(nft)}>Buy</button>
                </Grid>
              </Grid>
            ))
          }
    </Grid>  
    </Layout>
  )}
}

