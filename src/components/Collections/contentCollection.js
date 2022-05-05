import React,{useContext,useState,useEffect} from "react";
import axios from 'axios';

import AuthenticationContext from '../../../context/AuthenticationContext';

import GetNftsBackend from "../NFT/getNftsBackend";

import Collectionstyles from '../../styles/Collection.module.scss';

import { Grid } from "@mui/material";


const ContentCollection = ({collection, access, backend}) => {	
	const {accessToken} = useContext(AuthenticationContext)
	const [posts,setPosts] = useState([]);
	const [loaded, setLoaded] = useState(false)
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
	if(collection.count !== 0 && !access ){
		return(
			<div>
				<div className={Collectionstyles.description}>
					<h3>More about this collection</h3>
					<p>{collection.description}</p>				
				</div>
				<div className={Collectionstyles.description}>
					<h3>Get access to this collection</h3>
					{gettingNft()}
				</div>
			</div>
			)

	}else if(collection.count !== 0 && access){		

		const fetchPosts= async () =>{			
			if(accessToken ){
				const config = {
					headers: {
						'Authorization': 'Bearer ' + accessToken
					}
				}
			const res = await axios.get(`http://localhost:8000/api/rooms/collection/posts/${collection.slug}`,config)
			setPosts(res.data.results)
			setNextPage(res.data.next)
			setLoaded(true)
			}
		}

		if(posts.length===0 && loaded===false){fetchPosts()}
		
			return (
			<div>			
				<div className={Collectionstyles.description}>
					<h3>More about this collection</h3>
					<p>{collection.description}</p>
				</div>	
				<div>
					<hr></hr>
					<div>{posts.map((post)=>(
						<div className={Collectionstyles.description}>
						<h3>{post.title}</h3>
						<p>{post.content}</p>
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


