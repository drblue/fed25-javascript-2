import { initializeApp } from "firebase/app";
import { collection, CollectionReference, getFirestore, type DocumentData } from "firebase/firestore";
import type { Todo } from "../types/Todo.types";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore Instance
export const db = getFirestore(app);

/**
 * Create a collection reference
 *
 * @param collectionName Name/path of collection
 * @returns Reference to collection
 */
const createCollectionRef = <T = DocumentData>(collectionName: string) => {
	return collection(db, collectionName) as CollectionReference<T>;
}

// Our collection references
// export const projectsCol = createCollectionRef<Project>("projects");
export const todosCol = createCollectionRef<Todo>("todos");

export default app;
