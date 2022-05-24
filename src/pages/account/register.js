import { useState, useContext, useEffect } from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'

import Layout from '../../hocs/Layout'
import AuthenticationContext from '../../../context/AuthenticationContext'

import FormStyles from "../../styles/Form.module.scss"
import { TextField } from '@material-ui/core'
import { Snackbar, Grid } from '@mui/material';

export default function RegisterPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const [open, setOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const router = useRouter()

  const {register, error, clearError} = useContext(AuthenticationContext)
  const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
  
  useEffect(() => {
    if (error) {
      setErrorMessage(error)
      setOpen(true)
      clearError()
    }
  }, [error])

  const submitHandler = e => {
  	e.preventDefault();
    // console.log({username, email, password, password2})
  	register({username, email, password, password2})
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Layout>
      <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={open}
          onClose={handleClose}
          autoHideDuration={6000}
          message={errorMessage}
          key={'top_center'}
        />
        <Grid container direction="row" justifyContent="center" sx={{ py:{xs:5,md:10}, px:{xs:2,md:20,lg:30}}}>
				<div className={FormStyles.formCard}>
				<h1 className={FormStyles.formCardTitle}>Welcome to Apokl ! </h1>
					<div className={FormStyles.formCardContent}>
						<form onSubmit={submitHandler} className={FormStyles.formCardItem}>
              <TextField 
                label='Username' 
                fullWidth 
                onChange={e => setUsername(e.target.value)} 
                value={username} />

              <TextField 
                label='Email' 
                fullWidth 
                onChange={e => setEmail(e.target.value)} 
                value={email} />

              <TextField 
                label='Password' 
                fullWidth 
                inputProps={{ 'type': 'password' }} 
                onChange={e => setPassword(e.target.value)} 
                value={password} />

              <TextField 
                label='Confirm Password' 
                fullWidth 
                inputProps={{ 'type': 'password' }}  
                onChange={e => setPassword2(e.target.value)} 
                value={password2} />		

							<button type='submit' className={FormStyles.formButton}>Join Apokl</button>

						</form>
            
            <Link href='/account/login'>
              <a className={FormStyles.formCardItem}>Already have an account? Sign In</a>
            </Link>
					</div>
				</div>   
        </Grid> 
    </Layout>
  )
}