import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const API_KEY = import.meta.env.VITE_API_KEY;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

export const Movie = () => {

const {id} = useParams();

const [data, setData] = useState(null);
const [error, setError] = useState(null);
const [loading, setLoading] = useState(true);
const [videos, setVideos] = useState([])

const fetchMovieDetails = async () => {

  setLoading(true);
  try {
    const params = {
      api_key: API_KEY,
      language: "fr-FR",
    };

    const response = await axios.get(`${API_BASE_URL}/movie/${id}`, { params });
    setData(response.data);
  }
  catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
}


const fetchMovieVideos = async () => {
    try {
      const params = {
        api_key: API_KEY,
      };

      const response = await axios.get(`${API_BASE_URL}/movie/${id}/videos`, { params });
      setVideos(response.data.results);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchMovieDetails(), fetchMovieVideos()]);
    
    }, [id]);
console.log(data)
return (
    <>
      <h1>Movie</h1>

      {loading && <p>Loading</p>}
      {error && <p>{error}</p>}

      {data &&
        (
          <div>
            <h2>{data.title}</h2>
            <p>{data.vote_average}/10</p>
            <img
              src={`${IMAGE_BASE_URL}${data.poster_path}`}
              alt={data.title}
              width={'250px'}
              max-height={'250px'}
              />
          </div >
        )
      }

      {videos.length > 0 && (
        <div>
          <h3>Trailer</h3>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videos[0].key}`}
            title={videos[0].name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </>
  )
}