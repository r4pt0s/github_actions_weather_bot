require("dotenv").config();

const fetch = require("node-fetch");
const telegram = require("node-telegram-bot-api");
const bot = new telegram(process.env.TELEGRAM_TOKEN);

const weatherToken = process.env.WEATHER_API_TOKEN;

const weatherURL = new URL("https://api.openweathermap.org/data/2.5/weather");

weatherURL.searchParams.set("APPID", weatherToken);
weatherURL.searchParams.set("zip", "2474,at");
weatherURL.searchParams.set("units", "metric");

const getWeatherData = async () => {
  const response = await fetch(weatherURL.toString());
  const body = await response.json();

  return body;
};

const generateWeatherMessage = weatherObject =>
  ` The weather in ${weatherObject.name}: ${weatherObject.weather[0].description}. Current temprature
is ${weatherObject.main.temp}°C, with a low temp of ${weatherObject.main.temp_min}°C and high of ${weatherObject.main.temp_max}°C.`;

const main = async () => {
  const weatherData = await getWeatherData();
  const weatherString = generateWeatherMessage(weatherData);
  bot.sendMessage(process.env.TELEGRAM_CHAT_ID, weatherString);
};

main();
