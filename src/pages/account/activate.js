import React, { useState,useContext,useEffect } from 'react';
import Layout from '../../hocs/Layout';
import axios from 'axios';
import cookie from 'cookie'
import { getCookie } from 'cookies-next';

import FormStyles from "../../styles/Form.module.scss";

import Grid from "@mui/material/Grid";
import {TailSpin as Loader} from 'react-loader-spinner';
import Button from '@mui/material/Button';
import AuthenticationContext from '../../../context/AuthenticationContext'

const Activate = () => {

  const [tags, setTags] = useState(['musique']);
  const {user} = useContext(AuthenticationContext)
  const [creator,setCreator] = useState({})

  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    try{
      axios.get(`http://127.0.0.1:8000/api/creators/${user.username}`).then(res=>{
        console.log(res.data)
        setCreator(res.data)
      })
    }catch{err=>{console.log(err)}}},[user])
  
  
	const activate = async() => {
    const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		const body = {
			"name":user.username,
			"tags":tags
		}
		try{
      const { data } = await axios.post('http://127.0.0.1:8000/api/creators/activate', body,config)
      console.log(data)
      router.push('/');
		}catch{

		}
	}

  if(user && creator.count === 1 ){
    return (
      <Layout>
        <Grid container direction="column" justifyContent="center" alignItems="center">  
          <p>You have an active account !</p>
        </Grid>
      </Layout>
    )
  }else if(user && creator.count === 0 ){
    return (
      <Layout>
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
      </Layout>
	)}else{
    return(
    <Layout>
      <Grid container direction="column" justifyContent="center" alignItems="center">  
        <p>Please log in</p>
      </Grid>
    </Layout>
    )};
}

export default Activate;
