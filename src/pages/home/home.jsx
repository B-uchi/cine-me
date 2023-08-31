import React, { useEffect, useState } from "react";
import Today from "../../components/Today/Today";
import axios from "axios";
import MovieItem from "../../components/movieItem";
let API_KEY = import.meta.env.VITE_API_KEY;

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [popularTv, setPopularTv] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoaded, setisLoaded] = useState(false);
  const [retry, setRetry] = useState(false);

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
      .all([getPopularMovies, getTopRatedMovies, getupcomingMovies, getpopularTv])
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
  var style = "flex w-100 h-[92vh] justify-center items-center";
  return (
    <div className={loading ? style : ""}>
      {loading ? (
        <div className="bg-primary-color p-5 justify-center rounded-md">
          {isLoaded ? (
            <div>
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
            ""
          )}
        </div>
      ) : (
        <div className="">
          <Today movies={popularMovies} />

          {/* POPULAR MOVIES */}
          <section className="mt-5 p-5">
            <h2
              className="font-bold text-2xl bg-primary-color w-fit
                p-3 text-text-color rounded"
            >
              Popular Movies
            </h2>
            <div className="flex mt-5 overflow-x-auto">
              {popularMovies &&
                popularMovies
                  .slice(0, 10)
                  .map((movie) => <MovieItem key={movie.id} movie={movie} />)}
            </div>
          </section>

          {/* TOP RATED MOVIES */}
          <section className="mt-5 p-5">
            <h2
              className="font-bold text-2xl bg-primary-color w-fit
                p-3 text-text-color rounded"
            >
              Top Rated Movies
            </h2>
            <div className="flex mt-5 overflow-x-auto">
              {topRatedMovies &&
                topRatedMovies
                  .slice(0, 10)
                  .map((movie) => <MovieItem key={movie.id} movie={movie} />)}
            </div>
          </section>

          {/* UPCOMING MOVIES */}
          <section className="mt-5 p-5">
            <h2
              className="font-bold text-2xl bg-primary-color w-fit
                p-3 text-text-color rounded"
            >
              Upcoming Movies
            </h2>
            <div className="flex mt-5 overflow-x-auto">
              {upcomingMovies &&
                upcomingMovies
                  .slice(0, 10)
                  .map((movie) => <MovieItem key={movie.id} movie={movie} />)}
            </div>
          </section>

          {/* TV SHOWS */}
          <section className="mt-5 p-5">
            <h2
              className="font-bold text-2xl bg-primary-color w-fit
                p-3 text-text-color rounded"
            >
              TV Shows
            </h2>
            <div className="flex mt-5 overflow-x-auto">
              {popularTv &&
                popularTv
                  .slice(0, 10)
                  .map((movie) => <MovieItem key={movie.id} movie={movie} />)}
            </div>
            {console.log(popularTv)}
          </section>
        </div>
      )}
    </div>
  );
};

export default Home;
