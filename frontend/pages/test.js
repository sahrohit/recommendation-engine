import { Button } from "@chakra-ui/react";
import React from "react";
import { db } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { useAuth } from "@contexts/AuthContext";

const TestingPage = () => {
	const {
		currentUser: { uid },
	} = useAuth();

	const deleteMovie = async () => {
		await deleteDoc(doc(db, "users", uid, "watched", "505642"));
	};

	return <Button onClick={deleteMovie}>Delete</Button>;
};

export default TestingPage;
