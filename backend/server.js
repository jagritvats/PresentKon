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

// if(process.env.ENVIRONMENT === 'production'){

// }else{

// }

app.use('*', (req, res) => {
	res.json({
		success: false,
		message: 'Invalid Path',
	});
});

app.listen(PORT, () => {
	console.log(`Listening at Port ${PORT}`);
});
