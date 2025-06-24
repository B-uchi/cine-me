import React, { useEffect, useState } from "react";
import Today from "../../components/Today/Today";
import axios from "axios";
import MovieItem from "../../components/movieItem";
import Details from "../../components/details/Details";
import { motion, AnimatePresence } from "framer-motion";
let API_KEY = import.meta.env.VITE_API_KEY;

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [popularTv, setPopularTv] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoaded, setisLoaded] = useState(false);
  const [retry, setRetry] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const openPopup = (id) => {
    window.idd = id;
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const fetchMovieDetails = (id) => {
    // Function to satisfy logic
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

    const topRatedRequest = {
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/top_rated",
      headers: {
        accept: "application/json",
        Authorization: API_KEY,
      },
    };

    const popularTvRequest = {
      method: "GET",
      url: "https://api.themoviedb.org/3/tv/top_rated",
      headers: {
        accept: "application/json",
        Authorization: API_KEY,
      },
    };

    const upcomingMoviesRequest = {
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/upcoming",
      headers: {
        accept: "application/json",
        Authorization: API_KEY,
      },
    };

    const getPopularMovies = axios.request(popularMoviesRequest);
    const getTopRatedMovies = axios.request(topRatedRequest);
    const getupcomingMovies = axios.request(upcomingMoviesRequest);
    const getpopularTv = axios.request(popularTvRequest);

    axios
      .all([
        getPopularMovies,
        getTopRatedMovies,
        getupcomingMovies,
        getpopularTv,
      ])
      .then(
        axios.spread((...result) => {
          setPopularMovies(result[0].data.results);
          setTopRatedMovies(result[1].data.results);
          setUpcomingMovies(result[2].data.results);
          setPopularTv(result[3].data.results);
          setLoading(false);
        })
      )
      .catch((e) => {
        console.log(e);
        setisLoaded(true);
      });
  }, [retry]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="loading-spinner mx-auto"></div>
          <p className="text-text-secondary">Loading amazing content...</p>
        </div>
      </div>
    );
  }

  if (isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-text">Oops! Something went wrong</h2>
          <p className="text-text-secondary">
            Sorry, an error occurred. Please check your network connection and try again.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
            onClick={() => {
              setRetry(!retry);
              setisLoaded(false);
            }}
          >
            Try Again
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Today />
      
      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Popular Movies */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="section-title">Popular Movies</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-accent hover:text-accent-secondary transition-colors font-medium"
            >
              View All →
            </motion.button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-6">
            {popularMovies.slice(0, 12).map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <MovieItem
                  movie={movie}
                  openPopup={openPopup}
                  fetchMovieDetails={fetchMovieDetails}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Top Rated Movies */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="section-title">Top Rated Movies</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-accent hover:text-accent-secondary transition-colors font-medium"
            >
              View All →
            </motion.button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-6">
            {topRatedMovies.slice(0, 12).map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <MovieItem
                  movie={movie}
                  openPopup={openPopup}
                  fetchMovieDetails={fetchMovieDetails}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Upcoming Movies */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="section-title">Coming Soon</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-accent hover:text-accent-secondary transition-colors font-medium"
            >
              View All →
            </motion.button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-6">
            {upcomingMovies.slice(0, 12).map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <MovieItem
                  movie={movie}
                  openPopup={openPopup}
                  fetchMovieDetails={fetchMovieDetails}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* TV Shows */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="section-title">Popular TV Shows</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-accent hover:text-accent-secondary transition-colors font-medium"
            >
              View All →
            </motion.button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-6">
            {popularTv.slice(0, 12).map((show, index) => (
              <motion.div
                key={show.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <MovieItem
                  movie={show}
                  openPopup={openPopup}
                  fetchMovieDetails={fetchMovieDetails}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showPopup && (
          <Details id={window.idd} closePopup={closePopup} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home; 