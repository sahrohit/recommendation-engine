import React from "react";
import { useQuery } from "react-query";
import { ReviewSection } from "./ReviewSection";

const Review = ({ id }) => {
	const { isLoading, isError, data, error } = useQuery(
		`movie-${id}-review`,
		async () => {
			const response = await fetch(
				`https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=1`,
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

	return <ReviewSection data={data.results} />;
};

export default Review;
