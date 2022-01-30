import React,{useCallback, useEffect, useState} from "react";
import { useHttp } from "../hooks/http.hook";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";


export const MainPageCart = ({data}) => {
    const link = (id) =>{return "/apartmen/"+id;}
    const name = (data) =>{
        switch(data.rooms)
        {
            case 1:
                return 'Однокомнатная квартира';
            case 2:
                return 'Двухкомнатная квартира';
            case 3:
                return 'Трехкомнатная квартира';
            case 4:
                return 'Четырехкомнатная квартира';
        }
    }
    const price = (str) =>{return str.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + " ");}

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(8); //по сколько выводить квартир
    const [dataS, setDataS] = useState(data);
    const [checkbox, setCheckbox] = useState(true);
    const [select, setSelect] = useState('0');
    const [floore, setFloor] = useState('Все');
    const [rooms, setRooms] = useState('Все');
    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(10000000);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const FilterData = dataS.filter(ap=>{
        if(rooms !='Все' && floore !='Все')
        {
            return ap.rooms == rooms && ap.floor == floore && ap.price >= from && ap.price <= to;
        }
        else if(rooms !='Все')
        {
            return ap.rooms == rooms && ap.price >= from && ap.price <= to;
        }
        else if(floore !='Все')
        {
            return ap.floor == floore && ap.price >= from && ap.price <= to;
        }
        return dataS;
    });


    const LastIndex = currentPage * perPage;
    const FirstIndex = LastIndex - perPage;
    let current = FilterData.slice(FirstIndex,LastIndex);

    const getRange =(e)=>{
        setFrom(e[0]);
        setTo(e[1]);
    }

    const sort = async (even) => {
        let a = select;
        if(even)
        {
            a = even.target.value;
            setSelect(even.target.value);
        }
        switch(a)
        {
            case '0':
                const dst = await dataS.sort(function(obj1, obj2) {
                    return(checkbox)? obj2.id-obj1.id : obj1.id-obj2.id;
                });
                setDataS(dst);
            break;
            case '1':
                const dstp = await dataS.sort(function(obj1, obj2) {
                    return(checkbox)? obj2.price-obj1.price : obj1.price-obj2.price;
                });
                setDataS(dstp);
            break;
            case '2':
                const dstr = await dataS.sort(function(obj1, obj2) {
                    return(checkbox)? obj2.rooms-obj1.rooms : obj1.rooms-obj2.rooms;
                });
                setDataS(dstr);
            break;
            case '3':
                const dstv = await dataS.sort(function(obj1, obj2) {
                    return(checkbox)? obj2.area_total-obj1.area_total : obj1.area_total-obj2.area_total;
                });
                setDataS(dstv);
            break;
        }
        paginate(0);
        paginate(currentPage);
    }

    const getClass = (col,number) => { return col == number ?'active':'waves-effect';}

    const check = async (even) => {
        setCheckbox(even.target.checked);
        sort();
    }

    const Floors = ['Все','1','2','3','4'];
    const Rooms = ['Все','1','2','3'];

    return(
        <div>
            <nav>
                <div class="nav-wrapper colormenu menu">
                    <a href = '/'><img class="brand-logo logou" src="https://static.tildacdn.com/tild3738-3866-4537-a335-363534343034/__white.png"/></a>
                </div>
            </nav>

            <div class="row marginT">
                <div class="col s2 .center-align">
                    <div>
                        <h6>Сортировака</h6>
                        <label>Сортировать по:</label>
                        <select class="browser-default" onChange={sort}>
                            <option selected value="0">Номеру квартиры</option>
                            <option value="1">Цене</option>
                            <option value="2">Количеству комнат</option>
                            <option value="3">Площади</option>
                        </select>
                        <div class="switch">
                            <label class = 'flexsa'>
                            <li class="waves-effect"><img src='https://ru.seaicons.com/wp-content/uploads/2015/06/Arrows-Forward-icon.png' class='arrowB'/></li>
                            <input type="checkbox" onChange={check}/>
                            <span class="lever"></span>
                            <li class="waves-effect"><img src='https://ru.seaicons.com/wp-content/uploads/2015/06/Arrows-Forward-icon.png' class='arrowT'/></li>
                            </label>
                        </div>
                    </div>
                    <div class='line'></div>
                    <div class='filter'>
                        <h6>Фильтрация</h6>
                        <label>Этаж</label>
                        <ul class="pagination">
                        {Floors.map(floor => (
                            <li class={getClass(floore,floor)} key ={floor}><a href="#!" onClick={(e)=>setFloor(e.target.text)}>{floor}</a></li>
                        ))}
                        </ul>

                        <label>Количество комнат</label>
                        <ul class="pagination">
                            {Rooms.map(room => (
                                <li class={getClass(rooms,room)} key ={room}><a href="#!" onClick={(e)=>setRooms(e.target.text)}>{room}</a></li>
                            ))}
                        </ul>
                        <div class="range">
                            <label>Цена</label>
                            <Nouislider step={1000000} 
                            range={{ min: 0, max: 10000000 }} 
                                start={[from, to]} 
                                connect tooltips={true} 
                                onChange={getRange}
                            />
                        </div>
                    </div>
                </div>
                <div class="col s10">
                <div class="row">
                    {current.map(apartmen => (
                        <div class="col s12 m6 l3">
                            <div class="row centre">
                                <div class="col s12 m7">
                                    <div class="card">
                                        <div class="product-wrap">
                                            <div class="product-item">
                                                <img src={apartmen.layout_image}/>
                                                <div class="product-buttons">
                                                    <a href={link(apartmen.id)} class="button">посмотреть</a>
                                                    <p class='white-text'>{apartmen.floor} этаж</p>
                                                </div>
                                            </div>
                                            <div class="product-title">
                                                <a>{name(apartmen)} №{apartmen.id}</a>
                                                <span class="product-price">₽ {price(apartmen.price.toString())}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            {<Pagination
                perPage = {perPage}
                total = {FilterData.length}
                paginate={paginate}
                currentPage ={currentPage}
                getClass = {getClass}
            />}
                </div>
            </div>
        </div>
        
    )
}

export const Pagination = ({perPage, total, paginate,currentPage,getClass}) => {
    const pageNumber = [];
    for(let i = 1; i <= Math.ceil(total/perPage); i++)
    {
        pageNumber.push(i);
    }

    const next = ()=>{return (currentPage == pageNumber[pageNumber.length-1]) ?paginate(1):paginate(currentPage+1);}
    const back = ()=>{return (currentPage == 1) ?paginate(pageNumber[pageNumber.length-1]):paginate(currentPage-1);}

    return(
        <div class="flexcol">
            <ul class="pagination flexrow">
                <li class="waves-effect"><a href="#!" onClick={()=>back()}><img src='https://ru.seaicons.com/wp-content/uploads/2015/06/Arrows-Forward-icon.png' class='arrowR'/></a></li>
                {pageNumber.map(number => (
                    <li class={getClass(currentPage,number)} key ={number}><a href="#!" onClick={()=>paginate(number)}>{number}</a></li>
                ))}
                <li class="waves-effect"><a href="#!" onClick={()=>next()}><img src='https://ru.seaicons.com/wp-content/uploads/2015/06/Arrows-Forward-icon.png' class='arrowL'/></a></li>
            </ul>
        </div>
    )
}

export const MainPage = () =>{
    const {request, loading} = useHttp();
    const [data, setData] = useState(null);

    const getDataAll = useCallback( async()=>{
        try
        {
            const fetched = await request('/api/all', 'GET', null,{});
            setData(fetched);
        }
        catch(e){}
    },[request]);

    useEffect(()=>{
        getDataAll();
    },[getDataAll]);

    return(
        <div>
            {!loading && data && <MainPageCart data={data}/>}
        </div>
    );
}