import { HStack, Heading, VStack } from "@chakra-ui/react";
import CarouselMovieList from "@components/Skeleton/CarouselMovieCard";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import MovieCard from "./MovieCard";
import Error from "@components/shared/Error";

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
		return <CarouselMovieList />;
	}

	if (isError || error) {
		return <Error error={error} />;
	}

	return (
		<VStack
			gap={1}
			my={4}
			alignItems={"flex-start"}
			id={title.toLowerCase()}
		>
			<Heading size="xl" fontWeight={300}>
				{title}
			</Heading>
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
		</VStack>
	);
};

export default MovieList;
