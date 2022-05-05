import React from "react";
import Layout from '../../hocs/Layout';
import { useRouter } from 'next/router'
import GetNftsBackend from "../../components/NFT/getNftsBackend";
import GetCollections from "../../components/collections/getCollections";
import { Grid } from "@mui/material";

export default function Nft() {
	const router = useRouter()
	const slug = router.query
	const id = slug.id
	console.log(id)

	return (
	  <Layout>					
		<GetNftsBackend id={[parseInt(id)]} creator={""} buyable={false}/>
			<h1>Collection it gives access to :</h1>
					
			<GetCollections nfts={id}/>
	  </Layout>
	)
  }

