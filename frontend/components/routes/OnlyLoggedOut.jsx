import React from "react";
import { useRouter } from "next/router";
import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";
import { useToast } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

const OnlyLoggedOut = ({ children, redirect = "/" }) => {
	const toast = useToast();
	const router = useRouter();
	const [currentUser] = useAuthState(auth);

	if (currentUser) {
		router.replace(redirect).then(() => {
			//! The last page (from which the push is being called) re-renders while router.push is being used.
			//! Unwanted Error and Warning are generated by these toast on re-render.
			// if (!toast.isActive("logged-in")) {
			// 	toast({
			// 		id: "logged-in",
			// 		title: "Already Logged in.",
			// 		description: "You are already logged in.",
			// 		status: "success",
			// 		duration: 9000,
			// 		isClosable: true,
			// 	});
			// }
		});
		return <FullPageLoadingSpinner />;
	}

	return <>{children}</>;
};

export default OnlyLoggedOut;
