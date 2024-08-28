import { useEffect, useState } from "react";
import NightDetails from "./PrayerTimes";
import cities from "../cities.json";

const citiesArray = cities as CityInof[];

type CityInof = {
  name: string;
  alternate_names: string[];
  latitude: string;
  longitude: string;
};

export default function Home() {

  const [city, setCity] = useState<string>(
    window.localStorage.getItem("city") || "cairo"
  );
  const [twelveHour, setTwelveHour] = useState<boolean>(
    JSON.parse(window.localStorage.getItem("twelveHour") || "true")
  );
  const [filteredCities, setFilteredCities] = useState<CityInof[] | null>(null);
  const [latitude, setLatitude] = useState<number>(
    parseFloat(window.localStorage.getItem("latitude") || "30.033")
  );
  const [longitude, setLongitude] = useState<number>(
    parseFloat(window.localStorage.getItem("longitude") || "31.233")
  );

  let timeout: number;
  function searchCities(search: string) {
    setCity(search);
    if (!search) {
      setFilteredCities(null);
      return;
    }
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      const filtered: CityInof[] = [];
      citiesArray.forEach((city) => {
        if (city.name.toLowerCase().startsWith(search.toLowerCase())) {
          filtered.push(city);
        }
      });
      citiesArray.forEach((city) => {
        if (filtered.length > 15) return;
        if (filtered.includes(city)) return;
        if (city.name.toLowerCase().includes(search.toLowerCase())) {
          filtered.push(city);
        } else if (
          city.alternate_names.some((name) =>
            name.toLowerCase().includes(search.toLowerCase())
          )
        ) {
          filtered.push(city);
        }
      });
      setFilteredCities(filtered);
    }, 300);
  }
  const [arLanguage, setArLanguage] = useState<boolean>(JSON.parse(window.localStorage.getItem("ar") || "false"));
  useEffect(() => {
    window.localStorage.setItem("ar", JSON.stringify(arLanguage));
    if (arLanguage) {
      document.body.style.direction = "rtl";
    } else {
      document.body.style.direction = "ltr";
    }
  }, [arLanguage]);
  return (
    <div className="App">
      <div className="container h-svh">
        <div
        dir="ltr"
          className="w-full px-5 mt-8 flex flex-row justify-between items-center">
          <div className="relative">
            <input
              value={city}
              id="search"
              name="city-search"
              type="text"
              autoComplete="off"
              // dir={arLanguage ? "rtl" : "ltr"}
              spellCheck="false"
              dir="ltr"
              placeholder={"ابحث عن مدينتك"}
              className="bg-transparent border-0 outline-0  border-b-2 py-2 overflow-ellipsis cursor-text text-navy border-gray-400 md:text-4xl text-xl max-w-52 md:max-w-96"
              onChange={(e) => searchCities(e.target.value)}
            />

            {/* Suggested cities on search */}
            {filteredCities && filteredCities?.length > 0 && (
              <div className="absolute top-14 w-full pac-container bg-navy rounded-xl mt-2  max-h-52 overflow-y-scroll">
                {filteredCities.map((city, index) => {
                  if (index > 15) return; // limiting the number of suggested cities
                  return (
                    <button
                      type="button"
                      dir="ltr"
                      onClick={() => {
                        setCity(city.name);
                        window.localStorage.setItem("city", city.name);
                        setLatitude(parseFloat(city.latitude));
                        window.localStorage.setItem("latitude", city.latitude);
                        setLongitude(parseFloat(city.longitude));
                        window.localStorage.setItem(
                          "longitude",
                          city.longitude
                        );

                        setFilteredCities(null);
                      }}
                      key={`${city.name}-${city.latitude}-${city.longitude}`}
                      className="text-gray-300 w-full pl-4 p-2 border-b border-gray-600 text-start pac-item cursor-pointer"
                    >
                      {city.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          {/* changing 12 hour mode */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => {
                setArLanguage(!arLanguage);
                window.location.reload();
              }}
              className="border-transparent w-24 text-center hover:border-navy border text-navy  h-10 rounded-lg duration-300 transition-all"
            >
              {arLanguage ? "English" : "العربية"}
            </button>
            <button
              onClick={() => {
                setTwelveHour(!twelveHour);
                window.localStorage.setItem(
                  "twelveHour",
                  JSON.stringify(!twelveHour)
                );
              }}
              className="border-transparent w-24 hover:border-navy border text-navy h-10 rounded-lg duration-300  transition-all"
            >
              {twelveHour ? "24h" : "12h"}
            </button>
          </div>
        </div>

        <NightDetails
          latitude={latitude}
          longitude={longitude}
          city={city}
          data={null}
          twelveHour={twelveHour}
          arLanguage={arLanguage}
        />
      </div>
    </div>
  );
}
