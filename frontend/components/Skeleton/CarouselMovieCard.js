import {
	Box,
	Center,
	HStack,
	Heading,
	Skeleton,
	VStack,
	useColorModeValue,
} from "@chakra-ui/react";
import { nanoid } from "nanoid";

const CarouselMovieCard = () => {
	return (
		<Center py={6}>
			<Box
				rounded={"sm"}
				mx={[0, 2]}
				overflow={"hidden"}
				bg="white"
				border={"1px"}
				borderColor="black"
				boxShadow={useColorModeValue(
					"6px 6px 0 black",
					"6px 6px 0 cyan"
				)}
			>
				<Skeleton h={"457px"} borderBottom={"1px"} borderColor="black">
					<Skeleton w="262px"></Skeleton>
				</Skeleton>
			</Box>
		</Center>
	);
};

const CarouselMovieList = () => {
	return (
		<VStack gap={1} my={4} alignItems={"flex-start"}>
			<Skeleton isLoaded={false}>
				<Heading size="xl" fontWeight={300}>
					Heading Heading
				</Heading>
			</Skeleton>
			<HStack overflowX={"scroll"} w="full" gap={2}>
				{[...Array(10)].map((_, i) => (
					<CarouselMovieCard key={nanoid()} />
				))}
			</HStack>
		</VStack>
	);
};

export default CarouselMovieList;
