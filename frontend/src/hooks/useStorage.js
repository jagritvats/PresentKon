import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { storage } from '../config/firebase';

const useStorage = (file) => {
	let [URL, setURL] = useState(null);
	let [loading, setLoading] = useState(true);
	let [error, setError] = useState(null);
	useEffect(() => {
		if (file === null) {
			setLoading(false);
		} else {
			setLoading(true);
			console.log(file.name);
			let fileRef = ref(storage, file.name);
			try {
				(async () => {
					await uploadBytesResumable(fileRef, file);
					setURL(await getDownloadURL(fileRef));
					console.log('Uploading file.');
				})();
			} catch (err) {
				setError(err);
				setLoading(false);
			}
		}
	}, [file]);

	return { URL, loading, error };
};

export default useStorage;
