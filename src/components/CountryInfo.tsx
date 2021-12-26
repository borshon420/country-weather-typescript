import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface InitProps {
    name: string;
}

interface InitCountry {
    capital: string[];
    population: number;
    latlng: number[];
    flags: {
        svg: string;
    }
}

const CountryInfo: React.FC = () => {
    const name = useParams<InitProps>();

    useEffect(()=> {
        getCountry();
    }, [])

    const getCountry = async () => {
        try {
            const res = await fetch(`https://restcountries.com/v3.1/name/${name}`)
            const data = await res.json();
            console.log(data)
        }catch(error){
            console.log(error);
        }
    }
    return (
        <div>
            <h2>This is country Info</h2>
        </div>
    );
};

export default CountryInfo;