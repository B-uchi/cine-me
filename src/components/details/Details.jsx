import axios from "axios";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { AiFillStar, AiFillPlayCircle } from "react-icons/ai";
import { BsCalendar3, BsClock, BsGlobe } from "react-icons/bs";
import MovieItem from "../movieItem";
import { motion, AnimatePresence } from "framer-motion";
let API_KEY = import.meta.env.VITE_API_KEY;

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
        setisLoaded(true);
      });
  };

  if (!hasFetch) {
    fetchMovieDetails();
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={props.closePopup}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="modal-content w-full max-w-6xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={props.closePopup}
            className="absolute top-4 right-4 z-20 w-10 h-10 bg-surface/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-border/50 hover:bg-surface transition-colors"
          >
            <IoClose className="w-6 h-6 text-text" />
          </motion.button>

          {loading ? (
            isLoaded ? (
              <div className="flex items-center justify-center min-h-[400px] p-8">
                <div className="text-center space-y-4">
                  <p className="text-xl font-semibold text-text">
                    Sorry, an error occurred. Please check your network...
                  </p>
                  <button
                    className="btn-primary"
                    onClick={() => {
                      setRetry(!retry);
                    }}
                  >
                    Retry
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="loading-spinner"></div>
              </div>
            )
          ) : (
            <div className="overflow-y-auto thin-scrollbar max-h-[90vh]">
              {/* Hero Section */}
              <div className="relative h-96">
                <img
                  src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`}
                  alt={movieDetails.original_title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                
                {/* Movie Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex flex-col lg:flex-row gap-8 items-end">
                    {/* Poster */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex-shrink-0"
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                        alt={movieDetails.original_title}
                        className="w-48 h-72 object-cover rounded-xl shadow-2xl"
                      />
                    </motion.div>

                    {/* Info */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="flex-1 space-y-4"
                    >
                      <div className="space-y-2">
                        <h1 className="text-3xl sm:text-4xl font-bold text-text">
                          {movieDetails.original_title}
                        </h1>
                        <div className="flex items-center space-x-6 text-text-secondary">
                          <div className="flex items-center space-x-2">
                            <AiFillStar className="text-yellow-400" />
                            <span className="font-semibold">{movieDetails.vote_average}/10</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <BsCalendar3 />
                            <span>{movieDetails.release_date}</span>
                          </div>
                          {movieDetails.runtime && (
                            <div className="flex items-center space-x-2">
                              <BsClock />
                              <span>{movieDetails.runtime} min</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Genres */}
                      {movieDetails.genres && (
                        <div className="flex flex-wrap gap-2">
                          {movieDetails.genres.map((genre) => (
                            <span key={genre.id} className="genre-tag">
                              {genre.name}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="btn-primary flex items-center space-x-2"
                        >
                          <AiFillPlayCircle />
                          <span>Watch Trailer</span>
                        </motion.button>
                        
                        {movieDetails.homepage && (
                          <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href={movieDetails.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary flex items-center space-x-2"
                          >
                            <BsGlobe />
                            <span>Official Site</span>
                          </motion.a>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-8">
                {/* Overview */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4"
                >
                  <h2 className="section-title">Overview</h2>
                  <p className="text-text-secondary text-lg leading-relaxed">
                    {movieDetails.overview}
                  </p>
                </motion.div>

                {/* Movie Shots */}
                {snapshots.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-4"
                  >
                    <h2 className="section-title">Movie Shots</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {snapshots.map((shot, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          className="aspect-video overflow-hidden rounded-lg"
                        >
                          <img
                            src={`https://image.tmdb.org/t/p/w500${shot.file_path}`}
                            alt={`Movie shot ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Recommendations */}
                {movieRecommendations && movieRecommendations.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-4"
                  >
                    <h2 className="section-title">You Might Also Like</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {movieRecommendations.slice(0, 10).map((movie) => (
                        <MovieItem
                          key={movie.id}
                          movie={movie}
                          openPopup={props.openPopup}
                          fetchMovieDetails={props.fetchMovieDetails}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Details;
