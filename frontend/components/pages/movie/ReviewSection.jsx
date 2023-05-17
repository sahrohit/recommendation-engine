import {
	Box,
	Grid,
	Heading,
	HStack,
	SimpleGrid,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Member } from "./Member";
import { members } from "./_data";

export const ReviewSection = ({ data }) => (
	<Box as="section">
		<Box
			maxW={{
				base: "xl",
				md: "7xl",
			}}
			mx="auto"
			px={{
				base: "6",
				md: "8",
			}}
			py={{
				base: "12",
				md: "20",
			}}
		>
			<Grid
				templateColumns={{
					base: "1fr",
					// xl: "20rem 1fr",
				}}
				gap={{
					base: "8",
					md: "12",
					lg: "16",
				}}
			>
				<Box>
					<Heading
						size="2xl"
						letterSpacing="tight"
						mb="5"
						fontWeight="extrabold"
						color={useColorModeValue("blue.600", "blue.300")}
					>
						Reviews
					</Heading>
					<Text
						fontSize="xl"
						maxW="2xl"
						color={useColorModeValue(
							"blackAlpha.700",
							"whiteAlpha.800"
						)}
					>
						What other people think about this movie, and what they
						think about the actors. All their opinions are here.
					</Text>
				</Box>
				<SimpleGrid
					mt={{
						base: "8",
						md: "0",
					}}
					columns={{
						base: 1,
						md: 1,
					}}
					spacing="6"
				>
					{data.map((review, index) => (
						<Member
							key={index}
							image={`https://image.tmdb.org/t/p/w400/${review.author_details.avatar_path}`}
							role={review.username}
							name={review.author}
							date={review.created_at}
						>
							{review.content}
						</Member>
					))}
				</SimpleGrid>
			</Grid>
		</Box>
	</Box>
);
