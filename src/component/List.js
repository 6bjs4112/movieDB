import React, { useEffect, useState, } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
//스와이퍼

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import {FreeMode} from 'swiper/modules';

export default function List() {
    const [movieDataP, setMovieDataP] = useState([]);
    const [movieDataT, setMovieDataT] = useState([]);
    const [tvDataP, setTvDataP] = useState([]);
    const [tvDataT, setTvDataT] = useState([]);
    const dbData = axios.create({
        baseURL: 'https://api.themoviedb.org/3',
        params: {api_key:'f89a6c1f22aca3858a4ae7aef10de967'}
    })
    //트랜딩 무비
    useEffect(function(){
        dbData
        .get('/movie/popular')
        .then(res=>{
            const moviePop = res.data;
            setMovieDataP(moviePop.results);
        })
    },[])
    //탑 무비
    useEffect(function(){
        dbData
        .get('/movie/top_rated')
        .then(res=>{
            const movieTop = res.data;
            setMovieDataT(movieTop.results);
        })
    },[])
    //트랜딩 티비
    useEffect(function(){
        dbData
        .get('/tv/popular')
        .then(res=>{
            const tvPop = res.data;
            setTvDataP(tvPop.results);
        })
    },[])
    //탑 티비
    useEffect(function(){
        dbData
        .get('/tv/top_rated')
        .then(res=>{
            const tvTop = res.data;
            setTvDataT(tvTop.results);
        })
    },[])
    //이동용 네비
    const navigate = useNavigate();

    return (
        <>
        <section className='visual'>
            <Swiper className="mySwiper" loop={true}>
            {   
                movieDataP.map((e)=>(
                    <SwiperSlide key={e.id} className="visualSlide">
                        <div className="movie-background"
                    style={{
                        backgroundImage: `url('https://image.tmdb.org/t/p/original${e.backdrop_path}')`,
                    }} >    
                            <div className='left'>
                                <h1 data-aos="fade-down-right">{e.title}</h1>
                                <p>{e.overview}</p>
                                <button>Watch now</button>
                                <button>Watch trailer</button>
                            </div>
                            <div className='right'>
                                <img src={`https://image.tmdb.org/t/p/w500${e.poster_path}`}/>
                            </div>
                        </div>
                    </SwiperSlide>
                ))
            }
            </Swiper>
        </section>

        <section className='movie' style={{ marginTop: '1080px' }}>
            <h2>Trending Movies<button onClick={()=>{navigate('/movies')}}>veiw more</button></h2>
            <Swiper
                slidesPerView={6}
                freeMode={true}
                modules={[FreeMode]}
                className="mySwiper"
                spaceBetween={10}
            >
                {
                    movieDataP.map((e)=>(
                        <SwiperSlide key={e.id} className='swiper-slide'>
                            <img src={`https://image.tmdb.org/t/p/w200${e.poster_path}`}/>
                            <h3>{e.title}</h3>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </section>

        <section className='movie'>
            <h2>Top Rated Movies<button onClick={()=>{navigate('/movies')}}>veiw more</button></h2>
            <Swiper
                slidesPerView={6}
                freeMode={true}
                modules={[FreeMode]}
                className="mySwiper"
                spaceBetween={10}
                
            >
                {
                    movieDataT.map((e)=>(
                        <SwiperSlide key={e.id} className='swiper-slide'>
                            <img src={`https://image.tmdb.org/t/p/w200${e.poster_path}`}/>
                            <h3>{e.title}</h3>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </section>

        <section className='tv'>
            <h2>Trending TV<button onClick={()=>{navigate('/tvSeries')}}>veiw more</button></h2>
            <Swiper
                slidesPerView={6}
                freeMode={true}
                modules={[FreeMode]}
                className="mySwiper"
                spaceBetween={10}
            >
                {
                    tvDataP.map((e)=>(
                        <SwiperSlide key={e.id} className='swiper-slide'>
                            <img src={`https://image.tmdb.org/t/p/w200${e.poster_path}`}/>
                            <h3>{e.name}</h3>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </section>

        <section className='tv'>
            <h2>Top Rated TV<button onClick={()=>{navigate('/tvSeries')}}>veiw more</button></h2>
            <Swiper
                slidesPerView={6}
                freeMode={true}
                modules={[FreeMode]}
                className="mySwiper"
                spaceBetween={10}
            >
                {
                    tvDataT.map((e)=>(
                        <SwiperSlide key={e.id} className='swiper-slide'>
                            <img src={`https://image.tmdb.org/t/p/w200${e.poster_path}`}/>
                            <h3>{e.name}</h3>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </section>
        </>
    )
}
