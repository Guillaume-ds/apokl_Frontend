import React,{useContext,useState,useEffect} from "react";
import axios from 'axios';

import AuthenticationContext from '../../../context/AuthenticationContext'

import Collectionstyles from '../../styles/Collection.module.scss';

import { Grid } from "@mui/material";


const ContentCollection = ({collection, access, backend}) => {	
	const {accessToken} = useContext(AuthenticationContext)
	const [posts,setPosts] = useState([]);
	const [loaded, setLoaded] = useState(false)
	const [refreshKey, setRefreshKey] = useState(0);

	

	/*First present for all user without access, then check if user has access and finally if no collection*/ 
	if(collection.count !== 0 && !access ){
		return(
			<div className={Collectionstyles.description}>
				<h3>More about this collection</h3>
				<p>{collection.description}</p>
			</div>
			)

	}else if(collection.count !== 0 && access){		
		
		useEffect(()=>{			
			if(accessToken){
				const config = {
					headers: {
						'Authorization': 'Bearer ' + accessToken
					}
				}
			const {res} = axios.get(`http://localhost:8000/api/rooms/collection/posts/${collection.slug}`,config)
			.then(res=>{setPosts(res.data.results),console.log(res),setLoaded(true)})
			
			}
		},[refreshKey])
		

		
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


