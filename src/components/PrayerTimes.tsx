import { useEffect, useState } from "react";

export type PrayerTimes = {
  code: number;
  status: string;
  data: {
    timings: {
      Fajr: string;
      Sunrise: string;
      Dhuhr: string;
      Asr: string;
      Sunset: string;
      Maghrib: string;
      Isha: string;
      Imsak: string;
      Midnight: string;
    };
    date: {
      readable: string;
      timestamp: string;
      gregorian: {
        date: string;
        format: string;
        day: string;
        weekday: {
          en: string;
          ar: string;
        };
        month: {
          number: number;
          en: string;
          ar: string;
        };
        year: string;
      };
      hijri: {
        date: string;
        format: string;
        day: string;
        weekday: {
          en: string;
          ar: string;
        };
        month: {
          number: number;
          en: string;
          ar: string;
        };
        year: string;
      };
    };
  };
};
type Data = {
  fajrTime: string | null;
  maghripTime: string | null;
  lastThirdNight: string | null;
  date: string | null;
  nightDuration: number | null;
};
export default function NightDetails({
  city,
  data,
  twelveHour,
  latitude,
  longitude,
  arLanguage,
}: {
  city: string | null;
  data: Data | null;
  twelveHour: boolean;
  latitude?: number;
  longitude?: number;
  arLanguage: boolean;
}) {
  const [fajrTime, setFajrTime] = useState<string | null>(null);
  const [maghripTime, setMaghripTime] = useState<string | null>(null);
  const [lastThirdNight, setLastThirdNight] = useState<string | null>(null);
  const [date, setDate] = useState<Date>(new Date());
  // const [weekDay, setWeekDay] = useState<string | null>(null);
  // const [day, setDay] = useState<string | null>(null);
  // const [month, setMonth] = useState<string | null>(null);
  // const [year, setYear] = useState<string | null>(null);
  const [nightDuration, setNightDuration] = useState<number | null>(null);
  const minsDuration: number | null = nightDuration
    ? (nightDuration - Math.floor(nightDuration)) * 60
    : null;
  const [fajrDate, setFajrDate] = useState<string | null>(null);
  const [maghripDate, setMaghripDate] = useState<string | null>(null);

  useEffect(() => {
    setDate(new Date());
  }, []);

  //getting the prayer times from the api
  useEffect(() => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const fullDate = `${day}-${month}-${year}`;
    if (city) {
      const getPrayerTimes = async (): Promise<PrayerTimes> => {
        const url = `https://api.aladhan.com/v1/timings/${fullDate}?latitude=${latitude}&longitude=${longitude}`;
        const res = await fetch(url);
        const data = await res.json();
        return data;
      };
      getPrayerTimes().then((res) => {
        setFajrTime(res.data.timings.Fajr);
        setMaghripTime(res.data.timings.Maghrib);
        // setWeekDay(res.data.date.hijri.weekday.ar);
        // setDay(res.data.date.hijri.day);
        // setMonth(res.data.date.hijri.month.ar);
        // setYear(res.data.date.hijri.year);
      });
    }
    if (city === null && data) {
      setFajrTime(data.fajrTime);
      setMaghripTime(data.maghripTime);
      setLastThirdNight(data.lastThirdNight);
      setNightDuration(data.nightDuration);
    }
  }, [city, date, data]);

  //calculating the last third of the night
  useEffect(() => {
    const now: Date = date;

    if (fajrTime && maghripTime) {
      //fajr time
      const a = now.setHours(
        parseInt(fajrTime.slice(0, 2)),
        parseInt(fajrTime.slice(3, 5)),
        0,
        0
      );
      setFajrDate(
        new Date(a).toLocaleTimeString(undefined, {
          hour12: twelveHour,
          hour: "numeric",
          minute: "2-digit",
        })
      );

      //maghrip time
      const b = now.setHours(
        parseInt(maghripTime.slice(0, 2)),
        parseInt(maghripTime.slice(3, 5)),
        0,
        0
      );
      setMaghripDate(
        new Date(b).toLocaleTimeString(undefined, {
          hour12: twelveHour,
          hour: "numeric",
          minute: "2-digit",
        })
      );

      //calculating the difference between fajr and maghrip
      const diff = Math.abs(a - b);
      const hourDiff = 24 - diff / (1000 * 60 * 60);
      setNightDuration(hourDiff);
      setLastThirdNight(
        new Date(a - (hourDiff / 3) * 1000 * 60 * 60).toLocaleTimeString(
          undefined,
          {
            hour12: twelveHour,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }
        )
      );
    }
  }, [fajrTime, maghripTime, date, twelveHour]);

  return (
    <>
      {/* <h2 className="sm:text-2xl mt-2 font-normal px-5  m-auto text-right w-full text-navy">
        {weekDay} {day} {month} {year}
      </h2> */}
      <h1 className="mb-1 mt-28 text-5xl font-extrabold leading-none tracking-tight text-navy md:text-5xl lg:text-6xl ">
        {arLanguage ? "الثلث الأخير من الليل" : "The Last Third of the Night"}
      </h1>
      <h1
        dir="ltr"
        className="mb-2  mt-6 text-5xl font-extrabold leading-none tracking-tight text-navy md:text-5xl lg:text-6xl "
      >
        {lastThirdNight}
      </h1>

      <h2 className="text-2xl lg:inline-block lg:mx-5 font-normal mt-14 text-navy ">
        {arLanguage ? "صلاة الفجر: " : "Fajr Prayer:"}
        <span dir="ltr" className="">
          {" "}
          {fajrDate}
        </span>
      </h2>
      <h2 className="text-2xl lg:inline lg:mx-5 font-normal text-navy ">
        {arLanguage ? "صلاة المغرب: " : "Maghrib Prayer:"}
        <span dir="ltr"> {maghripDate}</span>
      </h2>
      <h2 className="text-2xl w-full lg:inline mx-auto lg:mx-5 font-normal text-navy">
        {arLanguage ? "طول الليلة: " : "Night Duration:"}
        {arLanguage ? (
          <span>
            {nightDuration &&
              " " +
                Math.floor(nightDuration) +
                (nightDuration && nightDuration >= 11 ? ` ساعة ` : ` ساعات `)}
            {minsDuration && minsDuration > 0
              ? `و ` + Math.floor(minsDuration) + ` دقيقة`
              : null}
          </span>
        ) : (
          <span>
            {nightDuration &&
              " " +
                Math.floor(nightDuration) +
                (nightDuration && nightDuration >= 11 ? ` hours ` : ` hours `)}
            {minsDuration && minsDuration > 0
              ? `and ` + Math.floor(minsDuration) + ` minutes`
              : null}
          </span>
        )}
      </h2>
    </>
  );
}
