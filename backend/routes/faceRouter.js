const express = require('express');
const {
	createPersonGroup,
	deletePersonGroup,
	createPerson,
	addFaceImageToPerson,
	trainPersonGroup,
	getTrainingStatus,
	detectFaces,
	identifyFaces,
	deletePerson,
	listPeople,
} = require('../controllers/faceController');
const faceRouter = express.Router();

faceRouter.get('/', (req, res) => {
	res.json('Face Root');
});

// Following routes for /api/face
// POST		/api/face/persongroup	   =>   Creating Person Group / Batch
faceRouter.post('/persongroup', async (req, res) => {
	try {
		const personGroupId = req.body.personGroupId;
		const personGroupData = await createPersonGroup(personGroupId);
		if (personGroupData.success === false) {
			res.status(personGroupData.status).json({
				success: false,
				error: personGroupData.error,
			});
		} else {
			res.json({
				success: true,
				data: personGroupData.data,
			});
		}
	} catch (err) {
		const errorMessage = err.message || 'Error in creating person group';
		console.log(errorMessage, err);
		res.status(500).json({
			success: false,
			message: errorMessage,
		});
	}
});

// DELETE	/api/face/persongroup	   =>	Deleting Person Group
faceRouter.delete('/persongroup/:id', async (req, res) => {
	try {
		const personGroupId = req.params.id;
		const deletedResp = await deletePersonGroup(personGroupId);

		if (deletedResp.success === false) {
			res.status(deletedResp.status).json({
				success: false,
				error: deletedResp.error,
			});
		} else {
			res.json({
				success: true,
				data: deletedResp.data,
			});
		}
	} catch (err) {
		const errorMessage = err.message || 'Error in deleting PersonGroup';

		res.status(500).json({
			success: false,
			message: errorMessage,
		});
	}
});

// GET     /api/face/persongroup/:id		  	   =>   get People list in Person Group
faceRouter.get('/persongroup/:id', async (req, res) => {
	try {
		const personGroupId = req.params.id;
		const personData = await listPeople(personGroupId);
		console.log(personData);
		if (personData.success === false) {
			res.status(personData.status).json({
				success: false,
				error: personData.error,
			});
		} else {
			res.json({
				success: true,
				data: personData.data,
			});
		}
	} catch (err) {
		const errorMessage = err.message || 'Error in listing People';

		res.status(500).json({
			success: false,
			message: errorMessage,
		});
	}
});

// POST     /api/face/person		   =>   Creating a Person/Student in a particular batch
faceRouter.post('/person', async (req, res) => {
	try {
		const { personGroupId, personId } = req.body;
		const personData = await createPerson(personGroupId, personId);

		if (personData.success === false) {
			res.status(personData.status).json({
				success: false,
				error: personData.error,
			});
		} else {
			res.json({
				success: true,
				data: personData.data,
			});
		}
	} catch (err) {
		const errorMessage = err.message || 'Error in creating Person';

		res.status(500).json({
			success: false,
			message: errorMessage,
		});
	}
});

// DELETE	/api/face/person	  	   =>	Deleting Person from PersonGroup
faceRouter.delete('/person/:pgid/:pid', async (req, res) => {
	try {
		const personGroupId = req.params.pgid;
		const personId = req.params.pid;
		const deletedResp = await deletePerson(personGroupId, personId);

		if (deletedResp.success === false) {
			res.status(deletedResp.status).json({
				success: false,
				error: deletedResp.error,
			});
		} else {
			res.json({
				success: true,
				data: deletedResp.data,
			});
		}
	} catch (err) {
		const errorMessage = err.message || 'Error in deleting PersonGroup';

		res.status(500).json({
			success: false,
			message: errorMessage,
		});
	}
});

// POST     /api/face/addimage		   =>	Add face image to the Person by ID
faceRouter.post('/addimage', async (req, res) => {
	try {
		const { personGroupId, personId, imgurl } = req.body;
		const personData = await addFaceImageToPerson(
			personGroupId,
			personId,
			imgurl
		);

		if (personData.success === false) {
			res.status(personData.status).json({
				success: false,
				error: personData.error,
			});
		} else {
			res.json({
				success: true,
				data: personData.data,
			});
		}
	} catch (err) {
		const errorMessage = err.message || 'Error in creating Person';

		res.status(500).json({
			success: false,
			message: errorMessage,
		});
	}
});

// POST     /api/face/train            =>	Train for the particular PersonGroup / Batch
faceRouter.post('/train', async (req, res) => {
	try {
		const { personGroupId } = req.body;
		const personGroupTrainData = await trainPersonGroup(personGroupId);

		if (personGroupTrainData.success === false) {
			res.status(personGroupTrainData.status).json({
				success: false,
				error: personGroupTrainData.error,
			});
		} else {
			res.json({
				success: true,
				data: personGroupTrainData.data,
			});
		}
	} catch (err) {
		const errorMessage = err.message || 'Error in training PersonGroup';

		res.status(500).json({
			success: false,
			message: errorMessage,
		});
	}
});

// // GET   	/api/face/train/:id		   =>	Get Training Status
faceRouter.get('/train/:id', async (req, res) => {
	try {
		const personGroupId = req.params.id;

		const faceData = await getTrainingStatus(personGroupId);

		if (faceData.success === false) {
			res.status(faceData.status).json({
				success: false,
				error: faceData.error,
			});
		} else {
			res.json({
				success: true,
				data: faceData.data,
			});
		}
	} catch (err) {
		const errorMessage =
			err.message || 'Error in getting person group train status';

		res.status(500).json({
			success: false,
			message: errorMessage,
		});
	}
});

// POST  	/api/face/detect		   =>	Detect faces in an image      ==>    returns FaceIds
faceRouter.post('/detect', async (req, res) => {
	try {
		const { imgurl } = req.body;
		const faceData = await detectFaces(imgurl);

		if (faceData.success === false) {
			res.status(faceData.status).json({
				success: false,
				error: faceData.error,
			});
		} else {
			res.json({
				success: true,
				data: faceData.data,
			});
		}
	} catch (err) {
		const errorMessage = err.message || 'Error in detecting Faces';

		res.status(500).json({
			success: false,
			message: errorMessage,
		});
	}
});

// POST  	/api/face/identify		   =>	Identify faces from FaceIDs   ==>    returns FaceIDs with matching PersonIDs
faceRouter.post('/identify', async (req, res) => {
	try {
		const { personGroupId, faceIds } = req.body;
		const faceData = await identifyFaces(personGroupId, faceIds);

		// let data;
		// let n = faceIds.length;

		// if (n > 10) {
		// 	let dataArr = [];
		// 	let faceIdsSlice = []; // an array containing arrays of atmost 10 faceIds each
		// 	let i = 0;
		// 	while (i < n) {
		// 		faceIdsSlice.push(faceIds.slice(i, i + 10));
		// 		i += 10;
		// 	}
		// 	console.log('Face IDs Arr : ', faceIdsSlice);
		// 	for (let i = 0; i < faceIdsSlice.length; i++) {
		// 		let slicedDataResult = await identifyFaces(
		// 			personGroupId,
		// 			faceIdsSlice[i]
		// 		);
		// 		console.log(slicedDataResult);
		// 		dataArr = [...dataArr, ...slicedDataResult];
		// 	}
		// 	data = dataArr;
		// } else {
		// 	data = await identifyFaces(personGroupId, faceIds);
		// }

		// faceData.data = data;

		if (faceData.success === false) {
			res.status(faceData.status).json({
				success: false,
				error: faceData.error,
			});
		} else {
			res.json({
				success: true,
				data: faceData.data,
			});
		}
	} catch (err) {
		const errorMessage = err.message || 'Error in identifying Faces';

		res.status(500).json({
			success: false,
			message: errorMessage,
		});
	}
});

module.exports = faceRouter;
