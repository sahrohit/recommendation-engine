import { Box, Flex, Img, Text, useColorModeValue } from "@chakra-ui/react";

export const Member = (props) => {
	const { image, role, name, date, children } = props;
	return (
		<Flex
			direction="column"
			bg={useColorModeValue("white", "gray.700")}
			shadow={useColorModeValue("base", "none")}
		>
			<Box p="6" flex="1">
				<Img
					float="right"
					alt={name}
					w="16"
					h="16"
					rounded="lg"
					objectFit="cover"
					src={image}
					zIndex="1"
				/>
				<Box mt="2">
					<Text fontWeight="bold">{name}</Text>
					<Text
						color={useColorModeValue("gray.500", "whiteAlpha.700")}
						fontWeight="medium"
						fontSize="sm"
					>
						{role}
					</Text>
				</Box>
				<Text
					color={useColorModeValue("gray.600", "whiteAlpha.800")}
					mt="6"
					fontSize={"sm"}
				>
					{children}
				</Text>
			</Box>
			<Text textAlign={"right"} pb={2} pr={2}>
				{date}
			</Text>
		</Flex>
	);
};
