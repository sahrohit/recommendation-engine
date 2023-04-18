import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";
import {
	collectionGroup,
	deleteDoc,
	doc,
	query,
	serverTimestamp,
	setDoc,
	where,
} from "firebase/firestore";
import React, { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";

const MovieContext = React.createContext();

const useMovie = () => {
	return useContext(MovieContext);
};

const MovieProvider = ({ children }) => {
	const [currentUser, userloading] = useAuthState(auth);

	const [watched, loading] = useCollectionData(
		query(collectionGroup(db, "watched"),
		where("user", "==", currentUser?.uid || "-")),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);

	const addToWatched = async (movie) => {
		await setDoc(
			doc(db, "users", currentUser?.uid, "watched", movie.id.toString()),
			{
				...movie,
				user: currentUser?.uid,
				timestamp: serverTimestamp(),
			}
		);
	};

	const removeFromWatched = async (movie) => {
		await deleteDoc(
			doc(db, "users", currentUser?.uid, "watched", movie.id.toString())
		);
	};

	const value = {
		addToWatched,
		removeFromWatched,
		watched,
		watchedList: watched?.map((movie) => movie.id),
		loading,
	};

	if (userloading) return <FullPageLoadingSpinner />;

	return (
		<MovieContext.Provider value={value}>{children}</MovieContext.Provider>
	);
};

export { MovieProvider as MovieProvider, useMovie as useMovie };

const MovieContextWrapper = ({ children }) => {
	return <MovieProvider>{children}</MovieProvider>;
};

export default MovieContextWrapper;
