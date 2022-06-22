import React, {useContext} from "react";
import Layout from '../../hocs/Layout';
import WithAuth from "../../hocs/withAuth";
import AuthenticationContext from '../../../context/AuthenticationContext'


import ModifyProfile from '../../components/Account/modify-account.js';
import ActivateAccount from '../../components/Creators/activate.js';
import ChangePassword from '../../components/Account/change-password.js';
import Artist from '../../components/Creators/artist';
import styles from '../../styles/Creator.module.scss';
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import {useRouter} from "next/router";



const AccountPage = () => {
	const router = useRouter()
	const {user,accessToken,creator} = useContext(AuthenticationContext)
	
	if (user && creator.name != ''){
		return(
			<Layout>

				<Grid 
          container 
          className={styles.accueil} 
          id="accueil" sx={{ py:10 }} 
          direction="column"
					alignItems="center"
					justifyContent="center">
						{
							creator?
							<Grid item width={{xs:"90%",md:"50%",xl:"40%"}} height="40vh">
								<Artist	name={creator.name} />
							</Grid>
							
							:
							<ActivateAccount />
						}					
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

export default WithAuth(AccountPage);