import React, { useEffect, useState } from "react";
import "./style.css";
import CustomInput from "./core/CustomInput";
import CustomButton from "./core/CustomButton";
import PrimaryButton from "./core/PrimaryButton";
import PrimaryHeading from "./core/PrimaryHeading";
import axios from "axios";
import { useParams } from 'react-router-dom';

export default function UpdateMovie() {
  const [movie, setMovie] = useState({
    id: "",
    name: "",
    publishYear: "",
    coverImage: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/movie/${id}/edit`);
        const movieData = response.data.movie;
        setMovie(movieData);

        // Set initial image preview
        if (movieData.coverImage) {
          setImagePreview(`http://127.0.0.1:8000/storage/${movieData.coverImage}`);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchMovie();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovie((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setMovie((prevState) => ({
          ...prevState,
          coverImage: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    debugger;
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", movie.name);
      formData.append("publishYear", movie.publishYear);
      if (movie.coverImage) {
        formData.append("coverImage", movie.coverImage);
      }

      await axios.put('http://127.0.0.1:8000/api/movie/{movie}/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Movie update successfully');
    } catch (error) {
      console.error('Error creating movie:', error);
      alert('Failed to create movie');
    }
  };

  const cancelHandler = () => {
    setMovie({
      name: "",
      publishYear: "",
      coverImage: "",
    });
    setImagePreview(null);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col md:flex-row w-full h-full max-w-5xl">
        <div className="flex flex-col justify-center w-full md:w-1/2 p-8">
          <div>
            <PrimaryHeading title="Update Movie" />
          </div>
          <div className="upload-container w-[360px] md:w-[490px] mt-[60px]">
            <div
              className="upload-area flex justify-center items-center flex-col rounded-lg p-4"
              id="uploadArea"
            >
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mb-4"
                />
              )}
              <p className="text-gray-600">Drop an image here or click to upload</p>
              <input
                type="file"
                id="fileInput"
                className="mt-2 block w-full"
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center w-full md:w-1/2 p-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <CustomInput
                placeholder="Title"
                name="name"
                value={movie.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <CustomInput
                placeholder="Publish Year"
                name="publishYear"
                value={movie.publishYear}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex justify-between mt-6">
              <PrimaryButton className="ml-4" onClick={cancelHandler} title="Cancel" />
              <CustomButton className="ml-4" title="Update" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
