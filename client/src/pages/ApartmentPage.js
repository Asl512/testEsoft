import React,{useCallback, useEffect, useState} from "react";
import { useParams,useNavigate } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";

export const ApartmenPageCart = ({apartment}) => {
    const price = (str) =>{return str.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + " ");}

    return(
        <div class="body">
            <nav>
                <div class="nav-wrapper colormenu menu">
                    <a href = '/'><img class="brand-logo logou" src="https://static.tildacdn.com/tild3738-3866-4537-a335-363534343034/__white.png"/></a>
                </div>
            </nav>
            <div id="container">	
                <div class="product-details">
                    <h1>Квартира №{apartment.id}</h1>
                    <p class="information">
                        <b>{apartment.floor} этаж</b><br/>
                        Количество комнат: <b>{apartment.rooms} м²</b><br/>
                        Общая площадь: <b>{apartment.area_total} м²</b><br/>
                        Площадь кухни: <b>{apartment.area_kitchen} м²</b><br/>
                        Жилая площадь: <b>{apartment.area_live} м²</b>
                    </p>
                    <div class="product-title">
                        <span class="product-price">₽ {price(apartment.price.toString())}</span>
                    </div>
                </div>
                <div class="product-image">
                    <img src={apartment.layout_image}/>
                </div>
            </div>
        </div>
    )
}

export const ApartmenPage = () =>{
    const {request, loading} = useHttp();
    const [id,setId] = useState(null);
    const apartmenId = useParams().id;
    const navigate =  useNavigate();

    const getData = useCallback( async()=>{
        try
        {
            const fetched = await request('/api/'+apartmenId, 'GET', null,{});
            setId(fetched);
        }
        catch(e)
        {
            navigate('/');
        }
    },[request]);

    useEffect(()=>{
        getData();
    },[getData]);

    return(
        <div>
            {!loading && id && <ApartmenPageCart apartment={id}/>}
        </div>
    );
}