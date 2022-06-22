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

	const DisplayButtons = () =>{
		return(
			<Grid container direction="row" justifyContent="center">
				<Grid item width="120px" height="20px" sx={{my:{xs:1,md:0}}}>
				<div className={displayNft?ButtonStyles.divButtonActive:ButtonStyles.divButton} 
					onClick={()=>changeToDisplayNFT()}>NFT</div>
				</Grid>
				<Grid item width="120px" height="20px" sx={{my:{xs:1,md:0}}}>
				<div className={displayNft?ButtonStyles.divButton:ButtonStyles.divButtonActive} 
					onClick={()=>changeToDisplayCreator()}>Creator</div>
				</Grid>
			</Grid>
		)		
	}



	return (
	  <Layout>	
		<Grid 
			container 
			justifyContent="center" 
			alignItems="center"
			direction="column"
			sx={{px:{xs:1,md:6},mt:10}} > 

			<Grid 
				container 
				width="100%" 
				height="80vh" 
				style={{backgroundColor:"#f8f8ff"}} 
				justifyContent="center" 
				alignItems="center"
				alignContent="center">
				
					{displayNft?	
					<Grid item width={{xs:"100%",md:"50%",xl:"40%"}}>		
						<GetNftsBackend 
							id={[parseInt(id)]} 
							buyable={null} 
							unique={true} 
							creatorInfo={creatorInfo} 
							setCreatorInfo={setCreatorInfo}  />		
					</Grid>	
					:
					<Grid item width={{xs:"100%",md:"50%",xl:"40%"}} height='40vh'>
						<Artist 
							name={creatorInfo.name} 
							/>
					</Grid>
					}

				<Grid item sx={{my:5}} width="100%" >	
					<DisplayButtons />
				</Grid>
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

		
				
		<GetCollections nfts={[id]} />
	  </Layout>
	)
  }

