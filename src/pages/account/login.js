import { useState, useContext, useEffect } from 'react';
import { Button, Card, CardContent, makeStyles, TextField, Typography } from '@material-ui/core';
import { Snackbar, Container } from '@mui/material';
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
      <Container sx={{mt:10}}>
				<div className={FormStyles.formCard}>
				<h1 className={FormStyles.formCardTitle}>Welcome back ! </h1>
					<div className={FormStyles.formCardContent}>
						<form onSubmit={submitHandler} className={FormStyles.formCardItem}>
							<TextField 
								label='Username' 
								fullWidth 
								onChange={e => setUsername(e.target.value)} 
								value={username} 
								sx={{py:2}}/>

							<TextField 
								label='Password' 
								inputProps={{ 'type': 'password' }} 
								fullWidth onChange={e => setPassword(e.target.value)} 
								value={password} 
								sx={{py:2}}/>
		
							<button type='submit' className={FormStyles.formButton}>Login</button>
						</form>
						<Link href='/account/register'>
							<a className={FormStyles.formCardItem}>Don't have an account? Sign Up</a>
						</Link>
					</div>
				</div>
      </Container>
    </Layout>
  )
}