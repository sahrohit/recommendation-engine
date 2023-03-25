import { SearchIcon } from "@chakra-ui/icons";
import {
    Avatar,
    Box,
    Button,
    FormControl,
    FormLabel,
    InputGroup,
    InputLeftElement,
    Text,
    VStack,
} from "@chakra-ui/react";
import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteList,
    AutoCompleteTag,
} from "@choc-ui/chakra-autocomplete";
import debounce from "lodash/debounce";
import { useRef, useState } from "react";

const RecommendPage = () => {
	const [list, setList] = useState();

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
		<Box
			w="full"
			display={"grid"}
			placeItems={"center"}
			height="60vh"
			mb={24}
		>
			<form>
				<FormControl
					w="full"
					maxW={{ base: "full", md: "md", lg: "lg", xl: "xl" }}
				>
					<FormLabel>Movies you like</FormLabel>
					<AutoComplete
						openOnFocus
						multiple={true}
						onChange={(vals) => console.log(vals)}
					>
						<InputGroup justifyContent={"center"}>
							<InputLeftElement pointerEvents="none" margin={2}>
								<SearchIcon mb={3} mr={2} />
							</InputLeftElement>

							<AutoCompleteInput
								placeholder="Search everything"
								onChange={handleChange}
								size="lg"
								name="movies"
							>
								{({ tags }) =>
									tags.map((tag, tid) => (
										<AutoCompleteTag
											key={tid}
											label={tag.label}
											onRemove={tag.onRemove}
										/>
									))
								}
							</AutoCompleteInput>
						</InputGroup>

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
					<Box textAlign={"center"} m={4}>
						<Button type="submit">Recommend</Button>
					</Box>
				</FormControl>
			</form>
		</Box>
	);
};

export default RecommendPage;
