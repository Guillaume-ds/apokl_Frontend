import React from "react";
import axios from "axios";
import {useRouter} from 'next/router';

import Layout from '../hocs/Layout';
import NotFoundStyles from "../styles/404.module.scss";
import Grid from "@mui/material/Grid";

const Undefined = () => {
	const router = useRouter()
	return (
		<Layout>
			<div className={NotFoundStyles.main}>              
				<span className={NotFoundStyles.bubble}/>                                
				<span className={NotFoundStyles.bubble}/>
				<span className={NotFoundStyles.bubble}/>
				<span className={NotFoundStyles.bubble}/>
				<span className={NotFoundStyles.bubble}/>
				<span className={NotFoundStyles.bubble}/>
				<Grid container direction="column" justifyContent='center'>
					<Grid item>
						<h3>404 - Page not found ! </h3>
					</Grid >
					<Grid item>					
						<button className={NotFoundStyles.button} onClick={()=>router.push('/')}>Bring me home</button>
					</Grid>
				</Grid>
			</div>
		</Layout>
	)
}

export default Undefined;