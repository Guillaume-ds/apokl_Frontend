import React from "react";
import { useRouter } from 'next/router';
import Image from 'next/image';
import Collectionstyles from '../../styles/Collection.module.scss'
import CreatorStyles from '../../styles/Creator.module.scss'

import AccountIcon from '@material-ui/icons/AccountCircle'
import UserPicture from '../../assets/images/user.png';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Grid from "@mui/material/Grid";
import { Button } from '@mui/material';

import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

export default function CardCreator({creator}) {
  const router = useRouter();
  console.log("là",creator)


	if(!creator){
		return(
		<Grid item 
			className={CreatorStyles.card} 
			sx={{ pt:5 }} 
			direction="column" 
			>
			<Image src={UserPicture} alt="Person" height="80px" width="80px"  sx={{m:2}}/>
			<p className={CreatorStyles.cardName}>No name</p>
				<Grid container className={CreatorStyles.cardCollections} direction="row" >
					<p className={CreatorStyles.numberCollections}>0 collections</p>
				</Grid>
			<Grid>
			<Button onClick={() => router.push('/account/')}>							
					<InstagramIcon/> 
				</Button>
				<Button onClick={() => router.push('/account/')}>							
					<TwitterIcon/> 
				</Button>
				<Button onClick={() => router.push('/account/')}>							
					<YouTubeIcon/> 
				</Button>
				
			</Grid>
		</Grid>
  );

	}else{
  return (
    <Grid item 
			className={CreatorStyles.card} 
			sx={{ pt:5 }} 
			direction="column" 
			>
			<Image src={creator.picture?creator.picture:UserPicture} alt="Person" height="80px" width="80px"  sx={{m:2}}/>
			<p className={CreatorStyles.cardName}>{creator.name}</p>
				<Grid container className={CreatorStyles.cardCollections} direction="row" >
					<p className={CreatorStyles.numberCollections}>{creator.collectionsCount} collections</p>
				</Grid>
			<Grid>
			<Button onClick={() => router.push('/account/')}>							
					<InstagramIcon/> 
				</Button>
				<Button onClick={() => router.push('/account/')}>							
					<TwitterIcon/> 
				</Button>
				<Button onClick={() => router.push('/account/')}>							
					<YouTubeIcon/> 
				</Button>
				
			</Grid>
		</Grid>
  );}
}