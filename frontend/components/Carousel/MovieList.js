import { HStack, Heading, VStack } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { useQuery } from "react-query";
import MovieCard from "./MovieCard";
import { useRouter } from "next/router";

const MovieList = ({ title, url }) => {
	const router = useRouter();

	const { isLoading, isError, data, error } = useQuery(
		`${title}Movies`,
		async () => {
			const response = await fetch(url, {
				method: "GET",
				redirect: "follow",
			});
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		}
	);

	if (isLoading) {
		return <span>Loading...</span>;
	}

	if (isError) {
		return <span>Error: {error.message}</span>;
	}

	return (
		<VStack gap={1} my={4} alignItems={"flex-start"}>
			<Heading size="xl" fontWeight={300}>
				{title}
			</Heading>
			<AnimatePresence>
				<HStack overflowX={"scroll"} w="full" gap={2}>
					{data.results.map((movie) => {
						return (
							<MovieCard
								title={title}
								key={`${movie.id}-moviecard`}
								movie={movie}
							/>
						);
					})}
				</HStack>
			</AnimatePresence>
		</VStack>
	);
};

export default MovieList;
