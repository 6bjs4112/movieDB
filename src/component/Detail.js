import { useParams } from "react-router-dom";
import React, { useEffect, useState, } from 'react'
import axios from 'axios';

export default function Detail() {
    const {type,id} = useParams();
    const [detail, setDetail] = useState([]);

    const dbData = axios.create({
        baseURL: 'https://api.themoviedb.org/3',
        params: {api_key:'f89a6c1f22aca3858a4ae7aef10de967'}
    })
    //아이디로 들어오나 확인하기=>됨
    useEffect(function(){   
        dbData
        .get(`/${type}/${id}`)
        .then(res=>{
            setDetail(res.data);
        })
    },[])

    return (
        <>
            <section className='detailPage'>
                <li key={detail.id}>
                    <img className="backdrop" src={`https://image.tmdb.org/t/p/original${detail.backdrop_path}`}/>
                    <h3>{detail.title}</h3>
                    <h3>{detail.name}</h3>
                    <div className="genresTab">
                        {
                            detail.genres?.map((e)=>(
                                <span>{e.name}</span>
                            ))
                        }
                    </div>
                    <img src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`}/>
                    <p>{detail.overview}</p>
                    <a target="blank" href={detail.homepage}>홈페이지 바로가기</a>
                </li>
            </section> 
        </>
    )
}
