import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import styles from './Register.module.css';
import { Link } from 'react-router-dom';

const Register = () => {
	return (
		<form className={styles.form}>
			<Box //container for the register page
				className={styles.register}
			>
				<Typography
					variant="h3"
					component="h1"
					sx={{ color: '#FF4F29' }}
				>
					REGISTER
				</Typography>
				<TextField
					id="outlined-basic"
					label="Name"
					variant="outlined"
					sx={{
						width: '50%',
					}}
				/>
				<TextField
					id="outlined-basic"
					label="Email"
					variant="outlined"
					sx={{
						width: '50%',
					}}
				/>
				<TextField
					id="outlined-password-input"
					label="Password"
					type="password"
					sx={{
						width: '50%',
					}}
				/>
				<TextField
					id="outlined-password-input"
					label="Confirm Password"
					type="password"
					sx={{
						width: '50%',
					}}
				/>
				<Link to="/login" className={styles.link}>
					Already have an account? Login
				</Link>
				<Button
					variant="contained"
					sx={{
						width: '7em',
						bgcolor: '#FF4F29',
					}}
					type="submit"
				>
					REGISTER
				</Button>
			</Box>
		</form>
	);
};

export default Register;
