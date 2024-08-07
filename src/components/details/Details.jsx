import axios from "axios";
import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { AiFillStar } from "react-icons/ai";
import MovieItem from "../movieItem";
let API_KEY = import.meta.env.VITE_API_KEY;
import { motion, AnimatePresence } from "framer-motion";
import spinner from "../../assets/spinner.gif";

const Details = (props) => {
  const [hasFetch, setHasFetch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoaded, setisLoaded] = useState(false);
  const [movieDetails, setMovieDetails] = useState({});
  const [movieRecommendations, setMovieRecommendations] = useState({});
  const [snapshots, setSnapshots] = useState([]);

  const fetchMovieDetails = (id) => {
    const movieDetailsRequest = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${
        id === undefined ? props.id : id
      }`,
      params: { language: "en-US" },
      headers: {
        accept: "application/json",
        Authorization: API_KEY,
      },
    };

    const recommendMoviesRequest = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${
        id === undefined ? props.id : id
      }/similar`,
      params: { language: "en-US", page: "1" },
      headers: {
        accept: "application/json",
        Authorization: API_KEY,
      },
    };

    const getmovieDetails = axios.request(movieDetailsRequest);
    const getReccomendations = axios.request(recommendMoviesRequest);
    getMovieSnapshots(id);

    axios.all([getmovieDetails, getReccomendations]).then(
      axios.spread((...data) => {
        setMovieDetails(data[0].data);
        setMovieRecommendations(data[1].data.results);
        setLoading(false);
      })
    );
    setHasFetch(true);
  };
  const getMovieSnapshots = (id) => {
    const snapshotRequest = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${
        id === undefined ? props.id : id
      }/images`,
      headers: {
        accept: "application/json",
        Authorization: API_KEY,
      },
    };

    axios
      .request(snapshotRequest)
      .then((response) => {
        setSnapshots(response.data.backdrops.slice(1, 20));
      })
      .catch((error) => {
        console.error(error);
        setisLoaded(true)
      });
  };

  if (!hasFetch) {
    fetchMovieDetails();
  }

  return (
    <AnimatePresence>
      <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "92%" }}
        exit={{ opacity: 0 }}
        className="fixed left-3 w-[95%] sm:w-full right-3 top-5 z-30 sm:mx-auto h-[95vh] overflow-y-scroll rounded-md border-primary-color bg-hover-color lg:top-5 lg:w-[90%] lg:border-[3px]"
      >
        <div className="absolute left-0 z-20 flex w-full justify-end p-4">
          <button onClick={() => props.closePopup()}>
            <IoIosCloseCircle
              size={"2rem"}
              className=" hover:text-primaryDark text-white/50 hover:text-white/80"
            />
          </button>
        </div>
        {loading ? (
          isLoaded ? (
            <div className="bg-primary-color w-fit p-5 mx-auto mt-10 justify-center rounded-md">
              <p className="text-xl font-bold text-text-color">
                Sorry an error occured. Please check your network...
              </p>
              <div className="justify-center mt-8 flex items-center">
                <button
                  className="bg-secondary-color font-bold p-3 px-5 rounded-lg"
                  onClick={() => {
                    setRetry(!retry);
                  }}
                >
                  Retry
                </button>
              </div>
            </div>
          ) : (
            <img className="mx-auto my-56 w-[200px]" src={spinner} alt="" />
          )
        ) : (
          <div className="">
            <img
              src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`}
              alt=""
              className="opacity-20 relative w-full h-fit sm:object-cover"
            />
            <div className="absolute top-10 left-0 right-0 w-full h-full">
              <div className="flex flex-col items-center justify-center sm:flex-row w-full sm:space-x-24 space-y-3 ">
                <div className="">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                    alt=""
                    className="w-2/3 mx-auto border-black border-4"
                  />
                </div>
                <div className="details flex p-5 rounded bg-primary-color flex-col sm:w-[600px] w-[100%] pt-5">
                  <h2 className="text-xl sm:text-3xl flex items-center text-text-color font-bold">
                    <a
                      className="underline"
                      target="_blank"
                      href={movieDetails.homepage}
                    >
                      {movieDetails.original_title} (
                      {movieDetails.release_date.slice(0, 4)})
                    </a>
                    <small className="text-accent-color text-sm ml-2">
                      <AiFillStar className="inline-block" />
                      {movieDetails.vote_average}/10
                    </small>
                  </h2>
                  <small className="text-accent-color">
                    Release Date: {movieDetails.release_date}
                  </small>
                  <div className="flex space-x-1 sm:space-x-3 overflow-x-auto mt-1">
                    {movieDetails.genres &&
                      movieDetails.genres.map((genre) => (
                        <div
                          key={genre.id}
                          className="px-3 bg-text-color rounded-full border-hover-color text-[12px] sm:text-xl border-2"
                        >
                          {genre.name}
                        </div>
                      ))}
                  </div>
                  <p className="text-hover-color font-bold mt-5">Overview: </p>
                  <p className="text-text-color overflow-ellipsis text-sm">
                    {movieDetails.overview}
                  </p>
                </div>
              </div>
              <div className="mt-2 p-3 sm:mt-14 sm:p-10">
                <h2
                  className="font-bold text-sm sm:text-xl bg-primary-color w-fit
                p-3 text-text-color rounded"
                >
                  Movie Shots:
                </h2>
                <div className="flex mt-6 space-x-7 overflow-x-auto">
                  {snapshots.length > 0 ? (
                    snapshots.map((shot, index) => (
                      <img
                        src={`https://image.tmdb.org/t/p/original${shot.file_path}`}
                        key={index}
                        className="h-32 rounded-md md:h-40 lg:h-52"
                      />
                    ))
                  ) : (
                    <p className="text-xl">
                      Sorry none available at the moment...
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-2 p-3 sm:mt-2 sm:p-10">
                <h2
                  className="font-bold text-sm sm:text-xl bg-primary-color w-fit
                p-3 text-text-color rounded"
                >
                  You Might Also Like:{" "}
                </h2>
                <div className="flex mt-4 space-x-7 overflow-x-auto">
                  {movieRecommendations &&
                    movieRecommendations.map((movie) => (
                      <MovieItem
                        key={movie.id}
                        movie={movie}
                        setLoading={setLoading}
                        fetchMovieDetails={fetchMovieDetails}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Details;
