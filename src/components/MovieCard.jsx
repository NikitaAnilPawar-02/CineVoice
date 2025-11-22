import { useMovieContext } from "../contexts/MovieContext";
import "../css/MovieCard.css"
import { FaCalendar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

function MovieCard({ movie }) {
    const { fav, isFav, addToFav, removeFav } = useMovieContext();
    const favorite = isFav(movie.id)

    function onFavClick(e) {
        e.preventDefault();
        if (favorite) {
            removeFav(movie.id);
        } else {
            addToFav(movie);
        }
    }

    return (
        <>
            <div className="movie-card">
                <div className="movie-poster">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                    <div className="movie-overlay">
                        <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavClick}>
                            ♥
                        </button>
                    </div>
                </div>
                <div className="movie-info">
                    <p><FaCalendar /> {movie.release_date?.split("-")[0]}</p>
                    <p><FaStar /> {movie.vote_average?.toFixed(1)}</p>

                    <p className="movie-desc">
                        {movie.overview?.slice(0, 100)}...
                    </p>

                    <p className="movie-lang">
                        Lang: {movie.original_language?.toUpperCase()}
                    </p>
                </div>
            </div>

        </>
    )
}

export default MovieCard;