import React, { useEffect, createContext, useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid"; // Import UUID for unique IDs

// Create MovieContext
const MovieContext = createContext();

// Create MovieContextProvider
const MovieContextProvider = ({ children }) => {
  const [movieList, setMovieList] = useState([]); 

  const addMovie = (movie) => {
    setMovieList((prevList) => [
      ...prevList,
      {
        id: uuidv4(),
        movieName: movie.name,
        publishYear: movie.publishYear,
        coverImage: movie.coverImage,
      },
    ]);
  };

  useEffect(() => {
    console.log("Updated movie list:", movieList);
  }, [movieList]); 

  const updateMovie = (updatedMovie) => {
    setMovieList((prevList) =>
      prevList.map((movie) =>
        movie.id === updatedMovie.id
          ? {
              ...movie,
              movieName: updatedMovie.name,
              publishYear: updatedMovie.publishYear,
              coverImage: updatedMovie.coverImage,
            }
          : movie
      )
    );
  };

  // Function to delete a movie by ID
  const deleteMovie = (id) => {
    setMovieList((prevList) => prevList.filter((movie) => movie.id !== id));
  };

  // Provide the movie list and CRUD functions to children
  return (
    <MovieContext.Provider
      value={{ movieList, addMovie, updateMovie, deleteMovie }}
    >
      {children}
    </MovieContext.Provider>
  );
};

// Custom hook to use MovieContext
export const useMovieContext = () => useContext(MovieContext);

// Export MovieContextProvider
export { MovieContextProvider };
