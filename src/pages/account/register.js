import { useState, useContext, useEffect } from 'react'
import { TextField } from '@material-ui/core'
import { Snackbar, Container } from '@mui/material';
import Layout from '../../hocs/Layout'
import AuthenticationContext from '../../../context/AuthenticationContext'
import FormStyles from "../../styles/Form.module.scss"
import {useRouter} from 'next/router'
import Link from 'next/link'

export default function RegisterPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const [open, setOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const router = useRouter()

  const {register, error, clearError} = useContext(AuthenticationContext)

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
        <Container sx={{mt:10}}>
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
      </Container>      
    </Layout>
  )
}