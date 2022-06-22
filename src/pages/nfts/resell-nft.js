import { useState } from 'react';
import { useRouter } from 'next/router';

import Layout from '../../hocs/Layout';
import ApoklButton from '../../components/apoklButton';

import { listNFTForSale } from '../../components/NFT/functionNFT';
import GetNftsBackend from "../../components/NFT/getNftsBackend";

import { Grid,FormControl,InputLabel,OutlinedInput,Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';

export default function ResellNFT() {
  const router = useRouter()

  const [price,setPrice] = useState(10)  
  const [msg,setMsg] = useState({content:"",open:false,severity:"error",color:"red"})

  const { id } = router.query

  async function Resell(){
    if(price<1){
      setMsg({...msg, content:'Please enter a valid price',open:true,severity:"error", color:"#fafafa"})
    }else{
      let transaction = await listNFTForSale(id,price)
      if(transaction==="success"){
        setMsg({...msg, content:'NFT sale started',open:true,severity:"success", color:"#fafafa"})
      }else{
        setMsg({...msg, content:'Error occured while putting the NFT for sale',open:true,severity:"error", color:"#fafafa"})
      }
    }    
  }

  const handleClose = e => {
    setMsg({...msg, content:'',open:false,severity:"error"})
  }
  

  return (
    <Layout>
      <Snackbar
			anchorOrigin = {{ vertical: 'bottom', horizontal:'center' }}			
			open = {msg.open}
			onClose = {handleClose}
			autoHideDuration={6000}
			key = {'bottom_center'}>
				<Alert severity={msg.severity} style={{color:msg.color, background:"#004491"}} >{msg.content}</Alert>
			</Snackbar>
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
      <Grid item height="10%" sx={{mt:{xs:1,md:0}}} onClick={()=>Resell()}>
        <Grid container justifyContent="center">
            <Grid item width="120px"> 
              <ApoklButton text={"List NFT"}  />  
            </Grid>
        </Grid>               
      </Grid>       
    </Grid>
  </Layout>
  )
}