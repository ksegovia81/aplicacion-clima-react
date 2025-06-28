import './WeatherApp.css'

import React, { useState } from 'react';

export const WeatherApp = () => {
    const URL_BASE = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = 'YOUR_API_KEY_HERE' // Reemplaza con tu API Key de OpenWeatherMap
    const DIF_KELVIN = 273.15

    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setWeather(null);
        if (!city) {
            setError('Por favor ingresa una ciudad.');
            return;
        }
        try {
            const response = await fetch(`${URL_BASE}?q=${city}&appid=${API_KEY}`);
            if (!response.ok) {
                throw new Error('Ciudad no encontrada');
            }
            const data = await response.json();
            setWeather({
                temp: Math.round(data.main.temp - DIF_KELVIN), // Redondeado sin decimales
                description: data.weather[0].description,
                name: data.name,
                country: data.sys.country,
                icon: data.weather[0].icon
            });
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container">
            <h1>Aplicación de Clima</h1>    
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Ingresa una ciudad"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                />
                <button type="submit">Buscar</button>      
            </form>
            {error && <p style={{color: 'red'}}>{error}</p>}
            {weather && (
                <div>
                    <h2>{weather.name}, {weather.country}</h2>
                    <p>Temperatura: {weather.temp}°C</p>
                    <p>Condición: {weather.description}</p>
                    <img 
                        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} 
                        alt={weather.description} 
                    />
                </div>
            )}
        </div>
    )
}