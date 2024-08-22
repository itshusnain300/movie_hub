import React, { useEffect, useState } from "react";
import image from "../assets/Rectangle 24.png";
import PrimaryHeading from "./core/PrimaryHeading";
import CustomButton from "./core/CustomButton";
import axios from "axios";
import { Link } from "react-router-dom";

const MovieCard = ({ id, cover_image, name, publish_year }) => {
  return (
    <div className="bg-[#092C39] rounded-lg shadow-lg overflow-hidden w-[282px] h-[504px]">
      <img
        src={`http://127.0.0.1:8000/storage/${cover_image}`}
        alt={name}
        className="w-full h-[400px] object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-500">Publish Year: {publish_year}</p>
        <div className="">
          <Link to={`/movies/update/${id}`}>
            <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
              Edit
            </span>
          </Link>
          <span class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
            Delete
          </span>
        </div>
      </div>
    </div>
  );
};

export default function MovieList() {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/movies");
        if (response.data && Array.isArray(response.data.movies)) {
          setMovieList(response.data.movies);
        } else {
          setError("Unexpected data structure");
        }
        setLoading(false);
      } catch (err) {
        // setError('Failed to fetch movies');
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <p>Loading...</p>;
  // if (error) return <p>{error}</p>;

  return (
    <div className="flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8">
      {movieList.length === 0 ? (
        <>
          <div className="mb-8">
            <PrimaryHeading title={"Your movie list is empty"} />
          </div>
          <div>
            <Link to={"/movies/create"}>
              <CustomButton title="Add New Movie" />
            </Link>
          </div>
        </>
      ) : (
        <div className="p-8 pt-[30px]">
          <div className="my-[30px] flex items-center justify-between">
            <PrimaryHeading title="My Movies" />
            <div className="flex items-center space-x-2 cursor-pointer">
              <span className="text-gray-700">Logout</span>
              {/* <FiLogOut className="text-gray-700" size={20} /> */}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movieList.map((movie, index) => (
              <MovieCard
                key={index}
                cover_image={movie.cover_image}
                name={movie.name}
                id={movie.id}
                publish_year={movie.publish_year}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
