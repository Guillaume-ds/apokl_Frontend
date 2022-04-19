import React, { useState,useContext, useEffect} from "react";

import { useRouter } from 'next/router'
import axios from "axios";

import Layout from '../../../hocs/Layout';
import AuthenticationContext from '../../../../context/AuthenticationContext';

import Collectionstyles from '../../../styles/Collection.module.scss';
import ContentCollection from "../../../components/Collections/contentCollection";
import EditCollection from "../../../components/Collections/editCollection";
import ActionsCollection from "../../../components/Collections/actionsCollection";

import AccountIcon from '@material-ui/icons/AccountCircle';


import { Grid, Snackbar } from "@mui/material";
import Alert from '@mui/material/Alert';

import { ethers } from 'ethers'
import Web3Modal from "web3modal"

import {marketplaceAddress} from '../../../../config'
import NFTMarketplace  from '../../../../artifacts/contracts/NFTMarket.sol/NFTMarketplace.json'


const Collection = ({collection}) => {
	const router = useRouter()
	const { creator } = router.query
	const {user} = useContext(AuthenticationContext)
	const [msg,setMsg] = useState({content:"",open:false,severity:"error",color:"red"})
	const [access, setAccess] = useState(false)
	const [edit, setEdit] = useState(false)
	var [isCreator, setIsCreator] = useState(false)
	const [ownedNftsId, setOwnedNftsId] = useState([])
 
	useEffect(()=>{
		if(user){
			if(user.username === creator){
				setIsCreator(true)
			}
		}
	})
	
	console.log(collection,'collection')

  async function verifyAccess() {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    })

    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const marketplaceContract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
    const data = await marketplaceContract.fetchMyNFTs()

		try{
			data.map(array => setOwnedNftsId(ownedNftsId.push(array.tokenId.toString())))
			const ownsNft = collection.results[0].nfts.some(item => ownedNftsId.includes(item))
			{ownsNft?
				setMsg({...msg, content:'You can access the collection',open:true,severity:"success",color:"blue"})
				:
				setMsg({...msg, content:'You cannot access the collection',open:true,severity:"error",color:"red"})
			}		
			setAccess(ownsNft)
		}catch{}		
  }

	const handleClose = e => {
	  setMsg({...msg, content:'',open:false,severity:"error"})
  }

	const editCollection = () =>{
		setEdit(!edit)
	}

  if(collection.results[0].picture){
    var styling = {
      backgroundImage: `url('${collection.results[0].picture}')`,
	  	objectFit: 'fill',
      backgroundPosition:'center'
      } 
    }else{  
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

			<div className={Collectionstyles.header} >
				<div className={Collectionstyles.overlay}  style={styling}>
					<h1 className={Collectionstyles.collectionTitle}>{collection.results[0].name}</h1>															
				</div>
				<Grid container direction="row" sx={{mb:1, px:10}} alignItems='center' justifyContent='space-around'>
					<Grid item>
						<Grid container direction="row" sx={{mb:1}} alignItems='center'>
							<AccountIcon fontSize='large' className={Collectionstyles.userIcon} onClick={()=>router.push(`http://localhost:3000/creators/${creator}`)}/>
							<Grid item direction="column" sx={{ml:1}}>
								<p className={Collectionstyles.userInfo} >Created by</p>
								<p>{creator}</p>
							</Grid>
							</Grid>
						</Grid>
					<Grid item>
						{!user ?
							<Grid container direction="row" alignItems='center' justifyContent='center'>
								<p className={Collectionstyles.button} onClick={()=>router.push(`http://localhost:3000/account/login`)}>Please log in to check access</p>
							</Grid>	
							:
							null
						}						
						{(user && !isCreator)?
							<Grid container direction="row" alignItems='center' justifyContent='center'>
								<input hidden type="checkbox" id="btnControl"  onClick={()=>verifyAccess()} />
								<label className={Collectionstyles.button} for="btnControl">Check access</label>
							</Grid>
							:
							null					
						}
						{(user && isCreator)?
							<Grid container direction="row" alignItems='center' justifyContent='center'>
								<input hidden type="checkbox" id="btnControl"  onClick={()=>editCollection()} />
								<label className={Collectionstyles.button} for="btnControl">
									{!edit?
									"Edit collection":"View collection"}
								</label>
							</Grid>
							:
							null
						}
					</Grid>
				</Grid>
			</div>
			
			{
				(edit && isCreator) ?
				<EditCollection collection={collection.results[0]} />
				:
				<>
				<ActionsCollection collection={collection.results[0]} />
				<ContentCollection collection={collection.results[0]} access={true} />
				</>
			}
			
		</Layout>)}
		


export default Collection;

export async function getServerSideProps({ query: {creator,collection} }){
	try {
    const {data} = await axios.get(`http://127.0.0.1:8000/api/creators/${creator}/collections/${collection}`)
		console.log(data, 'collection')
    return {
			props : {
				collection : data
			}
    }
	} catch {
		return {
			props : {
				collection : {count:0}
			}
    }
	}
}

