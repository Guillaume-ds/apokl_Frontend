import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';
import Image from 'next/image';

import AuthenticationContext from '../../context/AuthenticationContext';
import NavbarStyles from '../styles/Navbar.module.scss';

import { Grid } from '@mui/material';
import { AppBar, Drawer, IconButton, Toolbar } from '@material-ui/core';

import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';

import { Box } from '@mui/system';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';

import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import MenuIcon from '@material-ui/icons/Menu';
import BrushIcon from '@mui/icons-material/Brush';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountIcon from '@material-ui/icons/AccountCircle';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';





import Apokl from '../assets/images/logo.jpg';


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
  
  const {user, logout} = useContext(AuthenticationContext)

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
  }/*Mui function for logout*/

  return (
    	<AppBar postion='static'  style={{ background: '#004491' }}>
    		<Toolbar className={NavbarStyles.navbarTop}>

    			<IconButton edge='start'  color='inherit' aria-label='menu' onClick={toggleDrawer(true)}>
    				<MenuIcon />
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
										<AccountIcon />
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

								<div >
									
									<Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}  sx={{mx:2,my:1,pl:2}} className={NavbarStyles.accordionTitle}>
										<AccordionSummary
											aria-controls="panel2bh-content"
											id="panel2bh-header"
										>
											<ShoppingCartIcon />
											<Typography sx={{pl:2, width: '100%', flexShrink: 0 }}>Market place</Typography>
										</AccordionSummary>
										<AccordionDetails>
											<ListItem button component="a" href='/collections/' className={NavbarStyles.navButton} >												
													<ListItemText primary='Collections' sx={{pl:1}} />
											</ListItem>
											<ListItem button component="a" href='/creators/' className={NavbarStyles.navButton} >												
													<ListItemText primary='Creators' sx={{pl:1}} />
											</ListItem>
											<ListItem button component="a" href='/nfts/' className={NavbarStyles.navButton} >												
													<ListItemText primary='Nfts' sx={{pl:1}} />
											</ListItem>
										</AccordionDetails>
									</Accordion>
									<Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}  sx={{mx:2,my:1,pl:2}} className={NavbarStyles.accordionTitle}>
										<AccordionSummary
											aria-controls="panel3bh-content"
											id="panel3bh-header"
										>
											<BrushIcon />
											<Typography sx={{pl:2, width: '100%', flexShrink: 0 }}>Create</Typography>
										</AccordionSummary>
										<AccordionDetails >
											<ListItem button component="a" href='/nfts/create-nft' className={NavbarStyles.navButton} >												
													<ListItemText primary='Nft' sx={{pl:1}} />
											</ListItem>
											<ListItem button component="a" href='/collections/create-collection' className={NavbarStyles.navButton} >												
													<ListItemText primary='Collection' sx={{pl:1}} />
											</ListItem>
										</AccordionDetails>
									</Accordion>
									<Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}  sx={{mx:2,my:1,pl:2}} className={NavbarStyles.accordionTitle}>
										<AccordionSummary
											aria-controls="panel4bh-content"
											id="panel4bh-header"
										>
											<MeetingRoomIcon />
											<Typography sx={{pl:2, width: '100%', flexShrink: 0 }}>Rooms</Typography>
										</AccordionSummary>
										<AccordionDetails>
										<ListItem button component="a" href='/nfts/my-assets' className={NavbarStyles.NavButton} >												
													<ListItemText primary='My Nfts' sx={{pl:1}} />
											</ListItem>
											<ListItem button component="a" href='/collections/my-collections' className={NavbarStyles.NavButton} >												
													<ListItemText primary='My collections' sx={{pl:1}} />
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
											<AccountIcon />
											<Typography sx={{pl:2,width: '100%', flexShrink: 0 }} >
												Account
											</Typography>
										</AccordionSummary>
										<AccordionDetails >
											<ListItem button component="a" href='/account/' className={NavbarStyles.navButton} >												
													<ListItemText primary='My account' sx={{pl:1}} />
											</ListItem>
											<ListItem button component="a" href='/account/change-password' className={NavbarStyles.navButton} >												
													<ListItemText primary='Change password' sx={{pl:1}} />
											</ListItem>
										</AccordionDetails>
									</Accordion>
								</div>

								<Box  
									container
									position="fixed" 
									color="primary" 
									sx={{ top: 'auto',bottom: 0,	
												backgroundColor: 'rgba(175, 175, 175, .5)', 
												width: 270}}
									align="center"
									justify="center">
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
							<IconButton>
								<Image src={Apokl} height={30} width={130}/>
							</IconButton>
						</Link>
						{user?
						<Button onClick={() => router.push('/account/')}>							
							<Avatar {...stringAvatar(user.username)} />
						</Button>	:
						<a href="/account/login" className={NavbarStyles.link}>							
							Login
						</a>}
						</Toolbar>			
			</AppBar>
  )
}

export default Nav;