import { useEffect, useState,useContext } from 'react'
import axios from 'axios'
import AuthenticationContext from '../../../context/AuthenticationContext';

import FormStyles from '../../styles/Form.module.scss';
import GetNFT from './getNftsBlockchain';



import { Grid,Container } from '@mui/material';


export default function CreatedNfts({setCollectionNftsIds, collectionNftsIds}) {
  const {creator} = useContext(AuthenticationContext)
  const [backendNfts, setBackendNfts] = useState([])
  const [nextBackendUrl,setNextBackendUrl]=useState(null)
  const [previousBackendUrl,setPreviousBackendUrl]=useState(null)
  const [loadingState, setLoadingState] = useState('not-loaded')
  const searchURL = "http://localhost:8000/api/nfts/search-nfts"

  const addNftId = (id) =>{
    setCollectionNftsIds([...collectionNftsIds,id])  
  }

  function removeId(arr, value) {
    var i = 0;
    while (i < arr.length) {
      if (arr[i] === value) {
        arr.splice(i, 1);
      } else {
        ++i;
      }
    }
    return arr;
  }
  const removeNftId = (id) => {
    setCollectionNftsIds(removeId(collectionNftsIds,id));
    setCollectionNftsIds([...collectionNftsIds]); /*Otherwise, it doesn't displays*/
}

  async function getNftBackend(url){
    scroll(0,0)
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    if(creator.name!==""){
      const body = {
        "creator":creator.name
      }
  
      const res = await axios.post(url, body, config )
      setBackendNfts(res.data.results)
      setNextBackendUrl(res.data.next)
      setPreviousBackendUrl(res.data.previous)
    }else{}
    
    
  }

  useEffect(() => {
    getNftBackend(searchURL)
  }, [creator])

  
  if (backendNfts.length===0) {
    return (
      <Grid container direction="column" style={{textAlign: "center",justifyContent:"space-evenly"}} sx={{mt:10}}>
        <h1>No NFTs listed</h1>
        <p>You need to create NFT that will give access to your collection ! </p>
      </Grid>
    )
  }else{
    return (
        <Grid container 
              direction="row" 
              style={{textAlign: "center",justifyContent:"space-evenly"}} 
              columnSpacing={2} 
              rowSpacing={4}
              sx={{px:2,mt:4}}>
        {backendNfts.map((nft)=>( 
          <Grid item xs={12} md={4}>       
            <GetNFT id={nft.tokenId} 
                    creatorInfo={nft.creator} 
                    buyable={false}
                    unique={true}/>  
            {!collectionNftsIds.includes(nft.tokenId)?
              <button className={FormStyles.formButton} 
                      variant="contained" 
                      alignItem='center' 
                      onClick={()=>addNftId(nft.tokenId)} >
                Add this NFT
              </button> :
              <button className={FormStyles.formButtonRemove} 
                      variant="contained" 
                      color="error" 
                      alignItem='center' 
                      onClick={()=>removeNftId(nft.tokenId)}>
                Remove this NFT
              </button>} 
          </Grid>     
        ))}
        </Grid>      
  )}
}