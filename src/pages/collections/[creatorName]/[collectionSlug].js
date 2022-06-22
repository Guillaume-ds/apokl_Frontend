import React, { useState,useContext, useEffect} from "react";

import { useRouter } from 'next/router'
import Image from 'next/image';

import Layout from '../../../hocs/Layout';
import AuthenticationContext from '../../../../context/AuthenticationContext';

import PresentationCollection from "../../../components/Collections/CollectionPage/presentationCollection";
import ContentCollection from "../../../components/Collections/CollectionPage/contentCollection";
import EditCollection from "../../../components/Collections/CollectionPage/editCollection";
import CreatorActions from "../../../components/Collections/CollectionPage/creatorActions";

import Collectionstyles from '../../../styles/Collection.module.scss';
import VariousStyles from '../../../styles/Various.module.scss';

import AccountIcon from '@material-ui/icons/AccountCircle';

import { Grid, Snackbar } from "@mui/material";
import Alert from '@mui/material/Alert';

import { getMyNftsIds } from "../../../components/NFT/functionNFT";
import { fetchCollection } from "../../../components/Collections/functionCollection";



const Collection = () => {
	const router = useRouter()
	const {creatorName,collectionSlug} = router.query
	const {user} = useContext(AuthenticationContext)
	const [msg,setMsg] = useState({content:"",open:false,severity:"error",color:"red"})
	const [access, setAccess] = useState(false)
	const [edit, setEdit] = useState(false)
	const [collection,setCollection] = useState(null)
	const [creatorInfo,setCreatorInfo] = useState({"name":"","picture":null})
	var [isCreator, setIsCreator] = useState(false)
	const [loaded,setLoaded] = useState(false)


	useEffect(()=>{
		if(!collection && !loaded){
			getCollection()
		}					
	})
 
	useEffect(()=>{
		if(user){
			if(user.username === creatorName){
				setIsCreator(true)
				setAccess(true)
			}
		}
	})	

	useEffect(()=>{
		if(collection && loaded && !isCreator){
			setAccessFunction()
		}					
	},[collection])

	async function getCollection(){
		const collectionRes = await fetchCollection(creatorName,collectionSlug)	
		setCollection(collectionRes)
		try{
			setCreatorInfo(collectionRes['creator'])
			setLoaded(true)
		}catch{
			setLoaded(true)
		}		
		
	}
	

  async function verifyAccess() {
		const ownedNftsId = await getMyNftsIds()
		const ownsNft = collection.nfts_array.some(item => ownedNftsId.includes(item))	
		return ownsNft
  }

	async function setAccessFunction(){
		const ownsNft = await verifyAccess()
		{ownsNft?
			setMsg({...msg, content:'You can access the collection',open:true,severity:"success",color:"#fafafa"})
			:
			setMsg({...msg, content:'You cannot access the collection',open:true,severity:"error",color:"#fafafa"})
		}	
		setAccess(ownsNft)		
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

			<div className={Collectionstyles.header} style={styling}>
				<div className={Collectionstyles.overlay} >

					<h1 className={Collectionstyles.collectionTitle}>{collection?collection.name:""}</h1>															
				
				<Grid container direction="row" sx={{px:10}} justifyContent='space-around'>
					
					<Grid container direction="row" width={{xs:"90%",md:"40%"}} justifyContent='center' alignItems="center">
						{
							creatorInfo.picture?
							<Image src={creatorInfo.picture} width={40} height={40} className={Collectionstyles.collectionCreatorPicture}/> 
							:
							<AccountIcon fontSize='large' onClick={()=>router.push(`/creators/${collection.creator}`)}/>
						}
						<Grid item direction="column" sx={{ml:1}} >
							<p className={Collectionstyles.userInfo} >Created by</p>
							<p>{creatorName}</p>
						</Grid>
					</Grid>

					

					<Grid container width={{xs:"90%",md:"40%"}}>
						{!user ?
							<Grid container direction="row" alignItems='center' justifyContent='center'>
								<p className={Collectionstyles.button} onClick={()=>router.push(`/account/login`)}>Please log in to check access</p>
							</Grid>	
							:
							null
						}	

						{(user && !isCreator)?
							<Grid container direction="row" alignItems='center' justifyContent='center'>
								<input hidden type="checkbox" id="btnControl"  onClick={()=>setAccessFunction()} />
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
			</div>
			{
				collection?
				<PresentationCollection collection={collection} />
				:
				null
			}
			
			{
				(edit && isCreator) ?
				<EditCollection collection={collection} />
				:
				null
			}
			{
				(!edit && isCreator) ?
				<>
				<Grid 
					item   
					textAlign="center"   
					className={VariousStyles.separator40}
					sx={{my:{xs:10,md:15},mb:7, mr:"30%"}}>
						
				</Grid>
				<Grid 
					item   
					textAlign="center"
					sx={{mb:5}}>
					<h2>Creator's Actions</h2>	
				</Grid>
				
				<CreatorActions collection={collection} />			
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



