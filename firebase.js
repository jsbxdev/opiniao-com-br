import firebase from 'firebase/app'
import 'firebase/firestore'

import firebaseConfig from './firebaseConfig'

// Firebase App
export default firebase.initializeApp(firebaseConfig)

// Firestore
export const database = firebase.firestore()
export const categoriesRef = database.collection('categories')
export const itemsRef = database.collection('items')

// Firestore Methods
const { Timestamp, GeoPoint, FieldValue } = firebase.firestore
export { Timestamp, GeoPoint, FieldValue }
