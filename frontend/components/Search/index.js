import { SearchIcon } from "@chakra-ui/icons";
import {
	Avatar,
	FormControl,
	Input,
	InputGroup,
	InputLeftElement,
	Modal,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Text,
	VStack,
	useDisclosure,
} from "@chakra-ui/react";
import {
	AutoComplete,
	AutoCompleteInput,
	AutoCompleteItem,
	AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import debounce from "lodash/debounce";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

const SearchModal = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [list, setList] = useState();

	const router = useRouter();

	const debouncedSearch = useRef(
		debounce(async (criteria) => {
			setList(await search(criteria));
		}, 300)
	).current;

	async function handleChange(e) {
		if (e.target.value.length < 3) return;
		debouncedSearch(e.target.value);
	}

	const search = async (query) => {
		const response = await fetch(
			`https://api.themoviedb.org/3/search/movie?language=en-US&query=${query}&include_adult=true&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
			{
				method: "GET",
				redirect: "follow",
			}
		);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		return response.json();
	};

	return (
		<>
			<InputGroup>
				<InputLeftElement pointerEvents="none">
					<SearchIcon fontSize={"lg"} mt={2} />
				</InputLeftElement>

				<Input
					onClick={onOpen}
					placeholder="Search"
					value={""}
					size="lg"
					readOnly
				/>
			</InputGroup>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />

				<ModalContent>
					<FormControl id="email" w="full">
						<AutoComplete openOnFocus>
							<ModalHeader>
								<InputGroup>
									<InputLeftElement pointerEvents="none">
										<SearchIcon mb={3} mr={2} />
									</InputLeftElement>

									<AutoCompleteInput
										placeholder="Search everything"
										onChange={handleChange}
										size="lg"
										variant="unstyled"
									/>
								</InputGroup>
							</ModalHeader>

							<AutoCompleteList w="full" gap={2}>
								{list?.results.map((movie, oid) => (
									<AutoCompleteItem
										key={`${movie.id}-search-result-${
											movie.title || movie.name
										}`}
										value={movie.title || movie.name}
										textTransform="capitalize"
										justifyContent={"flex-start"}
										align="left"
										onClick={() => {
											router
												.push(`/movie/${movie.id}`)
												.then(() => onClose());
										}}
									>
										<Avatar
											size="lg"
											name={movie.name}
											src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
											style={{
												borderRadius: "0 !important",
											}}
										/>
										<VStack
											justifyContent={"flex-start"}
											alignItems={"flex-start"}
											w="full"
										>
											<Text
												ml="4"
												fontWeight={600}
												fontSize={"xl"}
											>
												{movie.title || movie.name}
											</Text>
											<Text ml="8" alignSelf={"flex-end"}>
												{new Date(
													movie.release_date
												).getFullYear()}
											</Text>
										</VStack>
									</AutoCompleteItem>
								))}
							</AutoCompleteList>
						</AutoComplete>
					</FormControl>
				</ModalContent>
			</Modal>
		</>
	);
};

export default SearchModal;
