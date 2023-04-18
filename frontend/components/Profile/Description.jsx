import {
	Badge,
	Box,
	HStack,
	IconButton,
	useColorModeValue as mode,
} from "@chakra-ui/react";
import { HiPencilAlt, HiTrash } from "react-icons/hi";

export const Description = (props) => {
	const { title, children, labels, removeFromWatched, movie } = props;
	return (
		<Box position="relative">
			<Box fontWeight="bold" maxW="xl">
				{title}
			</Box>
			<HStack
				fontSize="sm"
				fontWeight="medium"
				color={mode("gray.500", "white")}
				mt="1"
			>
				{labels?.map((label) => (
					<Badge key={`${title} ${label}`}>{label}</Badge>
				))}
			</HStack>
			<Box mt="3" maxW="xl" color={mode("gray.600", "gray.200")}>
				{children}
			</Box>
			<HStack
				position={{
					sm: "absolute",
				}}
				top={{
					sm: "0",
				}}
				insetEnd={{
					sm: "0",
				}}
				mt={{
					base: "4",
					sm: "0",
				}}
			>
				<IconButton
					onClick={() => removeFromWatched(movie)}
					aria-label="Delete"
					icon={<HiTrash />}
					rounded="full"
					size="sm"
				/>
			</HStack>
		</Box>
	);
};
