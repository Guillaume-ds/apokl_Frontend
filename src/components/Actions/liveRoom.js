import React from "react";

import withAuth from '../../hocs/withAuth';

import FormStyles from "../../styles/Form.module.scss";

import { Grid } from "@mui/material";
import PostStyles from "../../styles/Post.module.scss";

const LiveRoom = () => {	

	return(
		<Grid 
			container
			justifyContent="center">
				<Grid item width={{xs:"100%",md:"70%"}}>
					<div className={PostStyles.post}>
						<h1 className={FormStyles.formCardTitle}>Start a live session</h1>
						<div className={FormStyles.formCardContent}>
							<Grid item sx={{my:20}}>
								<h3>This functionnality will soon be available</h3>
							</Grid>
						</div>
					</div>
				</Grid>     
		</Grid>
		)
}

export default withAuth(LiveRoom);
