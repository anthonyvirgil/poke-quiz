import firebase from 'firebase/app';
import 'firebase/firestore'; // database

var firebaseConfig = {
	apiKey: 'AIzaSyBACH7gSKtWBKajMt3Yvp6jsyQrsot-q_Y',
	authDomain: 'poke-quiz-3f6ac.firebaseapp.com',
	databaseURL: 'https://poke-quiz-3f6ac-default-rtdb.firebaseio.com',
	projectId: 'poke-quiz-3f6ac',
	storageBucket: 'poke-quiz-3f6ac.appspot.com',
	messagingSenderId: '86309073497',
	appId: '1:86309073497:web:6ef54ef78dceab4119f748',
};

firebase.initializeApp(firebaseConfig);
const projectFirestore = firebase.firestore();

export { projectFirestore };
