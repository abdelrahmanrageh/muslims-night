import { useEffect, useState } from "react";
import NightDetails from "./PrayerTimes";

export default function ManualCalc() {
  const [fajrTime, setFajrTime] = useState<string | null>(null);
  const [maghripTime, setMaghripTime] = useState<string | null>(null);
  const [lastThirdNight, setLastThirdNight] = useState<string | null>(null);
  const [date] = useState<string | null>(null);
  const [nightDuration, setNightDuration] = useState<number | null>(null);
  const [arLanguage, setArLanguage] = useState<boolean>(
    JSON.parse(window.localStorage.getItem("ar") || "false")
  );
  useEffect(() => {
    const date = new Date();
    if (fajrTime && maghripTime) {
      const a = date.setHours(
        parseInt(fajrTime.slice(0, 2)),
        parseInt(fajrTime.slice(3, 5)),
        0,
        0
      );
      const b = date.setHours(
        parseInt(maghripTime.slice(0, 2)),
        parseInt(maghripTime.slice(3, 5)),
        0,
        0
      );
      const diff = Math.abs(a - b);
      const hourDiff = 24 - diff / (1000 * 60 * 60);
      setNightDuration(hourDiff);
      setLastThirdNight(
        new Date(a - (hourDiff / 3) * 1000 * 60 * 60).toLocaleTimeString()
      );
      // console.log(lastThirdNight);
    }
  }, [fajrTime, maghripTime]);
  useEffect(() => {
    setArLanguage(JSON.parse(window.localStorage.getItem("ar") || "false"));
  }, []);
  const data = {
    fajrTime,
    maghripTime,
    lastThirdNight,
    date,
    nightDuration,
  };

  return (
    <>
      <div className="container h-svh">
        <h2 className="text-3xl mt-10">
          {arLanguage ? "أدخل مواعيد الصلوات" : "Enter Prayer Times"}
        </h2>
        <form
          dir="ltr"
          className="max-w-[20rem] mx-auto grid grid-cols-2 gap-4 mt-3"
        >
          <div>
            {/* fajr Time input */}
            <label
              htmlFor="end-time"
              className="block mb-2 text-lg font-medium w-36 text-navy"
            >
              {arLanguage ? "موعد صلاة الفجر" : "Fajr Time"}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="time"
                id="end-time"
                className=" border leading-none  text-gray-900 text-sm rounded-lg  block w-full p-2.5 bg-navy border-gray-600 placeholder-gray-400 dark:text-white "
                min="01:00"
                max="07:00"
                // value={fajrTime || '06:00'}
                required
                onChange={(e) => setFajrTime(e.target.value)}
              />
            </div>
          </div>
          <div>
            {/* maghrip Time input */}
            <label
              htmlFor="start-time"
              className="block mb-2 text-lg font-medium w-36 text-navy"
            >
              {arLanguage ? "موعد صلاة المغرب" : "Maghrip Time"}
            </label>
            <div className="relative">
              <div className="absolute cursor-pointer inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="time"
                id="start-time"
                className="  border leading-none  text-gray-900 text-sm rounded-lg  block w-full p-2.5 bg-navy border-gray-600 placeholder-gray-400 dark:text-white"
                min="15:00"
                max="22:00"
                // value={maghripTime || '18:00'}
                required
                onChange={(e) => setMaghripTime(e.target.value)}
              />
            </div>
          </div>
        </form>
        {fajrTime && maghripTime && (
          <NightDetails
            arLanguage={arLanguage}
            city={null}
            data={data}
            twelveHour={true}
          />
        )}
      </div>
    </>
  );
}
