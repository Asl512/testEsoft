import React from "react";
import { Route,Routes,Navigate  } from "react-router-dom";
import {ApartmenPage} from "./pages/ApartmentPage";
import {MainPage} from "./pages/MainPage";

export const useRoutse = () =>{
    return(
        <Routes>
            <Route path = '/apartmen/:id' element = {<ApartmenPage/>}/>
            <Route path = '/' exact  element = {<MainPage/>}/>
            <Route path="*" element={<Navigate to ="/" />}/>
        </Routes>
    );
}