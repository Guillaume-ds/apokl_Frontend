import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';
import Image from 'next/image';

import AuthenticationContext from '../../context/AuthenticationContext';
import NavbarStyles from '../styles/Navbar.module.scss';
import VariousStyles from '../styles/Various.module.scss';

import { Grid } from '@mui/material';
import { AppBar, Drawer, IconButton, Toolbar } from '@material-ui/core';

import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';

import { Box } from '@mui/system';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import MenuIcon from '@material-ui/icons/Menu';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountIcon from '@material-ui/icons/AccountCircle';

import Apokl from '../assets/images/logo.png';


function stringToColor(string) {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  return color;
} /*Mui function for avatar color*/

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}`,
  };
}/*Mui function for avatar name*/



const Nav = (props) => {

  const [toggle, setToggle] = useState(false)
  const router = useRouter()	
  
  const {user, logout, creator} = useContext(AuthenticationContext)

	const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const toggleDrawer = (value) => (event) => {
  	if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {return}
  	setToggle(value)
  }/*Mui function for general menu*/

  const handleLogout = async e => {
  	e.preventDefault()
  	await logout()
  }

	const UserIcon = () => {
		if(creator){
			try{
				const creatorPicture = creator.picture
				return(	
					<>
					{creatorPicture ?
						<Image src={creator.picture} width={40} height={40} className={NavbarStyles.creatorPicture}/> 
						:
						<Avatar {...stringAvatar(user.username)} />
					}		
					</>
				)
			}catch{
				return (
					<Avatar {...stringAvatar(user.username)} />
				)
			}	
		}else{
			return (
				<Avatar {...stringAvatar(user.username)} />
			)
		}
	}

	if(user){
  	return (
    	<AppBar postion='static'>
    		<Toolbar className={NavbarStyles.navbarTop}>

    			<IconButton edge='start'  color='inherit' aria-label='menu' onClick={toggleDrawer(true)}>
    				<MenuIcon className={NavbarStyles.menuIcon}/>
    			</IconButton>

				<Drawer
					anchor={'left'}
					open={toggle}
					onClose={toggleDrawer(!toggle)}>
				
					<Box sx={{
						width: 270,
						height: '100%'}}
						className={NavbarStyles.drawerBox}>

						<Grid item			
									textAlign="center">
							{user?
							<div className={NavbarStyles.cardUser} >
								<UserIcon  />	
								<p className={NavbarStyles.username} >
									{user.username}
								</p>
							</div>
								:
							<div className={NavbarStyles.cardUser} >
								<AccountIcon />
								<p sx={{mx:5}}
									className={NavbarStyles.navbarLink}
									onClick={() => router.push('/account/login')}>
											Welcome, please log in 
								</p>
							</div>}
						</Grid>						
							
						<Accordion expanded={expanded === 'panel2'} 
								onChange={handleChange('panel2')}  
								sx={{mx:2,my:2,pl:2}} 
								className={NavbarStyles.accordionTitle}>

							<AccordionSummary
								aria-controls="panel2bh-content"
								id="panel2bh-header"
							>
								
								Market place
							</AccordionSummary>

							<AccordionDetails>
								<ListItem button component="a" href='/collections/' className={NavbarStyles.navButton} >												
										<ListItemText primary='Collections' sx={{pl:1}} />
								</ListItem>											
								<ListItem button component="a" href='/nfts/' className={NavbarStyles.navButton} >												
										<ListItemText primary='Nfts' sx={{pl:1}} />
								</ListItem>
								<ListItem button component="a" href='/creators/' className={NavbarStyles.navButton} >												
										<ListItemText primary='Creators' sx={{pl:1}} />
								</ListItem>
							</AccordionDetails>
						</Accordion>
						
						<Accordion expanded={expanded === 'panel3'} 
								onChange={handleChange('panel3')}  
								sx={{mx:2,my:2,pl:2}} 
								className={NavbarStyles.accordionTitle}>
							<AccordionSummary
								aria-controls="panel3bh-content"
								id="panel3bh-header"
							>
								
								Create
							</AccordionSummary>
							<AccordionDetails >
								<ListItem button component="a" href='/collections/create-collection' className={NavbarStyles.navButton} >												
										<ListItemText primary='Collection' sx={{pl:1}} />
								</ListItem>
								<ListItem button component="a" href='/nfts/create-nft' className={NavbarStyles.navButton} >												
										<ListItemText primary='Nft' sx={{pl:1}} />
								</ListItem>											
							</AccordionDetails>
						</Accordion>

						<Accordion expanded={expanded === 'panel4'} 
								onChange={handleChange('panel4')}  
								sx={{mx:2,my:2,pl:2}} 
								className={NavbarStyles.accordionTitle}>
							<AccordionSummary
								aria-controls="panel4bh-content"
								id="panel4bh-header"
							>
								My assets
							</AccordionSummary>
							<AccordionDetails>

								<ListItem button component="a" href='/my-access' className={NavbarStyles.NavButton} >												
										<ListItemText primary='My exclusive accesses' sx={{pl:1}} />
								</ListItem>

								<Grid 
									item      
									className={VariousStyles.separator80}
									sx={{my:1, mr:"30%"}}>
								</Grid>

								<ListItem button component="a" href='/collections/my-collections' className={NavbarStyles.NavButton} >												
										<ListItemText primary='My Collections' sx={{pl:1}} />
								</ListItem>
								<ListItem button component="a" href='/collections/my-collections' className={NavbarStyles.NavButton} >												
										<ListItemText primary='Created Collections' sx={{pl:1}} />
								</ListItem>

								<Grid 
									item      
									className={VariousStyles.separator80}
									sx={{my:1, mr:"30%"}}>
								</Grid>

								<ListItem button onClick={()=>router.push(
											{ pathname: '/nfts/my-nfts' , 
											query: { message: 'Owned' } }, 
											'/nfts/my-nfts'
											)} 
											className={NavbarStyles.NavButton} >												
										<ListItemText primary='Owned Nfts' sx={{pl:1}} />
								</ListItem>		
								<ListItem button component="a" href='/nfts/my-nfts' className={NavbarStyles.NavButton} >												
										<ListItemText primary='Created Nfts' sx={{pl:1}} />
								</ListItem>		

							</AccordionDetails>
						</Accordion>

						<Accordion expanded={expanded === 'panel1'}  
								onChange={handleChange('panel1')} 
								sx={{mx:2, my:0, pl:2}} 
								className={NavbarStyles.accordionTitle}>
							<AccordionSummary
								justifyContent="flex-end"
								aria-controls="panel1bh-content"
								id="panel1bh-header"
							>
								
								My account
								
							</AccordionSummary>
							<AccordionDetails >
								<ListItem button component="a" href='/account/' className={NavbarStyles.navButton} >												
										<ListItemText primary='My account' sx={{pl:1}} />
								</ListItem>
								<ListItem button component="a" href='/my-dashboard' className={NavbarStyles.NavButton} >												
										<ListItemText primary='My dashboard' sx={{pl:1}} />
								</ListItem>	
							</AccordionDetails>
						</Accordion>
						

						<Box  
							container
							position="fixed"  
							sx={{ top: 'auto',bottom: 0,
									width: 270}}
							align="center"
							justify="center"
							className={NavbarStyles.boxBottom}
							>
								{user?
								<Button onClick={handleLogout}  sx={{justifyContent: 'center', width:'100%'}}>							
									<ListItemIcon><LogoutIcon /></ListItemIcon> 
									<p>Logout</p>
								</Button>									
								:
								<Button onClick={() => router.push('/account/login')}  sx={{justifyContent: 'center', width:'100%'}}>							
									<ListItemIcon><LoginIcon /></ListItemIcon> 
									<p>Login</p>
								</Button>}												
							</Box>
					</Box>

				</Drawer>
						
				<Link href='/' >
					<IconButton >
						<Image src={Apokl} width={180} height={50} />
					</IconButton>
				</Link>

				{user?
				<Button onClick={() => router.push('/account/')}>			
					<UserIcon  />							
				</Button>	:
				<a href="/account/login" className={NavbarStyles.loginLink}>							
					Login
				</a>}
				</Toolbar>			
			</AppBar>
		)
	}else{
		return (
			<AppBar postion='static'>
				<Toolbar className={NavbarStyles.navbarTop}>
		
					<IconButton edge='start'  color='inherit' aria-label='menu' onClick={toggleDrawer(true)}>
						<MenuIcon className={NavbarStyles.menuIcon}/>
					</IconButton>
		
				<Drawer
					anchor={'left'}
					open={toggle}
					onClose={toggleDrawer(!toggle)}>
				
					<Box sx={{
						width: 270,
						height: '100%'}}
						className={NavbarStyles.drawerBox}>
		
						<Grid item			
									textAlign="center">
							<div className={NavbarStyles.cardUser} >
								<AccountIcon />
								<p sx={{mx:5}}
									className={NavbarStyles.navbarLink}
									onClick={() => router.push('/account/login')}>
											Welcome, please log in 
								</p>
							</div>
						</Grid>						
							
						<Accordion expanded={expanded === 'panel2'} 
								onChange={handleChange('panel2')}  
								sx={{mx:2,my:2,pl:2}} 
								className={NavbarStyles.accordionTitle}>
		
							<AccordionSummary
								aria-controls="panel2bh-content"
								id="panel2bh-header">
								Market place
							</AccordionSummary>
		
							<AccordionDetails>
								<ListItem button component="a" href='/collections/' className={NavbarStyles.navButton} >												
										<ListItemText primary='Collections' sx={{pl:1}} />
								</ListItem>											
								<ListItem button component="a" href='/nfts/' className={NavbarStyles.navButton} >												
										<ListItemText primary='Nfts' sx={{pl:1}} />
								</ListItem>
								<ListItem button component="a" href='/creators/' className={NavbarStyles.navButton} >												
										<ListItemText primary='Creators' sx={{pl:1}} />
								</ListItem>
							</AccordionDetails>
						</Accordion>
						
						<Accordion expanded={expanded === 'panel3'} 
								onChange={handleChange('panel3')}  
								sx={{mx:2,my:2,pl:2}} 
								className={NavbarStyles.accordionTitle}>
							<AccordionSummary
								aria-controls="panel3bh-content"
								id="panel3bh-header">	
								Create
							</AccordionSummary>
							<AccordionDetails >

							<Button onClick={() => router.push('/account/login')}  sx={{justifyContent: 'center', width:'100%'}}>							
									<ListItemIcon><LoginIcon /></ListItemIcon> 
									<p>Login</p>
								</Button>	
										
							</AccordionDetails>
						</Accordion>
		
						<Accordion expanded={expanded === 'panel4'} 
								onChange={handleChange('panel4')}  
								sx={{mx:2,my:2,pl:2}} 
								className={NavbarStyles.accordionTitle}>
							<AccordionSummary
								aria-controls="panel4bh-content"
								id="panel4bh-header">
								My assets
							</AccordionSummary>
							<AccordionDetails>

								<Button onClick={() => router.push('/account/login')}  sx={{justifyContent: 'center', width:'100%'}}>							
									<ListItemIcon><LoginIcon /></ListItemIcon> 
									<p>Login</p>
								</Button>	

							</AccordionDetails>
						</Accordion>
		
						<Accordion expanded={expanded === 'panel1'}  
								onChange={handleChange('panel1')} 
								sx={{mx:2, my:0, pl:2}} 
								className={NavbarStyles.accordionTitle}>
							<AccordionSummary
								justifyContent="flex-end"
								aria-controls="panel1bh-content"
								id="panel1bh-header">
								My account	
							</AccordionSummary>
							<AccordionDetails >

								<Button onClick={() => router.push('/account/login')}  sx={{justifyContent: 'center', width:'100%'}}>							
									<ListItemIcon><LoginIcon /></ListItemIcon> 
									<p>Login</p>
								</Button>	

							</AccordionDetails>
						</Accordion>
						
		
						<Box  
							container
							position="fixed"  
							sx={{ top: 'auto',bottom: 0,
									width: 270}}
							align="center"
							justify="center"
							className={NavbarStyles.boxBottom}>
								<Button onClick={() => router.push('/account/login')}  sx={{justifyContent: 'center', width:'100%'}}>							
									<ListItemIcon><LoginIcon /></ListItemIcon> 
									<p>Login</p>
								</Button>											
							</Box>
					</Box>
		
				</Drawer>
						
				<Link href='/' >
					<IconButton >
						<Image src={Apokl} width={180} height={50} />
					</IconButton>
				</Link>
				<a href="/account/login" className={NavbarStyles.loginLink}>							
					Login
				</a>
				</Toolbar>			
			</AppBar>
		)
	}
}

export default Nav;




