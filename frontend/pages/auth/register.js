import {
	Box,
	Button,
	Image as ChakraImage,
	Link as ChakraLink,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	Heading,
	Input,
	Stack,
	Text,
	useBreakpointValue,
	useToast,
} from "@chakra-ui/react";
import OnlyLoggedOut from "@components/routes/OnlyLoggedOut";
import { fadeInLeft } from "@config/animations";
import { Field, Form, Formik } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
	useAuthState,
	useCreateUserWithEmailAndPassword,
	useSendEmailVerification,
	useUpdateProfile,
} from "react-firebase-hooks/auth";
import * as Yup from "yup";
import { auth } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

const RegisterPage = () => {
	const toast = useToast();
	const SignupSchema = Yup.object().shape({
		firstname: Yup.string().required(),
		lastname: Yup.string(),
		email: Yup.string()
			.email("Invalid Email Address")
			.required("Email is required"),
		password: Yup.string()
			.min(6, "Too Short!")
			.max(25, "Too Long!")
			.required("Password is required"),
	});
	const [user] = useAuthState(auth);
	const [createUserWithEmailAndPassword] =
		useCreateUserWithEmailAndPassword(auth);
	const [updateProfile] = useUpdateProfile(auth);
	const [sendEmailVerification] = useSendEmailVerification(auth);

	const isMobile = useBreakpointValue({
		base: true,
		md: true,
		lg: false,
		xl: false,
	});
	const MotionFlex = motion(Flex);

	return (
		<OnlyLoggedOut redirect="/auth/verifyemail">
			<Stack
				minH={"100vh"}
				direction={{ base: "column", md: "row" }}
				overflow={"hidden"}
			>
				{!isMobile && (
					<Flex flex={2} position={"relative"}>
						<Flex
							color={"white"}
							zIndex={1}
							direction={"column"}
							w={"full"}
							alignItems={"left"}
							justifyContent={"flex-end"}
						>
							<Heading
								p={"20%"}
								fontFamily={"Dancing Script"}
								fontWeight={"semibold"}
								fontSize={"80px"}
								whiteSpace={"nowrap"}
							>
								We serve your <br /> dream cusines.
							</Heading>
						</Flex>

						<ChakraImage
							as={Image}
							alt={"Beautiful Foods"}
							layout={"fill"}
							objectFit={"cover"}
							filter={`blur(1px) brightness(70%)`}
							src={
								"https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=859&q=80"
							}
						/>
					</Flex>
				)}
				<AnimatePresence>
					<MotionFlex
						p={8}
						flex={1}
						align={"center"}
						justify={"center"}
						initial="initial"
						animate="animate"
						variants={fadeInLeft}
					>
						<Stack spacing={4} w={"full"} maxW={"md"}>
							<Text align={"right"} my={10}>
								Return to{" "}
								<Link passHref href="/">
									<ChakraLink iHomecolor={"blue.400"}>
										Home,
									</ChakraLink>
								</Link>
							</Text>
							<Heading
								fontSize={"3xl"}
								fontWeight={"medium"}
								textAlign={"center"}
								fontFamily={"Inter"}
								whiteSpace={"nowrap"}
								m={5}
							>
								Sign up to Movies
							</Heading>

							<Formik
								initialValues={{
									firstname: "",
									lastname: "",
									email: "",
									password: "",
								}}
								validationSchema={SignupSchema}
								onSubmit={async (values, actions) => {
									await createUserWithEmailAndPassword(
										values.email,
										values.password
									);
									const success = await updateProfile({
										displayName: `${values.firstname} ${values.lastname}`,
									});
									await setDoc(doc(db, "users", user.uid), {
										...user,
									});
									if (success) {
										const sent =
											await sendEmailVerification();
										if (sent) {
											toast({
												title: `Welcome ${values.firstname} ${values.lastname}!`,
												description:
													"We are happy to have you on board.",
												status: "success",
												duration: 9000,
												isClosable: true,
											});
										}
									} else {
										toast({
											title: "Failed.",
											description: "Something went wrong",
											status: "error",
											duration: 9000,
											isClosable: true,
										});
									}
									actions.setSubmitting(false);
								}}
							>
								{(props) => (
									<Form>
										<Stack
											spacing={4}
											w={"full"}
											maxW={"md"}
										>
											<HStack>
												<Box>
													<Field name="firstname">
														{({ field, form }) => (
															<FormControl
																id="firstName"
																isRequired
																isInvalid={
																	form.errors
																		.firstname &&
																	form.touched
																		.firstname
																}
															>
																<HStack
																	align={
																		"start"
																	}
																	justify={
																		"space-between"
																	}
																>
																	<FormLabel>
																		First
																		Name
																	</FormLabel>
																</HStack>

																<Input
																	{...field}
																	autoComplete="given-name"
																	type="text"
																/>
															</FormControl>
														)}
													</Field>
												</Box>
												<Box>
													<Field name="lastname">
														{({ field, form }) => (
															<FormControl id="lastName">
																<HStack
																	align={
																		"start"
																	}
																	justify={
																		"space-between"
																	}
																>
																	<FormLabel>
																		Last
																		Name
																	</FormLabel>
																</HStack>

																<Input
																	{...field}
																	autoComplete="family-name"
																	type="text"
																/>
															</FormControl>
														)}
													</Field>
												</Box>
											</HStack>

											<Field name="email">
												{({ field, form }) => (
													<FormControl
														isRequired
														isInvalid={
															form.errors.email &&
															form.touched.email
														}
													>
														<Stack
															direction={{
																base: "column",
																sm: "row",
															}}
															align={"start"}
															justify={
																"space-between"
															}
														>
															<FormLabel>
																Email address
															</FormLabel>
															<FormErrorMessage>
																{
																	form.errors
																		.email
																}
															</FormErrorMessage>
														</Stack>

														<Input
															{...field}
															autoComplete="email"
															type="email"
														/>
													</FormControl>
												)}
											</Field>
											<Field name="password">
												{({ field, form }) => (
													<FormControl
														isRequired
														isInvalid={
															form.errors
																.password &&
															form.touched
																.password
														}
													>
														<Stack
															direction={{
																base: "column",
																sm: "row",
															}}
															align={"start"}
															justify={
																"space-between"
															}
														>
															<FormLabel>
																Password
															</FormLabel>
															<FormErrorMessage>
																{
																	form.errors
																		.password
																}
															</FormErrorMessage>
														</Stack>
														<Input
															{...field}
															autoComplete="new-password"
															type="password"
														/>
													</FormControl>
												)}
											</Field>

											<Stack spacing={6}>
												<Button
													isLoading={
														props.isSubmitting
													}
													type="submit"
													colorScheme={"green"}
													variant={"solid"}
												>
													Create Account
												</Button>
											</Stack>
										</Stack>
									</Form>
								)}
							</Formik>

							<Stack pt={6}>
								<Text align={"center"}>
									Already a user?{" "}
									<Link passHref href="/auth/login">
										<ChakraLink color={"blue.400"}>
											Login
										</ChakraLink>
									</Link>
								</Text>
							</Stack>
						</Stack>
					</MotionFlex>
				</AnimatePresence>
			</Stack>
		</OnlyLoggedOut>
	);
};

export default RegisterPage;
