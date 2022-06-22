import React from "react";
import { useRouter } from 'next/router';
import { Grid } from "@mui/material";

import CreatorStyles from '../../styles/Creator.module.scss';
import VariousStyle from '../../styles/Various.module.scss';

import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';


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
		function nbCollection (){
			try{
				return creator.collections.length
			}catch{
				return 0
			}
		}

		const SocialIcons = () =>{
			return(
				<Grid container 
					direction="row" 
					justifyContent="space-around"
					className={CreatorStyles.socialIconsContainer}
					>
					{
						creator.instagramUrl?
						<Grid item >
							<a href={creator.instagramUrl}
								className={CreatorStyles.socialIcon} >
							<InstagramIcon />
							</a>														
						</Grid>
						:
						null
					}
					{
						creator.twitterUrl?
						<Grid item>
							<a href={creator.twitterUrl}
							className={CreatorStyles.socialIcon}>
								<TwitterIcon />
							</a>
						</Grid>
						:
						null
					}
					{
						creator.youtubeUrl?
						<Grid item>
							<a href={creator.youtubeUrl}
							className={CreatorStyles.socialIcon}>
								<YouTubeIcon />
							</a>							
						</Grid>
						:
						null
					}

				</Grid>
			)
		}




  return (
    <div className={CreatorStyles.col} ontouchstart="this.classList.toggle('hover');" onClick={()=>router.push(`/creators/${creator.name}`)}>
		<div className={CreatorStyles.container}>
			<div className={CreatorStyles.front} style={{ backgroundImage: `url(${creator.picture})` }}>
				<div className={CreatorStyles.inner}>
					<p>{creator.name}</p>
					<span>{nbCollection()} collections</span>
				</div>
			</div>
			<div className={CreatorStyles.back}>
				<div className={CreatorStyles.inner}>					
					<div className={CreatorStyles.description}>{creator.description}</div>
					<p className={VariousStyle.separator40}></p>
					<div>
						<SocialIcons />
					</div>
				</div>
			</div>
		</div>
	</div>
  );}
}

