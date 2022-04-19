import Layout from '../hocs/Layout';
import Image from 'next/image';
import Link from 'next/link';

import GetNft from "../components/NFT/getNft";

import Grid from "@mui/material/Grid";
import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

import influenceur_nft from '../assets/images/influenceur_nft.jpg';
import entreprise_nft from '../assets/images/entreprise_nft.png';
import client_nft from '../assets/images/client_nft.jpg';

import metamask from "../assets/images/metamask.PNG";
import blockchain from "../assets/images/blockchain.png";
import nft from "../assets/images/nft.png";
import Apokl from '../assets/images/logo.png';
import styles from '../styles/Home.module.scss';


export default function Home() {
  return (
    <Layout
			title='Apokl | NFT social place'
			content='New NFT market place with exclusive access'>
        <Grid className={styles.accueil} id="accueil"  container direction="row" justifyContent="center" alignItems="center" sx={{pb:15}}>
            <Grid item md={7}>
              <Image src={Apokl} height='100px' alt="Apokl Logo" />
              <Typography textAlign={"left"} variant="h3" color={"#fce4ec"} sx={{py:3}}>
              Exclusivity by NFT
              </Typography>
              <Typography textAlign={"left"} variant="h5" color={"#fce4ec"} sx={{py:2}}>
              Exploit the full potential of the NFT on a single plateform.
              </Typography>
            </Grid>
            <Grid item md={4} display={{ xs: 'none', md: 'block' }}>
              <GetNft id={1}/>
            </Grid>
            
          <Grid container direction="column" justifyContent="center" alignItems="center" className={styles.gridBottom} sx={{py:3}}>
              <Grid item>
              <div className={styles.scrolldown}>
                  <div className={styles.chevrons}>
                      <div className={styles.chevrondown}></div>
                      <div className={styles.chevrondown}></div>
                  </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
				<Container>
      
      <Grid container justifyContent="center" alignItems="center" sx={{mt:8}}>
        <Grid direction={{xs:"column", sm:"row"}} sx={{display:{ xs: 'flex', md: 'inline-flex' }}} my={4}>
          <Grid item xs={12} sm={5}
                sx={{alignSelf:{xs:'center',sm:'left' }}}>
            <Image src={influenceur_nft} height={150} width={150} alt=""></Image>
          </Grid>
          <Grid item xs={0} sm={1}/>
          <Grid item xs={12} sm={6} 
              sx={{margin:{xs:1,sm:3}}}>
            <h2>Pour les artistes et les créateurs de contenu</h2>
            <p>Améliorez vos campagnes marketing et vos relations clients par le biais des NFT, tout en profitant d'un ROI garanti</p>
          </Grid>
        </Grid>
        <Grid direction={{xs:"column-reverse", sm:"row"}} 
              sx={{display:{ xs: 'flex', md: 'inline-flex' }}} 
              my={4}>
          <Grid item xs={12} sm={6}
              sx={{margin:{xs:1,sm:3}}}> 
            <h2>Pour les influenceurs</h2>
            <p>Aidez les entreprises et les artistes à toucher un public plus large et bénéficiez d'une rémunération liée à votre performance</p>
          </Grid>
          <Grid item xs={0} sm={1}/>
          <Grid item xs={12} sm={5} 
                sx={{ alignSelf:{xs:'center',sm:'right' } }}>
            <Image src={entreprise_nft} height='200px' alt=""></Image>
          </Grid>          
        </Grid>
        <Grid direction={{xs:"column", sm:"row"}} sx={{display:{ xs: 'flex', md: 'inline-flex' }}} my={4}>
          <Grid item xs={12} sm={5} 
                sx={{ alignSelf:{xs:'center',sm:'left' } }}>
            <Image src={client_nft} height='200px' alt=""></Image>
          </Grid>
          <Grid item xs={0} sm={1}/>
          <Grid item xs={12} sm={6}
                sx={{margin:{xs:1,sm:3}}}>
            <h2>Pour les artistes et les créateurs de contenu</h2>
            <p>Améliorez vos campagnes marketing et vos relations clients par le biais des NFT, tout en profitant d'un ROI garanti</p>
          </Grid>
        </Grid>
      </Grid>
      <Grid direction={{xs:"column", sm:"row"}} sx={{display:{ xs: 'flex', md: 'inline-flex' }, justifyContent:'space-between'}} my={15}>
      <Card sx={{maxWidth:{xs:'100%',sm:'20%'},
								height:600,
                boxShadow: 0,
                marginBottom:{xs:5,sm:0}}}>
        <CardActionArea>
          <Image
            src={metamask}
            alt="Metamask"
						layout='responsive'
          />
          <CardContent>
            <Typography gutterBottom align="center" component="div">
            	<h3>Connectez votre wallet crypto à votre compte Kalix</h3>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
			<Link href='/'>
      <Card sx={{ maxWidth:{xs:'100%',sm:'20%'},
									height:600,
                  boxShadow: 0,
                  marginBottom:{xs:5,sm:0}}}
                  >
        <CardActionArea>
          <Image
            src={nft}
            alt="NFT"
						layout='responsive'
          />
          <CardContent>
            
            <Typography gutterBottom align="center"  component="div" >
              <h3>Créez vos propres NFT, selon vos conditions</h3>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
			</Link>
      <Card sx={{ maxWidth:{xs:'100%',sm:'20%'},
									height:600,
                  boxShadow: 0,
                  marginBottom:{xs:5,sm:0}}}>
        <CardActionArea >
          <Image
            src={blockchain}
            alt="Blockchain"
						layout='responsive'

          />
          <CardContent sx={{alignItems: 'flex-end'}}>
            <Typography gutterBottom align="center" component="div">
              <h3>Commencez à vendre ou à distribuer vos NFT</h3>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>    
      </Grid>    
    </Container> 
    </Layout>
  )
}
