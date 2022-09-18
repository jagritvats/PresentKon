import * as React from 'react';
import attendance from './Attendance.module.css';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { useState,useParams } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';


import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';

import {Edit} from '@mui/icons-material';



import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

// icons
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

// image
import previewimg from './previewImg.png';





// FOR TABLE
const columns: GridColDef[] = [
	{ field: 'id', headerName: 'S.NO.', width: 10  },
	{ field: 'name', headerName: 'NAME', width: 700 },
	{
		field: 'rollno',
		headerName: 'Roll No',
		// type: 'number',
		width: 240,
	}
	,
	{
		field: 'status',
		headerName:'Present/Absent',
		width:240
	}
	];

	const rows: GridRowsProp = [
	{ id: 1, name: 'Jon', rollno: 2010990201, status:'N/A' },
	{ id: 2, name: 'Lannister Cersei', rollno: 2010990202,status:'N/A'},
	{ id: 3, name: 'Lannister Jaime', rollno: 2010990203,status:'N/A' },
	{ id: 4, name: 'Stark Arya', rollno: 2010990204,status:'N/A' },
	{ id: 5, name: 'Targaryen Daenerys', rollno: 2010990205,status:'N/A' },
	{ id: 6, name: 'Melisandre',rollno: 2010990206,status:'N/A' },
	{ id: 7, name: 'Clifford', rollno: 2010990207,status:'N/A' },
	{ id: 8, name: 'Frances',  rollno: 2010990208,status:'N/A' },
	{ id: 9, name: 'Roxie Harvey', rollno: 2010990209,status:'N/A' },
	];




const Attendance = () => {

	const [imageprocessed,setImageprocessed] = useState(false);
	// date setting
	const [date, setDate]  = useState(dayjs());

	// PERIOD SETTING
	const [period, setPeriod] = useState("");
	const handleChange = (event) => {
		setPeriod(event.target.value+"");
		console.log(period);
	};

	
		
	// image preview
	const [classImg,setClassImg] = useState('https://image.shutterstock.com/image-vector/group-people-icon-260nw-342536540.jpg');
	// const [classImg,setClassImg] = useState(previewimg);

	//image handler
	function imageHandler(e){

		const reader = new FileReader();

		reader.onload=()=>{
			if(reader.readyState===2){
				setClassImg(reader.result);
			}
		}

		reader.readAsDataURL(e.target.files[0]);
	}

	return (
		<div className={attendance.app}>
			<div className={attendance.header}>
				
					<h1>Batch : {"g20"}</h1>

					<div className={attendance.inputs} >
						<FormControl   sx={{width:"30%"}}>
							<InputLabel id="demo-simple-select-label"  >Period</InputLabel>

							<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={period}
							label="Age"
							onChange={handleChange}
							>
							<MenuItem value={"1"}>First</MenuItem>
							<MenuItem value={"2"}>Second</MenuItem>
							<MenuItem value={"3"}>Third</MenuItem>
							</Select>

						</FormControl>
						
						{/* DATE SELECTOR */}
						<LocalizationProvider dateAdapter={AdapterDayjs}>
								<MobileDatePicker
								label="TODAY'S DATE"
								value={date}
								onChange={(newValue) => {
									setDate(newValue);
								}}
								renderInput={(params) => <TextField {...params} />}
								/>

						</LocalizationProvider>
						
					</div>
	
					
					

			</div>
			<div className={attendance.uploadimage}>
	
					 <IconButton color="primary" aria-label="upload picture" component="label"  >
        				<input  id="classimg" accept="image/*" type="file" onChange={imageHandler} />
	        				<PhotoCamera />
    			  	</IconButton>
					
					<div className={attendance.preview}>
						<img src={classImg} alt="upload class image" />
					</div>

					<IconButton color="primary" aria-label="confirm and process" component="label">
						<Button variant="contained" component="label"  >
							Process
						</Button>
					</IconButton>

								
					{/* {
						if(imageprocessed){ 
							return (<h2>Done</h2>);
						}
					} */}

			</div>

			
			<div className={attendance.details}>
				
				<div className={attendance.detailsHeader}>
					    
						{/* header */}
						<h1 style={{marginLeft:"2.5%"}} >Students :</h1>
						<div className={attendance.btns}>
							
							<Link to=''>
								<Edit sx={{marginTop:'20px',marginRight:'10px'}}/>
							</Link>
							<Box sx={{ bgcolor: 'white', height: '20px' }}>
								<Button variant="contained" color="primary">
									<Link to="">Submit</Link>
								</Button>
							</Box>
						</div>
						
						
				
				</div>

				<div className={attendance.detailsMain}>
					<div className={attendance.detailsOperations}>
				
						

					</div>
					<div className={attendance.table}>
						
						<DataGrid 
							rows={rows}
							columns={columns}
							pageSize={8}
							rowsPerPageOptions={[8]}
							checkboxSelection
						/>
			

					</div>
				</div>


			
				


			</div>
		</div>
	);
};

export default Attendance;
