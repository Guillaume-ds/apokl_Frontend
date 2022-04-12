import React from "react";

import Collectionstyles from '../../styles/Collection.module.scss';
import withAuth from '../hocs/withAuth'


import { Grid } from "@mui/material";



const ActionsCollection = ({collection}) => {	

		return(
			<div className={Collectionstyles.description}>
				<h3>More about this collection</h3>
				<p>{collection.description}</p>
			</div>
			)


export default withAuth(ActionsCollection);



