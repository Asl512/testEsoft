import React, {useState} from "react";
import { useHttp } from "../hooks/http.hook";

export const MainPage = () =>{
    const {request} = useHttp();

    const [form, setForm] = useState({
        id: ''
    })

    const ff = event => {
        setForm({...form, id: event.target.value})
    }

    const getData = async () => {
        try
        {
            const data = await request('/api', 'POST', {...form});
            console.log('Data', data);
        }
        catch(error){}
    }

    return(
        <div>
            <h1>MainPage</h1>
            <input type = 'text' value='101' onChange = {ff}/>
            <button onClick = {getData}>Dev</button>
        </div>
    )
}