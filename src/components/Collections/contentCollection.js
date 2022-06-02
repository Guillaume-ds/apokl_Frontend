import React,{useContext,useState,useEffect} from "react";
import axios from 'axios';

import AuthenticationContext from '../../../context/AuthenticationContext';

import GetNftsBackend from "../NFT/getNftsBackend";

import Collectionstyles from '../../styles/Collection.module.scss';
import PostStyles from '../../styles/Post.module.scss';
import VariousStyles from '../../styles/Various.module.scss';
import ButtonStyles from '../../styles/Button.module.scss';

import CommentCollection from "./commentCollection";


import { Grid } from "@mui/material";


const ContentCollection = ({collection, access, backend}) => {	
	const {accessToken} = useContext(AuthenticationContext)
	const [posts,setPosts] = useState([]);
	const [loaded, setLoaded] = useState(false)
	const [nextPage, setNextPage] = useState(null);
	const [seeComments,setSeeComments] = useState(false);


	/*First present for all user without access, then check if user has access and finally if no collection*/ 
	if(collection && !access ){
		return(
			<div>
				<Grid 
					item      
					className={VariousStyles.separatorGradient}
					sx={{my:15}}>
				</Grid>
				<Grid 
					item      
					width="100%"
					textAlign="center">
						<h1>Get access to this collection :</h1>
				</Grid>
				<Grid 
					item      
					sx={{p:5}}>
					<GetNftsBackend id={collection.nfts_array.map(Number)} buyable={true}  />
				</Grid>
			</div>
			)

	}/*for all user with access*/ 
	else if(collection && access){		

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

		const SeeCommentsButton = () => {
			if(!seeComments){
				return(
					<Grid container direction="row" justifyContent="center" sx={{py:7}}>
						<Grid item width="150px">
						<div className={ButtonStyles.divButtonActive} 
							onClick={()=>setSeeComments(true)}>See comments</div>
						</Grid>
					</Grid>
				)
				
			}else if (seeComments){
				return(
					<Grid container direction="row" justifyContent="center"  sx={{py:7}}>
						<Grid item width="150px">
						<div className={ButtonStyles.divButton} 
							onClick={()=>setSeeComments(false)}>Hide comments</div>
						</Grid>
					</Grid>
				)				
			}
		}

		if(loaded===false){fetchPosts()}
		
		
			return (			
				<div style={{backgroundColor:"#f8f8ff"}} > 
					<Grid 
						item      
						className={VariousStyles.separatorGradient}
						sx={{my:{xs:5,sm:10,md:15}}}>
					</Grid>
					
					{posts.map((post)=>(
						<div className={PostStyles.post}>
							<h2 className={PostStyles.postTitle}>{post.title}</h2>
							<p className={PostStyles.postContent}>{post.content}</p>							

						<CommentCollection collection={collection.id} access={access} post={post.id} setLoaded={setLoaded} />

						{(post.commentsInfo && seeComments)?
						<div>
							<SeeCommentsButton />
							{post.commentsInfo.map((comment)=>(
								<div className={PostStyles.postComment}>
									<h3 className={PostStyles.postCommentTitle}>{comment.creatorInfo.name}</h3>
									<p className={PostStyles.postCommentContent}>{comment.content}</p>
								</div>
							))}
						</div>
						:
						<SeeCommentsButton />
						}
						
					</div>
						))}			
					
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


