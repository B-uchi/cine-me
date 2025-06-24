import React from "react";
import { motion } from "framer-motion";
import { AiFillStar } from "react-icons/ai";
import { BsPlayFill } from "react-icons/bs";

const MovieItem = (props) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500${props.movie.poster_path}`;
  const title = props.movie.original_title || props.movie.original_name;
  const year = props.movie.release_date 
    ? props.movie.release_date.slice(0, 4)
    : props.movie.first_air_date?.slice(0, 4) || 'N/A';
  const rating = Math.round(props.movie.vote_average * 10);

  const handleClick = () => {
    if (props.fetchMovieDetails) {
      props.fetchMovieDetails(props.movie.id);
    }
    
    if (props.setLoading) {
      props.setLoading(true);
    }
  
    if (props.openPopup) {
      props.openPopup(props.movie.id);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.95 }}
      className="movie-card cursor-pointer group"
      onClick={handleClick}
    >
      {/* Poster Container */}
      <div className="relative overflow-hidden rounded-t-xl">
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={posterUrl}
            alt={title}
            className="movie-poster w-full h-full object-cover"
            loading="lazy"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <motion.div
              initial={{ scale: 0 }}
              whileHover={{ scale: 1.1 }}
              className="w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-lg"
            >
              <BsPlayFill className="text-white text-xl ml-1" />
            </motion.div>
          </div>
        </div>

        {/* Rating Badge */}
        <div className="rating-badge">
          <div className="flex items-center space-x-1">
            <AiFillStar className="text-yellow-400 text-sm" />
            <span>{rating}%</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-text text-sm sm:text-base line-clamp-1 mb-1 group-hover:text-accent transition-colors duration-300">
          {title}
        </h3>
        <p className="text-text-muted text-xs sm:text-sm font-medium">
          {year}
        </p>
        
        {/* Genre Tags (if available) */}
        {props.movie.genre_ids && (
          <div className="flex gap-1 mt-2 overflow-x-auto thin-scrollbar">
            {props.movie.genre_ids.slice(0, 2).map((genreId) => {
              const genreName = getGenreName(genreId);
              return genreName ? (
                <span key={genreId} className="genre-tag text-xs">
                  {genreName}
                </span>
              ) : null;
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Helper function to get genre name (you can expand this)
const getGenreName = (genreId) => {
  const genres = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Sci-Fi',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western'
  };
  return genres[genreId];
};

export default MovieItem;
