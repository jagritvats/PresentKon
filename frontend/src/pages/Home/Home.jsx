import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import styles from './Home.module.css';
import MainArt from '../../assets/MainArt.svg';
import Face from '../../assets/face.png';
import Student from '../../assets/student.png';
import Attendance from '../../assets/attendance.png';
import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<Box className={styles.home}>
			<Box className={styles.home_top}>
				<Box className={styles.home_sub}>
					<Typography
						variant="h4"
						component="h4"
						className={styles.home_check}
					>
						CHECK WHO'S
					</Typography>
					<Typography
						variant="h4"
						component="h4"
						className={styles.home_present}
					>
						Present
					</Typography>
					<Typography
						variant="h5"
						component="h5"
						className={styles.home_we}
					>
						We provide Attentdance
					</Typography>
					<Typography
						variant="h5"
						component="h5"
						className={styles.home_services}
					>
						services using{' '}
					</Typography>
					<Typography
						variant="h5"
						component="h5"
						className={styles.home_facial}
					>
						facial recognition
					</Typography>

					<Link to="/dashboard">
						<Button
							variant="contained"
							type="submit"
							className={styles.home_button}
						>
							DASHBOARD
						</Button>
					</Link>
				</Box>
				<img
					className={styles.home_img}
					src={MainArt}
					alt="homepage image"
					width="20%"
					heigth="20%"
				/>
			</Box>
			<Box className={styles.home_bottom}>
				<Box className={styles.home_bottom1}>
					<img src={Face} alt="Face image" width="20%" heigth="20%" />
					<Typography variant="h5" component="h5">
						Facial Recognition
					</Typography>
					<Typography variant="h6" component="h6">
						Recognise students faces from class photo.
					</Typography>
				</Box>
				<Box className={styles.home_bottom2}>
					<img
						src={Student}
						alt="student image"
						width="21%"
						heigth="2%"
					/>
					<Typography variant="h5" component="h5">
						Student Management
					</Typography>
					<Typography variant="h6" component="h6">
						Record and organise your students in batches.
					</Typography>
				</Box>
				<Box className={styles.home_bottom3}>
					<img
						src={Attendance}
						alt="attendacne image"
						width="20%"
						heigth="20%"
					/>
					<Typography variant="h5" component="h5">
						Attendance Record
					</Typography>
					<Typography variant="h6" component="h6">
						Attendance record for batch is saved.
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};

export default Home;
