import React, { useState, useEffect } from "react";
let API_KEY = import.meta.env.VITE_API_KEY;
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import spinner from "../../assets/spinner.gif";
import MovieItem from "../../components/movieItem";
import { GrLinkNext, GrLinkPrevious, GrSearch } from "react-icons/gr";
import Details from "../../components/details/Details";

const Shows = () => {
  const [showsList, setShowsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [retry, setRetry] = useState(false);
  const [notLoaded, setNotLoaded] = useState(null);
  const [page, setPage] = useState(1);
  const [showBtn, setShowBtn] = useState(true);
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
    setLoading(true);
    setShowBtn(true);
    const getShowsRequest = {
      method: "GET",
      url: "https://api.themoviedb.org/3/tv/popular",
      params: { page: page },
      headers: {
        accept: "application/json",
        Authorization: API_KEY,
      },
    };

    const getShow = axios.request(getShowsRequest);

    axios
      .all([getShow])
      .then(
        axios.spread((...result) => {
          setShowsList(result[0].data.results);
          setLoading(false);
        })
      )

      .catch(function (error) {
        console.log(error);
        setNotLoaded(true);
      });
  }, [retry, page]);
  var style = "flex w-100 h-[92vh] justify-center items-center";
  const getSearch = (queryy) => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/search/tv",
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
        setShowsList(response.data.results);
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
        setNotLoaded(true);
      });
  };
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="empty"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -1000, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="font-bold text-sm sm:text-2xl bg-primary-color w-fit
                p-3 mx-5 mt-5 text-text-color rounded"
        >
          Tv Shows
        </motion.h2>
        <div className={loading ? style : ""}>
          {loading ? (
            <div className="bg-primary-color p-5 justify-center rounded-md">
              {notLoaded ? (
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
                <img src={spinner} className="w-[200px]" alt="" />
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <div className="flex mt-10 w-[85%] text-text-color border-hover-color border-2 rounded-lg bg-primary-color overflow-hidden focus:border-0">
                <input
                  type="text"
                  className="w-full bg-transparent  py-2 px-2 "
                  name=""
                  id=""
                  placeholder="Name of show..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    getSearch(e.target.value);
                    setShowBtn(false);
                    if (e.target.value.length < 1 ) {
                      setRetry(!retry);
                    }
                  }}
                />
                {/* <div className="text-hover-color p-2"><GrSearch size={30}/></div> */}
              </div>
              <div className="mt-12 p-5 w-[85%] mx-auto movie-container grid items-center">
                {showsList &&
                  showsList.map((show) => (
                    <MovieItem
                      key={show.id}
                      movie={show}
                      fetchMovieDetails={fetchMovieDetails}
                      openPopup={openPopup}
                    />
                  ))}
                {showPopup ? <Details id={idd} closePopup={closePopup} /> : ""}
              </div>
              {showBtn ? (
                <div className="flex mt-10 mb-5 justify-center space-x-5 w-[85%]">
                  <button
                    className="text-primary-color flex justify-between items-center font-bold text-xl bg-secondary-color p-3 px-7 rounded hover:scale-110 transition-all"
                    onClick={() => {
                      if (page == 1) {
                      } else {
                        setPage(page - 1);
                      }
                    }}
                  >
                    <GrLinkPrevious /> Previous
                  </button>
                  <button
                    className="hover:scale-110 transition-all text-primary-color font-bold text-xl bg-secondary-color flex justify-between items-center p-3 px-7 rounded"
                    onClick={() => setPage(page + 1)}
                  >
                    Next <GrLinkNext />
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Shows;
