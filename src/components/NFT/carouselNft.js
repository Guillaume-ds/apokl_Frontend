import React, {useState, useEffect} from "react";
import { loadNFT,getNftBackend } from "./functionNFT";

import CardNft from "./cardNft";
import CollectionStyles from '../../styles/Collection.module.scss';

import { Grid } from "@mui/material";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const CarouselNFT = (creatorName, id, tags) =>{
	const [backendNfts, setBackendNfts] = useState([])
	const [nextBackendUrl,setNextBackendUrl]=useState(null)
	const [previousBackendUrl,setPreviousBackendUrl]=useState(null)
	const [carouselIndex,setCarouselIndex] = useState(0)
	const [loaded,setLoaded] = useState(false)
	const [nfts, setNfts] = useState([])
	const searchURL = "http://localhost:8000/api/nfts/search-nfts"

	useEffect(() => {
		fetchNft(searchURL)
	}, [tags,creatorName,id])


	async function fetchNft(url){

		const res = await getNftBackend(url,creatorName=creatorName,id=id)   
		
		setNextBackendUrl(res.nextBackendUrl)
		setPreviousBackendUrl(res.previousBackendUrl)
				
		setBackendNfts(res.nfts)

		let nftsArray = []
		for (let i = 0;i<res.nfts.length;i++){
				const nft = await loadNFT(res.nfts[i].tokenId)
				nftsArray = [...nftsArray,nft]				
		}
		setNfts(nftsArray)
		setLoaded(true)
		}
	if(!loaded){return(null)}
	return(
		<Grid container 
		direction='row' 
		justifyContent='space-around' 
		alignItems='center' 
		columnSpacing={{ sm: 2, md:4}}
		sx={{px:{xs:1,md:3}}}>	
		<Grid item style={{textAlign: "right"}}>
			{carouselIndex>0?
				<ArrowCircleLeftIcon onClick={()=>setCarouselIndex(carouselIndex-1)} fontSize='large' style={{color:"#004691"}} />
				:
				<ArrowCircleLeftIcon style={{color:"#96aac8"}} />
			}	
		</Grid>
		<Grid item 
			key={carouselIndex} 
			sm={3} 
			sx={{ display: { xs: 'none', sm: 'block' } }} 
			style={{textAlign: "center"}} 
			className={CollectionStyles.carouselCollection}
		>			
			<CardNft  nft={nfts[carouselIndex]} />
		</Grid>	
		<Grid item 
			key={carouselIndex+3} 						
			xs={10} 
			sm={4} 
			style={{textAlign: "center"}}
			className={CollectionStyles.carouselCollectionMain}
		>				
		<CardNft  nft={nfts[carouselIndex+1]} />
		</Grid>		
		<Grid item 
			key={carouselIndex+6} 
			sm={3} 
			sx={{ display: { xs: 'none', sm: 'block' } }} 
			style={{textAlign: "center"}} 
			className={CollectionStyles.carouselCollection}
		>				
			<CardNft  nft={nfts[carouselIndex+2]} />
		</Grid>	
		<Grid item style={{textAlign: "left"}}>			
			{carouselIndex<nfts.length-3?
				<ArrowCircleRightIcon onClick={()=>setCarouselIndex(carouselIndex+1)} fontSize='large' style={{color:"#004691"}} />:
				<ArrowCircleRightIcon style={{color:"#96aac8"}} />
			}
		</Grid>								
	</Grid>
	)
}

export default CarouselNFT;