export function code_pic(weathercode) {
  console.log("weathercode: " + weathercode);
  switch (weathercode) {
    case 0:
      return <img className='icon' src='icons/clear-day.svg' alt="icon-weather" />
    case 1:
      return <div>Mainly clear</div>;
    case 2:
      return <div>Partly Cloudy</div>;
    case 3:
      return <div>overcast</div>;
    case 45:
      return <img className='icon' src='icons/fog.svg' alt="icon-weather" />
    case 48:
      return <div>depositing tie fog</div>;
    case 51:
      return <div>Light Drizzle</div>;
    case 53:
      return <div>moderate Drizzle</div>;
    case 55:
      return <div>dense Drizzle</div>;
    case 56:
      return <div>Light Freezing Drizzle</div>;
    case 57:
      return <div>dense Freezing Drizzle</div>;
    case 61:
      return <div>Slight Rain</div>;
    case 63:
      return <div>moderate Rain</div>;
    case 65:
      return <div>heavy Rain</div>;
    case 66:
      return <div>light Freezing Rain</div>;
    case 67:
      return <div>heavy Freezing Rain</div>;
    case 71:
      return <div>Slight Snow fall</div>;
    case 73:
      return <div>moderate Snow fall</div>;
    case 75:
      return <div>heavy Snow fall</div>;
    case 77:
      return <div>Snow</div>;
    case 80:
      return <div>Slight Rain showers</div>;
    case 81:
      return <div>moderate Rain showers</div>;
    case 82:
      return <div>heavy Rain showers</div>;
    case 85:
      return <div>Slight Snow showers</div>;
    case 86:
      return <div>heavy Snow showers</div>;
    case 95:
      return <div>Slight Thunderstorm</div>;
    case 96:
      return <div>moderate Thunderstorm</div>;
    case 99:
      return <div>heavy Thunderstorm</div>;
  }
}
