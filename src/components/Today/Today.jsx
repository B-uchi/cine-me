import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillStar } from "react-icons/ai";
import Details from "../details/Details";
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
          setSelected(result[0].data.results[1]);
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
  return (
    <div className="today flex relative space-x-20">
      {loading ? (
        ""
      ) : selected ? (
        <div className="today">
          <img src={`https://image.tmdb.org/t/p/original${selected.backdrop_path}`} alt="" className="relative w-full sm:object-cover h-fit sm:h-[92vh] "/>
          <div className="details relative flex p-5 rounded bg-primary-color flex-col sm:w-[600px]  pt-34sm:pt-20 overlayy sm:bottom-10 sm:absolute sm:left-10">
            <h2 className="text-3xl flex items-center text-text-color font-bold">
              {selected.original_title} ({selected.release_date.slice(0, 4)})
              <small className="text-accent-color text-sm ml-2">
                <AiFillStar className="inline-block" />
                {selected.vote_average}/10
              </small>
            </h2>
            <small className="text-accent-color">
              Release Date: {selected.release_date}
            </small>
            <div className=" overflow-auto flex space-x-3 mt-1">
              {details.genres &&
                details.genres.map((genre) => (
                  <div
                    key={genre.id}
                    className="px-3 bg-text-color  rounded-full border-hover-color border-spacing-9 border-2"
                  >
                    {genre.name}
                  </div>
                ))}
            </div>
            <p className="text-hover-color font-bold mt-5">Overview: </p>
            <p className="text-text-color line-clamp-2 overflow-ellipsis text-sm">{selected.overview}</p>
            <div className="mt-3">
              <button
                className="bg-secondary-color font-bold text-xl p-3 rounded-full hover:scale-105 transition-all"
                onClick={openPopup}
              >
                Show More
              </button>
            </div>
          </div>
          {showPopup ? <Details id={selected.id} closePopup={closePopup}/> : ""}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Today;
