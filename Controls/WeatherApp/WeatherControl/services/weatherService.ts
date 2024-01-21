

import axios from 'axios';
import { WeatherData } from '../interfaces/weatherData';
import { apiKey, city } from '../config';


export const getWeatherData = async (): Promise<WeatherData[]> => {
  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    const response = await axios.get(apiUrl);


    const forecastData: WeatherData[] = response.data.list.map((item: any) => ({
      date: item.dt_txt.split(' ')[0], // Extract only the date part
      temperature: item.main.temp - 273.15, // convert to celsius
      description: item.weather[0].description,
      image: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
    }));

    const today = new Date().toISOString().split('T')[0];

    const filteredForecast: WeatherData[] = [];
    const uniqueDates: Set<string> = new Set();

    forecastData.forEach((item) => {
      if (!uniqueDates.has(item.date) && item.date >= today && item.date <= getNextFourDays(today)) {
        uniqueDates.add(item.date);
        filteredForecast.push(item);
      }
    });

    return filteredForecast;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Failed to fetch weather data');
  }
};

const getNextFourDays = (today: string): string => {
  const nextFourDays = new Date(today);
  nextFourDays.setDate(nextFourDays.getDate() + 4);
  return nextFourDays.toISOString().split('T')[0];
};
