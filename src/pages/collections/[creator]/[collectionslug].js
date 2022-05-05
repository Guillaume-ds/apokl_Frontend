import React, { useState,useContext, useEffect} from "react";

import { useRouter } from 'next/router'
import Image from 'next/image';
import axios from "axios";

import Layout from '../../../hocs/Layout';
import AuthenticationContext from '../../../../context/AuthenticationContext';

import Collectionstyles from '../../../styles/Collection.module.scss';
import ContentCollection from "../../../components/Collections/contentCollection";
import EditCollection from "../../../components/Collections/editCollection";
import CreatePostCollection from "../../../components/Collections/createPostCollection";
import CreateRoomCollection from "../../../components/Collections/CreateRoomCollection";

import AccountIcon from '@material-ui/icons/AccountCircle';
import {TailSpin as Loader} from 'react-loader-spinner';


import { Grid, Snackbar } from "@mui/material";
import Alert from '@mui/material/Alert';

import { ethers } from 'ethers'
import Web3Modal from "web3modal"

import {marketplaceAddress} from '../../../../config'
import NFTMarketplace  from '../../../../artifacts/contracts/NFTMarket.sol/NFTMarketplace.json'


const Collection = () => {
	const router = useRouter()
	const {creator,collectionslug} = router.query
	const {user} = useContext(AuthenticationContext)
	const [msg,setMsg] = useState({content:"",open:false,severity:"error",color:"red"})
	const [access, setAccess] = useState(false)
	const [edit, setEdit] = useState(false)
	const [collection,setCollection] = useState([])
	var [isCreator, setIsCreator] = useState(false)
	const [ownedNftsId, setOwnedNftsId] = useState([])

	const fetchCollection = async() => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		const body = {
			"creator":creator,
			"slug":collectionslug
		}
		try{
			const collectionsReceived = await axios.post("http://localhost:8000/api/creators/search-collections", body, config )
			setCollection(collectionsReceived.data.results[0])
		}catch{

		}
		
	}
	console.log(collection,"la2")

	useEffect(()=>{
		fetchCollection()
	},[])
 
	useEffect(()=>{
		if(user){
			if(user.username === creator){
				setIsCreator(true)
			}
		}
	})	

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

  if(collection){
    var styling = {
      backgroundImage: `url('${collection.picture}')`,
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
					<h1 className={Collectionstyles.collectionTitle}>{collection.name}</h1>															
				</div>
				<Grid container direction="row" sx={{mb:2, px:10}} alignItems='center' justifyContent='space-around'>
					<Grid item>
						<Grid container direction="row" sx={{mb:1}} alignItems='center'>
						{
                collection.creator?
                <Image src={collection.creator.picture} width={40} height={40} className={Collectionstyles.collectionCreatorPicture}/> 
                :
                <AccountIcon fontSize='large' onClick={()=>router.push(`http://localhost:3000/creators/${collection.creator}`)}/>
              }
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
				<EditCollection collection={collection} />
				:
				null
			}
			{
				(!edit && isCreator) ?
				<>
				<CreateRoomCollection collection={collection} />
				<CreatePostCollection collection={collection} />			
				<ContentCollection collection={collection} access={true} />
				</>
				:
				null
			}
			{
				(!isCreator) ?
				<>
				<ContentCollection collection={collection} access={access} />
				</>
				:
				null
			}
			

			
		</Layout>)}
		
export default Collection;



