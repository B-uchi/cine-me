import React from "react";

const MovieItem = (props) => {
  const bg_img = `url(${`https://image.tmdb.org/t/p/w500${props.movie.poster_path}`})`;
  return (
    <div
      key={props.movie.id}
      className="mr-4 cursor-pointer w-32 h-fit sm:min-h-fit sm:w-44 flex-none overflow-clip rounded-md border-2 border-transparent bg-primary-color transition-all duration-300 ease-linear hover:border-3 hover:border-purple text-text-color mb-4"
      onClick={() => {
        props.fetchMovieDetails(props.movie.id);
        props.setLoading(true);
      }}
    >
      <div className="item-img-container flex relative flex-col justify-center">
        <div
          className="item-img h-[12rem] sm:h-[16rem]"
          style={{
            backgroundImage: bg_img,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div className="absolute text-[10px] sm:text-xl right-1 bottom-1 rounded-full p-2 px-1.5 sm:p-3 sm:px-2 border-secondary-color border-2 bg-primary-color">
          {Math.round(props.movie.vote_average * 10)}%
        </div>
      </div>
      <div className="px-1 text-center">
        <p className="line-clamp-1 mt-0.5  text-sm">
          {props.movie.original_title ? props.movie.original_title : props.movie.original_name}
        </p>
        <p>({props.movie.release_date === undefined ? props.movie.first_air_date.slice(0, 4) : props.movie.release_date.slice(0, 4)})</p>
      </div>
    </div>
  );
};

export default MovieItem;
