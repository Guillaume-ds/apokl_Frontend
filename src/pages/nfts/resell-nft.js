import { useEffect, useState } from 'react'
import Layout from '../../hocs/Layout';
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import ButtonStyles from '../../styles/Button.module.scss'
import FormStyles from "../../styles/Form.module.scss";
import { listNFTForSale } from '../../components/NFT/functionNFT';
import GetNftsBackend from "../../components/NFT/getNftsBackend";
import { Grid,FormControl,InputLabel,OutlinedInput } from '@mui/material';

export default function ResellNFT() {
  const [price,setPrice] = useState(1)
  const router = useRouter()
  
  const { id } = router.query
  

  return (
    <Layout>
    <Grid container 
        direction={"column"}
        sx={{pt:10,my:5}}
        justifyContent="center" 
        alignItems="center"
        >
      <Grid item sx={{width:'50%'}}>
        <GetNftsBackend id={id} unique={true} />
      </Grid>
      <Grid item sx={{my:4}}>
        <FormControl >
        <InputLabel >Price</InputLabel>
          <OutlinedInput
          label="NFT Title"
            required
            type="number"
            id="Price"
            name="Price"
            onChange={e => setPrice(e.target.value)}
          />  
          </FormControl>
      </Grid>
      <Grid item>

        <div onClick={()=>listNFTForSale(id,price)} className={ButtonStyles.button}>
          <p className={ButtonStyles.buttonContent}>List NFT</p>
        </div>

      </Grid>        
    </Grid>
  </Layout>
  )
}