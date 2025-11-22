import { createContext, useContext, useEffect, useState } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);
export const MovieProvider = ({ children }) => {
    const [fav, setFav] = useState([]);

    useEffect(() => {
        const storedFav = localStorage.getItem("favorites");
        if (storedFav) {
            setFav(JSON.parse(storedFav));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(fav));
    }, [fav])

    const addToFav = (movie) => {
        setFav((prev) => [...prev, movie]);
    }

    const removeFav = (movieId) => {
        setFav((prev) => prev.filter(movie => movie.id !== movieId));
    };

    const isFav = (movieId) => {
        return fav.some(movie => movie.id === movieId)
    }

    const value = {
        fav,
        addToFav,
        removeFav,
        isFav
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>

}