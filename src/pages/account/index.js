import React, {useContext} from "react";
import Layout from '../../hocs/Layout';
import AuthenticationContext from '../../../context/AuthenticationContext'

import ModifyProfile from '../../components/Account/modify-account.js';
import ActivateAccount from '../../components/Account/activate.js';
import ChangePassword from '../../components/Account/change-password.js';
import Artist from '../../components/Account/artist';
import styles from '../../styles/Creator.module.scss';
import { Grid, Container,Paper } from "@mui/material";
import { Typography } from "@mui/material";
import {useRouter} from "next/router";



const AccountPage = () => {
	const router = useRouter()
	const {user} = useContext(AuthenticationContext)


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
					<Artist name={user.username}/>
				</Grid>

				<Container sx={{mt:10}}>
					<Grid item sx={{mt:3, textAlign:'center'}} >
						 <ModifyProfile user={user.username} />
					</Grid>
					
					<Grid item sx={{mt:3, textAlign:'center'}} >
						 <ChangePassword />
					</Grid>
          
				</Container>
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