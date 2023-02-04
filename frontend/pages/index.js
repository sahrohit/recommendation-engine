import Carousel from "@components/Carousel";
import Layout from "@components/pages/home/Layout";
import { useQuery } from "react-query";

const Home = () => {
	const { isLoading, isError, data, error } = useQuery(
		"trendingMovies",
		async () => {
			const response = await fetch(
				"https://api.themoviedb.org/3/trending/all/day?api_key=2c34281c3a0c82190b73f4c66694b44a",
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
		<Layout>
			<Carousel
				slides={data.results.map((movie) => {
					return {
						img: `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`,
						label: movie.title || movie.name,
						description: movie.overview,
					};
				})}
			/>
			<div>
				{data.results.map((movie) => (
					<h1 key={movie.title}>{movie.title || movie.name}</h1>
				))}
			</div>
		</Layout>
	);
};

export default Home;
