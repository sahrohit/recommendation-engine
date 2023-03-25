import {
	Box,
	Flex,
	Progress,
	Stack,
	Text,
	useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";

export const StatCard = (props) => {
	const { id, title, value, formattedData } = props.data;

	const _value = formattedData?.value ?? value;

	return (
		<Flex
			direction="column"
			bg={mode("white", "gray.700")}
			rounded="md"
			overflow="hidden"
			shadow="base"
		>
			<Box id={id} srOnly>
				{value}
			</Box>
			<Box
				flex="1"
				as="dl"
				px={{
					base: "4",
					lg: "8",
				}}
				py="4"
				color={mode("gray.500", "gray.400")}
			>
				<Text as="dt" fontSize="sm" fontWeight="medium">
					{title}
				</Text>
				<Stack
					direction="row"
					as="dd"
					mt="2"
					align="flex-end"
					textTransform="uppercase"
				>
					<Box
						fontSize={{
							base: "2xl",
							lg: "3xl",
						}}
						as="span"
						fontWeight="bold"
						color={mode("gray.800", "white")}
						lineHeight="1"
					>
						{_value}
					</Box>
				</Stack>
			</Box>
		</Flex>
	);
};
