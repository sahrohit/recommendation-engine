import { useToast } from "@chakra-ui/react";
import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";
import {
	doc,
	onSnapshot
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";

const OnlyAdmin = ({ children }) => {
	const toast = useToast();
	const router = useRouter();
	const [currentUser] = useAuthState(auth);
	const [admin, setAdmin] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(
		() =>
			onSnapshot(doc(db, "admin", currentUser.uid), (doc) => {
				setAdmin(doc.exists());
				setLoading(false);
			}),
		[currentUser]
	);

	if (!currentUser) {
		router.push("/");
		return <FullPageLoadingSpinner />;
	}

	if (loading) {
		return <FullPageLoadingSpinner />;
	}

	if (!admin) {
		router.replace("/").then(() => {
			if (!toast.isActive("not-authorized")) {
				toast({
					id: "not-authorized",
					title: "Not Authorized",
					description: "You are not authorized to view this page.",
					status: "error",
					duration: 5000,
					isClosable: true,
				});
			}
		});
		return <FullPageLoadingSpinner />;
	}

	return <>{children}</>;
};

export default OnlyAdmin;
