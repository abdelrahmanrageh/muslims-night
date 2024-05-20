import { useEffect, useState } from "react";
// import TimePicker from "./TimePicker";

export type PrayerTimes = {
    code: number,
    status: string,
    data: {
        timings: {
            Fajr: string,
            Sunrise: string,
            Dhuhr: string,
            Asr: string,
            Sunset: string,
            Maghrib: string,
            Isha: string,
            Imsak: string,
            Midnight: string
        },
        date: {
            readable: string,
            timestamp: string,
            gregorian: {
                date: string,
                format: string,
                day: string,
                weekday: {
                    en: string,
                    ar: string
                },
                month: {
                    number: number,
                    en: string,
                    ar: string
                },
                year: string
            },
            hijri: {
                date: string,
                format: string,
                day: string,
                weekday: {
                    en: string,
                    ar: string
                },
                month: {
                    number: number,
                    en: string,
                    ar: string
                },
                year: string
            }
        },
    }
}
type Data = {
    fajrTime: string | null,
    maghripTime: string | null,
    lastThirdNight: string | null,
    date: string | null,
    nightDuration: number | null
}
export default function NightDetails({ city , data }: { city: (string | null) , data: (Data | null)}) {
    const [fajrTime, setFajrTime] = useState<string | null>(null);
    const [maghripTime, setMaghripTime] = useState<string | null>(null);
    const [lastThirdNight, setLastThirdNight] = useState<string | null>(null);
    const [date] = useState<string | null>(null);
    const [weekDay, setWeekDay] = useState<string | null>(null);
    const [day, setDay] = useState<string | null>(null);
    const [month, setMonth] = useState<string | null>(null);
    const [year, setYear] = useState<string | null>(null);
    const [nightDuration, setNightDuration] = useState<number | null>(null);
    const minsDuration: (number | null) = nightDuration ? (nightDuration - Math.floor(nightDuration)) * 60 : null;

    //getting the prayer times from the api
    useEffect(() => {
        if (city) {
            const getPrayerTimes = async (): Promise<PrayerTimes> => {
                const url = `https://api.aladhan.com/v1/timingsByCity/${date}?city=${city}&country=EG&method=5`;
                const res = await fetch(url);
                const data = await res.json();
                return data;
            }
            getPrayerTimes().then((res) => {
                setFajrTime(res.data.timings.Fajr);
                setMaghripTime(res.data.timings.Maghrib);
                setWeekDay(res.data.date.hijri.weekday.ar);
                setDay(res.data.date.hijri.day);
                setMonth(res.data.date.hijri.month.ar);
                setYear(res.data.date.hijri.year);
            })
        }
        if (city === null && data) {
            setFajrTime(data.fajrTime);
            setMaghripTime(data.maghripTime);
            setLastThirdNight(data.lastThirdNight);
            setNightDuration(data.nightDuration);
        }
    }, [city, date , data])

    //calculating the last third of the night
    useEffect(() => {
        const date = new Date();
        if (fajrTime && maghripTime) {
            const a = date.setHours(parseInt(fajrTime.slice(0, 2)), parseInt(fajrTime.slice(3, 5)), 0, 0);
            const b = date.setHours(parseInt(maghripTime.slice(0, 2)), parseInt(maghripTime.slice(3, 5)), 0, 0);
            const diff = Math.abs(a - b);
            const hourDiff = 24 - (diff / (1000 * 60 * 60));
            setNightDuration(hourDiff);
            setLastThirdNight(new Date(a - ((hourDiff / 3) * 1000 * 60 * 60)).toLocaleTimeString());
        }

    }, [fajrTime, maghripTime])
    return (
        <>
            <h2 className='sm:text-2xl mt-2 font-normal  m-auto text-right w-full text-navy'>{weekDay } {day} {month} {year}</h2>
            <h1 className="mb-1 mt-20  text-5xl font-extrabold leading-none tracking-tight text-navy md:text-5xl lg:text-6xl ">
                الثلث الأخير من الليل:
            </h1>
            <h1 dir='ltr' className="mb-2  mt-6 text-5xl font-extrabold leading-none tracking-tight text-navy md:text-5xl lg:text-6xl ">
                {lastThirdNight}
            </h1>

            <h1 className='text-3xl mt-20 mb-5 text-navy'></h1>
            <h2 className='text-2xl sm:inline mx-5 font-normal text-navy'>صلاة الفجر: {fajrTime}</h2>
            <h2 className='text-2xl sm:inline mx-5 font-normal text-navy'>صلاة المغرب: {maghripTime}</h2>
            <h2 className='text-2xl w-full sm:inline mx-auto sm:mx-5 font-normal text-navy'>
            طول الليلة: {
                nightDuration && Math.floor(nightDuration) 
                    + 
                    (
                        (nightDuration && nightDuration >= 11) ?
                        `ساعة `
                        : `ساعات `
                    )
                } 
                {(minsDuration && minsDuration > 0) ?
                    `و ` +  Math.floor(minsDuration) + ` دقيقة`
                    : null
                }
            
            </h2>
        </>
    )
}
