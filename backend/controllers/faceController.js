const msRest = require('@azure/ms-rest-js');
const Face = require('@azure/cognitiveservices-face');
const { v4: uuid } = require('uuid');

const endpoint = process.env.AZURE_FACE_ENDPOINT;
const key = process.env.AZURE_FACE_KEY;

const credentials = new msRest.ApiKeyCredentials({
	inHeader: { 'Ocp-Apim-Subscription-Key': key },
});
const client = new Face.FaceClient(credentials, endpoint);

// Utility Functions
// Response Handler for API Requests
const formatData = (data) => {
	if (JSON.stringify(data) === '{}') {
		data = null;
	}
	return {
		success: true,
		data,
		error: null,
	};
};

// Error Handler for API Requests, returns an error object inside an status object
const errorHandler = (err, errorLocation) => {
	let error = {
		code: 'UnknownError',
		message: errorLocation || 'Error in Unknown Face API Call',
	}; // Default error Message

	// Error Message from Azure Service
	if (err?.body?.error) {
		error = { ...err.body.error };
	} else {
		console.log(err.message);
	}

	return {
		status: err.statusCode ? err.statusCode : 500,
		success: false,
		error,
	};
};

// API Controllers

// Person Group
// using latest detection & recognition model for better performance

const createPersonGroup = async (person_group_id) => {
	try {
		// santize person_group_id to match azure constraints in frontend and while saving to firebase
		const personGroupData = await client.personGroup.create(
			person_group_id,
			person_group_id,
			{ recognitionModel: 'recognition_04' }
		);
		return formatData(personGroupData);
	} catch (err) {
		return errorHandler(err, 'Error in Face API Create PersonGroup call.');
	}
};

const deletePersonGroup = async (person_group_id) => {
	try {
		const deletedStatus = await client.personGroup.deleteMethod(
			person_group_id
		);
		return formatData(deletedStatus);
	} catch (err) {
		return errorHandler(err, 'Error in Face API Delete PersonGroup call.');
	}
};

// Person

// list people in PersonGroup
const listPeople = async (person_group_id) => {
	try {
		console.log(person_group_id);
		const peopleData = await client.personGroupPerson.list(person_group_id);
		return formatData(peopleData);
	} catch (err) {
		return errorHandler(err, 'Error in Face API List person call.');
	}
};

// create Person in a PersonGroup
const createPerson = async (person_group_id, person_id) => {
	try {
		const personData = await client.personGroupPerson.create(
			person_group_id,
			{ name: person_id }
		);
		return formatData(personData);
	} catch (err) {
		return errorHandler(err, 'Error in Face API Create Person call.');
	}
};

const deletePerson = async (person_group_id, person_id) => {
	try {
		const deletedStatus = await client.personGroupPerson.deleteMethod(
			person_group_id,
			person_id
		);
		return formatData(deletedStatus);
	} catch (err) {
		return errorHandler(err, 'Error in Face API Delete Person call.');
	}
};

const addFaceImageToPerson = async (person_group_id, person_id, imgurl) => {
	try {
		const personData = await client.personGroupPerson.addFaceFromUrl(
			person_group_id,
			person_id,
			imgurl
		);
		return formatData(personData);
	} catch (err) {
		return errorHandler(err, 'Error in Face API Add Image to Person call.');
	}
};

// AI Ops

const trainPersonGroup = async (person_group_id) => {
	try {
		const trainData = await client.personGroup.train(person_group_id);
		return formatData(trainData);
	} catch (err) {
		return errorHandler(err, 'Error in Face API Train PersonGroup call.');
	}
};

const getTrainingStatus = async (person_group_id) => {
	try {
		const trainData = await client.personGroup.getTrainingStatus(
			person_group_id
		);
		return formatData(trainData);
	} catch (err) {
		return errorHandler(
			err,
			'Error in Face API Train Status PersonGroup call.'
		);
	}
};

//      Detect Faces

const detectFaces = async (imgurl) => {
	try {
		const facesDetected = await client.face.detectWithUrl(imgurl, {
			recognitionModel: 'recognition_04',
			detectionModel: 'detection_03',
		});
		return formatData(facesDetected);
	} catch (err) {
		return errorHandler(err, 'Error in Face API Detection call.');
	}
};

// 		Identify

const identifyFaces = async (person_group_id, faceIds) => {
	try {
		const identifiedData = await client.face.identify(faceIds, {
			personGroupId: person_group_id,
		});
		return formatData(identifiedData);
	} catch (err) {
		return errorHandler(
			err,
			'Error in Face API Identify Image to Person call.'
		);
	}
};

// Exporting the controller functions

module.exports = {
	createPersonGroup,
	deletePersonGroup,
	listPeople,
	createPerson,
	deletePerson,
	addFaceImageToPerson,
	createPerson,
	trainPersonGroup,
	getTrainingStatus,
	detectFaces,
	identifyFaces,
};
