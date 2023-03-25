import {
	Button,
	Link as ChakraLink,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	Stack,
	Text,
	useColorModeValue
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import * as Yup from "yup";

const ForgotPassword = () => {
	const ForgotPasswordSchema = Yup.object().shape({
		email: Yup.string()
			.email("Invalid Email Address")
			.required("Email is required"),
	});

	return (
		<Flex minH={"100vh"} align={"center"} justify={"center"}>
			<Stack spacing={4} w={"full"} maxW={"md"} p={6} my={12}>
				<Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
					Forgot your password?
				</Heading>
				<Text
					fontSize={{ base: "sm", sm: "md" }}
					color={useColorModeValue("gray.800", "gray.400")}
				>
					You&apos;ll get an email with a reset link
				</Text>
				<Formik
					initialValues={{ email: "" }}
					validationSchema={ForgotPasswordSchema}
					onSubmit={(values, actions) => {
						console.log(values);
					}}
				>
					{(props) => (
						<Form>
							<Field name="email">
								{({ field, form }) => (
									<FormControl
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
											justify={"space-between"}
										>
											<FormLabel>Email address</FormLabel>
											<FormErrorMessage>
												{form.errors.email}
											</FormErrorMessage>
										</Stack>
										<Input
											{...field}
											autoComplete="email"
											placeholder="youremail@email.com"
										/>
										{/* 
										<FormErrorMessage>
											{form.errors.email}
										</FormErrorMessage> */}
									</FormControl>
								)}
							</Field>

							<Button
								mt={4}
								width="100%"
								bg={"blue.400"}
								color={"white"}
								_hover={{
									bg: "blue.500",
								}}
								isLoading={props.isSubmitting}
								type="submit"
							>
								Request Reset
							</Button>
						</Form>
					)}
				</Formik>
				<Stack spacing={6}>
					<Text align={"center"}>
						Don`t need a reset?{" "}
						<Link passHref href="/">
							<ChakraLink color={"blue.400"}>Go Home</ChakraLink>
						</Link>
					</Text>
				</Stack>
			</Stack>
		</Flex>
	);
};

export default ForgotPassword;
