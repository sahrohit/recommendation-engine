import Carousel from "@components/Carousel";
import MovieList from "@components/Carousel/MovieList";
import { useQuery } from "react-query";

const Home = () => {
	const { isLoading, isError, data, error } = useQuery(
		"trendingMovies",
		async () => {
			const response = await fetch(
				`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
				{
					method: "GET",
					redirect: "follow",
				}
			);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		}
	);

	if (isLoading) {
		return <span>Loading...</span>;
	}

	if (isError) {
		return <span>Error: {error.message}</span>;
	}

	return (
		<>
			<Carousel
				slides={data.results.map((movie) => {
					return {
						img: `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`,
						label: movie.title || movie.name,
						description: movie.overview,
					};
				})}
			/>
			<MovieList
				title="Trendings"
				url={`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`}
			/>
			<MovieList
				title="Discover"
				url={`https://api.themoviedb.org/3/discover/tv?language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`}
			/>
		</>
	);
};

export default Home;
