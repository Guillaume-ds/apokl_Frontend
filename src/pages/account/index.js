import React, {useContext} from "react";
import Layout from '../../hocs/Layout';
import AuthenticationContext from '../../../context/AuthenticationContext'

import ModifyProfile from '../../components/Account/modify-account.js';
import ActivateAccount from '../../components/Creators/activate.js';
import ChangePassword from '../../components/Account/change-password.js';
import Artist from '../../components/Creators/artist';
import styles from '../../styles/Creator.module.scss';
import { Grid, Container } from "@mui/material";
import { Typography } from "@mui/material";
import {useRouter} from "next/router";



const AccountPage = () => {
	const router = useRouter()
	const {user,accessToken} = useContext(AuthenticationContext)

	if (user){
		return(
			<Layout>

				<Grid 
          container 
          className={styles.accueil} 
          id="accueil" sx={{ py:10 }} 
          direction="column"
					alignItems="center"
					justifyContent="center">
					<Artist name={user.username} accessToken={accessToken}/>
					<ActivateAccount />
				</Grid>

				<Grid container direction="column" justifyContent="center" sx={{ py:{xs:5,md:10}}}>
						 <ModifyProfile user={user.username} accessToken={accessToken}/>

						 <ChangePassword />

          
				</Grid>
			</Layout>
		)
	}else{
		return(
			<Layout>
				<Grid 
					container 
					className={styles.accueil} 
					id="accueil" 
					sx={{ py:10 }} 
					direction="column"
					alignItems="center"
					justifyContent="center"
					onClick={()=>router.push('/account/login')}>
					<Typography variant="h5" color="white">Please log in</Typography>
				</Grid>
			</Layout>
		)
	}
}

export default AccountPage;