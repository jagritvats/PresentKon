// importing libraries
const express = require('express');
const cors = require('cors');

require('dotenv/config');

// importing files
const faceRouter = require('./routes/faceRouter');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api', (req, res) => {
	console.log('Hello.');
	res.json({ messsage: 'Hello World!' });
});

app.use('/api/face', faceRouter);

if (process.env.NODE_ENV == 'production') {
	app.use(express.static(path.join(__dirname, '../frontend/build')));

	app.get('*', (req, res) =>
		res.sendFile(
			path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
		)
	);
} else {
	app.get('*', (req, res) => {
		res.send('Please set to production');
	});
}
app.use('*', (req, res) => {
	res.json({
		success: false,
		message: 'Invalid Path',
	});
});

app.listen(PORT, () => {
	console.log(`Listening at Port ${PORT}`);
});
