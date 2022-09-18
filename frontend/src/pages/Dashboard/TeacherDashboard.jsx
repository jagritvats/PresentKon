import { CircularProgress } from '@mui/material';
import { width } from '@mui/system';
import axios from 'axios';
import {
	collection,
	doc,
	getDocs,
	onSnapshot,
	setDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../config/firebase';
import Batchcard from './Batchcard';
import Searchbar from './Searchbar';
import teacherdash from './TeacherDashboard.module.css';

export default function TeacherDashboard() {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);
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
				setData(dt);
				console.log(dt);
				setIsLoading(false);
			});
		} catch (err) {
			setError(err);
			console.log(err);
			setIsLoading(false);
		}

		return unsub;
	}, []);

	const addBatch = async () => {
		const batchName = prompt('Enter Batch name:');
		if (!batchName) {
			return;
		}
		const res = await axios.post(
			'http://localhost:5000/api/face/persongroup',
			{
				personGroupId: batchName,
			}
		);
		console.log('api ', res);
		const batchData = {
			name: batchName,
			students: [],
			personGroupId: batchName,
		};
		const fireres = await setDoc(
			doc(db, 'batches', batchName.toLowerCase()),
			batchData
		);
		console.log('fire', fireres);
		alert('Added new Batch');
	};
	if (isLoading) {
		return (
			<div className="loading__container">
				<CircularProgress />
			</div>
		);
	}

	return (
		<div className={teacherdash.Container}>
			<div className={teacherdash.header}>
				<h1> Batches : </h1>
			</div>
			<div className={teacherdash.search}>
				<Searchbar />
			</div>
			<div className={teacherdash.main}>
				<button
					style={{
						alignSelf: 'end',
						color: 'white',
						backgroundColor: '#ff4f29',
						height: '30px',
						width: '200px',
						border: 'none',
						borderRadius: '10px',
						margin: '20px',
						marginRight: '30px',
						color: 'white',
					}}
					onClick={() => addBatch()}
				>
					ADD NEW BATCH
				</button>
				{data.map((batch) => {
					return <Batchcard data={batch} />;
				})}
			</div>

			<div className="error" style={{ color: 'red' }}>
				{error ? error.toString() : ''}
			</div>
		</div>
	);
}
