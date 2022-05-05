import React, { useState,useContext } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next';

import withAuth from '../../hocs/WithAuth';
import AuthenticationContext from '../../../context/AuthenticationContext'

import FormStyles from "../../styles/Form.module.scss";

import { Grid,Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';

const ChangePassword = () => {
  const {accessToken} = useContext(AuthenticationContext)  
  const [old_password, setOldPassword] = useState('');
  const [new_password, setNewPassword] = useState('');
  const [renew_password, setReNewPassword] = useState('');
  const [msg,setMsg] = useState({content:"",open:false,severity:"error",color:"red"})

  const onOldPasswordChange = e => setOldPassword(e.target.value);
  const onNewPasswordChange = e => setNewPassword(e.target.value);
	const onReNewPasswordChange = e => setReNewPassword(e.target.value);

  const handleClose = e => {
    setMsg({...msg, content:'',open:false,severity:"error"})
  }

	const changePassword = async() => {		
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + accessToken
			}
		}
		const body = {
			"old_password":old_password,
			"new_password":new_password
		}
		try{
		const { data:changePasswordRes } = await axios.put('http://localhost:8000/api/change-password/', body, config)
    setMsg({...msg, content:'Password successfully updated',open:true,severity:"success",color:"#fafafa"})
		}catch{
    setMsg({...msg, content:'Error occured',open:true,severity:"error"})
		}
	}		
	return (
      <Grid container direction="row" justifyContent="center" sx={{ py:{xs:5,md:5}, px:{xs:2,md:20}}}>
        <Snackbar
			anchorOrigin = {{ vertical: 'bottom', horizontal:'center' }}			
			open = {msg.open}
			onClose = {handleClose}
			autoHideDuration={6000}
			key = {'bottom_center'}>
				<Alert severity={msg.severity} style={{color:msg.color, background:"#004491"}} >{msg.content}</Alert>
			</Snackbar>
				<div className={FormStyles.formCard}>
				<h1 className={FormStyles.formCardTitle}>Change your password</h1>
					<div className={FormStyles.formCardContent}>
						<form onSubmit={changePassword} className={FormStyles.formCardItem}>
            <Grid container direction="column" justifyContent="space-around" alignItems="center" spacing={{ xs: 2, md: 3 }} sx={{pt:3, width: '80%'}}>
              <TextField sx={{width:{md:500,lg:700}}}
              margin="dense"
              variant="outlined"
              required
              fullWidth
              id="Old password"
              label="Old password"
              name="Old password"
              autoComplete="Old password"
              onChange={onOldPasswordChange}/>
            <TextField sx={{width:{md:500,lg:700}}}
              margin="dense"
              variant="outlined"
              required
              fullWidth
              id="New password"
              label="New password"
              name="New password"
              autoComplete="New password"
              onChange={onNewPasswordChange}/>    
            <TextField sx={{width:{md:500,lg:700}}}
              margin="dense"
              variant="outlined"
              required
              fullWidth
              id="Re new password"
              label="Re new password"
              name="Re new password"
              autoComplete="Re new password"
              onChange={onReNewPasswordChange}/>
							<button type='submit' className={FormStyles.formButton}>Change Password</button>
              </Grid>
						</form>
          </div>
				</div> 
        </Grid>     
	);
}

export default withAuth(ChangePassword);
