import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';

export const useFireStore = (collection, limit) => {
	const [docs, setDocs] = useState([]);

	useEffect(() => {
		// fires whenever collection is updated and once before
		const unsub = projectFirestore
			.collection(collection)
			.orderBy('highScore', 'desc')
			.limit(limit)
			.onSnapshot((snap) => {
				let documents = [];
				snap.forEach((doc) => {
					documents.push({ ...doc.data(), id: doc.id });
				});
				setDocs(documents);
			});

		return () => unsub(); // clean up function
	}, [collection]);

	return { docs };
};
