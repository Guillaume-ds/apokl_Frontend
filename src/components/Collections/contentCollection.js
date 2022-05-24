import React,{useContext,useState,useEffect} from "react";
import axios from 'axios';

import AuthenticationContext from '../../../context/AuthenticationContext';

import GetNftsBackend from "../NFT/getNftsBackend";

import Collectionstyles from '../../styles/Collection.module.scss';
import VariousStyles from '../../styles/Various.module.scss';
import CommentCollection from "./commentCollection";

import Artist from "../Creators/artist";

import { Grid } from "@mui/material";


const ContentCollection = ({collection, access, backend}) => {	
	const {accessToken} = useContext(AuthenticationContext)
	const [posts,setPosts] = useState([]);
	const [loaded, setLoaded] = useState(false)
	const [reLoaded, setReLoaded] = useState(null)
	const [nextPage, setNextPage] = useState(null)

	const gettingNft = () =>{		
		if(collection.nfts_array && collection.nfts_array.length>0){
			return (
				<Grid container 
						justifyContent="space-around"
						direction='row'  
						sx={{px:6}}
						rowSpacing={10} 
						paddingTop={10}
						columnSpacing={{ sm: 2, md: 4 }} > 
					<GetNftsBackend id={collection.nfts_array.map(Number)} buyable={true}  />
				</Grid>
			)
		} else {
			return(
				<div>
					<p>No Nft available for this collection</p>
				</div>
			)
		}
			
	}


	/*First present for all user without access, then check if user has access and finally if no collection*/ 
	if(collection && !access ){
		return(
			<div>
				<Grid item sx={{my:15}}>
                  <hr className={VariousStyles.separator40}></hr>
                </Grid>
				<div className={Collectionstyles.description}>
					<h3>Get access to this collection</h3>
					{gettingNft()}
				</div>
			</div>
			)

	}else if(collection && access){		

		const fetchPosts= async () =>{					
			if(accessToken && collection.id){
				const config = {
					headers: {
						'Authorization': 'Bearer ' + accessToken,
						'Content-Type':'application/json'
					}
				}
				const body = {
						"access":String(access),
						"collection":collection.id
				}
			const res = await axios.post(`http://localhost:8000/api/rooms/get-posts`,body,config)
			setPosts(res.data.results)
			setNextPage(res.data.next)
			setLoaded(true)
			}
		}

		if(loaded===false){fetchPosts()}
		
		
			return (
			<div>				
				<div>
					<hr></hr>
					{reLoaded?"yes":"non"}
					<div>{posts.map((post)=>(
						<div className={Collectionstyles.description}>
						<h3>{post.title}</h3>
						<p>{post.content}</p>
						<CommentCollection collection={collection.id} access={access} post={post.id} setLoaded={setLoaded} />
						{post.commentsInfo?
						<div>
						{post.commentsInfo.map((comment)=>(
							<div className={Collectionstyles.description}>
								<h3>{comment.creatorInfo.name}</h3>
								<p>{comment.content}</p>
							</div>
						))}
					</div>
					:
					null

						}
						
					</div>
						))}			
					</div>
				</div>
			</div>
		)

	}else{
			return(
			<p className={Collectionstyles.description}>
				There is no collection with this name
			</p>)}
};

export default ContentCollection;


export const getServerSideProps = async () => {
  return {
    props: {
      backend: process.env.BACKEND_URL,
    },
  };
};


