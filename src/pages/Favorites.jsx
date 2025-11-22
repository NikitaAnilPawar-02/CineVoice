import { useMovieContext } from "../contexts/MovieContext";
import "../css/favorites.css"
import MovieCard from "../components/MovieCard";

function Favorites() {
    const { fav } = useMovieContext();

    if (fav.length > 0) {
        return (
            <div>
                <h2 className="favorites">YOUR FAVORITES</h2>
                <div className="movies-grid">
                    {fav.map(movie => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>
            </div>
        )
    }
    return (
        <>
            <div className="favorites-empty">
                <h2>No Favorites Movies Yet</h2>
            </div>
            <p>Start adding movies to your favorites and they will appear here</p>
        </>
    )
}

export default Favorites;