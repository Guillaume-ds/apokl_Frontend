import React, { useState } from 'react';
import Layout from '../../hocs/Layout';
import axios from 'axios';

import Grid from "@mui/material/Grid";
import {TailSpin as Loader} from 'react-loader-spinner';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const ManageAccount2 = () => {
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const onUsernameChange = e => setUsername(e.target.value);
  const onEmailChange = e => setEmail(e.target.value);

  const [loading, setLoading] = useState(false);

	const resetPassword = async() => {
						
		const config = {
			headers: {
				'Content-Type': 'application/json',
			}
		}
		const body = {
			"username":username,
			"email":email
		}
		
		axios.post('http://localhost:8000/api/reset-password/', body, config)
    .then(res => {
      alert(res.data.error);
      console.log(res.message)
  })

	}
		
	return (
    <Layout>
      <Grid container direction="column" justifyContent="center" alignItems="center">
        <form>
          <FormControl fullWidth sx={{ mt: 10 }}> 
              <TextField
              margin="dense"
              variant="outlined"
              required
              fullWidth
              id="Email"
              label="Email"
              name="Email"
              autoComplete="Email"
              onChange={onEmailChange}/>                      
          </FormControl>
					<FormControl fullWidth sx={{ mt: 1 }}> 
              <TextField
              margin="dense"
              variant="outlined"
              required
              fullWidth
              id="Username"
              label="Username"
              name="Username"
              autoComplete="Username"
              onChange={onUsernameChange}/>                      
          </FormControl>
					  
          <Grid item sx={{my:2}} container direction="column" justifyContent="center" alignItems="center">           
            {loading ?                  
              <Loader
                  type="Oval"
                  color="#004491"
                  height={50}
                  width={50}/>
                      : 
              <Button type="submit" onClick={resetPassword} variant="outlined" sx={{mt:2}}>Change password</Button>
            }
          </Grid>
        </form>
      </Grid>  
      </Layout>
	);
}

export default ManageAccount2;
