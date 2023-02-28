import axios from "axios"
  const API_URL = `https://api.themoviedb.org/3`
const MOVIE_API:any = "2e3bf05d055f3fdcda67254cbd3cbb31"

//Movie API's
export  const getAllMovies = async () => {
   const res:any = await axios.get(`${API_URL}/discover/movie`,{params:{api_key:MOVIE_API}  
   })
    return res.data
}
export  const getMovieById = async(movieId:String)=>{
    const res:any = await axios.get(`${API_URL}/movie/${movieId}?api_key=${MOVIE_API}`)
    return res.data
}
export const getMovieVideoById = async(id:string)=>{
    const res:any = await axios.get(`${API_URL}/movie/${id}?api_key=${MOVIE_API}`,{params:{append_to_response:"videos"}})
    return res.data 
}
//TV shows API's
export  const getAllTvshows = async () => {
    const res:any = await axios.get(`${API_URL}/discover/tv`,{params:{api_key:MOVIE_API}  
    })
     return res.data
 }
 export  const getTvshowById = async(id:String)=>{
    const res:any = await axios.get(`${API_URL}/tv/${id}?api_key=${MOVIE_API}`)
    return res.data
}
export const getTvshowsVideoById = async(id:string)=>{
    const res:any = await axios.get(`${API_URL}/tv/${id}?api_key=${MOVIE_API}`,{params:{append_to_response:"videos"}})
    return res.data 
}
export const getTopRatedMovies = async ()=>{
    const res = await axios.get(`${API_URL}/movie/top_rated`,{params:{api_key:MOVIE_API} } )
    return res.data
}
export const getNowPlayingMovies  = async ()=>{
    const res = await axios.get(`${API_URL}/movie/now_playing`,{params:{api_key:MOVIE_API} } )
    return res.data
}
//Trending shows API's
export  const getTrending = async () => {
    const res:any = await axios.get(`${API_URL}/trending/all/day`,{params:{api_key:MOVIE_API}  
    })
     return res.data
 }
 export const getTrendingById = async(id:string)=>{
    const res:any = await axios.get(`${API_URL}/trending/${id}`,{params:{api_key:MOVIE_API}  
})
 return res.data
 }
 export const getTopRatedTvshows = async ()=>{
    const res = await axios.get(`${API_URL}/tv/top_rated`,{params:{api_key:MOVIE_API} } )
    return res.data
}
