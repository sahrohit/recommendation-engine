import {
	Box,
	Center,
	Flex,
	HStack,
	Img,
	Link,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";

export default function MovieCard({ title, movie }) {
	const router = useRouter();

	const [liked, setLiked] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	const MotionBox = motion(Box);

	return (
		<Center py={6}>
			<MotionBox
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
				onMouseOver={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				onClick={() => router.push(`/movie/${movie.id}`)}
			>
				<Box h={"400px"} borderBottom={"1px"} borderColor="black">
					<Img
						src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`}
						roundedTop={"sm"}
						objectFit="cover"
						h="full"
						alt={"Blog Image"}
					/>
					<AnimatePresence
						onExitComplete={() => conosle.log("Exited")}
					>
						{isHovered && (
							<MotionBox
								layout
								key={`${movie.id}-overlay-${title}`}
								initial={{ y: 100, opacity: 0 }}
								animate={{ y: 1, opacity: 1 }}
								exit={{ y: -100, opacity: 0 }}
								transition={{ type: "spring", stiffness: 100 }}
								p={4}
								position="relative"
								top={-120}
								background="white"
							>
								<HStack mb={2}>
									{movie.genre_ids.map((genre) => (
										<Box
											key={`${movie.id}-${genre}`}
											bg="black"
											display={"inline-block"}
											px={2}
											py={1}
											color="white"
										>
											<Text
												fontSize={"xs"}
												fontWeight="medium"
											>
												{genre}
											</Text>
										</Box>
									))}
								</HStack>
								<Text
									fontSize="xs"
									color={"gray.500"}
									noOfLines={3}
								>
									{movie.overview}
								</Text>
							</MotionBox>
						)}
					</AnimatePresence>
				</Box>
				<HStack borderTop={"1px"} color="black">
					<Flex
						px={3}
						py={2}
						alignItems="center"
						borderBottom={"1px"}
						justifyContent={"space-between"}
						roundedBottom={"sm"}
						cursor={"pointer"}
						w="full"
					>
						<Link
							fontSize={"md"}
							fontWeight={"semibold"}
							w="170px"
							mr={1}
							lineHeight={5}
							height={10}
							overflow={"hidden"}
							alignItems={"center"}
						>
							{movie.title || movie.name}
						</Link>
					</Flex>
					<Flex
						p={4}
						alignItems="center"
						justifyContent={"space-between"}
						roundedBottom={"sm"}
						borderLeft={"1px"}
						cursor="pointer"
						onClick={() => setLiked(!liked)}
					>
						{liked ? (
							<BsHeartFill fill="red" fontSize={"24px"} />
						) : (
							<BsHeart fontSize={"24px"} />
						)}
					</Flex>
				</HStack>
			</MotionBox>
		</Center>
	);
}
