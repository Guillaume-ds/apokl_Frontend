import React from "react";
import Layout from '../../hocs/Layout';
import { useRouter } from 'next/router'
import CardNft from "../../components/NFT/ownedNftsgetNft";
import { Grid } from "@mui/material";

export default function Nft() {
	const router = useRouter()
	const slug = router.query
	const id = slug.id

	return (
	  <Layout>
		  <Grid 
				container
				direction="column"
				alignItems="center"
				justifyContent="center" 
				sx={{mt:10}}>
					<Grid item >
				<CardNft id={id} />
				</Grid>
			</Grid>
	  </Layout>
	)
  }

