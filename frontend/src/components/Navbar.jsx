import React from 'react';
import styles from './Navbar.module.css';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { Typography } from '@mui/material';

const Navbar = () => {
	return (
		<>
			<Box className={styles.nav}>
				<Box className={styles.logo}>
					<Link to="/">
						<img
							className={styles.logoImage}
							src={logo}
							alt="this is image"
						/>
					</Link>
				</Box>
				<Box className={styles.navMenu}>
					<Link to="/">
						<Typography variant="h6" component="h1">
							Home
						</Typography>
					</Link>
					<a href="#contact">
						<Typography variant="h6" component="h1">
							Contact
						</Typography>
					</a>
				</Box>
				<Box sx={{ bgcolor: 'white', height: '20px' }}>
					<Button variant="contained" color="primary">
						<Link to="/dashboard">Dashboard</Link>
					</Button>
				</Box>
			</Box>
		</>
	);
};

export default Navbar;
