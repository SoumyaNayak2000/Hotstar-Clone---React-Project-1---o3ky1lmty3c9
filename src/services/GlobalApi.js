import axios from "axios";


const movieUrl = "https://api.themoviedb.org/3"

const api_key = "b1b99f13ec7cd9cb6c1c96cd665f4277"

const movieByGenreBaseURL='https://api.themoviedb.org/3/discover/movie?api_key=b1b99f13ec7cd9cb6c1c96cd665f4277';

// https://api.themoviedb.org/3/trending/all/day?api_key=b1b99f13ec7cd9cb6c1c96cd665f4277
const getTrendingVideos=axios.get(movieUrl+"/trending/all/day?api_key="+api_key);
const getMovieByGenreId=(id)=>axios.get(movieByGenreBaseURL+"&with_genres="+id)
export default{
    getTrendingVideos,
    getMovieByGenreId
}