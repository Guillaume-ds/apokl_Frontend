import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';

import FooterStyles from '../styles/Footer.module.scss';

import { Grid } from '@mui/material';

const Footer = () => {

	return(
		<div className={FooterStyles.footer}>
			<Grid container direction="row" justifyContent="space-around">
				<Grid item>
					<h3 className={FooterStyles.footerTitle}>Create</h3>
					<Grid container direction="column">
						<a className={FooterStyles.footerLink} href='/nfts/create-nft'>Create NFT</a>
						<a className={FooterStyles.footerLink} href='/collection/create-collection'>Create collection</a>
					</Grid>
					
				</Grid>
				<Grid item>
				<h3 className={FooterStyles.footerTitle}>Market place</h3>
					<Grid container direction="column">
						<a className={FooterStyles.footerLink} href='/nfts/index'>NFT marketplace</a>
						<a className={FooterStyles.footerLink} href='/collection/index'>Collection marketplace</a>
					</Grid>
				</Grid>
				<Grid item>
				<h3 className={FooterStyles.footerTitle}>About Apokl</h3>
					<Grid container direction="column">
						<a className={FooterStyles.footerLink} href='/nfts/index'>About us</a>
						<a className={FooterStyles.footerLink} href='/collection/index'>More informations</a>
					</Grid>
				</Grid>		

			</Grid>
		</div>
	)

}

export default Footer;