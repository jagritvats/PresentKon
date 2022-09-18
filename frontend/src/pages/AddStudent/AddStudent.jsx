import {
	Autocomplete,
	autocompleteClasses,
	Box,
	Button,
	CircularProgress,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@mui/material';
import React from 'react';
import styles from './AddStudent.module.css';
import image from '../../assets/logo.png';
import { useState, useEffect } from 'react';

import {
	collection,
	doc,
	getDoc,
	onSnapshot,
	setDoc,
} from 'firebase/firestore';
import { db } from '../../config/firebase';
import useStorage from '../../hooks/useStorage';
import axios from 'axios';

const AddStudent = () => {
	const batchList = [{ label: 'g33' }, { label: 'g32' }, { label: 'g23' }];

	const [batches, setBatches] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [errorTwo, setErrorTwo] = useState(false);

	const [name, setName] = useState('');
	const [rollNumber, setRollNumber] = useState('');
	const [selected, setSelected] = useState(null);
	// const [url, setUrl] = useState(ProfileImage);

	const [file, setFile] = useState(null);
	const { URL } = useStorage(file);

	useEffect(() => {
		setIsLoading(true);
		let unsub;
		try {
			unsub = onSnapshot(collection(db, 'batches'), (querySnapshot) => {
				setIsLoading(true);
				const dt = [];
				querySnapshot.forEach((doc) => {
					dt.push({ data: doc.data(), id: doc.id });
				});
				setBatches(dt);
				setSelected(dt[0].data.name.toUpperCase());
				console.log(dt);
				setIsLoading(false);
			});
		} catch (err) {
			setErrorTwo(err);
			setIsLoading(false);
		}

		return unsub;
	}, []);

	if (isLoading) {
		return (
			<div className="loading__container">
				<CircularProgress />
			</div>
		);
	}
	const submitStudent = async () => {
		try {
			console.log('submitting student');
			const person = await axios.post(
				'http://localhost:5000/api/face/person',
				{
					personGroupId: selected.toLowerCase(),
					personId: rollNumber,
				}
			);

			console.log('person', person, person?.data?.personId, 'url', URL);

			await axios.post('http://localhost:5000/api/face/addimage', {
				personGroupId: selected.toLowerCase(),
				personId: person?.data?.data?.personId,
				imgurl: URL,
			});

			const studentData = {
				name,
				rollnumber: rollNumber,
				batch: selected,
				personId: person.data.data.personId,
				imgurl: URL,
			};
			const fireres = await setDoc(
				doc(db, 'students', rollNumber),
				studentData
			);

			// update badges
			console.log('selected batch ', selected);
			const batchDoc = await getDoc(
				doc(db, 'batches', selected.toLowerCase())
			);

			console.log(batchDoc);
			const batchInfo = batchDoc.data();
			const batchStudents = batchInfo.students;

			const newBatchInfo = {
				...batchInfo,
				students: [...batchStudents, rollNumber],
			};
			console.log('new batch ', newBatchInfo);
			const firebatch = await setDoc(
				doc(db, 'batches', selected.toLowerCase()),
				newBatchInfo
			);

			console.log('fire', fireres, ' firebatch', firebatch);
			alert('Added new person');

			await axios.post('http://localhost:5000/api/face/train', {
				personGroupId: selected.toLowerCase(),
			});
			console.log('Trained');
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div>
			<Box
				onSubmit={(e) => {
					e.preventDefault();
					console.log('Adding');
					submitStudent();
				}}
				component="form"
				className={styles.addstudent}
			>
				<Typography variant="h5" component="h2">
					Enter Student Details here:
				</Typography>
				<Box className={styles.addstudentMain}>
					<Box>
						<Box className={styles.profileimg}>
							<img src={URL ? URL : image} alt="this is image" />
						</Box>

						<Box>
							<input
								accept="image/*"
								className="inp"
								style={{ display: 'none' }}
								id="raised-button-file"
								multiple
								type="file"
								onChange={(e) => {
									setFile(e.target.files[0]);
								}}
							/>
							<label htmlFor="raised-button-file">
								<Button
									variant="contained"
									component="span"
									className="details__button-upload"
								>
									Upload
								</Button>
							</label>
						</Box>
					</Box>
					<Box className={styles.addstudentMainRight}>
						<Box>
							<TextField
								required
								id="outlined-required"
								label="Name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								fullWidth
							/>
						</Box>
						<Box>
							<TextField
								required
								id="outlined-required"
								label="Roll No"
								value={rollNumber}
								onChange={(e) => setRollNumber(e.target.value)}
								fullWidth
							/>
						</Box>
						<Box>
							<Select
								labelId="batch-filled-label"
								id="batch-select-filled"
								label="Select Batch"
								value={selected}
								onChange={(e) => setSelected(e.target.value)}
							>
								{batches.map((batch) => {
									return (
										<MenuItem
											key={batch.id.toUpperCase()}
											value={batch.id.toUpperCase()}
										>
											{batch.id.toUpperCase()}
										</MenuItem>
									);
								})}
								{/* <MenuItem value="G10">G10</MenuItem>
						<MenuItem value="G20">G20</MenuItem>
						<MenuItem value="G30">G30</MenuItem> */}
							</Select>
						</Box>
					</Box>
				</Box>
				<Button
					sx={{ marginTop: '2em' }}
					variant="contained"
					type="submit"
				>
					Add
				</Button>
			</Box>
		</div>
	);
};

export default AddStudent;
