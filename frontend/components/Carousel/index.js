import {
	Box,
	Button,
	Flex,
	HStack,
	Image,
	Stack,
	Text,
} from "@chakra-ui/react";
import { useState } from "react";

const Carousel = ({ slides }) => {
	const arrowStyles = {
		cursor: "pointer",
		pos: "absolute",
		top: "50%",
		w: "auto",
		mt: "-22px",
		p: "16px",
		color: "white",
		fontWeight: "bold",
		fontSize: "18px",
		transition: "0.6s ease",
		borderRadius: "0 3px 3px 0",
		userSelect: "none",
		_hover: {
			opacity: 0.8,
			bg: "black",
		},
	};

	const [currentSlide, setCurrentSlide] = useState(0);
	const slidesCount = slides.length;

	const prevSlide = () => {
		setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
	};

	const nextSlide = () => {
		setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
	};

	const setSlide = (slide) => {
		setCurrentSlide(slide);
	};

	const carouselStyle = {
		transition: "all .5s",
		ml: `-${currentSlide * 100}%`,
	};
	return (
		<Flex w="full" p={4} alignItems="center" justifyContent="center">
			<Flex w="full" pos="relative" overflow="hidden">
				<Flex
					h={{ base: "200px", lg: "400px" }}
					w="full"
					{...carouselStyle}
				>
					{slides.map((slide, sid) => (
						<Box
							key={`slide-${sid}`}
							boxSize="full"
							shadow="md"
							flex="none"
						>
							<Text
								color="white"
								fontSize="xs"
								p="8px 12px"
								pos="absolute"
								top="0"
							>
								{sid + 1} / {slidesCount}
							</Text>
							<Image src={slide.img} alt="carousel image" />
							<Stack
								p="8px 12px"
								pos="absolute"
								top="28px"
								w="full"
								ml={"8"}
								color="white"
								filter="drop-shadow(0 0 2rem black)"
							>
								<Text fontSize="4xl">{slide.label}</Text>
								<Text
									fontSize="md"
									maxW={"500px"}
									display={{
										base: "none",
										lg: "block",
									}}
								>
									{slide.description}
								</Text>
							</Stack>
							<Button
								p="12px 16px"
								pos="absolute"
								bottom="80px"
								ml={"20"}
								color="white"
								variant="solid"
								colorScheme={"teal"}
							>
								Watch Now
							</Button>
						</Box>
					))}
				</Flex>
				<Text {...arrowStyles} left="0" onClick={prevSlide}>
					&#10094;
				</Text>
				<Text {...arrowStyles} right="0" onClick={nextSlide}>
					&#10095;
				</Text>
				<HStack justify="center" pos="absolute" bottom="8px" w="full">
					{Array.from({
						length: slidesCount,
					}).map((_, slide) => (
						<Box
							key={`dots-${slide}`}
							cursor="pointer"
							boxSize={["7px", null, "15px"]}
							m="0 2px"
							bg={
								currentSlide === slide
									? "blackAlpha.800"
									: "blackAlpha.500"
							}
							rounded="50%"
							display="inline-block"
							transition="background-color 0.6s ease"
							_hover={{
								bg: "blackAlpha.800",
							}}
							onClick={() => setSlide(slide)}
						></Box>
					))}
				</HStack>
			</Flex>
		</Flex>
	);
};

export default Carousel;
