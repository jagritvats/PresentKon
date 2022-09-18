import { Collapse } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';

import batchcard from './Batchcard.module.css';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';

export default function Batchcard(props) {
	const { data } = props.data;
	console.log('Data ', data);

	const navigate = useNavigate();

	const deleteBatch = async (id) => {
		if (!id) {
			return;
		}
		const res = await axios.delete(
			`http://localhost:5000/api/face/persongroup/${id.toLowerCase()}`
		);
		await deleteDoc(doc(db, 'batches', id.toLowerCase()));
		console.log(res);
		alert('Deleted Succesfully');
	};
	return (
		<div className={batchcard.Container}>
			<div className={batchcard.main}>
				<div className={batchcard.left}>
					<h2>Batch: {data.name.toUpperCase()}</h2>
					<h3>Students : {data.students.length}</h3>
					<button
						className={batchcard.addstudent}
						onClick={() => {
							navigate(`/addstudent`);
						}}
					>
						Add Student
					</button>
				</div>
				<div className={batchcard.right}>
					{/* add url */}
					<button
						onClick={() => {
							navigate(`/batch/${data.name.toLowerCase()}`);
						}}
					>
						Mark Attendance
					</button>
					<button style={{ backgroundColor: 'gray', color: 'white' }}>
						Edit Attendance
					</button>
				</div>
			</div>
			<div
				onClick={() => {
					deleteBatch(data.name.toLowerCase());
				}}
				className={`${batchcard.head} `}
			>
				<CancelIcon />
			</div>
		</div>
	);
}
