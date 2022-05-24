import React, {useState} from "react";
import Layout from '../../hocs/Layout';
import { useRouter } from 'next/router'
import GetNftsBackend from "../../components/NFT/getNftsBackend";
import GetCollections from "../../components/collections/getCollections";
import { Grid } from "@mui/material";
import Artist from "../../components/Creators/artist";

export default function Nft() {
	const router = useRouter()
	const slug = router.query
	const id = slug.id
	const [creatorInfo, setCreatorInfo] = useState({})
	const [displayNft,setDisplayNft] = useState(true)
	console.log(creatorInfo)
	function Toggle(){
		setDisplayNft(!displayNft)
	}




	return (
	  <Layout>	
		<Grid 
			container 
			justifyContent="space-around" 
			sx={{px:6,mt:15}} > 
		<Grid item xs={11} sm={9} md={6} lg={4}>
			{displayNft?
			<GetNftsBackend id={[parseInt(id)]} buyable={null} unique={true} creatorInfo={creatorInfo} setCreatorInfo={setCreatorInfo}  />
			:
			<Artist name={creatorInfo.name} />
			}			
			
			<button onClick={()=>Toggle()}>click me</button>
		</Grid>
			
		</Grid>

		<h1>Collection it gives access to :</h1>
				
		<GetCollections nfts={id}/>
	  </Layout>
	)
  }

