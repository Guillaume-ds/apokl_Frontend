import React from "react";
import { useRouter } from 'next/router';

import CreatorStyles from '../../styles/Creator.module.scss'


export default function CardCreator({creator}) {
  const router = useRouter();
	console.log(creator)
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
					<p className={CreatorStyles.description}>{creator.description}</p>
				</div>
			</div>
		</div>
	</div>
  );}
}

