import React, { useState,useContext, useEffect} from "react";

import { useRouter } from 'next/router'
import Image from 'next/image';

import Layout from '../../../hocs/Layout';
import AuthenticationContext from '../../../../context/AuthenticationContext';

import Collectionstyles from '../../../styles/Collection.module.scss';
import VariousStyles from '../../../styles/Various.module.scss';
import PresentationCollection from "../../../components/Collections/presentationCollection";
import ContentCollection from "../../../components/Collections/contentCollection";
import EditCollection from "../../../components/Collections/editCollection";
import CreatorActions from "../../../components/Collections/creatorActions";

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

	async function getCollection(){
		const collectionRes = await fetchCollection(creatorName,collectionSlug)	
		setCollection(collectionRes)
		try{
			setCreatorInfo(collectionRes['creator'])
		}catch{

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

			<div className={Collectionstyles.header} >
				<div className={Collectionstyles.overlay}  style={styling}>
					<h1 className={Collectionstyles.collectionTitle}>{collection?collection.name:""}</h1>															
				</div>
				<Grid container direction="row" sx={{mb:2, px:10}} alignItems='center' justifyContent='space-around'>
					<Grid item>
						<Grid container direction="row" sx={{mb:1}} alignItems='center'>
						{
                creatorInfo.picture?
                <Image src={creatorInfo.picture} width={40} height={40} className={Collectionstyles.collectionCreatorPicture}/> 
                :
                <AccountIcon fontSize='large' onClick={()=>router.push(`http://localhost:3000/creators/${collection.creator}`)}/>
              }
							<Grid item direction="column" sx={{ml:1}}>
								<p className={Collectionstyles.userInfo} >Created by</p>
								<p>{creatorName}</p>
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
					className={VariousStyles.separator40}
					sx={{mt:{xs:10,md:20},mb:10, mr:"30%"}}>
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



