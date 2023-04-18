import {
	Avatar,
	Box,
	Button,
	Divider,
	Flex,
	HStack,
	Stack,
	StackDivider,
	Text,
	useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import { HiPlus } from "react-icons/hi";
import { Description } from "@components/Profile/Description";
import { useMovie } from "@contexts/MovieContext";
import NextLink from "next/link";
import OnlyLoggedIn from "@components/routes/OnlyLoggedIn";

const Dashboard = () => {
	const { watched, loading, removeFromWatched } = useMovie();

	return (
		<OnlyLoggedIn>
			<Box as="section" py="12">
				<Box
					maxW={{
						base: "xl",
						md: "7xl",
					}}
					mx="auto"
					px={{
						md: "8",
					}}
				>
					<Box
						rounded={{
							lg: "lg",
						}}
						bg={mode("white", "gray.900")}
						maxW="3xl"
						mx="auto"
						shadow="base"
						overflow="hidden"
					>
						<Flex
							align="center"
							justify="space-between"
							px="6"
							py="4"
						>
							<Text as="h3" fontWeight="bold" fontSize="lg">
								Watched
							</Text>
							<Button
								as={NextLink}
								href="/"
								colorScheme="blue"
								minW="20"
								leftIcon={<HiPlus />}
							>
								Add
							</Button>
						</Flex>
						<Divider />
						<Stack
							spacing="6"
							py="5"
							px="8"
							divider={<StackDivider />}
						>
							{!loading &&
								watched.map((movie) => (
									<HStack key={movie.id}>
										<Avatar
											size="2xl"
											src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`}
											borderRadius={"none"}
										/>
										<Description
											title={movie.title || movie.name}
											labels={movie.genre_ids}
											removeFromWatched={
												removeFromWatched
											}
											movie={movie}
										>
											{movie?.overview?.substring(
												0,
												130
											) ?? "No overview"}
											...
										</Description>
									</HStack>
								))}
						</Stack>
					</Box>
				</Box>
			</Box>
		</OnlyLoggedIn>
	);
};

export default Dashboard;
