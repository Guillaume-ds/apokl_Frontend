import React, {useState} from "react";

import FormStyles from "../../styles/Form.module.scss";
import ButtonStyles from "../../styles/Button.module.scss";

import { Grid } from "@mui/material";
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';


const UploadPicture = ({picture,setPicture}) =>{

  const onPictureChange = e => setPicture(e.target.files[0]);

	return(
		<Grid container 
				className={ButtonStyles.fileInputButton} 
				alignItems="center" 
				justifyContent="center" 
				sx={{width:'100%'}}>
				{ !picture?
					<Grid 
						item 
						sx={{width:'100%'}}>
						<Button component="label" sx={{width:'100%', height:"50px"}}>
							<CloudUploadIcon fontSize='small' sx={{px:1}} style={{color:"rgb(0, 50, 150)"}}/>Upload Image
								<input
									hidden
									accept="image/*"
									id="post-image"
									onChange={onPictureChange}
									name="image"
									type="file"
									/>
							</Button>
					</Grid>

					:
					<Grid 
						container 
						alignItems="center" 
						justifyContent="center"
						sx={{width:'100%', height:"50px"}}>
						<LibraryAddCheckIcon  style={{color:"#004491"}} />
					</Grid>
					}   
			</Grid>         
	)}

	export default UploadPicture;