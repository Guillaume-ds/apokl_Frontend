import React from "react";
import { useRouter } from 'next/router';
import Image from 'next/image';
import CreatorStyles from '../../styles/Creator.module.scss'

import UserPicture from '../../assets/images/user.png';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Grid from "@mui/material/Grid";
import { Button } from '@mui/material';

import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

export default function CardCreator({creator}) {
  const router = useRouter();

	if(!creator){
		return(
		<div className={CreatorStyles.col} ontouchstart="this.classList.toggle('hover');">
			<div className={CreatorStyles.container}>
				<div className={CreatorStyles.front}>
					<div className={CreatorStyles.inner}>
						<p>No creator</p>
						<span>0 collections</span>
					</div>
				</div>
				<div className={CreatorStyles.back}>
					<div className={CreatorStyles.inner}>
						<p>No creator with this name</p>
					</div>
				</div>
			</div>
		</div>
  );

	}else{
  return (
    <div className={CreatorStyles.col} ontouchstart="this.classList.toggle('hover');" onClick={()=>router.push(`/creators/${creator.name}`)}>
		<div className={CreatorStyles.container}>
			<div className={CreatorStyles.front} style={{ backgroundImage: `url(${creator.picture})` }}>
				<div className={CreatorStyles.inner}>
					<p>{creator.name}</p>
					<span>{creator.collectionsCount} collections</span>
				</div>
			</div>
			<div className={CreatorStyles.back}>
				<div className={CreatorStyles.inner}>
					<p className={CreatorStyles.description}>{creator.description}sss</p>
				</div>
			</div>
		</div>
	</div>
  );}
}

