import {
	Avatar,
	Box,
	Button,
	CloseButton,
	Divider,
	Drawer,
	DrawerContent,
	Flex,
	HStack,
	Icon,
	IconButton,
	Link,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	Spacer,
	Spinner,
	Stack,
	Text,
	VStack,
	useColorModeValue as mode,
	useDisclosure,
} from "@chakra-ui/react";
import Notification from "@components/Notification";
import ToggleTheme from "@components/shared/ToggleTheme";
import {
	FiChevronDown,
	FiCompass,
	FiHome,
	FiMenu,
	FiTrendingUp,
} from "react-icons/fi";

import Logo from "@components/Logo";
import SearchModal from "@components/Search";
import Footer from "@components/shared/Footer";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { MdManageAccounts } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { auth } from "../../../firebase";

const LinkItems = [
	{ name: "Home", icon: FiHome, href: "/" },
	{ name: "Trending", icon: FiTrendingUp, href: "/#trendings" },
	{ name: "Discover", icon: FiCompass, href: "/#discover" },
];

const LinkSettings = [
	{ name: "Dashboard", icon: RxDashboard, href: "/dashboard" },
	{ name: "Account", icon: MdManageAccounts, href: "/dashboard/account" },
];

export default function Layout({ children }) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Box minH="100vh" bg={mode("gray.100", "gray.900")}>
			<SidebarContent
				onClose={() => onClose}
				display={{ base: "none", md: "block" }}
			/>
			<Drawer
				autoFocus={false}
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size="full"
			>
				<DrawerContent>
					<SidebarContent onClose={onClose} />
				</DrawerContent>
			</Drawer>
			<MobileNav onOpen={onOpen} />
			<Box ml={{ base: 0, md: 80 }} p={4}>
				{children}
			</Box>
			<Box as="section" ml={{ base: 0, md: 80 }}>
				<Footer />
			</Box>
		</Box>
	);
}

const SidebarContent = ({ onClose, ...rest }) => {
	const router = useRouter();
	const [currentUser, loading] = useAuthState(auth);

	return (
		<Box
			transition="3s ease"
			bg={mode("white", "gray.900")}
			borderRight="1px"
			borderRightColor={mode("gray.200", "gray.700")}
			pos="fixed"
			h="100vh"
			{...rest}
		>
			<Flex
				height="100vh"
				direction="column"
				borderRightWidth="1px"
				px={6}
				py={8}
			>
				<HStack mb={8} justifyContent={"space-between"}>
					<Logo iconColor="blue.600" />
					<CloseButton
						display={{ base: "flex", md: "none" }}
						onClick={onClose}
					/>
				</HStack>
				<Box mb={6}>
					<SearchModal />
				</Box>
				<Stack spacing={6}>
					<Stack>
						{LinkItems.map((link) => (
							<NavLink
								key={link.name}
								label={link.name}
								icon={link.icon}
								href={link.href}
								isActive={router.asPath === link.href}
							/>
						))}
					</Stack>
					<Divider />
					<Stack>
						{LinkSettings.map((link) => (
							<NavLink
								key={link.name}
								label={link.name}
								icon={link.icon}
								href={link.href}
								isActive={router.asPath === link.href}
							/>
						))}
					</Stack>
				</Stack>
				<Spacer />
				{!loading && currentUser && (
					<UserProfile
						name={currentUser.displayName}
						image={currentUser.photoURL}
						email={currentUser.email}
					/>
				)}
			</Flex>
		</Box>
	);
};

const NavLink = (props) => {
	const { icon, isActive, label, href, ...rest } = props;
	return (
		<Link
			as={NextLink}
			href={href || "/"}
			display="block"
			py={2}
			px={3}
			borderRadius="md"
			transition="all 0.3s"
			fontWeight="medium"
			lineHeight="1.5rem"
			aria-current={isActive ? "page" : undefined}
			color={mode("blackAlpha.800", "whiteAlpha.800")}
			_hover={{
				bg: mode("gray.100", "gray.700"),
				color: mode("black", "white"),
			}}
			_activeLink={{
				bg: mode("blue.500", "blue.300"),
				color: mode("white", "black"),
			}}
			{...rest}
		>
			<HStack spacing={4}>
				<Icon as={icon} boxSize="20px" />
				<Text as="span">{label}</Text>
			</HStack>
		</Link>
	);
};

const MobileNav = ({ onOpen, ...rest }) => {
	const [currentUser, loading] = useAuthState(auth);
	const [logOut] = useSignOut(auth);

	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 4 }}
			height="20"
			alignItems="center"
			bg={mode("white", "gray.900")}
			borderBottomWidth="1px"
			borderBottomColor={mode("gray.200", "gray.700")}
			justifyContent={{ base: "space-between", md: "flex-end" }}
			{...rest}
		>
			<IconButton
				display={{ base: "flex", md: "none" }}
				onClick={onOpen}
				variant="outline"
				aria-label="open menu"
				icon={<FiMenu />}
			/>

			<Text
				display={{ base: "flex", md: "none" }}
				fontSize="2xl"
				fontFamily="monospace"
				fontWeight="bold"
			>
				Logo
			</Text>

			{loading ? (
				<Spinner
					thickness="4px"
					speed="0.65s"
					emptyColor="gray.200"
					color="green.500"
					size="xl"
				/>
			) : currentUser ? (
				<HStack spacing={{ base: "0", md: "6" }}>
					<ToggleTheme />

					<Notification />
					<Flex alignItems={"center"}>
						<Menu>
							<MenuButton
								py={2}
								transition="all 0.3s"
								_focus={{ boxShadow: "none" }}
							>
								<HStack>
									<Avatar
										size={"sm"}
										src={currentUser.photoURL}
									/>
									<VStack
										display={{ base: "none", md: "flex" }}
										alignItems="flex-start"
										spacing="1px"
										ml="2"
									>
										<Text fontSize="sm">
											{currentUser.displayName}
										</Text>
										<Text fontSize="xs" color="gray.600">
											Admin
										</Text>
									</VStack>
									<Box display={{ base: "none", md: "flex" }}>
										<FiChevronDown />
									</Box>
								</HStack>
							</MenuButton>
							<MenuList>
								<MenuItem>Profile</MenuItem>
								<MenuItem>Settings</MenuItem>
								<MenuItem>Billing</MenuItem>
								<MenuDivider />
								<MenuItem onClick={() => logOut()}>
									Sign out
								</MenuItem>
							</MenuList>
						</Menu>
					</Flex>
				</HStack>
			) : (
				<HStack mx={4} gap={2}>
					<ToggleTheme />

					<Button as={NextLink} href="/auth/login" variant="link">
						Sign In
					</Button>
					<Button
						as={NextLink}
						href="/auth/register"
						colorScheme="teal"
						variant="solid"
					>
						Get Started
					</Button>
				</HStack>
			)}
		</Flex>
	);
};

const UserProfile = (props) => {
	const { name, image, email } = props;
	return (
		<HStack spacing="4" px="2">
			<Avatar name={name} src={image} />
			<Flex direction="column">
				<Text fontWeight="medium">{name}</Text>
				<Text fontSize="xs" lineHeight="shorter">
					{email}
				</Text>
			</Flex>
		</HStack>
	);
};
