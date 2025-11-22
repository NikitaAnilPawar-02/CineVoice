import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import "../css/Home.css"
import { searchMovies, getPopularMovies } from "../services/api";
import { FaMicrophone } from "react-icons/fa";
import { TbMicrophone2 } from "react-icons/tb";

function Home() {
    const [isListening, setIsListening] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (err) {
                console.log(err);
                setError("Failed to load movies...");
            } finally {
                setLoading(false);
            }
        };
        loadPopularMovies();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            return;
        }
        if (loading) {
            return
        }

        setLoading(true)
        try {
            const searchResult = await searchMovies(searchQuery);
            setMovies(searchResult);
            setError(null);
        } catch (err) {
            console.log(err);
            setError("Failed to search movies...")
        } finally {
            setLoading(false)
        }
    }

    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = SpeechRecognition ? new SpeechRecognition() : null;

    if (recognition) {
        recognition.continuous = false;
        recognition.lang = "en-US";
    }

    const handleVoiceSearch = () => {
        if (!recognition) {
            alert("Your browser does not support voice recognition.");
            return;
        }

        setIsListening(true);
        recognition.start();

        recognition.onresult = async (event) => {
            const voiceText = event.results[0][0].transcript;

            setSearchQuery(voiceText);

            setLoading(true);
            try {
                const searchResult = await searchMovies(voiceText);
                setMovies(searchResult);
                setError(null);
            } catch (err) {
                setError("Failed to search movies...");
            } finally {
                setLoading(false);
                setIsListening(false);
            }
        };

        recognition.onerror = () => {
            setIsListening(false);
        };
    };

    return (
        <>
            <div className="home">
                <form onSubmit={handleSearch} className="search-form">
                    <input type="text" placeholder="Search for movies..." className="search-input" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}></input>
                    <button type="button" onClick={handleVoiceSearch}>
                        {isListening ? <TbMicrophone2 />  : <FaMicrophone />}
                    </button>
                    <button type="submit" className="search-button">Search</button>
                </form>

                {error && <div className="error-message">{error}</div>}

                {loading ? (
                    <div className="loading">Loading...</div>
                ) : (
                    <div className="movies-grid">
                        {movies.map(movie => (
                            <MovieCard movie={movie} key={movie.id} />
                        ))}
                    </div>)}
            </div>
        </>
    )
}

export default Home;