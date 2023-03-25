import {
	Avatar,
	Box,
	Flex,
	HStack,
	Heading,
	Icon,
	IconButton,
	Stack,
	Text,
	useColorModeValue as mode
} from "@chakra-ui/react";
import { useMovie } from "@contexts/MovieContext";
import { BiTimeFive } from "react-icons/bi";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { HiCalendar } from "react-icons/hi";
import { MdOutlineNewReleases } from "react-icons/md";
import { StatCard } from "./StatCard";

export const MovieHeader = ({ data }) => {
	const { watchedList, loading, removeFromWatched, addToWatched } =
		useMovie();

	return (
		<Box as="section" pt="20" pb="12" position="relative">
			<Box
				position="absolute"
				inset="0"
				height="96"
				backgroundImage={`url(
				https://image.tmdb.org/t/p/original/${data.backdrop_path}
			)`}
				backgroundSize="cover"
			/>
			<CardWithAvatar
				maxW="xl"
				avatarProps={{
					src: `https://image.tmdb.org/t/p/w400/${data.poster_path}`,
					name: "Esther Felix",
				}}
				action={
					!loading && watchedList.includes(data.id) ? (
						<IconButton
							variant="unstyled"
							m={0}
							onClick={() => removeFromWatched(data)}
						>
							<BsHeartFill fill="red" fontSize={"24px"} />
						</IconButton>
					) : (
						<IconButton
							variant="unstyled"
							m={0}
							onClick={() => addToWatched(data)}
						>
							<BsHeart fontSize={"24px"} />
						</IconButton>
					)
				}
			>
				<CardContent>
					<Heading
						size="lg"
						fontWeight="extrabold"
						letterSpacing="tight"
					>
						{data.title || data.name}
					</Heading>
					<Text color={mode("gray.600", "gray.400")}>
						{data?.tagline}
					</Text>

					<HStack>
						<StatCard
							data={{
								id: "popularity",
								title: "Popularity",
								value: data.popularity,
							}}
						/>
						<StatCard
							data={{
								id: "vote-average",
								title: "Vote Average",
								value: data.vote_average,
							}}
						/>
					</HStack>
				</CardContent>
				<UserInfo
					status={data.status}
					runtime={data.runtime}
					releaseDate={data.release_date}
				/>
			</CardWithAvatar>
		</Box>
	);
};

const CardContent = (props) => (
	<Box
		textAlign={{
			sm: "center",
		}}
		pt="2"
		{...props}
	/>
);

const CardWithAvatar = (props) => {
	const { action, avatarProps, children, ...rest } = props;
	return (
		<Flex
			position="relative"
			direction="column"
			align={{
				sm: "center",
			}}
			maxW="2xl"
			mx="auto"
			bg={mode("white", "gray.700")}
			shadow={{
				sm: "base",
			}}
			rounded={{
				sm: "lg",
			}}
			px={{
				base: "6",
				md: "8",
			}}
			pb={{
				base: "6",
				md: "8",
			}}
			{...rest}
		>
			<Avatar
				mt="-10"
				borderWidth="6px"
				borderColor={mode("white", "gray.700")}
				size="2xl"
				borderRadius={"none"}
				{...avatarProps}
			/>
			<Box
				position="absolute"
				top="4"
				insetEnd={{
					base: "6",
					md: "8",
				}}
			>
				{action}
			</Box>
			{children}
		</Flex>
	);
};

const UserInfo = (props) => {
	const { status, runtime, releaseDate, ...stackProps } = props;
	return (
		<Stack
			direction={{
				base: "column",
				sm: "row",
			}}
			spacing={{
				base: "1",
				sm: "6",
			}}
			mt="4"
			fontSize="sm"
			fontWeight="medium"
			color={mode("blue.600", "blue.300")}
			{...stackProps}
		>
			<HStack>
				<Icon as={MdOutlineNewReleases} />
				<Text>{status}</Text>
			</HStack>
			<HStack>
				<Icon as={BiTimeFive} />
				<Text>{runtime} mins.</Text>
			</HStack>
			<HStack>
				<Icon as={HiCalendar} />
				<Text>{releaseDate}</Text>
			</HStack>
		</Stack>
	);
};
