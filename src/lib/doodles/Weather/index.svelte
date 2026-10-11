<script lang="ts">
  import { onMount } from 'svelte';

  import cloudy from '#lib/assets/cloudy.svg';
  import partlyCloudy from '#lib/assets/partly-cloudy.svg';
  import rainy from '#lib/assets/rainy.svg';
  import sunny from '#lib/assets/sunny.svg';
  import snowy from '#lib/assets/snowy.svg';
  import stormy from '#lib/assets/stormy.svg';

  import PrecipitationIcon from '#lib/assets/precipitation.svelte';
  import TemperatureIcon from '#lib/assets/temperature.svelte';

  const weekday = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const getWeatherByCode = (code: string) => {
    switch (code.toString()) {
      case '0':
        return {
          className: 'sunny',
          icon: sunny
        };
      case '1':
      case '2':
      case '3':
      case '45':
      case '48':
        return {
          className: 'cloudy',
          icon: partlyCloudy
        };
      case '51':
      case '53':
      case '55':
      case '56':
      case '57':
        return {
          className: 'cloudy',
          icon: cloudy
        };
      case '61':
      case '63':
      case '65':
      case '66':
      case '67':
      case '80':
      case '81':
      case '82':
        return {
          className: 'rainy',
          icon: rainy
        };
      case '71':
      case '73':
      case '75':
      case '77':
      case '85':
      case '86':
        return {
          className: 'snowy',
          icon: snowy
        };
      case '95':
      case '96':
      case '99':
        return {
          className: 'stormy',
          icon: stormy
        };
    }
  };

  type Forecast = {
    day: string;
    date: string;
    weather: ReturnType<typeof getWeatherByCode>;
    precipitation: number;
    temperatureMax: number;
    temperatureMin: number;
  };

  let map: Record<string, Forecast> = {};
  let suburb = '';
  let state = '';

  onMount(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const locRes = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=05825ed4a609424d98ec03da90234201`
      );

      const locData = await locRes.json();
      suburb = locData.results[0].components.suburb;
      state = locData.results[0].components.state;

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum&current_weather=true&timezone=auto`
      );

      const weatherData = await weatherRes.json();
      let i = 0;

      while (i < 7) {
        map[weatherData.daily.time[i]] = {
          day: weekday[new Date(weatherData.daily.time[i]).getDay()],
          date: weatherData.daily.time[i].split('-')[2],
          weather: getWeatherByCode(weatherData.daily.weathercode[i]),
          precipitation: weatherData.daily.precipitation_sum[i],
          temperatureMax: weatherData.daily.temperature_2m_max[i],
          temperatureMin: weatherData.daily.temperature_2m_min[i]
        };

        i++;
      }
    });
  });
</script>

<div class="container">
  {#if Object.keys(map).length > 0}
    <div class="weather-container">
      {#each Object.keys(map) as day (day)}
        <div class="date-container">
          <p class="day">{map[day].day}</p>
          <p class="date">{map[day].date}</p>
          <div class="info-container {map[day].weather?.className ?? ''}">
            <img src={map[day].weather?.icon} alt="Weather icon" class="weather-icon" />
            <p class="temp-max">
              {map[day].temperatureMax.toFixed(0)}<span class="degree">°</span>
            </p>
            <p class="prec">
              <PrecipitationIcon /><span>{map[day].precipitation.toFixed(0)}</span>
            </p>
            <p class="temp-min">
              <TemperatureIcon /><span
                >{map[day].temperatureMin.toFixed(0)}<span class="degree">°</span></span
              >
            </p>
          </div>
        </div>
      {/each}
    </div>
    <p class="loc">
      Showing weather for
      <span class="loc-values">{suburb}, {state}.</span>
    </p>
    <p class="loc">(Precipitation reading in mm, temperature in Celcius.)</p>
  {:else}
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  {/if}
</div>

<style>
  @import '../../../global.css';

  :root {
    --weather-icon-dimension-mobile: 110px;
    --weather-icon-dimension-tablet: 220px;
    --weather-icon-dimension-desktop: 250px;
  }

  .loc {
    font-size: 12px;
    font-weight: 400;
    margin: 0;
  }

  .loc:first-of-type {
    margin-top: 32px;
  }

  .loc-values {
    font-size: 13px;
    font-weight: 700;
  }

  .weather-container {
    font-family: 'Krona One', sans-serif;

    display: flex;
    gap: 12px;

    text-align: center;
  }

  .date-container {
    flex: 1;
    min-width: 0;
  }

  .info-container {
    position: relative;

    border-radius: 12px;

    margin-top: 8px;
    padding-top: var(--weather-icon-dimension-mobile);
    padding-bottom: 8px;
  }

  .sunny {
    background: #e6df95;
  }

  .cloudy {
    background: #4db0d3;
  }

  .rainy {
    background: #2b8bad;
  }

  .snowy {
    background: #bce1ef;
  }

  .stormy {
    background: #0e2e3a;
  }

  .sunny > .temp-max {
    color: #4db0d3;
  }

  .rainy > .temp-max,
  .cloudy > .temp-max,
  .stormy > .temp-max {
    color: #e6df95;
  }

  .snowy > .temp-max {
    color: #0e2e3a;
  }

  .sunny > .prec,
  .sunny > .temp-min {
    color: #247490;
  }

  .rainy > .prec,
  .rainy > .temp-min,
  .cloudy > .prec,
  .cloudy > .temp-min,
  .stormy > .prec,
  .stormy > .temp-min {
    color: #d3ebf4;
  }

  .snowy > .prec,
  .snowy > .temp-min {
    color: #247490;
  }

  .day,
  .date {
    color: #4db0d3;
    margin: 0;
  }

  .day {
    font-size: 10px;
    letter-spacing: 0.2em;
  }

  .date {
    font-size: 24px;
  }

  .weather-icon {
    position: absolute;
    width: var(--weather-icon-dimension-mobile);
    height: var(--weather-icon-dimension-mobile);
    top: 5%;
    left: -15%;

    background: transparent;
  }

  .temp-max {
    margin: 16px;
    font-family: 'Oswald', sans-serif;
    font-size: 30px;
  }

  .temp-max > .degree {
    font-size: 20px;
    vertical-align: super;
  }

  .prec,
  .temp-min {
    padding: 0 12px;
    margin: 2px 0;

    font-size: 8px;
    line-height: 8px;

    display: grid;
    grid-template-columns: 1fr 3fr;

    text-align: left;
  }

  :global(.prec > svg),
  :global(.temp-min > svg) {
    width: 8px;
    height: 8px;
    margin-right: 4px;
  }

  @media screen and (min-width: 768px) {
    .loc-values {
      font-size: 14px;
    }

    .weather-container {
      gap: 24px;
    }

    .day {
      font-size: 20px;
      letter-spacing: 0.2em;
    }

    .date {
      font-size: 56px;
    }

    .info-container {
      margin-top: 16px;
      padding-top: var(--weather-icon-dimension-tablet);
      padding-bottom: 24px;

      border-radius: 40px;
    }

    .weather-icon {
      width: var(--weather-icon-dimension-tablet);
      height: var(--weather-icon-dimension-tablet);
    }

    .temp-max {
      font-size: 90px;
    }

    .temp-max > .degree {
      font-size: 48px;
      vertical-align: super;
    }

    .prec,
    .temp-min {
      padding: 0 24px;
      margin: 8px 0;

      font-size: 16px;
      line-height: 18px;
    }

    :global(.prec > svg),
    :global(.temp-min > svg) {
      width: 18px;
      height: 18px;
      margin-right: 8px;
    }
  }

  @media screen and (min-width: 1024px) {
    .info-container {
      padding-top: var(--weather-icon-dimension-desktop);
    }

    .weather-icon {
      width: var(--weather-icon-dimension-desktop);
      height: var(--weather-icon-dimension-desktop);
    }

    .prec,
    .temp-min {
      padding: 0 40px;

      grid-template-columns: 1fr 2fr;
    }
  }

  /* Loading icon by https://loading.io/css/ */
  .lds-ring {
    display: inline-block;
    position: relative;
    width: 72px;
    height: 72px;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid #cef;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #cef transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  /* End of loading icon by https://loading.io/css/ */
</style>
