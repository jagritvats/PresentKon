import './App.css';

// Importing from libraries
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importing Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// importing Pages
import HomePage from './pages/Home/Home';
import LoginPage from './pages/Authentication/Login';
import RegisterPage from './pages/Authentication/Register';
import TeacherDashboardPage from './pages/Dashboard/TeacherDashboard';
import AddStudentPage from './pages/AddStudent/AddStudent';
import AttendancePage from './pages/Attendance/Attendance';
import BatchPage from './pages/Batch/Batch';
import ErrorPage from './pages/ErrorPage';
import { useEffect } from 'react';

function App() {
	const demo = useEffect(() => {
		(async () => {
			const res = await fetch('/api/face');
			console.log('From server : ', res);
		})();
	});
	return (
		<div className="App">
			<BrowserRouter>
				<Navbar />
				<main>
					<Routes>
						<Route exact path="/" element={<HomePage />} />
						<Route exact path="/login" element={<LoginPage />} />
						<Route
							exact
							path="/register"
							element={<RegisterPage />}
						/>
						<Route
							exact
							path="/dashboard"
							element={<TeacherDashboardPage />}
						/>
						<Route
							exact
							path="/addstudent"
							element={<AddStudentPage />}
						/>
						<Route
							exact
							path="/batch/:id"
							element={<AttendancePage />}
						/>
						<Route exact path="/batch" element={<BatchPage />} />

						<Route path="*" element={<ErrorPage />} />
					</Routes>
				</main>
			</BrowserRouter>

			<Footer />
		</div>
	);
}

export default App;
