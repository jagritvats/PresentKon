import markatt from './Markattendance.module.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	onSnapshot,
	setDoc,
} from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Button, CircularProgress, MenuItem, TextField } from '@mui/material';
import axios from 'axios';
import useStorage from '../../hooks/useStorage';

export default function Markattendance(props) {
	const [data, setData] = useState([]); // batch data -> students list
	const [attendance, setAttendance] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [processing, setProcessing] = useState(false);
	const [error, setError] = useState(false);
	const [file, setFile] = useState(null);
	const [faceIds, setFaceIds] = useState([]);
	const [attarr, setAttarr] = useState([]);
	const { URL } = useStorage(file);

	// form
	const [checkboxes, setCheckboxes] = useState({});

	let params = useParams();
	var i = 1;

	useEffect(() => {
		setIsLoading(true);
		let unsub;
		try {
			unsub = onSnapshot(
				doc(db, 'batches', params.id.toLowerCase()),
				async (docs) => {
					let dt = [];
					const studentList = docs.data().students;
					for (let i = 0; i < studentList.length; i++) {
						const currentStudent = (
							await getDoc(
								doc(
									db,
									'students',
									studentList[i].toLowerCase()
								)
							)
						).data();
						dt.push(currentStudent);
					}
					setData(dt);
					console.log(dt);
					setIsLoading(false);
				}
			);
		} catch (err) {
			setError(err);
			setIsLoading(false);
		}

		return unsub;
	}, []);

	const [date, setDate] = useState(new Date().getUTCDate());
	const [period, setPeriod] = useState(1);

	const identifyFace = async () => {
		console.log('Identify Face Called.');
		try {
			setProcessing(true);
			console.log('Posting for Detection: ');
			let detected = await axios.post(
				'http://localhost:5000/api/face/detect',
				{
					imgurl: URL,
				}
			);
			detected = detected.data;
			console.log('Dectected Faces : ', detected.data);
			const faceids = detected.data.map((faceobj) => faceobj.faceId);

			console.log('Extracted Face IDs : ', faceids);
			setFaceIds(faceids);

			// identify the detected faces using Azure Cognitive Services
			const identify = await axios.post(
				'http://localhost:5000/api/face/identify',
				{
					personGroupId: params.id.toLowerCase(),
					faceIds: faceids,
				}
			);
			const identifiedData = identify.data.data;
			console.log('Indentified Faces : ', identifiedData);

			let attend = [];

			let tempDataArr = [];
			const personDataSnapshot = await getDocs(
				collection(db, 'students')
			);
			personDataSnapshot.forEach((personDoc) => {
				tempDataArr.push({
					data: personDoc.data(),
					id: personDoc.id,
				});
			});
			console.log('Students Data from Firebase ', tempDataArr);

			console.log('Starting identification logic.');
			for (let i = 0; i < identifiedData.length; i++) {
				console.log('Iteration ', i);
				let identifiedFace = identifiedData[i];

				// if there are any matches for identified faces
				if (identifiedFace.candidates.length > 0) {
					console.log('IF :', identifiedFace);
					const candidatePersonId =
						identifiedFace.candidates[0].personId; // the first/most likely match for the person
					const matchConfidence =
						identifiedFace.candidates[0].confidence;

					console.log('Getting person?', tempDataArr);

					// now get only those students whose Id matches the current candidate person's Id

					let filteredCandidate = tempDataArr.find((personData) => {
						console.log(
							'pd',
							personData,
							'cpid',
							candidatePersonId
						);
						return personData.data.personId == candidatePersonId;
					});
					console.log('Candidate Person ', candidatePersonId);
					attend.push(filteredCandidate);
				}
				setProcessing(false);
			}

			let atr = [];
			attend.forEach((att) => {
				atr.push(att.rollnumber);
			});
			console.log('Atr ', atr);
			setAttendance(attend);
			console.log('Attend Array :  ', attend);
			setAttarr(atr);
			console.log('Attarr ', attarr);
			// console.log('Attend arr values : ');
		} catch (err) {
			console.error('Error in identification ', err);
		}
		setIsLoading(false);
		setProcessing(false);
	};

	const submitAttendance = async (e) => {
		e.preventDefault();
		console.log('Submitting Attendance');
		const toSubmit = attendance;
		const attend_id = `${params.id}_${date}_${period}`;
		console.log(attendance);
		const rolls = [...attendance.map((att) => att.rollnumber)];
		const attendanceData = {
			batch: params.id,
			date: new Date().valueOf(),
			period,
			attendance: [...rolls],
		};

		console.log('Attendance Data ', attendanceData);

		const attendanceCollection = await collection(db, 'attendance');
		await addDoc(attendanceCollection, attendanceData);
		alert('Submitted Attendance');
	};

	if (processing) {
		return (
			<div className="loading__container">
				<CircularProgress />
				Processing
			</div>
		);
	}

	if (isLoading) {
		return (
			<div className="loading__container">
				<CircularProgress />
			</div>
		);
	}

	const isChecked = (elerollnumber) => {
		console.log(elerollnumber);
		console.log('chk');
		for (let k in attendance) {
			let attendobj = attendance[k];
			console.log(attendobj?.id, elerollnumber);
			if (attendobj?.id == elerollnumber) {
				console.log('a');
				return true;
			}
		}
		return false;
		// if (attarr.length > 0) {
		// 	if (attarr.includes(elerollnumber)) {
		// 		return true;
		// 	} else {
		// 		return false;
		// 	}
		// }
	};

	return (
		<form className={markatt.body} onSubmit={(e) => submitAttendance(e)}>
			<div className={markatt.header}>
				<h1>Batch : {params.id.toUpperCase()}</h1>
			</div>

			<div className={markatt.main}>
				<div className={markatt.main__fields}>
					<TextField
						select
						className="select_period"
						labelid="select_period"
						id="select_period"
						value={period}
						onChange={(e) => setPeriod(e.target.value)}
						label="Select Period"
					>
						<MenuItem value={1}>1st</MenuItem>
						<MenuItem value={2}>2st</MenuItem>
						<MenuItem value={3}>3rd</MenuItem>
						<MenuItem value={4}>4th</MenuItem>
						<MenuItem value={5}>5th</MenuItem>
						<MenuItem value={6}>6th</MenuItem>
						<MenuItem value={7}>7th</MenuItem>
						<MenuItem value={8}>8th</MenuItem>
					</TextField>

					<input type="date" name="" id="" />
				</div>

				<div className={markatt.image_class}>
					<img src={URL ? URL : ''} alt="img"></img>
				</div>
				<button>View Enlarged</button>
				<div>
					<input
						accept="image/*"
						className="add-image"
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
							className="inp"
						>
							Add class image
						</Button>
					</label>
				</div>
			</div>

			<div className={markatt.records}>
				<div className={markatt.recordsHeader}>
					<div className={markatt.left}>
						<h2>Students: </h2>
					</div>
					<div className={markatt.right}>
						<select>
							<option>No Filter</option>
							<option>Absentees(NOT MARKED)</option>
							<option>Presentees(MARKED)</option>
						</select>
					</div>
				</div>
				<div className={markatt.recordsBody}>
					<table>
						<tbody>
							<tr>
								<th>S. No.</th>
								<th>Name</th>
								<th>Roll No</th>
								<th>Is present</th>
							</tr>
							{data.map((ele) => {
								const b = isChecked(ele.rollnumber);
								return (
									<tr
										key={ele.rollnumber}
										className={markatt.studentR}
									>
										<td>{i++}</td>
										<td>{ele.name}</td>
										<td>{ele.rollnumber}</td>
										<td>
											<input
												type="checkbox"
												name="ispresent"
												value={ele.rollnumber}
												defaultChecked={isChecked(
													ele.rollnumber
												)}
											/>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
			<Button
				variant="contained"
				onClick={() => identifyFace()}
				disabled={URL ? false : true}
			>
				Update Attendance
			</Button>
			<Button
				type="submit"
				variant="contained"
				onClick={() => submitAttendance()}
			>
				Submit Attendance
			</Button>
		</form>
	);
}
