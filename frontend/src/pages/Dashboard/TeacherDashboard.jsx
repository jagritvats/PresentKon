import {
	Autocomplete,
	Box,
	Button,
	TextField,
	Typography,
} from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './TeacherDashboard.module.css';
const TeacherDashboard = () => {
	// const[cardData, setCardData] = useState([]);
	const batchList = [{ label: 'g33' }, { label: 'g32' }, { label: 'g23' }];

	return (
		<div>
			<Box className={styles.dashboard}>
				<Typography align="left" variant="h3" component="h2">
					Batches
				</Typography>
				<Button variant="contained">
					<Link to="/batch">Add Batch</Link>
				</Button>

				<Autocomplete
					disablePortal
					id="combo-box-demo"
					options={batchList}
					sx={{ width: '30%' }}
					renderInput={(params) => (
						<TextField {...params} label="Batch" />
					)}
				/>

				<Box className={styles.dashboardMain}>
					<Box className={styles.dashboardMainItem}>
						<Box>
							<Typography
								align="left"
								variant="h3"
								component="h3"
							>
								Group Name
							</Typography>
							<Typography
								align="left"
								variant="h5"
								component="h3"
							>
								No Students
							</Typography>
							<Link to="/addstudent">
								<Button
									sx={{ bgcolor: '#FF4F29' }}
									variant="contained"
								>
									Add Student
								</Button>
							</Link>
						</Box>
						<Box>
							<Button variant="contained">Mark Attendance</Button>
						</Box>
					</Box>
				</Box>
			</Box>
		</div>
	);
};

export default TeacherDashboard;
