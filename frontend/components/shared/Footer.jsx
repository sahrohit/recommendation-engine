import {
	Box,
	Button,
	ButtonGroup,
	Divider,
	IconButton,
	Input,
	Stack,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import Logo from "@components/Logo";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => (
	<Box bg={useColorModeValue("white", "gray.900")} px={4}>
		<Stack
			spacing="8"
			direction={{
				base: "column",
				md: "row",
			}}
			justify="space-between"
			w="full"
			py={{
				base: "12",
				md: "16",
			}}
		>
			<Stack
				spacing={{
					base: "6",
					md: "8",
				}}
				align="start"
			>
				<Logo />
				<Text color="muted">Keep track of what you are watching.</Text>
			</Stack>
			<Stack
				direction={{
					base: "column-reverse",
					md: "column",
					lg: "row",
				}}
				spacing={{
					base: "12",
					md: "8",
				}}
			>
				<Stack direction="row" spacing="8">
					<Stack spacing="4" minW="36" flex="1">
						<Text
							fontSize="sm"
							fontWeight="semibold"
							color="subtle"
						>
							Product
						</Text>
						<Stack spacing="3" shouldWrapChildren>
							<Button variant="link">How it works</Button>
							<Button variant="link">Pricing</Button>
							<Button variant="link">Use Cases</Button>
						</Stack>
					</Stack>
					<Stack spacing="4" minW="36" flex="1">
						<Text
							fontSize="sm"
							fontWeight="semibold"
							color="subtle"
						>
							Legal
						</Text>
						<Stack spacing="3" shouldWrapChildren>
							<Button variant="link">Privacy</Button>
							<Button variant="link">Terms</Button>
							<Button variant="link">License</Button>
						</Stack>
					</Stack>
				</Stack>
				<Stack spacing="4">
					<Text fontSize="sm" fontWeight="semibold" color="subtle">
						Stay up to date
					</Text>
					<Stack
						spacing="4"
						direction={{
							base: "column",
							sm: "row",
						}}
						maxW={{
							lg: "360px",
						}}
					>
						<Input
							placeholder="Enter your email"
							type="email"
							required
						/>
						<Button
							variant="solid"
							colorScheme={"teal"}
							type="submit"
							flexShrink={0}
						>
							Subscribe
						</Button>
					</Stack>
				</Stack>
			</Stack>
		</Stack>
		<Divider />
		<Stack
			pt="8"
			pb="12"
			justify="space-between"
			direction={{
				base: "column-reverse",
				md: "row",
			}}
			align="center"
		>
			<Text fontSize="sm" color="subtle">
				&copy; {new Date().getFullYear()} Rohit Sah, All rights
				reserved.
			</Text>
			<ButtonGroup variant="ghost">
				<IconButton
					as="a"
					href="https://www.github.com/sahrohit/recommendation-engine"
					aria-label="GitHub"
					target="_blank"
					icon={<FaGithub fontSize="1.25rem" />}
				/>
				{/* <IconButton
					as="a"
					href="#"
					aria-label="LinkedIn"
					icon={<FaLinkedin fontSize="1.25rem" />}
				/>
				<IconButton
					as="a"
					href="#"
					aria-label="Twitter"
					icon={<FaTwitter fontSize="1.25rem" />}
				/> */}
			</ButtonGroup>
		</Stack>
	</Box>
);

export default Footer;
