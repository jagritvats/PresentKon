import { Box, Typography } from '@mui/material';
import React from 'react';
import styles from './Home.module.css';

const Home = () => {
	return (
		<Box className={styles.home}>
			<Box className={styles.home_img}>
				<Typography variant="h3" component="h3">
					CHECK WHO'S PRESENT
				</Typography>
				<Typography variant="h5" component="h5">
					We provide Attentdance services using facial recognition
				</Typography>
			</Box>
		</Box>
	);
};

export default Home;
