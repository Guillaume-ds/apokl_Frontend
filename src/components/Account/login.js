import { useState, useContext, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { Snackbar, Grid } from '@mui/material';
import Layout from '../../hocs/Layout';
import AuthenticationContext from '../../../context/AuthenticationContext'

import {useRouter} from 'next/router';
import Link from 'next/link';

import FormStyles from "../../styles/Form.module.scss"


export default function LoginComponent() {
	const router = useRouter()
	const {login, error, clearError,user} = useContext(AuthenticationContext)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [open, setOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
	  if(error) {
		setErrorMessage(error)
		setOpen(true)
		clearError()
  }},[error])
  
  const submitHandler = async e => {
  	e.preventDefault();
		await login({username, password})  		
  }

  const handleClose = e => {
	  setOpen(false)
  }

	if((router.asPath === "/account/login")&& user){
		router.push("/")
	}

  return (
    <Layout>
		<Snackbar
			anchorOrigin = {{ vertical: 'top', horizontal:'center' }}
			open = {open}
			onClose = {handleClose}
			autoHideDuration={6000}
			message = {errorMessage}
			key = {'bottom_center'}>

		</Snackbar>
      <Grid container direction="row" justifyContent="center" sx={{ py:{xs:5,md:10}, px:{xs:2,md:20,lg:30}}}>
				<div className={FormStyles.formCard}>
					<h1 className={FormStyles.formCardTitle}>Welcome back ! </h1>
					<div className={FormStyles.formCardContent}>
						<form onSubmit={submitHandler} className={FormStyles.formCardItem}>
							<Grid item fullWidth sx={{my:2}}></Grid>
							<TextField 
								label='Username' 
								fullWidth 
								onChange={e => setUsername(e.target.value)} 
								value={username} />
							<Grid item sx={{my:1}}></Grid>
							
							<TextField 
								label='Password' 
								inputProps={{ 'type': 'password' }} 
								fullWidth
								onChange={e => setPassword(e.target.value)} 
								value={password} />
							
							<Grid item sx={{my:4}}></Grid>
							<button type='submit' className={FormStyles.formButton}>Login</button>
						</form>
						<Grid item sx={{my:3}}></Grid>
						<Link href='/account/register'>
							<a className={FormStyles.formCardItem}>Don't have an account? Sign Up !</a>
						</Link>
						<br></br>
						<Link href='/account/reset-password'>
							<a className={FormStyles.formCardItem}>Forgot your password?</a>
						</Link>
					</div>
				</div>
      </Grid>
    </Layout>
  )
}