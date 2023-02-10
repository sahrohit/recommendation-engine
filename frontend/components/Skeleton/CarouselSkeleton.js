import { Flex, Skeleton } from "@chakra-ui/react";
import { useState } from "react";

const CarouselSkeleton = () => {
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
	const slidesCount = 5;

	const prevSlide = () => {
		setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
	};

	const nextSlide = () => {
		setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
	};

	const setSlide = (slide) => {
		setCurrentSlide(slide);
	};

	const carouselSkeletonStyle = {
		transition: "all .5s",
		ml: `-${currentSlide * 100}%`,
	};
	return (
		<Flex w="full" p={4} alignItems="center" justifyContent="center">
			<Flex w="full" pos="relative" overflow="hidden">
				<Skeleton
					h={{ base: "200px", lg: "400px" }}
					w="full"
					{...carouselSkeletonStyle}
				></Skeleton>
			</Flex>
		</Flex>
	);
};

export default CarouselSkeleton;
