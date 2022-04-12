import React, {useContext, useState} from "react";
import axios from "axios";
import { useRouter } from 'next/router';

import AuthenticationContext from "../../../context/AuthenticationContext";
import Layout from '../../hocs/Layout';
import withAuth from "../../hocs/WithAuth";

import GetCollections from "../../components/Collections/getCollections";

import Creatorstyles from '../../styles/Creator.module.scss';
import Formstyles from '../../styles/Form.module.scss';

import { Divider, Grid, Typography } from "@mui/material";

const myCollections = () => {

	const {user} = useContext(AuthenticationContext)
	return(
		<Layout>
			<Grid 
				container xx
				className={Creatorstyles.accueil} 
				id="accueil" 
				sx={{ py:7 }} 
				color="white"
				direction="column"
				alignItems="center"
				justifyContent="center">
					<Typography variant="h3">Welcome {user.username} </Typography>		
			</Grid>
			<GetCollections creator={user.username} tags={[]} nfts={[]} keywords={''}/>				
		</Layout>
    )}

export default withAuth(myCollections);