import { useToast } from "@chakra-ui/react";
import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

const OnlyLoggedIn = ({ children }) => {
	const toast = useToast();
	const router = useRouter();
	const [currentUser] = useAuthState(auth);

	if (!currentUser) {
		router.replace("/auth/login").then(() => {
			if (!toast.isActive("not-logged-in")) {
				toast({
					id: "not-logged-in",
					title: "Not Logged in.",
					description: "You must be logged in to view this page.",
					status: "error",
					duration: 9000,
					isClosable: true,
				});
			}
		});
		return <FullPageLoadingSpinner />;
	}
	return <>{children}</>;
};

export default OnlyLoggedIn;
