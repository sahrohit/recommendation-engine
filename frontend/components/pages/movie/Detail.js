import { Badge, Box, Flex, Heading, Image, Stack } from "@chakra-ui/react";

const Detail = ({ data }) => {
	return (
		<Flex direction={"column"} gap={4}>
			<Image
				alt={data.title || data.name}
				src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
			/>
			<Flex direction={"column"} gap={2}>
				<Heading size="2xl">{data.title || data.name}</Heading>
				<Stack direction="row">
					{data.genres.map((genre) => (
						<Badge
							key={genre.id}
							variant="solid"
							colorScheme={
								BADGE_COLORS[
									Math.floor(
										Math.random() * BADGE_COLORS.length
									)
								]
							}
						>
							{genre.name}
						</Badge>
					))}
				</Stack>
				<p>{data.overview}</p>
			</Flex>
		</Flex>
	);
};

export default Detail;

const BADGE_COLORS = [
	"green",
	"red",
	"purple",
	"gray",
	"orange",
	"purple",
	"teal",
	"yellow",
	"blue",
	"cyan",
	"pink",
];
