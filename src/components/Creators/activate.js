import React, { useState,useContext,useEffect } from 'react';
import axios from 'axios';


import FormStyles from "../../styles/Form.module.scss";

import Grid from "@mui/material/Grid";
import {TailSpin as Loader} from 'react-loader-spinner';
import AuthenticationContext from '../../../context/AuthenticationContext'

const Activate = () => {

  const {user,accessToken,creator} = useContext(AuthenticationContext)
  const [loading, setLoading] = useState(false);

	const activate = async() => {
    const config = {
			headers: {
				'Content-Type': 'application/json',
        'Authorization':`Bearer ${accessToken}`
			}
		}
		const body = {
      "user":user.id,
			"name":user.username
		}
    const { data } = await axios.post('http://localhost:8000/profiles/',body,config)
	}

  if(user && creator.name!=="" ){
    return (
      null
    )
  }else if(user && creator.name===""){
    return (
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <form>
              
            <Grid item sx={{my:0}} container direction="column" justifyContent="center" alignItems="center">           
              {loading ?                  
                <Loader
                    type="Oval"
                    color="#004491"
                    height={50}
                    width={50}/>
                        : 
                <button type="submit" onClick={activate} className={FormStyles.formButton}>Activate account </button>
              }
            </Grid> 
          </form>
        </Grid>  
	)}else{
    return(
      <Grid container direction="column" justifyContent="center" alignItems="center">  
        <p>Please log in</p>
      </Grid>
    )};
}

export default Activate;
