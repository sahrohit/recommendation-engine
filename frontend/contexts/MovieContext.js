import {
	collection,
	deleteDoc,
	doc,
	onSnapshot,
	orderBy,
	query,
	serverTimestamp,
	setDoc,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "./AuthContext";

const MovieContext = React.createContext();

const useMovie = () => {
	return useContext(MovieContext);
};

const MovieProvider = ({ children }) => {
	const [watched, setWatched] = useState([]);
	const [loading, setLoading] = useState(true);

	const {
		currentUser: { uid },
	} = useAuth();

	useEffect(
		() =>
			onSnapshot(
				query(
					collection(db, "users", uid, "watched"),
					orderBy("timestamp", "desc")
				),
				(snapshot) => {
					setWatched(
						snapshot.docs.map((doc) => {
							return doc.data();
						})
					);
					setLoading(false);
				}
			),
		[uid]
	);

	const addToWatched = async (movie) => {
		await setDoc(doc(db, "users", uid, "watched", movie.id.toString()), {
			...movie,
			timestamp: serverTimestamp(),
		});
	};

	const removeFromWatched = async (movieId) => {
		console.log(
			"Being Deleted",
			"users",
			uid,
			"watched",
			movieId.toString()
		);

		await deleteDoc(doc(db, "users", uid, "watched", movieId.toString()));
	};

	const value = {
		watched,
		loading,
		addToWatched,
		removeFromWatched,
	};

	return (
		<MovieContext.Provider value={value}>{children}</MovieContext.Provider>
	);
};

export { MovieProvider as MovieProvider };
export { useMovie as useMovie };

const MovieContextWrapper = ({ children }) => {
	return <MovieProvider>{children}</MovieProvider>;
};

export default MovieContextWrapper;
