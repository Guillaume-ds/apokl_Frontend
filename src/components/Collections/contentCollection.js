import React from "react";

import Collectionstyles from '../../styles/Collection.module.scss';


import { Grid } from "@mui/material";



const ContentCollection = ({collection, access}) => {	

	/*First present for all user without access, then check if user has access and finally if no collection*/ 
	if(collection.count !== 0 && !access ){
		return(
			<div className={Collectionstyles.description}>
				<h3>More about this collection</h3>
				<p>{collection.description}</p>
			</div>
			)

		}else if(collection.count !== 0 && access){		
			return (
			<div>			
				<div className={Collectionstyles.description}>
					<h3>More about this collection</h3>
					<p>{collection.description}</p>
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



