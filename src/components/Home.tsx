// import React from 'react'
import {  useEffect, useState } from 'react'
// import './App.css'
import  {  egyptGovernorates } from '../governments';
import NightDetails from './PrayerTimes';

export default function Home() {
    const [city, setCity] = useState<string>( window.localStorage.getItem('city') || 'cairo'  );
    const [twelveHour, setTwelveHour] = useState<boolean>(JSON.parse(window.localStorage.getItem('twelveHour') || 'true'));
    useEffect(() => {
        
    })
    return (
    
        <div className="App">
            <div className="container h-svh">
                <div className='w-full flex justify-between items-center'>
                    <select
                        onChange={
                            (e) => {
                                setCity(e.target.value) 
                                window.localStorage.setItem('city', e.target.value)
                            }}
                        value={city}
                        id="underline_select"
                        className="block cursor-pointer py-3 px-0  sm:text-5xl text-3xl text-navy  bg-transparent  border-b-2 border-gray-300 border-transparent hover:border-b-gray-500  transition-all border-b-gray-300 outline-none ">
                        {
                            egyptGovernorates.map(city => {
                                return <option className='text-lg' key={city.url} value={city.url}>{city.name}</option>
                            })
                        }
                    </select>

                    {/* changing 12 hour mode */}
                    <button
                        onClick={() => {
                            setTwelveHour(!twelveHour);
                            window.localStorage.setItem('twelveHour', JSON.stringify(!twelveHour));
                        }} 
                        className='border-2 border-navy text-navy px-4 h-10 rounded-lg hover:bg-navy hover:text-gold transition-all'
                    >
                    {twelveHour ? '24h' : '12h'}
                    </button>
                </div>
                
                <NightDetails city={city} data={null} twelveHour={twelveHour } />
                
            </div>

        </div>
    )
}