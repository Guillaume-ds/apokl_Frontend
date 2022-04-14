import React, { useState } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next';

import Layout from '../../hocs/Layout';
import withAuth from '../../hocs/WithAuth';

import FormStyles from "../../styles/Form.module.scss";

import { Container,Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Router } from '@material-ui/icons';

const ChangePassword = () => {
  
  const [old_password, setOldPassword] = useState('');
  const [new_password, setNewPassword] = useState('');
  const [renew_password, setReNewPassword] = useState('');

  const onOldPasswordChange = e => setOldPassword(e.target.value);
  const onNewPasswordChange = e => setNewPassword(e.target.value);
	const onReNewPasswordChange = e => setReNewPassword(e.target.value);

  const [loading, setLoading] = useState(false);

	const changePassword = async() => {
		const getRefreshToken = getCookie("refresh");
		const config1 = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		const body1 = {
			"refresh":getRefreshToken
		}
		
		const {data:access} = await axios.post('http://localhost:8000/api/token/refresh/', body1, config1)
		const accessToken = access.access
		
		const config2 = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + accessToken
			}
		}
		const body2 = {
			"old_password":old_password,
			"new_password":new_password
		}
		try{
		const { data:changePasswordRes } = await axios.put('http://localhost:8000/api/change-password/', body2, config2)
		Router.push('/account/')
		}catch{
		}
	}		
	return (
      <Container sx={{mt:10}}>
				<div className={FormStyles.formCard}>
				<h1 className={FormStyles.formCardTitle}>Change your password</h1>
					<div className={FormStyles.formCardContent}>
						<form onSubmit={changePassword} className={FormStyles.formCardItem}>
              <TextField
              margin="dense"
              variant="outlined"
              required
              fullWidth
              id="Old password"
              label="Old password"
              name="Old password"
              autoComplete="Old password"
              onChange={onOldPasswordChange}/>
            <TextField
              margin="dense"
              variant="outlined"
              required
              fullWidth
              id="New password"
              label="New password"
              name="New password"
              autoComplete="New password"
              onChange={onNewPasswordChange}/>    
            <TextField
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
						</form>
          </div>
				</div> 
        </Container>     
	);
}

export default withAuth(ChangePassword);
