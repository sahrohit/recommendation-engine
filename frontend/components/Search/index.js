import { Avatar, Flex, FormControl, Text } from "@chakra-ui/react";
import {
	AutoComplete,
	AutoCompleteInput,
	AutoCompleteItem,
	AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import debounce from "lodash/debounce";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

function SearchBox() {
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

	console.log("List", list);

	return (
		<Flex
			// pt="48"
			justify="center"
			align="center"
			w="full"
			direction="column"
		>
			<FormControl id="email" w="full">
				<AutoComplete openOnFocus>
					<AutoCompleteInput
						// variant="filled"
						placeholder="Search everything"
						onChange={handleChange}
						size="lg"
						variant="unstyled"
					/>
					<AutoCompleteList w="full">
						{list?.results.map((movie, oid) => (
							<AutoCompleteItem
								key={`${movie.id}-search-result`}
								value={movie.title || movie.name}
								textTransform="capitalize"
								align="center"
								onClick={() =>
									router.push(`/movie/${movie.id}`)
								}
							>
								<Avatar
									size="lg"
									rounded="none"
									name={movie.name}
									src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
								/>
								<Text ml="4">{movie.title || movie.name}</Text>
							</AutoCompleteItem>
						))}
					</AutoCompleteList>
				</AutoComplete>
			</FormControl>
		</Flex>
	);
}

export default SearchBox;
