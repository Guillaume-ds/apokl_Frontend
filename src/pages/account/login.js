import { useState, useContext, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { Snackbar, Grid } from '@mui/material';
import Layout from '../../hocs/Layout';
import AuthenticationContext from '../../../context/AuthenticationContext'

import {useRouter} from 'next/router';
import Link from 'next/link';

import FormStyles from "../../styles/Form.module.scss"


export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [open, setOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const {login, error, clearError} = useContext(AuthenticationContext)

  useEffect(() => {
	  if(error) {
		  setErrorMessage(error)
		  setOpen(true)
			clearError()
  }},[error])

  const router = useRouter()


  const submitHandler = e => {
  	e.preventDefault();
		login({username, password})  	
  }

  const handleClose = e => {
	  setOpen(false)
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
						<Grid item sx={{my:4}}></Grid>
						<Link href='/account/register' sx={{my:2}}>
							<a className={FormStyles.formCardItem}>Don't have an account? Sign Up</a>
						</Link>
					</div>
				</div>
      </Grid>
    </Layout>
  )
}