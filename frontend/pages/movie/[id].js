import Detail from "@components/pages/movie/Detail";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

const MovieDetail = () => {
	const router = useRouter();

	const { id } = router.query;

	const { isLoading, isError, data, error } = useQuery(
		`movie-${id}`,
		async () => {
			const response = await fetch(
				`https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
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

	return <Detail data={data} />;
};

export default MovieDetail;
