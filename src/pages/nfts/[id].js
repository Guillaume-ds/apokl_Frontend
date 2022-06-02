import React, {useState} from "react";
import Layout from '../../hocs/Layout';
import { useRouter } from 'next/router'

import GetNftsBackend from "../../components/NFT/getNftsBackend";
import GetCollections from "../../components/collections/getCollections";

import { Grid } from "@mui/material";
import Artist from "../../components/Creators/artist";

import ButtonStyles from "../../styles/Button.module.scss";
import VariousStyles from '../../styles/Various.module.scss';

export default function Nft() {
	const router = useRouter()
	const slug = router.query
	const id = slug.id
	const [creatorInfo, setCreatorInfo] = useState({})
	const [displayNft,setDisplayNft] = useState(true)
	
	function changeToDisplayNFT(){
		if(!displayNft){
			setDisplayNft(true)
		}		
	}
	function changeToDisplayCreator(){
		if(displayNft){
			setDisplayNft(false)
		}		
	}




	return (
	  <Layout>	
		<Grid 
			container 
			justifyContent="center" 
			alignItems="center"
			direction="column"
			sx={{px:6,mt:10}} > 

			<Grid 
				container 
				width="100%" 
				height="70vh" 
				style={{backgroundColor:"#f8f8ff"}} 
				justifyContent="center" 
				alignItems="center"
				alignContent="center">
				
					{displayNft?	
					<Grid item width={{xs:"90%",md:"50%",xl:"40%"}}>		
						<GetNftsBackend 
							id={[parseInt(id)]} 
							buyable={null} 
							unique={true} 
							creatorInfo={creatorInfo} 
							setCreatorInfo={setCreatorInfo}  />		
					</Grid>	
					:
					<Grid item width={{xs:"90%",md:"50%",xl:"40%"}}>
						<Artist 
							name={creatorInfo.name} />
					</Grid>
					}
				
			</Grid>

			<Grid item sx={{my:5}}>
				
					{
						displayNft?
						<Grid container direction="row" justifyContent="center">
							<Grid item width="120px">
							<div className={ButtonStyles.divButtonActive} 
								onClick={()=>changeToDisplayNFT()}>NFT</div>
							</Grid>
							<Grid item width="120px">
							<div className={ButtonStyles.divButton} 
								onClick={()=>changeToDisplayCreator()}>Creator</div>
							</Grid>
						</Grid>

						:

						<Grid container direction="row" justifyContent="center">
							<Grid item width="120px">
							<div className={ButtonStyles.divButton} 
								onClick={()=>changeToDisplayNFT()}>NFT</div>
							</Grid>
							<Grid item width="120px">
							<div className={ButtonStyles.divButtonActive} 
								onClick={()=>changeToDisplayCreator()}>Creator</div>
							</Grid>
						</Grid>
					}
					
			</Grid>			
		</Grid>
		<Grid 
			item      
			className={VariousStyles.separatorGradient}
			sx={{my:7}}>
		</Grid>
		<Grid 
			item      
			width="100%"
			textAlign="center"
			sx={{pt:5}}>
				<h1>Collection it gives access to :</h1>
		</Grid>

		
				
		<GetCollections nfts={[1]} />
	  </Layout>
	)
  }

