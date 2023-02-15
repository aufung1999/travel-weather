export default function cal_Average_temp( matchDay) {
    let temp_array = [];

    matchDay.map((time_interval) =>
      temp_array.push(time_interval["main"]["temp"])
    );

    let average = null;

    if (temp_array.length != 0) {
      average = temp_array.reduce((a, b) => a + b) / temp_array.length;
    }

    return average;
  }