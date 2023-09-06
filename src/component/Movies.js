import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

let clickCount = 1;
let searchCount = 0;

export default function Movies() {
    const [movieData, setMovieData] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태 추가

    const dbData = axios.create({
        baseURL: 'https://api.themoviedb.org/3',
        params: {api_key:'f89a6c1f22aca3858a4ae7aef10de967'}
    })
    
    //기본 띄우기
    useEffect(function(){
        dbData
        .get(`/movie/upcoming?page=1`,'/movie/popular','/movie/top_rated')
        .then(res=>{
            setMovieData(res.data.results);
        })
    },[])

    // 검색 기능
    const handleSearch = () => {
        searchCount+=1;
        dbData
        .get(`/search/movie?query=${searchQuery}`)
        .then((res) => {
            const movieSer = res.data;
            setMovieData(movieSer.results);
            movieData.map((movie) => (
                <li key={movie.id}>
                    <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}/>
                    <h2>{movie.title}</h2>
                </li>
            ))
        })
    };
    //엔터키 검색
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch(); 
        }
    };
    
    //더보기 버튼 
    function more(){
        clickCount+=1;
        dbData.get(`/movie/upcoming?page=${clickCount}`)
        .then((res) => {
            const movieMore = res.data;
            // console.log(movieMore);
            setMovieData([...movieData,...movieMore.results])
        })
    }

    return (
        <>
        <section className='serMov'>
            <h1 style={{marginTop:'100px'}}>Movies</h1>
            <div>
                <input type='text'placeholder='Enter keyword'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                />
                <button onClick={handleSearch}>search</button>
            </div>
            <ul>
                {movieData.map((movie) => (
                <li key={movie.id}>
                    <Link to={`/movie/${movie.id}`}><img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}/></Link>
                    <h2>{movie.title}</h2>
                </li>
                ))}
            </ul>
        </section>
        {/* 검색 시 더보기 없어지게 */}
        <div className={`${searchCount===0 ? 'load':'load none'}`}>
            <button className='loadMore' onClick={more}>Load more</button>
        </div>
        </>
    )
}
