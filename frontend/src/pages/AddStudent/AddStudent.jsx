import {
	Autocomplete,
	autocompleteClasses,
	Box,
	Button,
	TextField,
	Typography,
} from '@mui/material';
import React from 'react';
import styles from './AddStudent.module.css';
import image from '../../assets/logo.png';

const AddStudent = () => {
	const batchList = [{ label: 'g33' }, { label: 'g32' }, { label: 'g23' }];

	return (
		<div>
			{/* <h1>Add Student</h1> */}
			<Box className={styles.addstudent}>
				<Typography variant="h5" component="h2">
					Enter Student Details here:
				</Typography>
				<Box className={styles.addstudentMain}>
					<Box>
						<img src={image} alt="this is image" />
						<Box sx={{ paddingTop: '3em' }}>
							<Button
								variant="contained"
								sx={{ bgcolor: '#FF4F29' }}
							>
								Upload
							</Button>
						</Box>
					</Box>
					<Box className={styles.addstudentMainRight}>
						<Box>
							<TextField
								required
								id="outlined-required"
								label="Name"
								fullWidth
							/>
						</Box>
						<Box>
							<TextField
								required
								id="outlined-required"
								label="Roll No"
								fullWidth
							/>
						</Box>
						<Box>
							<Autocomplete
								disablePortal
								id="combo-box-demo"
								options={batchList}
								// sx={{ width: "60%", margin: "auto" }}
								fullWidth
								renderInput={(params) => (
									<TextField {...params} label="Batch" />
								)}
							/>
						</Box>
					</Box>
				</Box>
				<Button variant="contained">Add</Button>
			</Box>
		</div>
	);
};

export default AddStudent;
