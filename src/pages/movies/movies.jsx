import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { BsSearch, BsFilter } from "react-icons/bs";
import MovieItem from "../../components/movieItem";
import Details from "../../components/details/Details";
let API_KEY = import.meta.env.VITE_API_KEY;

const Movies = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [retry, setRetry] = useState(false);
  const [notLoaded, setNotLoaded] = useState(null);
  const [page, setPage] = useState(1);
  const [showBtn, setShowBtn] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

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
    setLoading(true);
    setShowBtn(true);
    const getMovieRequest = {
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/popular",
      params: { page: page },
      headers: {
        accept: "application/json",
        Authorization: API_KEY,
      },
    };

    const getMovie = axios.request(getMovieRequest);

    axios
      .all([getMovie])
      .then(
        axios.spread((...result) => {
          setMoviesList(result[0].data.results);
          setTotalPages(result[0].data.total_pages);
          setLoading(false);
        })
      )
      .catch(function (error) {
        console.log(error);
        setNotLoaded(true);
      });
  }, [retry, page]);

  const getSearch = (queryy) => {
    if (!queryy.trim()) {
      setRetry(!retry);
      return;
    }

    setLoading(true);
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/search/movie",
      params: {
        query: queryy,
        language: "en-US",
        page: "1",
      },
      headers: {
        accept: "application/json",
        Authorization: API_KEY,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setMoviesList(response.data.results);
        setTotalPages(response.data.total_pages);
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
        setNotLoaded(true);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (query.length >= 2) {
      getSearch(query);
      setShowBtn(false);
    } else if (query.length === 0) {
      setRetry(!retry);
      setShowBtn(true);
    }
  };

  if (loading && !notLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="loading-spinner mx-auto"></div>
          <p className="text-text-secondary">Loading movies...</p>
        </div>
      </div>
    );
  }

  if (notLoaded) {
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
              setNotLoaded(false);
            }}
          >
            Try Again
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-8"
        >
          {/* Title */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold gradient-text">
              Discover Movies
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Explore thousands of movies from around the world. Find your next favorite film.
            </p>
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <form className="relative" onSubmit={handleSearch}>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <BsSearch className="h-5 w-5 text-text-secondary" />
              </div>
              <input
                type="text"
                className="w-full pl-12 pr-4 py-4 bg-surface/50 backdrop-blur-sm border border-border/50 rounded-2xl text-text placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
                placeholder="Search for movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-accent/20 hover:bg-accent/30 transition-colors"
                >
                  <BsFilter className="h-5 w-5 text-accent" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>

      {/* Movies Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {moviesList.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            {/* Results Count */}
            <div className="text-center">
              <p className="text-text-secondary">
                Found {moviesList.length} {query ? 'search results' : 'popular movies'}
              </p>
            </div>

            {/* Movies Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-6">
              {moviesList.map((movie, index) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <MovieItem
                    movie={movie}
                    fetchMovieDetails={fetchMovieDetails}
                    openPopup={openPopup}
                  />
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {showBtn && totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex justify-center items-center space-x-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={page === 1}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
                    page === 1
                      ? 'bg-surface/30 text-text-secondary cursor-not-allowed'
                      : 'btn-primary'
                  }`}
                  onClick={() => {
                    if (page > 1) {
                      setPage(page - 1);
                    }
                  }}
                >
                  <GrLinkPrevious />
                  <span>Previous</span>
                </motion.button>

                <div className="flex items-center space-x-2">
                  <span className="text-text-secondary">Page</span>
                  <span className="bg-accent/20 text-accent px-3 py-1 rounded-lg font-medium">
                    {page}
                  </span>
                  <span className="text-text-secondary">of {totalPages}</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={page === totalPages}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
                    page === totalPages
                      ? 'bg-surface/30 text-text-secondary cursor-not-allowed'
                      : 'btn-primary'
                  }`}
                  onClick={() => {
                    if (page < totalPages) {
                      setPage(page + 1);
                    }
                  }}
                >
                  <span>Next</span>
                  <GrLinkNext />
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <BsSearch className="w-12 h-12 text-accent" />
            </div>
            <h3 className="text-2xl font-bold text-text mb-2">No movies found</h3>
            <p className="text-text-secondary">
              Try adjusting your search terms or browse our popular movies.
            </p>
          </motion.div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showPopup && (
          <Details id={window.idd} closePopup={closePopup} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Movies;
