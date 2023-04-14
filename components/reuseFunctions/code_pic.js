export function code_pic(weathercode) {
  console.log("weathercode: " + weathercode);
  switch (weathercode) {
    case 0:
      return (
        <img className="icon" src="icons/clear-day.svg" alt="icon-weather" />
      );
    case 1:
      // return <div>Mainly clear</div>;
      return (
        <img className="icon" src="icons/clear-day.svg" alt="icon-weather" />
      );
    case 2:
      // return <div>Partly Cloudy</div>;
      return (
        <img className="icon" src="icons/clear-day.svg" alt="icon-weather" />
      );
    case 3:
      // return <div>overcast</div>;
      return (
        <img className="icon" src="icons/clear-day.svg" alt="icon-weather" />
      );
    case 45:
      return <img className="icon" src="icons/fog.svg" alt="icon-weather" />;
    case 48:
      // return <div>depositing tie fog</div>;
      return <img className="icon" src="icons/fog.svg" alt="icon-weather" />;
    case 51:
      return <img className="icon" src="icons/fog.svg" alt="icon-weather" />;
    case 53:
      // return <div>moderate Drizzle</div>;
      return (
        <img className="icon" src="icons/drizzle.svg" alt="icon-weather" />
      );
    case 55:
      // return <div>dense Drizzle</div>;
      return (
        <img className="icon" src="icons/drizzle.svg" alt="icon-weather" />
      );
    case 56:
      // return <div>Light Freezing Drizzle</div>;
      return (
        <img className="icon" src="icons/drizzle.svg" alt="icon-weather" />
      );
    case 57:
      // return <div>dense Freezing Drizzle</div>;
      return (
        <img className="icon" src="icons/drizzle.svg" alt="icon-weather" />
      );
    case 61:
      // return <div>Slight Rain</div>;
      return <img className="icon" src="icons/rain.svg" alt="icon-weather" />;
    case 63:
      // return <div>moderate Rain</div>;
      return <img className="icon" src="icons/rain.svg" alt="icon-weather" />;
    case 65:
      // return <div>heavy Rain</div>;
      return <img className="icon" src="icons/rain.svg" alt="icon-weather" />;
    case 66:
      // return <div>light Freezing Rain</div>;
      return <img className="icon" src="icons/rain.svg" alt="icon-weather" />;
    case 67:
      // return <div>heavy Freezing Rain</div>;
      return <img className="icon" src="icons/rain.svg" alt="icon-weather" />;
    case 71:
      // return <div>Slight Snow fall</div>;
      return <img className="icon" src="icons/snow.svg" alt="icon-weather" />;
    case 73:
      // return <div>moderate Snow fall</div>;
      return <img className="icon" src="icons/snow.svg" alt="icon-weather" />;
    case 75:
      // return <div>heavy Snow fall</div>;
      return <img className="icon" src="icons/snow.svg" alt="icon-weather" />;
    case 77:
      // return <div>Snow</div>;
      return <img className="icon" src="icons/snow.svg" alt="icon-weather" />;
    case 80:
      // return <div>Slight Rain showers</div>;
      return <img className="icon" src="icons/rain.svg" alt="icon-weather" />;
    case 81:
      // return <div>moderate Rain showers</div>;
      return <img className="icon" src="icons/rain.svg" alt="icon-weather" />;
    case 82:
      // return <div>heavy Rain showers</div>;
      return <img className="icon" src="icons/rain.svg" alt="icon-weather" />;
    case 85:
      // return <div>Slight Snow showers</div>;
      return <img className="icon" src="icons/snow.svg" alt="icon-weather" />;
    case 86:
      // return <div>heavy Snow showers</div>;
      return <img className="icon" src="icons/snow.svg" alt="icon-weather" />;
    case 95:
      // return <div>Slight Thunderstorm</div>;
      return (
        <img
          className="icon"
          src="icons/thunderstorms-rain.svg"
          alt="icon-weather"
        />
      );
    case 96:
      // return <div>moderate Thunderstorm</div>;
      return (
        <img
          className="icon"
          src="icons/thunderstorms-rain.svg"
          alt="icon-weather"
        />
      );
    case 99:
      // return <div>heavy Thunderstorm</div>;
      return (
        <img
          className="icon"
          src="icons/thunderstorms-rain.svg"
          alt="icon-weather"
        />
      );
  }
}
