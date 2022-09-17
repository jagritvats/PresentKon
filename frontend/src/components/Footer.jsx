import React from 'react';
import Box from '@mui/material/Box';
import styles from './Footer.module.css';
import { Typography } from '@mui/material';


const Footer = () => {
	return (
		<div id='contact'>
			{/* <h2>Footer</h2> */}

			<Box className={styles.footer}>
				{/* this is footer. */}
				<Box className={styles.footerLeft}>
					<Typography variant='h3' component='h2'>
						Present Kon
					</Typography>
				</Box>
				<Box className={styles.footerCenter}>
					<Typography variant='h6' component='h2'>
						Made by team Logicode for HTM 3.0
					</Typography>
				</Box>

				<Box className={styles.footerRight}>
					<Typography variant='h6' component='h2'>
						{/* HelpDesk */}
						<a href = "mailto: presentkon@gmail.com">Email: presentkon@gmail.com</a>
					</Typography>
				</Box>
			</Box>

		</div>
	);
};

export default Footer;
