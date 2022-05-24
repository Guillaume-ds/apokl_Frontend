import GetCreator from "../../components/Creators/getCreator"
import { useRouter } from 'next/router'
import Layout from "../../hocs/Layout"
import { Grid } from "@mui/material"

const Creator = () => {
    const router = useRouter()
	const name = router.query.name

    return(
        <Layout>
            <Grid container justifyContent="space-around">
                <GetCreator creator={name} />
            </Grid>
        </Layout>
        
    )

}

export default Creator;