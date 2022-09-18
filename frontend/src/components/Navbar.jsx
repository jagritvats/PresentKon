import React from 'react';
import styles from './Navbar.module.css';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { Typography } from '@mui/material';
import { useState } from 'react';

const Navbar = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const logIn = () => {
		console.log('login');
		setIsLoggedIn(true);
	};

	const func = () => {
		if (isLoggedIn) {
			return (
				<Box className={styles.navBtn}>
					<Link to="/dashboard">
						<Button variant="contained" color="primary">
							Dashboard
						</Button>
					</Link>
				</Box>
			);
		} else {
			return (
				<Box className={styles.navBtn}>
					<Button
						variant="contained"
						color="primary"
						onClick={() => logIn()}
					>
						<Link to="/">Log In</Link>
					</Button>
				</Box>
			);
		}
	};

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
					<Link id={styles.home} to="/">
						<Typography variant="h6" component="h1">
							Home
						</Typography>
					</Link>
					<a id={styles.contact} href="#contact">
						<Typography variant="h6" component="h1">
							Contact
						</Typography>
					</a>
				</Box>

				{func()}
			</Box>
		</>
	);
};

export default Navbar;
