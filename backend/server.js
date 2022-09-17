const express = require('express');
require('dotenv/config');
const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
	console.log('Hello.');
	res.json({ messsage: 'Hello World!' });
});

app.listen(PORT, () => {
	console.log(`Listening at Port ${PORT}`);
});
