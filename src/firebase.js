import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
const firebaseConfig = {
	apiKey: 'AIzaSyCtACD8FX4xv_OYrAPYtExOL-j9LvGSWQw',
	authDomain: 'todos-c8b4a.firebaseapp.com',
	projectId: 'todos-c8b4a',
	storageBucket: 'todos-c8b4a.appspot.com',
	messagingSenderId: '532538651159',
	appId: '1:532538651159:web:e577d65d1cf07a394fe252',
	databaseURL:
		'https://todos-c8b4a-default-rtdb.europe-west1.firebasedatabase.app/',
}

const app = initializeApp(firebaseConfig)

export const db = getDatabase(app)
