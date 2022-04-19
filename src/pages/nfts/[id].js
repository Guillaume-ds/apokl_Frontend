import React from "react";
import Layout from '../../hocs/Layout';
import { useRouter } from 'next/router'
import GetNft from "../../components/NFT/getNft";
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
				<GetNft id={id} />
				</Grid>
			</Grid>
	  </Layout>
	)
  }

