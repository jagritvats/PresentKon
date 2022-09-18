// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
	apiKey: process.env.FIREKEY,
	authDomain: 'presentkon-996fc.firebaseapp.com',
	projectId: 'presentkon-996fc',
	storageBucket: 'presentkon-996fc.appspot.com',
	messagingSenderId: '960000820507',
	appId: '1:960000820507:web:e6fc2d97dd9cd376e27fbe',
	measurementId: 'G-BPXK25F31S',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage();
const db = getFirestore(app);

export { app, db, storage };
