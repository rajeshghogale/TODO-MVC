import React, { useEffect, useState } from 'react';
import Header from "./containers/header-container";
import Main from "./containers/main-container";
import { api } from './api/axiosConfig';

import "./styles/app.css";

export default function App() {

    const [data, setData] = useState([]);

    useEffect( () => {
        async function fetchData() {
            const res = await api.get(`/`);
            console.log("================");
            console.log(res.data);
            setData(res.data);
          }
        fetchData();
        
    }, []);

    return (
        <>
            <Header />
            <Main data={data}/>
        </>
    );
}
