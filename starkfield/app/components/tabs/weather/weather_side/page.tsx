'use client'
import React, { useEffect, useState } from "react";
import {
  Cloud,
  Droplets,
  Thermometer,
  Wind,
} from "lucide-react";
import { useTheme } from 'next-themes'

type WeatherData = {
  location: string;
  current: {
    tempC: number;
    tempF: number;
    condition: string;
    humidity: number;
    wind: number;
    icon: string;
  };
};

const WeatherSide = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
   const { theme, setTheme } = useTheme();
  

  const apiKey = "bbc866c78ccd689ab15a1de21e627ba0"; 

  useEffect(() => {
    const fetchWeather = async (lat: number, lon: number) => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) throw new Error("Failed to fetch weather data");

        const data = await response.json();
        const tempC = data.main.temp;
        const tempF = (tempC * 9) / 5 + 32;
        const condition = data.weather[0].main;
        const icon = data.weather[0].icon;

        setWeatherData({
          location: data.name,
          current: {
            tempC,
            tempF,
            condition,
            humidity: data.main.humidity,
            wind: data.wind.speed,
            icon,
          },
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Request geolocation from browser
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
        },
        (err) => {
          console.warn("Location access denied, using fallback city.");
          // fallback: Nigeria
          fetch(`https://api.openweathermap.org/data/2.5/weather?q=Nigeria&appid=${apiKey}&units=metric`)
            .then((res) => res.json())
            .then((data) => {
              const tempC = data.main.temp;
              const tempF = (tempC * 9) / 5 + 32;
              const condition = data.weather[0].main;
              const icon = data.weather[0].icon;

              setWeatherData({
                location: data.name,
                current: {
                  tempC,
                  tempF,
                  condition,
                  humidity: data.main.humidity,
                  wind: data.wind.speed,
                  icon,
                },
              });
              setLoading(false);
            });
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
    }
  }, [apiKey]);

  if (loading)
    return (
      <div className="text-center py-8 text-blue-200">
        Detecting your location and loading weather...
      </div>
    );

  if (error)
    return (
      <div className="text-center py-8 text-red-400">
        Error: {error}
      </div>
    );

  if (!weatherData) return null;

  const { tempC, tempF, condition, humidity, wind, icon } = weatherData.current;

  return (
    <div className="">
      <div className={`${theme === 'dark' ? 'border-1 bg-gradient-to-br from-white/15 to-' : 'bg-gradient-to-br from-blue-500 to-cyan-500'} rounded-3xl shadow-xl text-white p-6 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex justify-between">
            <h3 className="font-bold text-lg mb-4 flex items-center">
              <Thermometer className="w-5 h-5 mr-2" />
              Weather Now
            </h3>
            <h1 className="text-sm relative top-1">
              Location: <span>{weatherData.location}</span>
            </h1>
          </div>

          <div className="text-center">
            <img
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              alt={condition}
              className="w-16 h-16 mx-auto"
            />
            <div className="text-3xl font-black mb-2">
              {tempC.toFixed(1)}°C / {tempF.toFixed(1)}°F
            </div>
            <p className="text-blue-100 text-sm mb-4">{condition}</p>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <Droplets className="w-4 h-4 mx-auto mb-1" />
                <div className="font-semibold">{humidity}%</div>
                <div className="text-xs text-blue-200">Humidity</div>
              </div>
              <div>
                <Wind className="w-4 h-4 mx-auto mb-1" />
                <div className="font-semibold">{wind} m/s</div>
                <div className="text-xs text-blue-200">Wind</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherSide;
