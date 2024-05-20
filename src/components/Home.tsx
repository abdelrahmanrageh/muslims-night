// import React from 'react'
import {  useState } from 'react'
// import './App.css'
import  {  egyptGovernorates } from '../governments';
import NightDetails from './PrayerTimes';

export default function Home() {
    const [city, setCity] = useState<string | null>('cairo');
    return (
    
        <div className="App">
            <div className="container h-svh">
                <select
                    onChange={(e) => setCity(e.target.value)}
                    id="underline_select"
                    className="block cursor-pointer py-3 px-0  sm:text-5xl text-3xl text-navy  bg-transparent  border-b-2 border-gray-300 border-transparent hover:border-b-gray-500  transition-all border-b-gray-300 outline-none ">
                    {
                        egyptGovernorates.map(city => {
                            return <option className='text-lg' key={city.url} value={city.url}>{city.name}</option>
                        })
                    }
                </select>
                
                <NightDetails city={city} data={null} />
                
            </div>

        </div>
    )
}