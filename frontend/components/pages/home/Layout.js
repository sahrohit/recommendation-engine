import {
	Avatar,
	Box,
	Button,
	CloseButton,
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
	Spinner,
	Text,
	VStack,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react";
import Notification from "@components/Notification";
import ToggleTheme from "@components/shared/ToggleTheme";
import { useAuth } from "@contexts/AuthContext";
import {
	FiChevronDown,
	FiCompass,
	FiHome,
	FiMenu,
	FiTrendingUp,
} from "react-icons/fi";

import SearchModal from "@components/Search";
import Footer from "@components/shared/Footer";
import NextLink from "next/link";

const LinkItems = [
	{ name: "Home", icon: FiHome, href: "/" },
	{ name: "Trending", icon: FiTrendingUp, href: "/#trendings" },
	{ name: "Discover", icon: FiCompass, href: "/#discover" },
	// { name: "Favourites", icon: FiStar },
	// { name: "Settings", icon: FiSettings },
];

export default function Layout({ children }) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
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
			<Box ml={{ base: 0, md: 60 }} p={4}>
				{children}
			</Box>
			<Box as="section" ml={{ base: 0, md: 60 }}>
				<Footer />
			</Box>
		</Box>
	);
}

const SidebarContent = ({ onClose, ...rest }) => {
	return (
		<Box
			transition="3s ease"
			bg={useColorModeValue("white", "gray.900")}
			borderRight="1px"
			borderRightColor={useColorModeValue("gray.200", "gray.700")}
			w={{ base: "full", md: 60 }}
			pos="fixed"
			h="full"
			{...rest}
		>
			<Flex
				h="20"
				alignItems="center"
				mx="8"
				justifyContent="space-between"
			>
				<Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
					Logo
				</Text>
				<CloseButton
					display={{ base: "flex", md: "none" }}
					onClick={onClose}
				/>
			</Flex>
			<Box mx={3} my={2}>
				<SearchModal />
			</Box>
			{LinkItems.map((link) => (
				<NavItem key={link.name} icon={link.icon} href={link.href}>
					{link.name}
				</NavItem>
			))}
		</Box>
	);
};

const NavItem = ({ icon, children, href, ...rest }) => {
	return (
		<Link
			as={NextLink}
			href={href}
			style={{ textDecoration: "none" }}
			_focus={{ boxShadow: "none" }}
		>
			<Flex
				align="center"
				p="4"
				mx="4"
				borderRadius="lg"
				role="group"
				cursor="pointer"
				_hover={{
					bg: "cyan.400",
					color: "white",
				}}
				{...rest}
			>
				{icon && (
					<Icon
						mr="4"
						fontSize="16"
						_groupHover={{
							color: "white",
						}}
						as={icon}
					/>
				)}
				{children}
			</Flex>
		</Link>
	);
};

const MobileNav = ({ onOpen, ...rest }) => {
	const { currentUser, logOut, loading } = useAuth();

	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 4 }}
			height="20"
			alignItems="center"
			bg={useColorModeValue("white", "gray.900")}
			borderBottomWidth="1px"
			borderBottomColor={useColorModeValue("gray.200", "gray.700")}
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
