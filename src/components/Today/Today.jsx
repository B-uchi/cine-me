import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillStar, AiFillPlayCircle, AiOutlineInfoCircle } from "react-icons/ai";
import { BsCalendar3, BsClock } from "react-icons/bs";
import Details from "../details/Details";
import { motion, AnimatePresence } from "framer-motion";
let API_KEY = import.meta.env.VITE_API_KEY;

const Today = () => {
  const [selected, setSelected] = useState(null);
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  const openPopup = () => {
    setShowPopup(true);
  };
  
  const closePopup = () => {
    setShowPopup(false);
  };

  const getDetails = (para) => {
    var url = `https://api.themoviedb.org/3/movie/${para}`;
    const movieDetailsRequest = {
      method: "GET",
      url: url,
      params: { language: "en-US" },
      headers: {
        accept: "application/json",
        Authorization: API_KEY,
      },
    };
    axios.request(movieDetailsRequest).then((response) => {
      setDetails(response.data);
    });
  };

  useEffect(() => {
    const popularMoviesRequest = {
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/popular",
      headers: {
        accept: "application/json",
        Authorization: API_KEY,
      },
    };

    const getPopularMovies = axios.request(popularMoviesRequest);

    axios
      .all([getPopularMovies])
      .then(
        axios.spread((...result) => {
          setSelected(result[0].data.results[2]);
          setLoading(false);
        })
      )
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (selected && selected.id) {
      getDetails(selected.id);
    }
  }, [selected]);

  if (loading) {
    return (
      <div className="hero-section min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!selected) {
    return null;
  }

  const backdropUrl = `https://image.tmdb.org/t/p/original${selected.backdrop_path}`;
  const posterUrl = `https://image.tmdb.org/t/p/w500${selected.poster_path}`;
  const rating = Math.round(selected.vote_average * 10);

  return (
    <div className="hero-section relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={backdropUrl}
          alt={selected.original_title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="grid lg:grid-cols-3 gap-8 items-center min-h-[70vh]">
          {/* Poster */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1 flex justify-center lg:justify-start"
          >
            <div className="relative group">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={posterUrl}
                  alt={selected.original_title}
                  className="w-64 h-96 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              {/* Rating Badge */}
              <div className="absolute -top-4 -right-4 rating-badge">
                <div className="flex items-center space-x-1">
                  <AiFillStar className="text-yellow-400" />
                  <span>{rating}%</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Movie Info */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Title and Rating */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text leading-tight">
                {selected.original_title}
              </h1>
              
              <div className="flex items-center space-x-6 text-text-secondary">
                <div className="flex items-center space-x-2">
                  <AiFillStar className="text-yellow-400 text-xl" />
                  <span className="font-semibold">{selected.vote_average}/10</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BsCalendar3 />
                  <span>{selected.release_date}</span>
                </div>
                {details.runtime && (
                  <div className="flex items-center space-x-2">
                    <BsClock />
                    <span>{details.runtime} min</span>
                  </div>
                )}
              </div>
            </div>

            {/* Genres */}
            {details.genres && (
              <div className="flex flex-wrap gap-2">
                {details.genres.slice(0, 5).map((genre) => (
                  <span key={genre.id} className="genre-tag">
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {/* Overview */}
            <div className="max-w-3xl">
              <p className="text-text-secondary text-lg leading-relaxed line-clamp-3">
                {selected.overview}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center space-x-2"
                onClick={openPopup}
              >
                <AiFillPlayCircle className="text-xl" />
                <span>Watch Trailer</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary flex items-center space-x-2"
                onClick={openPopup}
              >
                <AiOutlineInfoCircle className="text-xl" />
                <span>More Info</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-text-secondary rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-text-secondary rounded-full mt-2"
          />
        </motion.div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {showPopup && (
          <Details id={selected.id} closePopup={closePopup} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Today;
