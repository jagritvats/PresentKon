import { Box, Button, TextField } from '@mui/material';
import React from 'react';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';

const Login = () => {
	return (
		<form className={styles.form}>
			<Box
				className={styles.login}
				sx={{
					backgroundColor: '#FFFFFF',
					border: 1,
					borderColor: '#494848',
				}}
			>
				<TextField
					className={styles.email}
					id="outlined-basic"
					label="Email"
					variant="outlined"
				/>
				<TextField
					className={styles.password}
					id="outlined-password-input"
					label="Password"
					type="password"
					autoComplete="current-password"
				/>
				<Link to="/Register" className={styles.link}>
					Don't have an Account? Register Now!
				</Link>
				<Button
					variant="contained"
					sx={{
						width: '9em',
					}}
					type="submit"
				>
					Login
				</Button>
			</Box>
		</form>
	);
};

export default Login;
