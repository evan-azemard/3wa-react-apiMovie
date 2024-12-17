import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

export const Home = () => {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const endpoint = query ? "/search/movie" : "/movie/now_playing";
      const params = {
        api_key: API_KEY,
        language: "fr-FR",
      };
      if (query) params.query = query;

      const response = await axios.get(`${API_BASE_URL}${endpoint}`, { params });
      setData(response.data.results);
      console.log(data);
    }
    catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(search);
  };

  useEffect(() => {
    fetchData();
  }, [query])


  return (
    <>
      <h1>Movie</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type='text' onChange={(e) => setSearch(e.target.value)} placeholder='Rechercher un film...' />
        <input type='submit' />
      </form>

      {loading && <p>Loading</p>}
      {error && <p>{error}</p>}

      {data && data.length > 0 && data.map((movie) => {
        return (
          <div key={movie.id}>
            <h2>{movie.title}</h2>
            <p>{movie.vote_average}/10</p>
            <img
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
              width={'250px'}
              max-height={'250px'}
              />
                     
            <Link to={`/movie/${movie.id}`}>
              <button>Plus d'informations</button>
            </Link>
          </div >
        )
      })}
    </>
  )
}

